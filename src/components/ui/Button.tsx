"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantStyles = {
    primary: 'bg-primary-red text-white hover:bg-opacity-90 focus:ring-primary-red',
    secondary: 'bg-primary-blue text-white hover:bg-opacity-90 focus:ring-primary-blue',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 focus:ring-gray-300',
  };
  
  const sizeStyles = {
    default: 'px-4 py-2 text-base',
    sm: 'px-3 py-1 text-sm',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}; 