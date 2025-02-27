import { ReactNode } from 'react';

export const parseBoldText = (text: string): (ReactNode | string)[] | null => {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={index} className='font-bold'>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

export const parseItalicText = (
  text: string
): (ReactNode | string)[] | null => {
  if (!text) return null;
  const parts = text.split(/(_[^_]+_)/g);
  return parts.map((part, index) => {
    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <span key={index} className='italic'>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};
