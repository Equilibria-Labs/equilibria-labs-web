import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  X,
  Check,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-button leading-button font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-bold font-button',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-full px-8',
        icon: 'h-10 w-10 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconName?:
    | 'chevronRight'
    | 'chevronLeft'
    | 'chevronUp'
    | 'chevronDown'
    | 'plus'
    | 'minus'
    | 'x'
    | 'check';
  iconClassName?: string;
  isIconFirst?: boolean;
}

const iconMap: Record<NonNullable<ButtonProps['iconName']>, LucideIcon> = {
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  plus: Plus,
  minus: Minus,
  x: X,
  check: Check,
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconName,
      iconClassName,
      isIconFirst = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const Icon = iconName ? iconMap[iconName] : null;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isIconFirst && Icon && (
          <Icon className={cn('h-4 w-4', iconClassName)} />
        )}
        {children && Icon && (
          <span className={cn(isIconFirst ? 'ml-2' : 'mr-2')}>{children}</span>
        )}
        {!Icon && children}
        {!isIconFirst && Icon && (
          <Icon className={cn('h-4 w-4', iconClassName)} />
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
