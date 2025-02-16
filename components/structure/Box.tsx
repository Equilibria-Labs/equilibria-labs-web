import React from 'react';
import Column from '@/components/structure/Column';
interface BoxProps {
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end';
  level?: '1' | '2' | '3';
  isInverted?: boolean;
  hasNoBg?: boolean;
  style?: React.CSSProperties;
  display?: 'flex' | 'grid' | 'block' | 'inline-block';
}

export default function Box({
  children,
  className = '',
  isFullWidth = false,
  justify = 'flex-start',
  align = 'flex-start',
  level = '1',
  isInverted = false,
  hasNoBg = false,
  style = {},
  display = 'flex',
}: BoxProps) {
  const getBgColor = () => {
    if (hasNoBg) return '';

    let opacity: string;
    switch (level) {
      case '1':
        opacity = '10';
        break;
      case '2':
        opacity = '20';
        break;
      case '3':
        opacity = '30';
        break;
      default:
        opacity = '10';
    }

    return isInverted ? `bg-background/${opacity}` : `bg-foreground/${opacity}`;
  };

  return (
    <div
      data-component='Box'
      className={`${display} rounded-lg p-4 relative ${
        isFullWidth ? 'w-full' : ''
      } ${getBgColor()} ${className}`}
      style={{
        justifyContent: justify,
        alignItems: align,
        ...style,
      }}
    >
      <Column>{children}</Column>
    </div>
  );
}
