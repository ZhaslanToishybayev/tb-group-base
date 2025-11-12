'use client';

import React from 'react';
import { Button } from './Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Error tracking integration
    try {
      // Try to send to Sentry if available
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          extra: errorInfo,
          tags: {
            component: 'ErrorBoundary',
          },
        });
      }
      // Alternative: Send to custom endpoint
      else if (process.env.NEXT_PUBLIC_ERROR_TRACKING_URL) {
        fetch(process.env.NEXT_PUBLIC_ERROR_TRACKING_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
          }),
        }).catch(() => {
          // Silently fail - don't spam console
        });
      }
    } catch (trackingError) {
      // Avoid infinite error loop - only log in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to send error to tracking service:', trackingError);
      }
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-error-500/20">
            <AlertTriangle className="h-12 w-12 text-error-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Что-то пошло не так</h2>

        <p className="text-slate-300 mb-6">
          Произошла неожиданная ошибка. Попробуйте обновить страницу или вернуться позже.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-white/10 text-left">
            <p className="text-xs text-slate-400 font-mono">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetError} leftIcon={RefreshCw}>
            Попробовать снова
          </Button>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Report issue button
              const subject = encodeURIComponent('Ошибка на сайте TB Group');
              const body = encodeURIComponent(
                `Здравствуйте!\n\n` +
                `Произошла ошибка на сайте:\n\n` +
                `${error?.message || 'Неизвестная ошибка'}\n\n` +
                `URL: ${window.location.href}\n` +
                `Время: ${new Date().toLocaleString('ru-RU')}\n\n` +
                `Пожалуйста, приложите скриншот если возможно.`
              );
              window.open(`mailto:info@tb-group.kz?subject=${subject}&body=${body}`);
            }}
          >
            Сообщить об ошибке
          </Button>
        </div>
      </div>
    </div>
  );
}
