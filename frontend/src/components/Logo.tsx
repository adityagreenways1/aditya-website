import React from 'react';

export function Logo({
  className = '',
  size = 'default',
}: {
  className?: string;
  size?: 'small' | 'default' | 'large';
}) {
  const sizes = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
  } as const;

  return (
    <div className="flex items-center gap-2">
      <img
        src="/img/logo.png"
        alt="Logo"
        className={`${sizes[size]} ${className} object-contain`}
      />
    </div>
  );
}

export default Logo;
