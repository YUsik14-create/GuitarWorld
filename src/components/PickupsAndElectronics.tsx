import React, { useState } from 'react';
import { soundEngine } from '../utils/audioEngine';
import { Zap, Volume2, Sliders, CheckCircle2, Shield, Info, ArrowRight } from 'lucide-react';

export const PickupsAndElectronics: React.FC = () => {
  const [activePickupTab, setActivePickupTab] = useState<'comparison' | 'configs' | 'wiring'>('comparison');
  const [selectedPickupType, setSelectedPickupType] = useState<'single' | 'humbucker' | 'p90' | 'active'>('single');

  // Test sound with synthesized brightness matching pickup type
  const handlePlayPickupSound = (type: string) => {
    switch (type) {
      case 'single':
        soundEngine.pluckString(246.94, 2.5, 0.95); // Very bright, punchy
        break;
      case 'humbucker':
        soundEngine.pluckString(246.94, 3.2, 0.55); // Warm, long sustain, rounded
        break;
      case 'p90':
        soundEngine.pluckString(246.94, 2.8, 0.75); // Gritty, raw, mid-focused
        break;
      case 'active':
        soundEngine.pluckString(246.94, 3.0, 0.85); // High output, compressed, dead silent
        break;
      default:
        soundEngine.pluckString(246.94, 2.5, 0.7);
    }
  };

  const configs = [
    {
      code: 'SSS',
      name: '3x Single Coils (Fender Stratocaster)',
      desc: 'Классика чистого звука, фанка и блюза. 5 положений переключателя: от теплого бархатного нека до легендарных "квакающих" промежуточных позиций 2 и 4.',
      pros: 'Искрящиеся верха, максимальная динамика, прозрачность в аккордах.',
      cons: 'Фонят на высоком гейне, бридж может звучать излишне резко без ручки тона.',
      genres: ['Blues', 'Funk', 'Country', 'Pop Rock', 'Indie'],
    },
    {
      code: 'HSS',
      name: 'Humbucker + 2 Single Coils ("Fat Strat")',
      desc: 'Самая универсальная конфигурация для сессионного и концертного музыканта. Хамбакер в бридже дает плотные рок-риффы, а два сингла сохраняют фирменное стратовское стекло.',
      pros: 'Закрывает 95% всех музыкальных задач одной гитарой.',
      cons: 'Небольшой перепад по громкости при переключении с хамбакера на синглы.',
      genres: ['Rock', 'Pop', 'Alternative', 'Fusion', 'Cover Bands'],
    },
    {
      code: 'HH',
      name: 'Dual Humbuckers (Gibson Les Paul / SG / PRS)',
      desc: 'Стандарт хард-рока, хэви-метала и классического рока. Полное отсутствие фона 50 Гц, колоссальный сустейн и сочные средние частоты.',
      pros: 'Бесшумность, жирный насыщенный перегруз, певучие соло.',
      cons: 'Менее звонкий чистый звук по сравнению с чистыми синглами (если нет отсечки Coil-Split).',
      genres: ['Hard Rock', 'Heavy Metal', 'Jazz', 'Stoner', 'Punk'],
    },
    {
      code: 'HSH',
      name: 'Humbucker + Single + Humbucker (Ibanez RG)',
      desc: 'Шред-стандарт 80-90-х. Два мощных хамбакера для скоростных соло и ритма, плюс средний сингл для прозрачных акустических партий.',
      pros: 'Огромная звуковая палитра с автоматическими сплитами на 2 и 4 позициях.',
      cons: 'Средний сингл иногда мешает медиатору при агрессивном переменном штрихе.',
      genres: ['Progressive Metal', 'Neoclassical', 'Hard Rock', 'Fusion'],
    },
    {
      code: 'P-90 / Soapbar',
      name: 'Dual P-90 (Gibson Les Paul Special / Junior)',
      desc: 'Особый винтажный шарм. Звучит жирнее обычного сингла, но намного острее и кусачее хамбакера. Любимый выбор панк- и гараж-рокеров.',
      pros: 'Неповторимый хриплый «сырой» рык на кранче.',
      cons: 'Фонят так же, как обычные синглы.',
      genres: ['Punk', 'Garage Rock', 'Classic Blues', 'Indie'],
    },
  ];

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Звукосниматели и гитарная электроника
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Сравнение типов звукоснимателей, конфигурации катушек (SSS, HSS, HH), потенциометры, конденсаторы и правильная экранировка.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        <button
          onClick={() => setActivePickupTab('comparison')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activePickupTab === 'comparison'
              ? 'bg-amber-500 text-zinc-950 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          Типы звукоснимателей
        </button>
        <button
          onClick={() => setActivePickupTab('configs')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activePickupTab === 'configs'
              ? 'bg-amber-500 text-zinc-950 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          Конфигурации (SSS, HSS, HH...)
        </button>
        <button
          onClick={() => setActivePickupTab('wiring')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activePickupTab === 'wiring'
              ? 'bg-amber-500 text-zinc-950 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          Схемотехника, потенциометры и экран
        </button>
      </div>

      {activePickupTab === 'comparison' && (
        <div className="space-y-6">
          {/* Pickup Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'single', label: 'Single Coil (Сингл)', hint: 'Яркий, звонкий, прозрачный' },
              { id: 'humbucker', label: 'Humbucker (Хамбакер)', hint: 'Плотный, бесшумный, мощный' },
              { id: 'p90', label: 'P-90 (Soapbar)', hint: 'Сырой, кусачий, хриплый' },
              { id: 'active', label: 'Активные (EMG / Fishman)', hint: 'Стерильные, мощные, с питанием 9V' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPickupType(p.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPickupType === p.id
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <span className="font-bold text-sm block">{p.label}</span>
                <span className="text-xs text-zinc-400 mt-1 block">{p.hint}</span>
              </button>
            ))}
          </div>

          {/* Deep comparison card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Подробный разбор
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                  {selectedPickupType === 'single' && 'Single Coil (Однокатушечный звукосниматель)'}
                  {selectedPickupType === 'humbucker' && 'Humbucker (Двухкатушечный звукосниматель)'}
                  {selectedPickupType === 'p90' && 'P-90 (Ширококатушечный сингл)'}
                  {selectedPickupType === 'active' && 'Активные датчики (EMG, Fishman Fluence)'}
                </h3>
              </div>

              <button
                onClick={() => handlePlayPickupSound(selectedPickupType)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Послушать тембр датчика</span>
              </button>
            </div>

            {/* Comparison Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase">Конструкция:</span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {selectedPickupType === 'single' && 'Одна катушка, 6 магнитных цилиндрических сердечников Alnico (или стальные сердечники с керамическим магнитом снизу).'}
                  {selectedPickupType === 'humbucker' && 'Две катушки с противоположной намоткой и полярностью магнитов (RWRP), соединенные последовательно.'}
                  {selectedPickupType === 'p90' && 'Одна широкая плоская бобина с винтовыми сердечниками и двумя пластинчатыми магнитами Alnico по бокам.'}
                  {selectedPickupType === 'active' && 'Слабомощные катушки с меньшим количеством витков + встроенный малошумящий предусилитель на батарейке 9V.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase">Характер звучания:</span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {selectedPickupType === 'single' && 'Максимум искрящихся верхних частот ("стекло"), резкая артикулированная атака, естественная динамика.'}
                  {selectedPickupType === 'humbucker' && 'Жирный, плотный, компрессированный тембр с мощным сустейном и богатыми средними частотами.'}
                  {selectedPickupType === 'p90' && 'Хриплый, острый, гармонически насыщенный кранч с плотной серединой.'}
                  {selectedPickupType === 'active' && 'Хирургически четкий, плотный, компрессированный звук без потери верхов даже на длинных кабелях.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase">Отношение к шуму:</span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {selectedPickupType === 'single' && 'Ловит электромагнитный фон 50/60 Гц. Требует качественной экранировки полостей гитары.'}
                  {selectedPickupType === 'humbucker' && 'Полное подавление сетевого гула за счет фазового вычитания между двумя катушками.'}
                  {selectedPickupType === 'p90' && 'Фонит на перегрузе аналогично обычному синглу.'}
                  {selectedPickupType === 'active' && 'Абсолютная тишина даже перед включенным монитором компьютера или прожектором сцены.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePickupTab === 'configs' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
            Конфигурация расположения звукоснимателей на корпусе определяет жанровую гибкость инструмента:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {configs.map((c) => (
              <div key={c.code} className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 font-mono font-bold text-xs border border-amber-500/20">
                    {c.code}
                  </span>
                  <span className="text-xs text-zinc-400">{c.genres.slice(0, 3).join(', ')}</span>
                </div>
                <h4 className="font-bold text-white text-base">{c.name}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{c.desc}</p>
                <div className="pt-2 border-t border-zinc-800/60 text-xs space-y-1">
                  <p className="text-emerald-400"><strong>Плюс:</strong> {c.pros}</p>
                  <p className="text-zinc-400"><strong>Минус:</strong> {c.cons}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activePickupTab === 'wiring' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Sliders className="w-4 h-4" />
              <span>Потенциометры и конденсаторы</span>
            </div>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <strong className="text-white block mb-0.5">250 кОм против 500 кОм:</strong>
                Потенциометры 250 кОм сглаживают излишнюю резкость синглов. Потенциометры 500 кОм оставляют максимум яркости и ясности хамбакерам. Для датчиков активного типа (EMG) используются низкоомные потенциометры 25 кОм.
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <strong className="text-white block mb-0.5">Конденсаторы тона (Tone Caps):</strong>
                0.047 мкФ срезает больше верхних частот (традиционно для Fender). 0.022 мкФ оставляет более мягкий спад (традиционно для Gibson). Популярны пленочные конденсаторы Orange Drop.
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <strong className="text-white block mb-0.5">Цепь тонкомпенсации (Treble Bleed):</strong>
                Параллельно соединенные резистор 150 кОм и конденсатор 1000 пФ на ножках ручки громкости. Предотвращают "замыливание" верхов при убавлении громкости на гитаре!
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>Экранировка и борьба с шумом</span>
            </div>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <strong className="text-white block mb-0.5">Клетка Фарадея:</strong>
                Проклейка всех внутренних полостей корпуса самоклеящейся медной фольгой с обязательной пропайкой стыков. Защищает сигнальные провода от радиопомех.
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <strong className="text-white block mb-0.5">Заземление струн (Ground Wire):</strong>
                Черный провод, идущий от корпуса потенциометра на станину тремоло или опорную втулку бриджа. Именно благодаря ему фон затихает, как только вы касаетесь струн руками!
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <strong className="text-white block mb-0.5">Звездное заземление (Star Ground):</strong>
                Все земляные экраны должны сходиться строго в одну точку на корпусе одного потенциометра во избежание «земляной петли» (Ground Loop).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
