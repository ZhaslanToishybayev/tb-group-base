'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/design/utils';

// Input variants
const inputVariants = cva(
  'flex w-full rounded-xl border bg-slate-800/50 text-white placeholder:text-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-slate-600 hover:border-slate-500 focus:border-primary-500 focus:ring-primary-500/20',
        glass: 'border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 focus:border-white/30 focus:ring-white/20',
        gradient: 'border-primary-500/30 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 hover:border-primary-500/50 focus:border-primary-500 focus:ring-primary-500/20',
        neon: 'border-neon-cyan/30 bg-neon-cyan/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 focus:border-neon-cyan focus:ring-neon-cyan/20',
        error: 'border-error-500 hover:border-error-400 focus:border-error-400 focus:ring-error-500/20',
        success: 'border-success-500 hover:border-success-400 focus:border-success-400 focus:ring-success-500/20',
      },
      size: {
        sm: 'h-10 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
      },
      state: {
        default: '',
        error: 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
        success: 'border-success-500 focus:border-success-500 focus:ring-success-500/20',
        warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

/**
 * Props for the Input component
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * The label text to display above the input field
   * @example "Email Address"
   */
  label?: string;

  /**
   * Error message to display below the input
   * Shows red styling and error icon
   * @example "Please enter a valid email"
   */
  error?: string;

  /**
   * Success message to display below the input
   * Shows green styling and success icon
   * @example "Email is valid"
   */
  success?: string;

  /**
   * Warning message to display below the input
   * Shows yellow styling and warning icon
   * @example "Email format looks unusual"
   */
  warning?: string;

  /**
   * Icon to display on the left side of the input
   * Must be a valid React node
   * @example <SearchIcon />
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the input
   * Must be a valid React node
   * @example <ClearIcon />
   */
  rightIcon?: React.ReactNode;

  /**
   * Helper text to display below the input
   * Shows in neutral color without icon
   * @example "We'll never share your email"
   */
  helperText?: string;

  /**
   * Whether the input is required
   * Shows red asterisk (*) in the label
   * @default false
   */
  required?: boolean;
}

// Animated Input component
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      size,
      state,
      label,
      error,
      success,
      warning,
      leftIcon,
      rightIcon,
      helperText,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(!!props.defaultValue || !!props.value);
    const inputId = id || React.useId();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onFocus?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const displayError = error;
    const displaySuccess = success;
    const displayWarning = warning;

    const inputState = displayError ? 'error' : displaySuccess ? 'success' : displayWarning ? 'warning' : state;

    const labelClassName = cn(
      // Floating label positioning
      'absolute left-3 transition-all duration-300 ease-out pointer-events-none',
      // Base label styles
      'text-slate-400',
      // Size-dependent positioning
      {
        'top-3': size === 'sm',
        'top-4': size === 'md',
        'top-5': size === 'lg',
      },
      // Active state - moves up when focused or has value
      {
        '-top-2 -left-1 scale-90 bg-slate-800 px-2 text-xs text-primary-400':
          isFocused || hasValue,
      },
      // Error state
      {
        'text-error-400': displayError,
      },
      // Success state
      {
        'text-success-400': displaySuccess,
      },
      // Warning state
      {
        'text-warning-400': displayWarning,
      }
    );

    const containerClassName = cn(
      'relative',
      {
        // Container styles for left icon
        'pl-10': leftIcon,
        // Container styles for right icon
        'pr-10': rightIcon,
      }
    );

    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Label */}
        {label && (
          <motion.label
            htmlFor={inputId}
            className={labelClassName}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            {required && <span className="text-error-400 ml-1">*</span>}
          </motion.label>
        )}

        {/* Input container with glow effect */}
        <motion.div
          className={containerClassName}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Left icon */}
          {leftIcon && (
            <motion.div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
              animate={{
                color: isFocused ? '#60a5fa' : '#94a3b8',
                scale: isFocused ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {leftIcon}
            </motion.div>
          )}

          {/* Input field */}
          <motion.div
            className="relative"
            whileFocus={{
              scale: 1.01,
            }}
            transition={{ duration: 0.2 }}
          >
            <input
              type={type}
              id={inputId}
              ref={ref}
              className={cn(inputVariants({ variant, size, state: inputState, className }))}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{
                borderColor: displayError
                  ? '#ef4444'
                  : displaySuccess
                  ? '#22c55e'
                  : displayWarning
                  ? '#f59e0b'
                  : isFocused
                  ? '#3b82f6'
                  : undefined,
                boxShadow: isFocused
                  ? displayError
                    ? '0 0 0 4px rgba(239, 68, 68, 0.1)'
                    : displaySuccess
                    ? '0 0 0 4px rgba(34, 197, 94, 0.1)'
                    : displayWarning
                    ? '0 0 0 4px rgba(245, 158, 11, 0.1)'
                    : '0 0 0 4px rgba(59, 130, 246, 0.1)'
                  : undefined,
              }}
              {...props}
            />
          </motion.div>

          {/* Focus glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: displayError
                ? 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)'
                : displaySuccess
                ? 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)'
                : displayWarning
                ? 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Right icon or validation indicator */}
          {rightIcon && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
              animate={{
                color: isFocused ? '#60a5fa' : '#94a3b8',
                scale: isFocused ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {rightIcon}
            </motion.div>
          )}

          {/* Success/Error/Warning indicator */}
          {!rightIcon && (displaySuccess || displayError || displayWarning) && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 0.2,
              }}
            >
              {displaySuccess && (
                <motion.svg
                  className="w-5 h-5 text-success-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
              {displayError && (
                <motion.svg
                  className="w-5 h-5 text-error-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              )}
              {displayWarning && (
                <motion.svg
                  className="w-5 h-5 text-warning-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </motion.svg>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Helper text or error message */}
        {(helperText || displayError || displaySuccess || displayWarning) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'text-sm flex items-center gap-2',
              {
                'text-slate-400': helperText && !displayError && !displaySuccess && !displayWarning,
                'text-error-400': displayError,
                'text-success-400': displaySuccess,
                'text-warning-400': displayWarning,
              }
            )}
          >
            {(displayError || displaySuccess || displayWarning) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {displayError && '⚠️'}
                {displaySuccess && '✅'}
                {displayWarning && '⚡'}
              </motion.span>
            )}
            <span>{displayError || displaySuccess || displayWarning || helperText}</span>
          </motion.div>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

// Preset variants
export const GlassInput = (props: Omit<InputProps, 'variant'>) => (
  <Input variant="glass" {...props} />
);

export const GradientInput = (props: Omit<InputProps, 'variant'>) => (
  <Input variant="gradient" {...props} />
);

export const NeonInput = (props: Omit<InputProps, 'variant'>) => (
  <Input variant="neon" {...props} />
);

export const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'leftIcon'>>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      leftIcon={
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      placeholder="Search..."
      className={className}
      {...props}
    />
  )
);
SearchInput.displayName = 'SearchInput';

export const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'rightIcon'>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        }
        className={className}
        {...props}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export default Input;
