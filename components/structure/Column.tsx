import React from 'react';

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
  hasLargeGap?: boolean;
  hasSmallGap?: boolean;
  justifyItems?: 'start' | 'center' | 'end';
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
}: ColumnProps) {
  return (
    <div
      data-component='Column'
      className={`grid grid-cols-1 ${getGapClass(
        hasLargeGap,
        hasNoGap,
        hasSmallGap
      )} ${justifyItems && `justify-items-${justifyItems}`} w-full max-w-5xl ${className}`}
    >
      {children}
    </div>
  );
}
