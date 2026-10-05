import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeAll }) => {
  return (
    <div className="flex items-center justify-between px-4 mb-2.5 mt-4">
      {/* Title with Neon Pink Vertical Bar */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 bg-[#ff0055] rounded-full shadow-[0_0_8px_#ff0055]" />
        <h2 className="text-base font-['Outfit'] font-bold text-white tracking-wide">
          {title}
        </h2>
      </div>

      {/* See All > Action */}
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="flex items-center text-xs font-semibold text-[#ff0055] hover:text-rose-400 active:scale-95 transition-all"
        >
          <span>See All</span>
          <ChevronRight className="w-4 h-4 ml-0.5 text-[#ff0055]" />
        </button>
      )}
    </div>
  );
};
