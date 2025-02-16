import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ListProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'check' | 'bullet';
};

type ListItemProps = {
  children: React.ReactNode;
  className?: string;
};

export const ListItem = ({ children, className }: ListItemProps) => {
  return <li className={cn('flex items-start', className)}>{children}</li>;
};

export const List = ({ children, className, variant = 'check' }: ListProps) => {
  const items = React.Children.map(children, child => {
    if (React.isValidElement<ListItemProps>(child) && child.type === ListItem) {
      return React.cloneElement(child, {
        className: cn(child.props.className, 'flex items-start'),
        children: (
          <>
            {variant === 'check' ? (
              <Check className='h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
            ) : (
              <span className='h-2 w-2 rounded-full bg-current mr-3 mt-2 flex-shrink-0' />
            )}
            <span>{child.props.children}</span>
          </>
        ),
      });
    }
    return child;
  });

  return <ul className={cn('space-y-2', className)}>{items}</ul>;
};

export default List;
