import React, { useState } from 'react';
import { Clock, User, Award, Music, Sparkles } from 'lucide-react';

export const HistoryTimelineView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'artists'>('timeline');

  const timelineEvents = [
    {
      era: 'XVI–XVIII века',
      title: 'Ранние струнные предки',
      desc: 'Лютни, виуэлы и 4-5-хорные барочные гитары в Испании и Италии. Натяжение жильных струн и деревянные лады, подвязанные вокруг шейки грифа.',
    },
    {
      era: '1850-е годы',
      title: 'Революция Антонио де Торреса',
      desc: 'Испанский лютье Антонио де Торрес разработал пропорции современной классической гитары: увеличил корпус, мензуру до 650 мм и изобрел веерную систему пружин (Fan Bracing).',
    },
    {
      era: '1931 год',
      title: '«Сковородка» Джорджа Бошама (Ro-Pat-In)',
      desc: 'Первая коммерческая электрическая гавайская гитара ("Frying Pan") с подковообразным электромагнитным звукоснимателем. Рождение электрического звука!',
    },
    {
      era: '1950–1954 годы',
      title: 'Золотая эра Лео Фендера и Теда Маккарти',
      desc: 'Появление Fender Broadcaster/Telecaster (1951), Gibson Les Paul (1952) и Fender Stratocaster (1954). Были заложены каноны электрогитары, актуальные до сегодняшнего дня.',
    },
    {
      era: '1957 год',
      title: 'Изобретение хамбакера PAF',
      desc: 'Инженер Gibson Сет Лавер запатентовал звукосниматель Patent Applied For (PAF), устранивший фон 50 Гц и подаривший миру густой бархатный перегруз.',
    },
    {
      era: '1980-е годы',
      title: 'Эра шреда и Floyd Rose',
      desc: 'Появление замкового тремоло Floyd Rose, скоростных тонких грифов Ibanez Wizard и агрессивных суперстратов Jackson/Charvel для стадионного хэви-метала.',
    },
    {
      era: '1990–2000-е годы',
      title: '7-струнные гитары и ню-метал',
      desc: 'Ibanez Universe Стива Вая перешла в руки Korn и Deftones, определив массивный низкочастотный саунд целого поколения альтернативной музыки.',
    },
    {
      era: '2010-е — наши дни',
      title: 'Безголовые (Headless) и мультимензурные гитары',
      desc: 'Бренды Strandberg и Kiesel популяризировали эргономичные безголовые гитары с веерными ладами, активными датчиками Fishman Fluence и цифровыми процессорами (Quad Cortex / Axe-Fx).',
    },
  ];

  const iconicGuitarists = [
    {
      name: 'Джими Хендрикс (Jimi Hendrix)',
      band: 'The Jimi Hendrix Experience',
      mainGuitar: 'Fender Stratocaster (белый, перевернутый под левую руку)',
      pickups: 'Vintage Single Coils с обратным наклоном бриджевого датчика',
      amps: 'Marshall Super Lead 100W Plexi',
      pedals: 'Dallas Arbiter Fuzz Face, Vox Wah-Wah, Roger Mayer Octavia, Uni-Vibe',
      soundSign: 'Пылающий фуззовый фидбек, космические глиссандо рычагом тремоло и виртуозный аккордовый стиль большим пальцем.',
    },
    {
      name: 'Дэвид Гилмор (David Gilmour)',
      band: 'Pink Floyd',
      mainGuitar: 'The Black Strat (Fender Stratocaster 1969 с грифом Charvel)',
      pickups: 'Seymour Duncan SSL-1C (бридж), Fender Custom Shop 69 (нек)',
      amps: 'Hiwatt Custom 100 (DR103), Fender Twin Reverb',
      pedals: 'Electro-Harmonix Big Muff (Ram’s Head), ProCo RAT, Binson Echorec',
      soundSign: 'Певучий бесконечный сустейн, идеальные четверть- и полутоновые бенды и монументальное эхо.',
    },
    {
      name: 'Эдди Ван Хален (Eddie Van Halen)',
      band: 'Van Halen',
      mainGuitar: 'Frankenstrat (самодельный суперстрат с хамбакером Gibson PAF)',
      pickups: 'Наклоненный хамбакер Gibson PAF, залитый парафином',
      amps: 'Marshall 1959 Super Lead на пониженном напряжении Variac ("Brown Sound")',
      pedals: 'MXR Phase 90, MXR Flanger, Echoplex EP-3',
      soundSign: 'Двуручный тэппинг, дайв-бомбы Floyd Rose и теплый, пробивной Brown Sound.',
    },
    {
      name: 'Слэш (Slash)',
      band: 'Guns N Roses / Velvet Revolver',
      mainGuitar: '1959 Les Paul Standard Replica (мастер Kris Derrig)',
      pickups: 'Seymour Duncan Alnico II Pro',
      amps: 'Marshall Silver Jubilee 2555, Marshall JCM800 (Sirius 36)',
      pedals: 'Dunlop Cry Baby Slash Wah, MXR Boost',
      soundSign: 'Густой певучий тон некового датчика Les Paul ("Sweet Child O Mine") и сырой рок-н-ролльный бриджевый драйв.',
    },
    {
      name: 'Тосин Абаси (Tosin Abasi)',
      band: 'Animals as Leaders',
      mainGuitar: 'Abasi Concepts Larada 8 / Ibanez TAM100',
      pickups: 'Fishman Fluence Tosin Abasi Signature',
      amps: 'Fractal Axe-Fx III, Morgan AC20',
      pedals: 'Horizon Devices Precision Drive, Strymon Timeline',
      soundSign: 'Техника слэпа большим пальцем (Thumping), джентовые полиритмические пассажи и сложнейшая современная гармония.',
    },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            История гитары и великие музыканты
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Хронология технологической эволюции инструмента и анализ сетапов музыкантов, изменивших мир.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Хронология эволюции
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'artists'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Легендарные гитаристы и сетапы
          </button>
        </div>
      </div>

      {activeTab === 'timeline' ? (
        /* Timeline View */
        <div className="space-y-6 max-w-4xl">
          <div className="relative border-l border-zinc-800 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {timelineEvents.map((ev, idx) => (
              <div key={ev.title} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-amber-500 group-hover:scale-125 transition-transform" />

                <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                    {ev.era}
                  </span>
                  <h4 className="font-bold text-lg text-white">{ev.title}</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Iconic Artists Showcase */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {iconicGuitarists.map((guitarist) => (
            <div
              key={guitarist.name}
              className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>{guitarist.band}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {guitarist.name}
                </h3>

                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <strong className="text-white block mb-0.5">Основной инструмент:</strong>
                    {guitarist.mainGuitar}
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <strong className="text-white block mb-0.5">Звукосниматели:</strong>
                    {guitarist.pickups}
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <strong className="text-white block mb-0.5">Усилители и педали:</strong>
                    {guitarist.amps} · {guitarist.pedals}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
                <strong className="text-amber-400">Характерный почерк звука: </strong>
                {guitarist.soundSign}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
