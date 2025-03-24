import { HeadingLarge } from '@/components/common/Typography';
import Box from '@/components/structure/Box';
import { useEffect, useState } from 'react';

interface CopingCardProps {
  text: string;
}

export default function CopingCard({ text }: CopingCardProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (text !== displayText) {
      setIsVisible(false);
      // Wait for fade out, then update text
      const timeout = setTimeout(() => {
        setDisplayText(text);
        setIsVisible(true);
      }, 200); // Match this with CSS transition duration
      return () => clearTimeout(timeout);
    }
  }, [text, displayText]);

  return (
    <Box
      hasLargePadding
      align='center'
      justify='center'
      className='h-[300px]'
      isFullWidth
    >
      <HeadingLarge
        className={`text-center transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {displayText}
      </HeadingLarge>
    </Box>
  );
}
