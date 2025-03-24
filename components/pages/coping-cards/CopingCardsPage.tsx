'use client';
import { Metadata } from 'next';
import Box from '@/components/structure/Box';
import CopingCards from '@/components/dialogue/coping-cards/CopingCards';
import CategorySelector from '@/components/dialogue/coping-cards/CategorySelector';
import { useState } from 'react';
import { categories } from '@/config/coping-card-data';
import { CardCategory } from '@/config/coping-card-data';
import ContentPageHeader from '@/components/structure/ContentPageHeader';

export const metadata: Metadata = {
  title: 'Coping Cards | Equilibria Labs',
  description:
    'A collection of coping cards to help you through difficult times',
};

export default function CopingCardsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CardCategory>(
    categories[0]
  );
  return (
    <>
      <ContentPageHeader
        isBackButtonHome={false}
        title='Coping Cards'
        newItemHandler={() => {}}
      />
      <CopingCards category={selectedCategory} />
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </>
  );
}
