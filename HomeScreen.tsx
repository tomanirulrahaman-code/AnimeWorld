import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryBar } from '../components/CategoryBar';
import { ContinueWatchingSection } from '../components/ContinueWatchingSection';
import { RecentlyAddedSection } from '../components/RecentlyAddedSection';
import { PopularMoviesSection } from '../components/PopularMoviesSection';
import {
  HERO_SLIDES,
  CONTINUE_WATCHING,
  RECENTLY_ADDED,
  POPULAR_MOVIES,
  CATEGORIES,
  Anime
} from '../data/animeData';

interface HomeScreenProps {
  onPlayAnime: (anime: Anime) => void;
  onInfoAnime: (anime: Anime) => void;
  onViewAllSection: (title: string, list: Anime[]) => void;
  onOpenNotifications: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onPlayAnime,
  onInfoAnime,
  onViewAllSection,
  onOpenNotifications
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter lists based on active category selection
  const filterByCat = (list: Anime[]) => {
    if (selectedCategory === "All") return list;
    if (selectedCategory === "Movies") return list.filter((a) => a.isMovie || a.badge.includes("Movie"));
    return list.filter((a) => a.genres?.includes(selectedCategory));
  };

  const filteredContinue = filterByCat(CONTINUE_WATCHING);
  const filteredRecently = filterByCat(RECENTLY_ADDED);
  const filteredMovies = filterByCat(POPULAR_MOVIES);

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-200">
      {/* 1. HEADER */}
      <Header onNotificationClick={onOpenNotifications} />

      {/* 2. HERO BANNER CAROUSEL */}
      <HeroBanner
        slides={HERO_SLIDES}
        onPlay={onPlayAnime}
        onInfo={onInfoAnime}
      />

      {/* 3. CATEGORY BAR */}
      <CategoryBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. CONTINUE WATCHING */}
      {filteredContinue.length > 0 && (
        <ContinueWatchingSection
          items={filteredContinue}
          onPlay={onPlayAnime}
          onViewAll={() => onViewAllSection("Continue Watching", CONTINUE_WATCHING)}
        />
      )}

      {/* 5. RECENTLY ADDED */}
      {filteredRecently.length > 0 && (
        <RecentlyAddedSection
          items={filteredRecently}
          onSelect={onPlayAnime}
          onViewAll={() => onViewAllSection("Recently Added", RECENTLY_ADDED)}
        />
      )}

      {/* 6. POPULAR MOVIES */}
      {filteredMovies.length > 0 && (
        <PopularMoviesSection
          items={filteredMovies}
          onSelect={onPlayAnime}
          onViewAll={() => onViewAllSection("Popular Movies", POPULAR_MOVIES)}
        />
      )}
    </div>
  );
};
