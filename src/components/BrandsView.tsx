import React, { useState } from 'react';
import { BRANDS_DATA } from '../data/brandsData';
import { useApp } from '../context/AppContext';
import { Search, Globe, Award, Sparkles, ArrowRight } from 'lucide-react';

export const BrandsView: React.FC = () => {
  const { navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(BRANDS_DATA[0]);

  const filteredBrands = BRANDS_DATA.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.country.toLowerCase().includes(search.toLowerCase()) ||
    b.popularModels.some((m) => m.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-8 space-y-8">
      {/* Title & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Энциклопедия гитарных брендов
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            История создания, флагманские серии, ценовые категории и легендарные артисты.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Искать бренд или серию..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* 2-Column Layout: Brands List & Selected Brand Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Brand Cards Grid */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedBrand.id === brand.id
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                  : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold text-white">{brand.name}</span>
                <span className="text-xs text-zinc-400">{brand.country}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{brand.description}</p>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-2">
                <span>Осн. в {brand.foundedYear} г.</span>
                <span aria-hidden="true">·</span>
                <span>{brand.priceTiers}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Brand Comprehensive Dossier */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>{selectedBrand.country} · Основана в {selectedBrand.foundedYear} году</span>
            </div>
            <h3 className="font-display text-3xl font-extrabold text-white mt-1">
              {selectedBrand.name}
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-1">Ценовой диапазон: {selectedBrand.priceTiers}</p>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {selectedBrand.description}
          </p>

          {/* Philosophy & Legacy */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Философия бренда:
            </span>
            <p className="text-xs text-zinc-200 leading-relaxed">{selectedBrand.philosophy}</p>
          </div>

          {/* Detailed History */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Историческая справка:
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">{selectedBrand.historySummary}</p>
          </div>

          {/* Series & Models */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Популярные серии:
              </span>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                {selectedBrand.famousSeries.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Культовые модели:
              </span>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                {selectedBrand.popularModels.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signature Artists */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Знаменитые гитаристы бренда:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedBrand.signatureArtists.map((artist) => (
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
    </div>
  );
};
