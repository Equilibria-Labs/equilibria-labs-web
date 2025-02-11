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
      className={`flex flex-col ${getGapClass(hasLargeGap, hasNoGap)} max-w-5xl ${className}`}
    >
      {children}
    </div>
  );
}
