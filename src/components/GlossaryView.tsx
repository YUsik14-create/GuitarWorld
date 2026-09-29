import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { Search, Tag, BookOpen, Lightbulb, Wrench } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Настройка', 'Конструкция', 'Звукосниматели', 'Электроника', 'Звук и эффекты'];

  const filteredTerms = GLOSSARY_TERMS.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (
      search &&
      !t.term.toLowerCase().includes(search.toLowerCase()) &&
      !t.russianName.toLowerCase().includes(search.toLowerCase()) &&
      !t.definition.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="py-8 space-y-8">
      {/* Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Словарь гитариста
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Интерактивный глоссарий терминов с академическим определением и объяснением «на пальцах».
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Искать термин (Action, Gain, Truss Rod...)..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
            }`}
          >
            {cat === 'all' ? 'Все категории' : cat}
          </button>
        ))}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {term.category}
                </span>
                <span className="text-xs text-zinc-400 font-medium">{term.russianName}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white">
                {term.term}
              </h3>

              {/* Strict Definition */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {term.definition}
              </p>

              {/* Simple Words Callout (Requirement #46) */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Простыми словами:</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {term.simpleExplanation}
                </p>
              </div>
            </div>

            {/* Practical Impact */}
            <div className="pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
              <strong className="text-zinc-200">Как влияет на практику: </strong>
              {term.practicalImpact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
