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
  hasBottomArrow?: boolean;
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
  hasBottomArrow = false,
  hasNoBg = false,
  style = {},
  display = 'flex',
}: BoxProps) {
  const getBgColor = () => {
    if (hasNoBg || !level) return '';

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
      className={`${display} rounded-lg p-4 relative ${
        isFullWidth ? 'w-full' : ''
      } ${getBgColor()} ${className} ${
        hasBottomArrow
          ? 'after:content-[""] after:absolute after:left-1/2 after:-bottom-2 after:w-0 after:h-0 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-foreground/10 dark:after:border-t-background/10'
          : ''
      }`}
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
