import React from 'react';

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
  hasLargeGap?: boolean;
  hasSmallGap?: boolean;
  justifyItems?: 'start' | 'center' | 'end';
  fadeIn?: boolean;
}

const getGapClass = (
  hasLargeGap: boolean,
  hasNoGap: boolean,
  hasSmallGap: boolean
): string => {
  if (hasNoGap) return '';
  if (hasLargeGap) return 'gap-8';
  if (hasSmallGap) return 'gap-2';
  return 'gap-4';
};

export default function Column({
  children,
  className = '',
  hasNoGap = false,
  hasLargeGap = false,
  hasSmallGap = false,
  justifyItems,
  fadeIn,
}: ColumnProps) {
  const fadeClass =
    fadeIn === undefined ? '' : fadeIn ? 'opacity-100' : 'opacity-0';

  return (
    <div
      data-component='Column'
      className={`grid grid-cols-1 transition-opacity duration-300 ${getGapClass(
        hasLargeGap,
        hasNoGap,
        hasSmallGap
      )} w-full max-w-5xl ${fadeClass} ${className}`}
      style={justifyItems ? { justifyItems: justifyItems } : {}}
    >
      {children}
    </div>
  );
}
