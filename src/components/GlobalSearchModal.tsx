import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { BRANDS_DATA } from '../data/brandsData';
import { EFFECTS_DATA } from '../data/effectsData';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { GENRES_DATA } from '../data/genresData';
import { ARTICLES_DATA } from '../data/guidesData';
import { Search, X, Guitar as GuitarIcon, Disc, Tag, BookOpen, Sliders, ArrowRight } from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  category: 'Гитара' | 'Бренд' | 'Эффект' | 'Термин' | 'Жанр' | 'Статья';
  subtitle: string;
  targetPage: any;
  targetId?: string;
}

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, allGuitars, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const items: SearchResultItem[] = [];

    // Search Guitars
    allGuitars.forEach((g) => {
      if (
        g.name.toLowerCase().includes(trimmed) ||
        g.brand.toLowerCase().includes(trimmed) ||
        g.specs.pickups.toLowerCase().includes(trimmed) ||
        g.suitableGenres.some((genre) => genre.toLowerCase().includes(trimmed))
      ) {
        items.push({
          id: `guitar-${g.id}`,
          title: g.name,
          category: 'Гитара',
          subtitle: `${g.brand} · ${g.specs.pickupConfig} · ~$${g.priceEstimateUSD}`,
          targetPage: 'guitar-detail',
          targetId: g.id,
        });
      }
    });

    // Search Brands
    BRANDS_DATA.forEach((b) => {
      if (
        b.name.toLowerCase().includes(trimmed) ||
        b.country.toLowerCase().includes(trimmed) ||
        b.popularModels.some((m) => m.toLowerCase().includes(trimmed))
      ) {
        items.push({
          id: `brand-${b.id}`,
          title: b.name,
          category: 'Бренд',
          subtitle: `${b.country} · Осн. в ${b.foundedYear}`,
          targetPage: 'brands',
        });
      }
    });

    // Search Effects
    EFFECTS_DATA.forEach((e) => {
      if (
        e.name.toLowerCase().includes(trimmed) ||
        e.category.toLowerCase().includes(trimmed) ||
        e.description.toLowerCase().includes(trimmed)
      ) {
        items.push({
          id: `effect-${e.id}`,
          title: e.name,
          category: 'Эффект',
          subtitle: `${e.category} · ${e.description.slice(0, 50)}...`,
          targetPage: 'effects',
        });
      }
    });

    // Search Glossary
    GLOSSARY_TERMS.forEach((t) => {
      if (
        t.term.toLowerCase().includes(trimmed) ||
        t.russianName.toLowerCase().includes(trimmed) ||
        t.definition.toLowerCase().includes(trimmed)
      ) {
        items.push({
          id: `term-${t.id}`,
          title: `${t.term} (${t.russianName})`,
          category: 'Термин',
          subtitle: t.simpleExplanation.slice(0, 60) + '...',
          targetPage: 'glossary',
        });
      }
    });

    // Search Genres
    GENRES_DATA.forEach((gn) => {
      if (
        gn.name.toLowerCase().includes(trimmed) ||
        gn.famousArtists.some((a) => a.toLowerCase().includes(trimmed))
      ) {
        items.push({
          id: `genre-${gn.id}`,
          title: gn.name,
          category: 'Жанр',
          subtitle: `Артисты: ${gn.famousArtists.slice(0, 3).join(', ')}`,
          targetPage: 'genres',
        });
      }
    });

    // Search Articles
    ARTICLES_DATA.forEach((art) => {
      if (
        art.title.toLowerCase().includes(trimmed) ||
        art.tags.some((tag) => tag.toLowerCase().includes(trimmed)) ||
        art.excerpt.toLowerCase().includes(trimmed)
      ) {
        items.push({
          id: `article-${art.id}`,
          title: art.title,
          category: 'Статья',
          subtitle: `${art.category} · ${art.readTimeMin} мин чтения`,
          targetPage: 'guides',
        });
      }
    });

    setResults(items.slice(0, 15));
  }, [query, allGuitars]);

  if (!isSearchOpen) return null;

  const handleSelect = (item: SearchResultItem) => {
    setIsSearchOpen(false);
    navigateTo(item.targetPage, item.targetId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Гитара':
        return <GuitarIcon className="w-4 h-4 text-amber-400" />;
      case 'Бренд':
        return <Disc className="w-4 h-4 text-cyan-400" />;
      case 'Эффект':
        return <Sliders className="w-4 h-4 text-rose-400" />;
      case 'Термин':
        return <Tag className="w-4 h-4 text-emerald-400" />;
      case 'Жанр':
        return <Disc className="w-4 h-4 text-purple-400" />;
      case 'Статья':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      default:
        return <Search className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Искать гитары, бренды, эффекты, термины, статьи (например: Stratocaster, Fender, Humbucker)..."
            className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-zinc-500 text-sm">
              <p className="font-medium text-zinc-400 mb-1">Глобальный поиск GuitarWorld</p>
              <p className="text-xs">
                Введите название модели (напр. Les Paul), бренд (Fender), деталь (Floyd Rose) или термин (Интонация)
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Stratocaster', 'Fender', 'Humbucker', 'Floyd Rose', 'Blues', 'Gibson'].map((suggest) => (
                  <button
                    key={suggest}
                    onClick={() => setQuery(suggest)}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              Ничего не найдено по запросу «{query}». Попробуйте изменить формулировку.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/70 transition-colors text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-zinc-800/80 group-hover:bg-zinc-700/80 transition-colors shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-100 truncate group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider shrink-0">
                        · {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
