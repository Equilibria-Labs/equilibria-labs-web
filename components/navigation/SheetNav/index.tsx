'use client';

import { useRouter } from 'next/navigation';
import { useSheet } from '@/context/SheetContext';
import { LucideIcon } from 'lucide-react';
import { NavConfigItem } from '@/types/navigation';
import SheetNav from './SheetNav';

interface SheetNavContainerProps {
  config: NavConfigItem[];
}

export default function SheetNavContainer({ config }: SheetNavContainerProps) {
  const router = useRouter();
  const { closeSheet } = useSheet();

  const navItems = config.map(item => ({
    icon: item.icon as LucideIcon,
    label: item.label,
    onClick: () => {
      console.log('click');
      if (item.action.type === 'navigation') {
        router.push(item.action.path);
      }
      closeSheet();
    },
  }));

  return <SheetNav items={navItems} />;
}
