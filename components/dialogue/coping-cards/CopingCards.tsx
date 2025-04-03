'use client';

import { useState } from 'react';
import type { CardCategory } from '@/config/coping-card-data';
import Column from '@/components/structure/Column';
import CopingCard from './CopingCard';
import { Button } from '@/components/ui/button';
import Row from '@/components/structure/Row';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';

interface CopingCardsProps {
  category: CardCategory;
}

export default function CopingCards({ category }: CopingCardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { setNextTheme } = useAlternativeTheme();

  const goToNextCard = () => {
    setNextTheme();
    setCurrentCardIndex(prev => (prev + 1) % category.cards.length);
  };

  const goToPrevCard = () => {
    setNextTheme();
    setCurrentCardIndex(
      prev => (prev - 1 + category.cards.length) % category.cards.length
    );
  };

  const goToCard = (index: number) => {
    setNextTheme();
    setCurrentCardIndex(index);
  };

  return (
    <Column justifyItems='center'>
      <CopingCard text={category.cards[currentCardIndex].text} />

      <Row align='center' justify='space-between' isFullWidth>
        <Button
          onClick={goToPrevCard}
          aria-label='Previous card'
          iconName='chevronLeft'
          size='iconCircle'
          variant='outline'
        />
        <Row align='center' hasSmallGap>
          {category.cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`w-3 h-3 rounded-full ${index === currentCardIndex ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </Row>
        <Button
          onClick={goToNextCard}
          aria-label='Next card'
          iconName='chevronRight'
          size='iconCircle'
          variant='outline'
        />
      </Row>
    </Column>
  );
}
