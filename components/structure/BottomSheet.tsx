'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface BottomSheetProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  height?: string; // can be vh, px, or auto
}

export default function BottomSheet({
  isOpen,
  onCloseAction,
  title,
  description,
  children,
  className = '',
  height = 'auto',
}: BottomSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onCloseAction}>
      <SheetContent
        side='bottom'
        className={`h-[${height}] overflow-y-auto rounded-t-[10px] mx-auto max-w-maxWidth ${className}`}
      >
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </Sheet>
  );
}
