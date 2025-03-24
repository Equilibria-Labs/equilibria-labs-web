import React from 'react';

interface RowProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
  hasSmallGap?: boolean;
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
  hasSmallGap = false,
  isFullWidth = false,
  justify = 'flex-start',
  align = 'flex-start',
  gridTemplateColumns = '',
  gapInPercent,
}: RowProps) {
  const gapClass = hasNoGap ? '' : hasSmallGap ? 'gap-2' : 'gap-4';
  const widthClass = isFullWidth ? 'w-full' : 'max-w-5xl';

  return (
    <div
      className={['grid grid-flow-col', gapClass, widthClass, className]
        .filter(Boolean)
        .join(' ')}
      style={{
        justifyContent: justify,
        alignItems: align,
        gridTemplateColumns,
        gap: gapInPercent ? `${gapInPercent}%` : undefined,
      }}
    >
      {children}
    </div>
  );
}
