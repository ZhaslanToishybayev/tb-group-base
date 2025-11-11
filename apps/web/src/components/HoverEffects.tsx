'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

/**
 * Props for the HoverLift component
 */
interface HoverLiftProps {
  /**
   * The content to apply the effect to
   * Can be any valid React node
   * @example <div>Card</div>
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply
   * @default ""
   */
  className?: string;

  /**
   * Scale factor on hover
   * @default 1.05
   * @example 1.1
   */
  scale?: number;

  /**
   * Y-axis translation in pixels on hover
   * @default -8
   * @example -10
   */
  y?: number;

  /**
   * Animation duration in seconds
   * @default 0.3
   * @example 0.5
   */
  duration?: number;

  /**
   * Whether the hover effect is enabled
   * @default true
   */
  enabled?: boolean;
}

export function HoverLift({
  children,
  className = '',
  scale = 1.05,
  y = -8,
  duration = 0.3,
  enabled = true,
}: HoverLiftProps) {
  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        y,
        transition: {
          duration,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </motion.div>
  );
}

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'neon' | 'blue' | 'custom';
  intensity?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  enabled?: boolean;
}

const glowColors = {
  primary: 'rgba(59, 130, 246, 0.5)',
  secondary: 'rgba(139, 92, 246, 0.5)',
  neon: 'rgba(34, 211, 238, 0.5)',
  blue: 'rgba(59, 130, 246, 0.5)',
  custom: 'rgba(59, 130, 246, 0.5)',
};

const glowSizes = {
  sm: 'blur(10px)',
  md: 'blur(20px)',
  lg: 'blur(30px)',
  xl: 'blur(40px)',
};

export function HoverGlow({
  children,
  className = '',
  color = 'primary',
  intensity = 0.5,
  size = 'md',
  enabled = true,
}: HoverGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!enabled) return <>{children}</>;

  const glowColor = glowColors[color];
  const glowSize = glowSizes[size];

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: glowSize,
          opacity: isHovered ? intensity : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

interface HoverTiltProps {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  enabled?: boolean;
}

export function HoverTilt({
  children,
  className = '',
  maxRotation = 8,
  enabled = true,
}: HoverTiltProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      className={`${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        rotateX: isHovered ? maxRotation : 0,
        rotateY: isHovered ? maxRotation : 0,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}

interface HoverRippleProps {
  children: ReactNode;
  className?: string;
  color?: string;
  duration?: number;
  enabled?: boolean;
}

export function HoverRipple({
  children,
  className = '',
  color = 'rgba(255, 255, 255, 0.3)',
  duration = 0.6,
  enabled = true,
}: HoverRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  if (!enabled) return <>{children}</>;

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, duration * 1000);
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleHover}
    >
      {children}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            background: color,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
}

interface HoverUnderlineProps {
  children: ReactNode;
  className?: string;
  direction?: 'center' | 'left' | 'right';
  color?: string;
  height?: string;
  enabled?: boolean;
}

export function HoverUnderline({
  children,
  className = '',
  direction = 'center',
  color = 'currentColor',
  height = '2px',
  enabled = true,
}: HoverUnderlineProps) {
  if (!enabled) return <>{children}</>;

  return (
    <motion.div className={`relative inline-block ${className}`}>
      <span>{children}</span>
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height }}
        initial={{ scaleX: 0, originX: direction === 'center' ? 0.5 : 0 }}
        whileHover={{
          scaleX: 1,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        whileTap={{
          scaleX: 0.95,
          transition: { duration: 0.1 },
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: color,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

interface HoverShineProps {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
}

export function HoverShine({
  children,
  className = '',
  enabled = true,
}: HoverShineProps) {
  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute inset-0 -top-full"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
        }}
        whileHover={{
          top: '200%',
          transition: {
            duration: 0.6,
            ease: 'easeInOut',
          },
        }}
      />
      {children}
    </motion.div>
  );
}

interface HoverBorderGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
  enabled?: boolean;
}

export function HoverBorderGlow({
  children,
  className = '',
  color = 'rgba(59, 130, 246, 0.5)',
  enabled = true,
}: HoverBorderGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!enabled) return <>{children}</>;

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-0.5 rounded-lg pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${color}, ${color})`,
          opacity: isHovered ? 0.7 : 0,
          filter: 'blur(8px)',
          transition: 'opacity 0.3s ease',
        }}
      />
      <div className="relative bg-slate-900 rounded-lg p-1">
        <div className="bg-slate-900 rounded-lg p-4">{children}</div>
      </div>
    </motion.div>
  );
}

// Composite hover effect
interface HoverEffectProps {
  children: ReactNode;
  className?: string;
  effect?: 'lift' | 'glow' | 'tilt' | 'ripple' | 'underline' | 'shine' | 'border';
  scale?: number;
  y?: number;
  enabled?: boolean;
}

export function HoverEffect({
  children,
  className = '',
  effect = 'lift',
  scale,
  y,
  enabled = true,
}: HoverEffectProps) {
  const commonProps = { className, enabled };

  switch (effect) {
    case 'lift':
      return <HoverLift {...commonProps} scale={scale} y={y}>{children}</HoverLift>;
    case 'glow':
      return <HoverGlow {...commonProps}>{children}</HoverGlow>;
    case 'tilt':
      return <HoverTilt {...commonProps}>{children}</HoverTilt>;
    case 'ripple':
      return <HoverRipple {...commonProps}>{children}</HoverRipple>;
    case 'underline':
      return <HoverUnderline {...commonProps}>{children}</HoverUnderline>;
    case 'shine':
      return <HoverShine {...commonProps}>{children}</HoverShine>;
    case 'border':
      return <HoverBorderGlow {...commonProps}>{children}</HoverBorderGlow>;
    default:
      return <>{children}</>;
  }
}
