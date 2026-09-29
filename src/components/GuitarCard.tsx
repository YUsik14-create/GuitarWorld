import React from 'react';
import { Guitar } from '../types/guitar';
import { useApp } from '../context/AppContext';
import { soundEngine } from '../utils/audioEngine';
import { Heart, SlidersHorizontal, Volume2, ArrowUpRight, Check } from 'lucide-react';

interface GuitarCardProps {
  guitar: Guitar;
}

export const GuitarCard: React.FC<GuitarCardProps> = ({ guitar }) => {
  const { navigateTo, isFavorite, toggleFavorite, isInCompare, addToCompare, removeFromCompare } = useApp();

  const handlePlaySample = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate typical chords for this guitar style
    if (guitar.type === 'bass') {
      soundEngine.strumChord([41.2, 55.0, 73.4, 98.0], 50);
    } else if (guitar.suitableGenres.includes('Heavy Metal') || guitar.type === '7-string' || guitar.type === '8-string') {
      soundEngine.strumChord([73.4, 110.0, 146.8], 30);
    } else {
      // E Major / C Major rich chord
      soundEngine.strumChord([82.41, 123.47, 164.81, 207.65, 246.94, 329.63], 40);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare(guitar.id)) {
      removeFromCompare(guitar.id);
    } else {
      addToCompare(guitar.id);
    }
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(guitar.id);
  };

  return (
    <div
      onClick={() => navigateTo('guitar-detail', guitar.id)}
      className="group relative bg-zinc-900/90 dark:bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual media container with zero broken image fallback */}
      <div className="relative aspect-[4/3] w-full bg-zinc-950 overflow-hidden">
        <img
          src={guitar.image}
          alt={guitar.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // styled CSS fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

        {/* Quick action buttons floating on photo */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handlePlaySample}
            title="Прослушать образец звука"
            className="p-2 rounded-full bg-zinc-900/80 hover:bg-amber-500 text-zinc-300 hover:text-zinc-950 backdrop-blur-md transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleFavClick}
            title={isFavorite(guitar.id) ? 'Удалить из избранного' : 'В избранное'}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorite(guitar.id)
                ? 'bg-rose-500 text-white'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Unboxed category metadata (Zero-Pill discipline) */}
        <div className="absolute bottom-3 left-3 z-10 text-xs text-zinc-400 flex items-center gap-2">
          <span className="font-semibold text-zinc-200">{guitar.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{guitar.specs.originCountry}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {guitar.name}
          </h3>

          {/* Quick specs unboxed row */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-zinc-400 mt-2">
            <span>{guitar.specs.pickupConfig}</span>
            <span aria-hidden="true">·</span>
            <span>{guitar.specs.scaleLength}</span>
            <span aria-hidden="true">·</span>
            <span>{guitar.specs.bridge}</span>
          </div>

          {/* Suitable Genres quiet list */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs text-zinc-400 mt-3">
            <span className="text-zinc-400 font-medium">Жанры:</span>
            {guitar.suitableGenres.slice(0, 3).map((genre, idx) => (
              <span key={genre}>
                {genre}
                {idx < 2 && idx < guitar.suitableGenres.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Price and actions bar */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-zinc-400">от</span>
              <span className="text-lg font-bold text-zinc-100 tabular-nums font-mono">
                ${guitar.priceEstimateUSD.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">ориентир. цена</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCompareClick}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isInCompare(guitar.id)
                  ? 'bg-amber-500 text-zinc-950 font-semibold'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              {isInCompare(guitar.id) ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>В сравнении</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Сравнить</span>
                </>
              )}
            </button>

            <button
              onClick={() => navigateTo('guitar-detail', guitar.id)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 group-hover:text-white transition-colors"
              title="Открыть подробную страницу"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
