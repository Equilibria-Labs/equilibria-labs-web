'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export type NavItemProps = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function NavItem({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${!isActive ? 'opacity-60' : ''} transition-opacity hover:opacity-100`}
    >
      <div
        className={`py-1 px-3 rounded-lg transition-colors duration-300 ${
          isActive ? 'bg-white/20 dark:bg-white/10' : ''
        }`}
      >
        <Icon className='w-6 h-6' />
      </div>
      <span className='text-sm'>{label}</span>
    </button>
  );
}
