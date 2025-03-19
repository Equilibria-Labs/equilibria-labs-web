'use client';

import { usePathname, useRouter } from 'next/navigation';
import BottomNav from './BottomNav';
import { mainNavConfig } from '@/config/navigation';
import { useSheet } from '@/context/SheetContext';

export default function BottomNavContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const { openSheet } = useSheet();

  const navItems = mainNavConfig.map(item => ({
    icon: item.icon,
    label: item.label,
    isActive:
      item.action.type === 'navigation' && pathname === item.action.path,
    onClick: () => {
      if (item.action.type === 'navigation') {
        router.push(item.action.path);
      } else if (item.action.type === 'sheet') {
        openSheet({
          title: item.action.title,
          content: item.action.content,
        });
      }
    },
  }));

  return <BottomNav items={navItems} />;
}
