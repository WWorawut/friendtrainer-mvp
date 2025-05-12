import React from 'react';
import { Button } from '@/components/ui/button';

// Define possible sizes for the button
type ButtonSize = 'large' | 'medium'; // 'large' for 56px, 'medium' for 48px

// Define props for the PrimaryButton component
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  size = 'medium',
  className,
  ...rest
}) => {
  const heightClass = size === 'large' ? 'h-14' : 'h-12';

  return (
    <Button
      className={`
        w-full
        ${heightClass}
        bg-button-primary-bg hover:bg-button-primary-hover-bg
        text-button-primary-text
        font-medium text-lg
        rounded-full
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ''}
      `}
      {...rest}
    >
      {children}
    </Button>
  );
};