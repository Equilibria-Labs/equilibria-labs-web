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
