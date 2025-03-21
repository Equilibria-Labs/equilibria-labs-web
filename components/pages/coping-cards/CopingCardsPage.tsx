'use client';
import { Metadata } from 'next';
import Box from '@/components/structure/Box';
import CopingCards from '@/components/dialogue/coping-cards/CopingCards';
import CategorySelector from '@/components/dialogue/coping-cards/CategorySelector';
import { useState } from 'react';
import { categories } from '@/config/coping-card-data';
import { CardCategory } from '@/config/coping-card-data';

export const metadata: Metadata = {
  title: 'The Sleep Lab | Equilibria',
  description:
    'Take a sleep test to see how you sleep and get a personalized sleep report',
};

export default function CopingCardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CardCategory>(
    categories[0]
  );
  return (
    <Box shouldRise>
      <main className='flex min-h-screen flex-col items-center bg-[#8a7bff]'>
        <div className='w-full max-w-md flex flex-col items-center px-4 py-6'>
          <CopingCards category={selectedCategory} />
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </main>
    </Box>
  );
}
