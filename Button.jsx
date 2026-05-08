import { memo } from 'react';

const variants = {
  primary:
    'bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/25 active:scale-[0.97]',
  secondary: (isDark) =>
    isDark
      ? 'bg-white/5 text-gray-200 hover:bg-white/10 border border-white/10'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
  ghost: (isDark) =>
    isDark
      ? 'text-gray-400 hover:text-white hover:bg-white/5'
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
  danger: (isDark) =>
    isDark
      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
      : 'bg-red-50 text-red-500 hover:bg-red-100',
  success: (isDark) =>
    isDark
      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
      : 'bg-green-50 text-green-600 border border-green-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
  xl: 'px-8 py-3.5 text-base',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  isDark = true,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const variantClass =
    typeof variants[variant] === 'function'
      ? variants[variant](isDark)
      : variants[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500/40 disabled:opacity-40 disabled:cursor-not-allowed ${variantClass} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
