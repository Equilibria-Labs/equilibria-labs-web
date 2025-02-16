import React from 'react';

interface RowProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
  isFullWidth?: boolean;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end';
  gridTemplateColumns?: string;
  gapInPercent?: number;
}

export default function Row({
  children,
  className = '',
  hasNoGap = false,
  isFullWidth = false,
  justify = 'flex-start',
  align = 'flex-start',
  gridTemplateColumns = '',
  gapInPercent,
}: RowProps) {
  return (
    <div
      className={`grid grid-flow-col ${!hasNoGap ? 'gap-4' : ''} ${
        isFullWidth ? 'w-full' : 'max-w-5xl'
      } ${className}`}
      style={{
        justifyContent: justify,
        alignItems: align,
        gridTemplateColumns,
        gap: gapInPercent ? `${gapInPercent}%` : 'inherit',
      }}
    >
      {children}
    </div>
  );
}
