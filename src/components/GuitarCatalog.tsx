import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { GuitarCard } from './GuitarCard';
import { GuitarType } from '../types/guitar';
import { Filter, ArrowUpDown, X, RotateCcw } from 'lucide-react';

export const GuitarCatalog: React.FC = () => {
  const { allGuitars, selectedCategory, setSelectedCategory } = useApp();

  // Multi-criteria filters
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedBridge, setSelectedBridge] = useState<string>('all');
  const [selectedPickups, setSelectedPickups] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  // Sorting
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('popularity');

  // Categories list
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Все гитары' },
    { id: 'electric', label: 'Электрогитары' },
    { id: 'acoustic', label: 'Акустические' },
    { id: 'classical', label: 'Классические' },
    { id: 'bass', label: 'Бас-гитары' },
    { id: '7-string', label: '7-струнные' },
    { id: '8-string', label: '8-струнные' },
    { id: '12-string', label: '12-струнные' },
    { id: 'semi-hollow', label: 'Полуакустические' },
    { id: 'baritone', label: 'Баритон-гитары' },
    { id: 'travel', label: 'Тревел-гитары' },
  ];

  // Extract unique brands from inventory
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(allGuitars.map((g) => g.brand))).sort();
  }, [allGuitars]);

  // Extract unique bridges
  const uniqueBridges = useMemo(() => {
    return Array.from(new Set(allGuitars.map((g) => g.specs.bridge))).sort();
  }, [allGuitars]);

  // Extract unique pickup configs
  const uniquePickups = useMemo(() => {
    return Array.from(new Set(allGuitars.map((g) => g.specs.pickupConfig))).sort();
  }, [allGuitars]);

  // Filtered and sorted list
  const filteredGuitars = useMemo(() => {
    return allGuitars
      .filter((g) => {
        if (selectedCategory !== 'all' && g.type !== selectedCategory) return false;
        if (selectedBrand !== 'all' && g.brand !== selectedBrand) return false;
        if (selectedLevel !== 'all' && g.playerLevel !== selectedLevel) return false;
        if (selectedBridge !== 'all' && g.specs.bridge !== selectedBridge) return false;
        if (selectedPickups !== 'all' && g.specs.pickupConfig !== selectedPickups) return false;
        if (g.priceEstimateUSD > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceEstimateUSD - b.priceEstimateUSD;
        if (sortBy === 'price-desc') return b.priceEstimateUSD - a.priceEstimateUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // Default: popularity
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [allGuitars, selectedCategory, selectedBrand, selectedLevel, selectedBridge, selectedPickups, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedLevel('all');
    setSelectedBridge('all');
    setSelectedPickups('all');
    setMaxPrice(5000);
    setSortBy('popularity');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedLevel !== 'all' ||
    selectedBridge !== 'all' ||
    selectedPickups !== 'all' ||
    maxPrice < 5000;

  return (
    <div className="py-8 space-y-8">
      {/* Catalog Title & Intro */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Каталог гитар
        </h2>
        <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
          Исследуйте легендарные и современные инструменты: от винтажных стратокастеров до современных мультимензурных баритонов.
        </p>
      </div>

      {/* Interactive Category Segmented Bar (BUTTONS/TABS ALLOWED per design skill) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter & Sort Controls Panel */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Фильтры характеристик</span>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сбросить все</span>
              </button>
            )}

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="popularity">По популярности</option>
                <option value="price-asc">Сначала недорогие</option>
                <option value="price-desc">Сначала премиальные</option>
                <option value="rating">По рейтингу экспертов</option>
                <option value="name">По алфавиту (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-zinc-800/60">
          {/* Brand Filter */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Бренд</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Все бренды ({uniqueBrands.length})</option>
              {uniqueBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Уровень игрока</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Любой уровень</option>
              <option value="Новичок">Новичок</option>
              <option value="Любитель">Любитель</option>
              <option value="Продвинутый">Продвинутый</option>
              <option value="Профессионал">Профессионал</option>
            </select>
          </div>

          {/* Bridge Filter */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Тип бриджа</label>
            <select
              value={selectedBridge}
              onChange={(e) => setSelectedBridge(e.target.value)}
              className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Любой бридж</option>
              {uniqueBridges.map((br) => (
                <option key={br} value={br}>
                  {br}
                </option>
              ))}
            </select>
          </div>

          {/* Pickups Config */}
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">Конфигурация датчиков</label>
            <select
              value={selectedPickups}
              onChange={(e) => setSelectedPickups(e.target.value)}
              className="w-full bg-zinc-800/90 border border-zinc-700/80 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Любая (SSS, HH, HSH...)</option>
              {uniquePickups.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Slider */}
        <div className="pt-2 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Максимальная цена:</span>
            <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
              до ${maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={150}
            max={5000}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full sm:w-64 accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Catalog Results Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
          <span>
            Найдено моделей: <strong className="text-zinc-200">{filteredGuitars.length}</strong>
          </span>
          <span className="text-[11px]">Цены указаны в USD как ориентировочные</span>
        </div>

        {filteredGuitars.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <p className="text-zinc-300 font-medium">Нет гитар, соответствующих выбранным критериям</p>
            <p className="text-xs text-zinc-500 mt-1">Попробуйте увеличить максимальную цену или сбросить фильтры.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGuitars.map((guitar) => (
              <GuitarCard key={guitar.id} guitar={guitar} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
