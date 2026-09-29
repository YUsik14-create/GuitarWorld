import React from 'react';
import { useApp } from '../context/AppContext';
import { soundEngine } from '../utils/audioEngine';
import {
  ArrowLeft,
  Heart,
  SlidersHorizontal,
  Volume2,
  Calendar,
  Globe,
  Weight,
  Layers,
  Sparkles,
  CheckCircle,
  Clock,
  User,
  Check
} from 'lucide-react';

export const GuitarDetailPage: React.FC = () => {
  const {
    selectedGuitarId,
    allGuitars,
    navigateTo,
    isFavorite,
    toggleFavorite,
    isInCompare,
    addToCompare,
    removeFromCompare,
  } = useApp();

  const guitar = allGuitars.find((g) => g.id === selectedGuitarId) || allGuitars[0];

  const handlePlaySound = () => {
    if (guitar.type === 'bass') {
      soundEngine.strumChord([41.2, 55.0, 73.4, 98.0], 60);
    } else {
      soundEngine.strumChord([82.41, 123.47, 164.81, 207.65, 246.94, 329.63], 35);
    }
  };

  const soundAttributes = [
    { label: 'Яркость (Brightness)', val: guitar.soundProfile.brightness, color: 'bg-amber-400' },
    { label: 'Теплота (Warmth)', val: guitar.soundProfile.warmth, color: 'bg-orange-500' },
    { label: 'Агрессия (Aggression)', val: guitar.soundProfile.aggression, color: 'bg-rose-500' },
    { label: 'Читаемость (Clarity)', val: guitar.soundProfile.clarity, color: 'bg-cyan-400' },
    { label: 'Плотность (Density)', val: guitar.soundProfile.density, color: 'bg-purple-500' },
    { label: 'Сустейн (Sustain)', val: guitar.soundProfile.sustain, color: 'bg-emerald-400' },
  ];

  return (
    <div className="py-8 space-y-10">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('guitars')}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад в каталог гитар</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              isInCompare(guitar.id) ? removeFromCompare(guitar.id) : addToCompare(guitar.id)
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isInCompare(guitar.id)
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
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
                <span>Добавить к сравнению</span>
              </>
            )}
          </button>

          <button
            onClick={() => toggleFavorite(guitar.id)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite(guitar.id)
                ? 'bg-rose-500 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
            title="В избранное"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Top Hero Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Large Photo */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            <img
              src={guitar.image}
              alt={guitar.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <button
              onClick={handlePlaySound}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-xl transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Послушать звук гитары</span>
            </button>
          </div>

          {/* Price & Currency Note */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-zinc-200">Ориентировочная розничная цена:</span>
              <span className="text-xl font-bold text-amber-400 font-mono tabular-nums">
                ${guitar.priceEstimateUSD.toLocaleString()} USD
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">{guitar.priceNote}</p>
          </div>
        </div>

        {/* Right: Model Title & Essential Info */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Zero-Pill unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
              <span className="font-bold text-amber-500">{guitar.brand}</span>
              <span aria-hidden="true">·</span>
              <span>Создан в {guitar.yearCreated} г.</span>
              <span aria-hidden="true">·</span>
              <span>{guitar.specs.originCountry}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">Уровень: {guitar.playerLevel}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {guitar.name}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {guitar.description}
          </p>

          {/* Suitable Genres quiet row */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
              Рекомендуемые музыкальные жанры:
            </span>
            <div className="flex flex-wrap gap-2">
              {guitar.suitableGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Pros list */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Главные достоинства модели</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {guitar.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Block: "Как звучит эта гитара?" */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-amber-500" />
            <span>Как звучит эта гитара?</span>
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
            {guitar.soundDescription}
          </p>
        </div>

        {/* Sound Attributes Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {soundAttributes.map((attr) => (
            <div key={attr.label} className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-medium">{attr.label}</span>
                <span className="font-mono text-zinc-400">{attr.val}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${attr.color} transition-all duration-700`}
                  style={{ width: `${attr.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications Table */}
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-bold text-white tracking-tight">
          Полные технические характеристики
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1: Wood & Neck */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3">
              Корпус, гриф и геометрия
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Материал корпуса</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.bodyWood}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Материал грифа</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.neckWood}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Накладка грифа</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.fretboardWood}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Количество ладов</span>
                <span className="font-medium text-zinc-200">{guitar.specs.fretsCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Длина мензуры</span>
                <span className="font-medium text-zinc-200">{guitar.specs.scaleLength}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Ширина верхнего порожка</span>
                <span className="font-medium text-zinc-200">{guitar.specs.nutWidth}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Радиус накладки</span>
                <span className="font-medium text-zinc-200">{guitar.specs.fretboardRadius}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Electronics & Hardware */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3">
              Электроника и фурнитура
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Звукосниматели</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.pickups}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Конфигурация датчиков</span>
                <span className="font-medium text-zinc-200">{guitar.specs.pickupConfig}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Бридж</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.bridge}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Колки</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.tuners}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Регуляторы и распайка</span>
                <span className="font-medium text-zinc-200 text-right">{guitar.specs.controls}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Тип электроники</span>
                <span className="font-medium text-zinc-200">{guitar.specs.electronics}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Масса инструмента</span>
                <span className="font-medium text-zinc-200">~{guitar.specs.weightKg} кг</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History and Famous Artists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>История создания</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {guitar.history}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <User className="w-4 h-4 text-rose-500" />
            <span>Известные музыканты модели</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {guitar.famousArtists.map((artist) => (
              <span
                key={artist}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-medium text-zinc-200 border border-zinc-700/60"
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
