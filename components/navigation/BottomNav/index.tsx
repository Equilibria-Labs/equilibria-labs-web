'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import BottomNav from './BottomNav';
import { useSheet } from '@/context/SheetContext';
import { LucideIcon } from 'lucide-react';
import { mainNavConfig } from '@/config/navigation';
import { sheets } from '@/config/sheets';

function BottomNavContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openSheet, isSheetOpen } = useSheet();

  useEffect(() => {
    const sheetId = searchParams.get('sheet');
    if (sheetId && !isSheetOpen && sheets[sheetId]) {
      const sheet = sheets[sheetId];
      const Content = sheet.content;
      openSheet({
        title: sheet.title,
        content: <Content />,
      });
      // Remove the parameter once we've handled it
      const params = new URLSearchParams(searchParams);
      params.delete('sheet');
      router.replace(
        `${pathname}${params.toString() ? `?${params.toString()}` : ''}`
      );
    }
  }, [searchParams, openSheet, isSheetOpen, pathname, router]);

  const navItems = mainNavConfig.map(item => ({
    icon: item.icon as LucideIcon,
    label: item.label,
    isActive:
      item.action.type === 'navigation' && pathname === item.action.path,
    onClick: () => {
      if (item.action.type === 'navigation') {
        router.push(item.action.path);
      } else if (item.action.type === 'sheet') {
        const sheet = sheets[item.action.sheetId];
        const Content = sheet.content;
        openSheet({
          title: sheet.title,
          content: <Content />,
        });
      }
    },
  }));

  return <BottomNav items={navItems} />;
}

export default function BottomNavContainer() {
  return (
    <Suspense fallback={<BottomNav items={[]} />}>
      <BottomNavContent />
    </Suspense>
  );
}
