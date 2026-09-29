import React, { useState } from 'react';
import { BUDGET_SETUPS } from '../data/budgetSetupsData';
import { DollarSign, CheckCircle2, Info, Package, Sparkles } from 'lucide-react';

export const PriceAndBudgetView: React.FC = () => {
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_SETUPS[1]); // Default $500

  const priceTiers = [
    {
      range: 'до $150',
      title: 'Ультрабюджетный сегмент',
      materials: 'Ламинированная липа / тополь, керамические датчики, недорогая штампованная фурнитура.',
      qc: 'Базовый фабричный контроль. Часто требуется визит к мастеру для шлифовки ладов и отстройки.',
      verdict: 'Подходит для проверки интереса, но может вызвать разочарование при плохой заводской отстройке.',
    },
    {
      range: '$150 – $350',
      title: 'Начальный студенческий уровень',
      materials: 'Ольха, нато, клен, более аккуратные лады, потенциометры Alpha, стабильные колки.',
      qc: 'Строгий фабричный контроль (Yamaha, Squier, Cort, Ibanez GIO).',
      verdict: 'Золотая середина для первой покупки. Инструмент сразу готов к обучению.',
    },
    {
      range: '$350 – $800',
      title: 'Оптимальный любительский & рабочий класс',
      materials: 'Отборное дерево, датчики Alnico V, костяные порожки, лады из нержавеющей стали на некоторых моделях.',
      qc: 'Высокое качество сборки (Мексика, Индонезия, Корея).',
      verdict: 'Инструмент, с которым можно не только репетировать, но и выступать в клубах и записываться.',
    },
    {
      range: '$800 – $2000',
      title: 'Профессиональный сценический класс',
      materials: 'Цельный американский махагони, болотный ясень, фирменные датчики Seymour Duncan / Fishman, колки Gotoh / Schaller.',
      qc: 'Строжайший многоступенчатый контроль (США, Япония Fujigen).',
      verdict: 'Безупречный рабочий инструмент музыканта на долгие десятилетия.',
    },
    {
      range: '$2000+',
      title: 'Премиум, Custom Shop & Коллекционные',
      materials: 'Редчайшие фигурные топы 5A, нитролак ручной полировки, ручная намотка звукоснимателей.',
      qc: 'Индивидуальная ручная сборка мастером (Masterbuilt).',
      verdict: 'Произведение искусства и коллекционная инвестиция.',
    },
  ];

  return (
    <div className="py-8 space-y-10">
      {/* Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Сколько стоит гитара и за что мы платим?
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Объективный финансовый анализ: из чего складывается цена инструмента и 4 готовых готовых комплекта под ваш бюджет.
        </p>
      </div>

      {/* Price Tiers Deep Analysis */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white">
          Ценовые категории и реальная разница в материалах
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {priceTiers.map((tier) => (
            <div
              key={tier.range}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {tier.range}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base mt-1">{tier.title}</h4>
                <div className="space-y-2 text-xs text-zinc-300 mt-3">
                  <div>
                    <span className="font-semibold text-zinc-400 block">Материалы и датчики:</span>
                    <p>{tier.materials}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-400 block">Контроль качества:</span>
                    <p>{tier.qc}</p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                <strong className="text-zinc-200">Резюме:</strong> {tier.verdict}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ready-made Starter Rig Bundles */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Package className="w-4 h-4" />
            <span>Готовые сборки под ключ</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-white mt-0.5">
            Собери полный гитарный сетап под бюджет
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Включает всё необходимое для старта: гитара, комбик, провод, медиаторы, ремень и тюнер.
          </p>
        </div>

        {/* Budget Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {BUDGET_SETUPS.map((setup) => (
            <button
              key={setup.id}
              onClick={() => setSelectedBudget(setup)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedBudget.id === setup.id
                  ? 'bg-amber-500 text-zinc-950 shadow-md font-bold'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
              }`}
            >
              Сетап ${setup.budgetUSD}
            </button>
          ))}
        </div>

        {/* Selected Budget Details */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <div>
              <h4 className="font-bold text-lg text-white">{selectedBudget.title}</h4>
              <p className="text-xs text-zinc-400">{selectedBudget.description}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-zinc-400 block">Суммарно:</span>
              <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">
                ${selectedBudget.totalActualUSD}
              </span>
            </div>
          </div>

          {/* Itemized List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedBudget.items.map((item) => (
              <div key={item.name} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-500 uppercase">{item.category}</span>
                  <span className="font-mono text-zinc-300 font-bold">${item.priceUSD}</span>
                </div>
                <h5 className="font-semibold text-white text-sm">{item.name}</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.whyChosen}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-zinc-200">
            <strong>Кому идеально подходит: </strong>
            {selectedBudget.idealFor}
          </div>
        </div>
      </div>
    </div>
  );
};
