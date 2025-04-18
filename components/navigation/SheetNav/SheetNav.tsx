import React, { useState } from 'react';
import NavItem from '@/components/navigation/NavItem';
import { NavItemProps } from '@/components/navigation/NavItem/NavItem';

interface BottomNavProps {
  items: NavItemProps[];
  initialActiveLabel?: string;
}

export default function BottomNav({
  items,
  initialActiveLabel,
}: BottomNavProps) {
  const [activeLabel, setActiveLabel] = useState(initialActiveLabel);

  return (
    <nav data-component='SheetNav' className='bg-background text-foreground'>
      <div className='flex justify-around items-center p-4  max-w-maxWidth mx-auto'>
        {items.map(item => (
          <NavItem
            data-component='BottomNavItem'
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeLabel === item.label}
            onClick={() => {
              setActiveLabel(item.label);
              item.onClick?.();
            }}
          />
        ))}
      </div>
    </nav>
  );
}
