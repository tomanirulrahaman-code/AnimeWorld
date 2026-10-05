import React from 'react';

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full px-4 my-2.5">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-150 shrink-0 shadow-sm active:scale-95 ${
                isSelected
                  ? 'bg-[#e50914] text-white shadow-[#e50914]/30'
                  : 'bg-white text-slate-700 border border-gray-200/80 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
