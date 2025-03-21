'use client';

import type { CardCategory } from '@/config/coping-card-data';

interface CategorySelectorProps {
  categories: CardCategory[];
  selectedCategory: CardCategory;
  onSelectCategory: (category: CardCategory) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <div className='w-full mt-8 space-y-4'>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category)}
          className='w-full flex items-center gap-4 py-3 px-4 rounded-full'
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedCategory.id === category.id
                ? 'bg-[#8a7bff]'
                : 'bg-gray-200'
            }`}
          >
            {selectedCategory.id === category.id && (
              <div className='w-3 h-3 bg-white rounded-full' />
            )}
          </div>
          <span className='text-lg font-medium text-gray-700'>
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
