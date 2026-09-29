import React, { useState } from 'react';
import { GENRES_DATA } from '../data/genresData';
import { Music, Radio, Sliders, Zap, Sparkles } from 'lucide-react';

export const GenresView: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState(GENRES_DATA[0]);

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Какая гитара нужна под разные жанры музыки?
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Полная карта оборудования: типы гитар, датчики, усилители, педали и рецепты фирменного звука для каждого стиля.
        </p>
      </div>

      {/* Genre Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRES_DATA.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedGenre.id === genre.id
                ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Selected Genre Detail Hub */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
            Руководство по звуку
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {selectedGenre.name}
          </h3>
          <p className="text-sm text-zinc-300 mt-2 max-w-3xl leading-relaxed">
            {selectedGenre.description}
          </p>
        </div>

        {/* Tone Recipe Hero Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Рецепт звука (Tone Recipe):
          </span>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
            {selectedGenre.toneRecipe}
          </p>
        </div>

        {/* Gear Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Подходящие гитары:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedGenre.recommendedGuitarTypes.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-zinc-800 text-xs text-zinc-200">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">Струны: {selectedGenre.stringsCount}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Звукосниматели и строи:
            </span>
            <p className="text-xs text-zinc-200 font-medium">{selectedGenre.pickups}</p>
            <div className="pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">Типичные строи: </span>
              {selectedGenre.tunings.join(', ')}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Усилитель и эффекты:
            </span>
            <p className="text-xs text-zinc-200 font-medium">{selectedGenre.ampStyle}</p>
            <div className="pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">Педали: </span>
              {selectedGenre.effects.join(', ')}
            </div>
          </div>
        </div>

        {/* Famous Artists of this genre */}
        <div className="space-y-2 pt-2 border-t border-zinc-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Культовые гитаристы жанра:
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedGenre.famousArtists.map((artist) => (
              <span
                key={artist}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700/60 text-xs font-medium text-zinc-200"
              >
                {artist}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
