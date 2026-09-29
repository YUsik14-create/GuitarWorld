import React from 'react';
import { useApp } from '../context/AppContext';
import { GuitarCard } from './GuitarCard';
import { Heart, SlidersHorizontal, Sliders, Trash2, ArrowRight } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    favorites,
    allGuitars,
    compareList,
    customPedalboard,
    navigateTo,
    toggleFavorite,
    clearCompare,
  } = useApp();

  const favoriteGuitars = allGuitars.filter((g) => favorites.includes(g.id));

  return (
    <div className="py-8 space-y-10 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">
            Локальный профиль музыканта
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Моя коллекция и сохраненный сетап
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Все данные (избранное, сравнения, конфигурация педалборда) надежно сохраняются в вашем браузере (LocalStorage).
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-300 shrink-0">
          <div className="text-center p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <span className="text-amber-400 font-bold text-lg block">{favorites.length}</span>
            <span className="text-[10px] text-zinc-500 uppercase">В избранном</span>
          </div>
          <div className="text-center p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <span className="text-amber-400 font-bold text-lg block">{compareList.length}</span>
            <span className="text-[10px] text-zinc-500 uppercase">В сравнении</span>
          </div>
          <div className="text-center p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
            <span className="text-amber-400 font-bold text-lg block">{customPedalboard.length}</span>
            <span className="text-[10px] text-zinc-500 uppercase">Педалей</span>
          </div>
        </div>
      </div>

      {/* Favorite Guitars Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <span>Избранные гитары ({favoriteGuitars.length})</span>
          </h3>
          {favoriteGuitars.length > 0 && (
            <button
              onClick={() => navigateTo('guitars')}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>В каталог</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {favoriteGuitars.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <p className="text-xs sm:text-sm text-zinc-400">В избранном пока нет инструментов.</p>
            <button
              onClick={() => navigateTo('guitars')}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
            >
              Выбрать в каталоге
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteGuitars.map((g) => (
              <GuitarCard key={g.id} guitar={g} />
            ))}
          </div>
        )}
      </div>

      {/* Custom Pedalboard Summary */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            <span>Мой сохраненный педалборд ({customPedalboard.length} эффектов)</span>
          </h3>
          <button
            onClick={() => navigateTo('effects')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
          >
            Открыть конструктор
          </button>
        </div>

        <p className="text-xs text-zinc-400">
          Собранная вами цепочка эффектов со всеми положениями регуляторов и состоянием байпаса.
        </p>
      </div>
    </div>
  );
};
