'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white font-bold hover:bg-primary-dark',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-heading text-sm uppercase tracking-wider transition-colors cursor-pointer';

  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
