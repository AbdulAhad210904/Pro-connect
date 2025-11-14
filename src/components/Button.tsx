import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md transition-colors"
  const variantClasses = variant === 'primary' 
    ? "bg-[#27aae2] text-white hover:bg-[#2299cc]" 
    : "bg-gray-200 text-gray-800 hover:bg-gray-300"

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  )
}

