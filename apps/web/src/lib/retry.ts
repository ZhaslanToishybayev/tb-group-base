/**
 * Retry utilities with exponential backoff
 */

export type RetryOptions = {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
  onRetry?: (error: Error, attempt: number, delay: number) => void;
};

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
  shouldRetry: (error: Error) => {
    // Only retry on network errors, not on application errors
    return error instanceof TypeError || error.message.includes('fetch');
  },
  onRetry: () => {
    // Default: do nothing
  },
};

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate delay with exponential backoff and jitter
 */
function calculateDelay(
  attempt: number,
  initialDelay: number,
  backoffFactor: number,
  maxDelay: number
): number {
  const exponentialDelay = initialDelay * Math.pow(backoffFactor, attempt);
  const cappedDelay = Math.min(exponentialDelay, maxDelay);
  
  // Add jitter (random variation of ±20%)
  const jitter = cappedDelay * 0.2 * (Math.random() - 0.5);
  
  return Math.floor(cappedDelay + jitter);
}

/**
 * Retry a function with exponential backoff
 * @param fn - Async function to retry
 * @param options - Retry configuration options
 * @returns Promise with the function result
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error;

  for (let attempt = 0; attempt < opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry if we've exceeded max attempts
      if (attempt >= opts.maxAttempts - 1) {
        break;
      }

      // Check if we should retry this error
      if (!opts.shouldRetry(lastError, attempt)) {
        break;
      }

      // Calculate delay for next retry
      const delay = calculateDelay(
        attempt,
        opts.initialDelay,
        opts.backoffFactor,
        opts.maxDelay
      );

      // Notify about retry
      opts.onRetry(lastError, attempt + 1, delay);

      // Wait before retrying
      await sleep(delay);
    }
  }

  throw lastError!;
}

/**
 * Retry fetch requests specifically
 */
export async function retryFetch(
  url: string,
  init?: RequestInit,
  options: RetryOptions = {}
): Promise<Response> {
  const mergedOptions: RetryOptions = {
    ...options,
    shouldRetry: (error, attempt) => {
      // Custom retry logic for fetch
      // Don't retry on 4xx errors (client errors)
      if (error.message.includes('4')) {
        return false;
      }
      
      // Retry on network errors and 5xx errors
      return (
        error instanceof TypeError ||
        error.message.includes('5') ||
        error.message.includes('fetch') ||
        error.message.includes('timeout')
      );
    },
  };

  return retryWithBackoff(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, mergedOptions);
}

/**
 * Batch retry - retry multiple operations in parallel with individual retry logic
 */
export async function retryBatch<T>(
  operations: Array<() => Promise<T>>,
  options: RetryOptions = {}
): Promise<Array<T | Error>> {
  return Promise.all(
    operations.map((op) =>
      retryWithBackoff(op, options).catch((error) => error)
    )
  );
}

/**
 * Circuit breaker pattern - stop retrying if too many failures occur
 */
export class CircuitBreaker<T> {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private fn: () => Promise<T>,
    private threshold = 5,
    private resetTimeout = 60000 // 1 minute
  ) {}

  async execute(): Promise<T> {
    // Check if circuit should be reset
    if (
      this.state === 'open' &&
      Date.now() - this.lastFailureTime >= this.resetTimeout
    ) {
      this.state = 'half-open';
      this.failureCount = 0;
    }

    // If circuit is open, fail fast
    if (this.state === 'open') {
      throw new Error('Circuit breaker is open - too many failures');
    }

    try {
      const result = await this.fn();
      
      // Success - close circuit if it was half-open
      if (this.state === 'half-open') {
        this.state = 'closed';
        this.failureCount = 0;
      }
      
      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      // Open circuit if threshold exceeded
      if (this.failureCount >= this.threshold) {
        this.state = 'open';
      }

      throw error;
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
    };
  }

  reset() {
    this.state = 'closed';
    this.failureCount = 0;
    this.lastFailureTime = 0;
  }
}
