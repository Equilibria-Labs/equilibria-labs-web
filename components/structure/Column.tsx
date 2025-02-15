import React from 'react';

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
  hasLargeGap?: boolean;
}

const getGapClass = (hasLargeGap: boolean, hasNoGap: boolean): string => {
  if (hasNoGap) return '';
  if (hasLargeGap) return 'gap-8';
  return 'gap-4';
};

export default function Column({
  children,
  className = '',
  hasNoGap = false,
  hasLargeGap = false,
}: ColumnProps) {
  return (
    <div
      data-component='Column'
      className={`grid grid-cols-1 ${getGapClass(hasLargeGap, hasNoGap)} w-full max-w-5xl ${className}`}
    >
      {children}
    </div>
  );
}
