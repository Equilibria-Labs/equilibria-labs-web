'use client';

import { usePathname, useRouter } from 'next/navigation';
import BottomNav from './SheetNav';
import { useSheet } from '@/context/SheetContext';
import { LucideIcon } from 'lucide-react';
import { NavConfigItem } from '@/types/navigation';

interface GridNavContainerProps {
  mainNavConfig: NavConfigItem[];
}

export default function GridNavContainer({
  mainNavConfig,
}: GridNavContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { openSheet } = useSheet();

  const navItems = mainNavConfig.map(item => ({
    icon: item.icon as LucideIcon,
    label: item.label,
    isActive:
      item.action.type === 'navigation' && pathname === item.action.path,
    onClick: () => {
      if (item.action.type === 'navigation') {
        router.push(item.action.path);
      } else if (item.action.type === 'sheet') {
        const Content = item.action.content;
        openSheet({
          title: item.action.title,
          content: <Content />,
        });
      }
    },
  }));

  return <BottomNav items={navItems} />;
}
