'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
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
  isSheetOpen: boolean;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export function SheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<SheetContent | null>(null);

  const closeSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openSheet = useCallback((content: SheetContent) => {
    setSheetContent(content);
    setIsOpen(true);
  }, []);

  // Handle content cleanup after sheet is closed
  useEffect(() => {
    if (!isOpen && sheetContent) {
      const timeout = setTimeout(() => {
        setSheetContent(null);
      }, 300); // Match your animation duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <SheetContext.Provider
      value={{ openSheet, closeSheet, isSheetOpen: isOpen }}
    >
      {children}
      {sheetContent && (
        <BottomSheet
          isOpen={isOpen}
          onCloseAction={closeSheet}
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
