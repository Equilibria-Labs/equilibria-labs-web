'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { CardCategory } from '@/config/coping-card-data';

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
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex items-center justify-between py-4'>
        <button
          onClick={() => {}}
          className='text-white p-2'
          aria-label='Go back'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>
        <h1 className='text-white text-2xl font-medium'>Coping Cards</h1>
        <button
          onClick={() => {}}
          className='text-white p-2'
          aria-label='Add new card'
        >
          <Plus className='h-6 w-6' />
        </button>
      </div>

      <p className='text-white text-center mb-6'>
        Read through these cards to help you ride out your anxiety
      </p>

      <div className='relative w-full'>
        <button
          onClick={goToPrevCard}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 p-2'
          aria-label='Previous card'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>

        <div className='bg-white rounded-xl p-8 mx-8 min-h-[300px] flex items-center justify-center shadow-lg'>
          <p className='text-gray-700 text-xl text-center font-medium'>
            {category.cards[currentCardIndex].text}
          </p>
        </div>

        <button
          onClick={goToNextCard}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 p-2'
          aria-label='Next card'
        >
          <ChevronRight className='h-6 w-6' />
        </button>
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
    </div>
  );
}
