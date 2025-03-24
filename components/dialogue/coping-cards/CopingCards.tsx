'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CardCategory } from '@/config/coping-card-data';
import Column from '@/components/structure/Column';
import CopingCard from './CopingCard';
import { Button } from '@/components/ui/button';

interface CopingCardsProps {
  category: CardCategory;
}

export default function CopingCards({ category }: CopingCardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const goToNextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % category.cards.length);
  };

  const goToPrevCard = () => {
    setCurrentCardIndex(
      prev => (prev - 1 + category.cards.length) % category.cards.length
    );
  };

  return (
    <Column hasSmallGap>
      <div className='relative w-full'>
        <Button
          onClick={goToPrevCard}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 p-2'
          aria-label='Previous card'
          iconName='chevronLeft'
          size='iconCircle'
          variant='outline'
        />

        <CopingCard text={category.cards[currentCardIndex].text} />

        <Button
          onClick={goToNextCard}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 p-2'
          aria-label='Next card'
          iconName='chevronRight'
          size='iconCircle'
          variant='outline'
        />
      </div>

      <div className='flex space-x-2 mt-4'>
        {category.cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCardIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentCardIndex ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </Column>
  );
}
