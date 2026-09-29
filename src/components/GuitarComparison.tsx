import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SlidersHorizontal, Plus, X, Trash2, ArrowRight } from 'lucide-react';

export const GuitarComparison: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, allGuitars, addToCompare, navigateTo } = useApp();
  const [highlightDiffs, setHighlightDiffs] = useState(true);

  const comparedGuitars = allGuitars.filter((g) => compareList.includes(g.id));

  // Candidate guitars to add (not yet in compare)
  const candidateGuitars = allGuitars.filter((g) => !compareList.includes(g.id));

  const rows = [
    { label: 'Ориентировочная цена', getter: (g: any) => `$${g.priceEstimateUSD.toLocaleString()} USD` },
    { label: 'Бренд', getter: (g: any) => g.brand },
    { label: 'Тип инструмента', getter: (g: any) => g.type },
    { label: 'Материал корпуса', getter: (g: any) => g.specs.bodyWood },
    { label: 'Материал грифа', getter: (g: any) => g.specs.neckWood },
    { label: 'Накладка грифа', getter: (g: any) => g.specs.fretboardWood },
    { label: 'Конфигурация датчиков', getter: (g: any) => g.specs.pickupConfig },
    { label: 'Звукосниматели', getter: (g: any) => g.specs.pickups },
    { label: 'Количество ладов', getter: (g: any) => `${g.specs.fretsCount} лада` },
    { label: 'Длина мензуры', getter: (g: any) => g.specs.scaleLength },
    { label: 'Тип бриджа', getter: (g: any) => g.specs.bridge },
    { label: 'Электроника', getter: (g: any) => g.specs.electronics },
    { label: 'Масса инструмента', getter: (g: any) => `~${g.specs.weightKg} кг` },
    { label: 'Страна производства', getter: (g: any) => g.specs.originCountry },
    { label: 'Уровень игрока', getter: (g: any) => g.playerLevel },
    { label: 'Подходящие жанры', getter: (g: any) => g.suitableGenres.slice(0, 4).join(', ') },
  ];

  const isRowDifferent = (getter: (g: any) => string) => {
    if (comparedGuitars.length < 2) return false;
    const firstVal = getter(comparedGuitars[0]);
    return comparedGuitars.some((g) => getter(g) !== firstVal);
  };

  return (
    <div className="py-8 space-y-8">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Сравнение гитар
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Наглядная сравнительная матрица параметров (от 2 до 4 инструментов).
          </p>
        </div>

        {comparedGuitars.length > 0 && (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightDiffs}
                onChange={(e) => setHighlightDiffs(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>Подсвечивать различия</span>
            </label>
            <button
              onClick={clearCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-rose-400 border border-zinc-800 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Очистить</span>
            </button>
          </div>
        )}
      </div>

      {comparedGuitars.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-semibold text-zinc-200">
            В списке сравнения пока нет гитар
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Перейдите в каталог и нажмите кнопку «Сравнить» на карточках интересующих вас моделей.
          </p>
          <button
            onClick={() => navigateTo('guitars')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
          >
            Перейти в каталог гитар
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Add Model Dropdown if under 4 models */}
          {comparedGuitars.length < 4 && candidateGuitars.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3 text-xs">
              <Plus className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-zinc-300">Добавить еще модель в сравнение ({comparedGuitars.length}/4):</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addToCompare(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Выберите инструмент из каталога...
                </option>
                {candidateGuitars.map((cand) => (
                  <option key={cand.id} value={cand.id}>
                    {cand.name} (${cand.priceEstimateUSD})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Visual Side-by-Side Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/70 shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              {/* Header Row: Photos & Model Names */}
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/90">
                  <th className="p-4 w-48 font-semibold text-zinc-400 uppercase tracking-wider text-[11px] sticky left-0 bg-zinc-900 z-10">
                    Параметр
                  </th>
                  {comparedGuitars.map((g) => (
                    <th key={g.id} className="p-4 min-w-[220px] max-w-[280px] align-top">
                      <div className="space-y-3">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                          <img
                            src={g.image}
                            alt={g.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeFromCompare(g.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-zinc-900/90 hover:bg-rose-500 text-zinc-300 hover:text-white transition-colors"
                            title="Удалить из сравнения"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-amber-500 uppercase">{g.brand}</p>
                          <h4 className="font-bold text-zinc-100 text-sm line-clamp-1">{g.name}</h4>
                          <button
                            onClick={() => navigateTo('guitar-detail', g.id)}
                            className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 mt-1 transition-colors"
                          >
                            <span>Обзор модели</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-zinc-800/80">
                {rows.map((row) => {
                  const hasDiff = highlightDiffs && isRowDifferent(row.getter);
                  return (
                    <tr
                      key={row.label}
                      className={`hover:bg-zinc-900/40 transition-colors ${
                        hasDiff ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <td className="p-3.5 font-medium text-zinc-400 text-xs sticky left-0 bg-zinc-950 z-10 border-r border-zinc-800/60">
                        {row.label}
                      </td>
                      {comparedGuitars.map((g) => (
                        <td
                          key={g.id}
                          className={`p-3.5 text-zinc-200 leading-relaxed ${
                            hasDiff ? 'font-semibold text-amber-200' : ''
                          }`}
                        >
                          {row.getter(g)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
