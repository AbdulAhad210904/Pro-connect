import * as React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
}) => {
  const baseStyles = "px-7 py-3 rounded-2xl h-[60px] text-base font-medium transition-colors duration-200";
  const variantStyles = {
    primary: "bg-sky-500 text-white hover:bg-sky-600",
    secondary: "bg-transparent text-white border-white border-2 hover:bg-gray-50 hover:text-sky-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};