'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import BottomSheet from '@/components/structure/BottomSheet';

type SheetContent = {
  title?: string;
  description?: string;
  content: ReactNode;
  className?: string;
};

interface SheetContextType {
  openSheet: (content: SheetContent) => void;
  closeSheet: () => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export function SheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<SheetContent | null>(null);

  const openSheet = (content: SheetContent) => {
    setSheetContent(content);
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}
      {sheetContent && (
        <BottomSheet
          isOpen={isOpen}
          onClose={closeSheet}
          title={sheetContent.title}
          description={sheetContent.description}
          className={sheetContent.className}
        >
          {sheetContent.content}
        </BottomSheet>
      )}
    </SheetContext.Provider>
  );
}

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (context === undefined) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
};
