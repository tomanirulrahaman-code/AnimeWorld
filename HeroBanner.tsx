import React, { useState, useEffect } from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Anime } from '../data/animeData';

interface HeroBannerProps {
  slides: Anime[];
  onPlay: (anime: Anime) => void;
  onInfo: (anime: Anime) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ slides, onPlay, onInfo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeAnime = slides[currentIndex] || slides[0];

  return (
    <div className="w-full px-4 pt-1 pb-3 flex flex-col items-center select-none">
      {/* Main Banner Card */}
      <div className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden shadow-xl shadow-slate-900/10 border border-gray-200/50 bg-slate-900 group">
        {/* Banner Cover Image */}
        <img
          src={activeAnime.landscapeBanner || activeAnime.poster}
          alt={activeAnime.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Banner Overlay Contents */}
        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10 text-white">
          {/* Top Left Red Category Badge */}
          <div className="flex items-start">
            <span className="bg-[#e50914] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
              {activeAnime.badge || "Anime"}
            </span>
          </div>

          {/* Bottom Title, Meta Info & Action Buttons */}
          <div className="flex flex-col gap-2.5">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] uppercase tracking-tight text-white drop-shadow-md line-clamp-1">
              {activeAnime.title}
            </h1>

            {/* Meta Info Badges */}
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              {/* Rating */}
              <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{activeAnime.rating}</span>
              </div>

              {/* Year */}
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {activeAnime.year}
              </div>

              {/* Language Tag */}
              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                EN+HI
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 pt-1">
              {/* Play Button */}
              <button
                onClick={() => onPlay(activeAnime)}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-900 font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-900 text-slate-900 ml-0.5" />
                <span className="text-sm font-['Outfit'] font-extrabold">Play</span>
              </button>

              {/* Info Button */}
              <button
                onClick={() => onInfo(activeAnime)}
                className="flex-1 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 border border-white/20 transition-transform active:scale-95"
              >
                <Info className="w-4 h-4 text-white" />
                <span className="text-sm font-['Outfit'] font-extrabold">Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Pagination Dots Below Banner */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 ${
              idx === currentIndex
                ? 'w-6 h-1.5 bg-[#e50914] rounded-full'
                : 'w-1.5 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
