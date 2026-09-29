import { EffectPedal } from '../types/guitar';

export const EFFECTS_DATA: EffectPedal[] = [
  {
    id: 'tube-screamer-od',
    name: 'Vintage Overdrive (TS-Style)',
    category: 'Drive',
    description: 'Самая известная грелка в мире. Мягкое симметричное ограничение сигнала с выраженным горбом в средней частоте (~720 Гц) и легким срезом избыточного гулкого баса.',
    howItWorks: 'Диоды в цепи отрицательной обратной связи операционного усилителя мягко сглаживают верхушки звуковой волны, создавая лампоподобную сатурацию.',
    soundDescription: 'Теплый, певучий кранч с плотной серединой, прорезающий микс группы.',
    placementInChain: 'В начале цепочки после тюнера/компрессора, перед дисторшном или прямо в ламповый вход усилителя.',
    typicalSettings: [
      { knob: 'Overdrive', value: '9:00 (минимум)', hint: 'Для режима чистой грелки лампового ампера' },
      { knob: 'Tone', value: '11:00-1:00', hint: 'Баланс яркости' },
      { knob: 'Level', value: '3:00 (максимум)', hint: 'Раскачивает лампы предусилителя' },
    ],
    knobs: [
      { id: 'drive', label: 'Drive', min: 0, max: 100, defaultVal: 35 },
      { id: 'tone', label: 'Tone', min: 0, max: 100, defaultVal: 50 },
      { id: 'level', label: 'Level', min: 0, max: 100, defaultVal: 75 },
    ],
    accentColor: '#10b981', // Emerald green
    audioEffectType: 'overdrive',
  },
  {
    id: 'hard-clipping-dist',
    name: 'Rodent Distortion (RAT-Style)',
    category: 'Drive',
    description: 'Легендарный агрессивный дисторшн с жестким диодным ограничением на землю. Способен звучать от бодрого рок-кранча до жирного стеноподобного фузза.',
    howItWorks: 'Сигнал усиливается до упора, после чего пара встречно-параллельных диодов жестко срезает пики волны об землю.',
    soundDescription: 'Злой, зернистый, кусачий тембр с мощным сустейном и богатыми гармониками.',
    placementInChain: 'После овердрайва, перед модуляцией и временными эффектами.',
    typicalSettings: [
      { knob: 'Distortion', value: '12:00', hint: 'Классический хэви-рок ритм' },
      { knob: 'Filter', value: '2:00', hint: 'Срезает избыточный высокочастотный скрежет' },
      { knob: 'Volume', value: '1:00', hint: 'Выравнивание с чистым звуком' },
    ],
    knobs: [
      { id: 'distortion', label: 'Distortion', min: 0, max: 100, defaultVal: 65 },
      { id: 'filter', label: 'Filter', min: 0, max: 100, defaultVal: 45 },
      { id: 'volume', label: 'Volume', min: 0, max: 100, defaultVal: 70 },
    ],
    accentColor: '#e11d48', // Crimson Red
    audioEffectType: 'distortion',
  },
  {
    id: 'classic-muff-fuzz',
    name: 'Sustainer Big Fuzz',
    category: 'Drive',
    description: 'Монументальный 4-каскадный фузз с вырезанной серединой и бесконечным поющим сустейном в стиле Дэвида Гилмора и гранж-групп 90-х.',
    howItWorks: 'Четыре транзисторных каскада превращают синусоиду звукоснимателя в прямоугольную волну, создавая колоссальное насыщение.',
    soundDescription: 'Огромная стена вибрирующего шершавого звука с глубоким низом и гладкими верхами.',
    placementInChain: 'В начале цепи драйвов или сразу после гитары.',
    typicalSettings: [
      { knob: 'Sustain', value: '3:00', hint: 'Для певучих соло Pink Floyd' },
      { knob: 'Tone', value: '11:00', hint: 'Темный бархатный оттенок' },
      { knob: 'Volume', value: '12:00', hint: 'Баланс громкости' },
    ],
    knobs: [
      { id: 'sustain', label: 'Sustain', min: 0, max: 100, defaultVal: 80 },
      { id: 'tone', label: 'Tone', min: 0, max: 100, defaultVal: 40 },
      { id: 'volume', label: 'Volume', min: 0, max: 100, defaultVal: 60 },
    ],
    accentColor: '#f97316', // Orange
    audioEffectType: 'fuzz',
  },
  {
    id: 'tape-analog-delay',
    name: 'Tape & Analog Echo Delay',
    category: 'Time/Space',
    description: 'Эффект эха и задержки сигнала. Повторяет сыгранные ноты через заданный промежуток времени с естественным аналоговым затуханием верхов.',
    howItWorks: 'Винтажные приборы записывали сигнал на магнитную ленту. Современные микросхемы BBD (Bucket Brigade Device) передают аналоговый заряд по цепочке конденсаторов.',
    soundDescription: 'Теплые, слегка размывающиеся повторы, создающие ощущение пространства и объема.',
    placementInChain: 'В петлю эффектов (FX Loop) или в конце цепочки перед реверберацией.',
    typicalSettings: [
      { knob: 'Time', value: '380 мс', hint: 'Идеально для ритмических соло' },
      { knob: 'Repeats', value: '3-4 повтора', hint: 'Не создает грязи в миксе' },
      { knob: 'Mix', value: '30%', hint: 'Фоновое присутствие' },
    ],
    knobs: [
      { id: 'time', label: 'Time (ms)', min: 50, max: 1000, defaultVal: 380, step: 10 },
      { id: 'feedback', label: 'Repeats', min: 0, max: 100, defaultVal: 40 },
      { id: 'mix', label: 'Mix', min: 0, max: 100, defaultVal: 35 },
    ],
    accentColor: '#0ea5e9', // Sky blue
    audioEffectType: 'delay',
  },
  {
    id: 'ambient-spring-reverb',
    name: 'Multi-Mode Spatial Reverb',
    category: 'Time/Space',
    description: 'Эмуляция акустического пространства: от аутентичной пружины Fender (Spring) и пластины (Plate) до соборных холлов и мерцающего Shimmer.',
    howItWorks: 'Сложные алгоритмические матрицы отражений имитируют тысячи переотражений звуковой волны от стен помещения.',
    soundDescription: 'Глубина, объем, трехмерное ощущение присутствия в концертном зале или храме.',
    placementInChain: 'Самый последний эффект в сигнальной цепи перед кабинетом/аудиоинтерфейсом.',
    typicalSettings: [
      { knob: 'Decay', value: '2.5 сек', hint: 'Время затухания хвоста' },
      { knob: 'Tone', value: '12:00', hint: 'Яркость хвоста отражений' },
      { knob: 'Mix', value: '25%', hint: 'Для читаемого ритма' },
    ],
    knobs: [
      { id: 'decay', label: 'Decay', min: 0, max: 100, defaultVal: 55 },
      { id: 'tone', label: 'Damping', min: 0, max: 100, defaultVal: 50 },
      { id: 'mix', label: 'Mix', min: 0, max: 100, defaultVal: 30 },
    ],
    accentColor: '#8b5cf6', // Violet
    audioEffectType: 'reverb',
  },
  {
    id: 'analog-ensemble-chorus',
    name: 'Stereo Analog Chorus',
    category: 'Modulation',
    description: 'Создает ощущение звучания 12-струнной гитары или нескольких инструментов одновременно за счет микро-сдвига высоты тона и времени.',
    howItWorks: 'Сигнал разделяется на прямой и задержанный (на 10-25 мс), причем время задержки непрерывно модулируется низкочастотным генератором (LFO).',
    soundDescription: 'Сочный, объемный, водянистый саунд 80-х (The Police, Nirvana Come As You Are).',
    placementInChain: 'После драйвов и перегрузов, перед дилеем.',
    typicalSettings: [
      { knob: 'Rate', value: '1.2 Гц', hint: 'Плавное медленное качание' },
      { knob: 'Depth', value: '60%', hint: 'Широкая стерео-панорама' },
    ],
    knobs: [
      { id: 'rate', label: 'Rate', min: 0, max: 100, defaultVal: 35 },
      { id: 'depth', label: 'Depth', min: 0, max: 100, defaultVal: 65 },
    ],
    accentColor: '#06b6d4', // Cyan
    audioEffectType: 'chorus',
  },
  {
    id: 'optical-tremolo',
    name: 'Pulsing Optical Tremolo',
    category: 'Modulation',
    description: 'Периодическое колебание громкости сигнала. Винтажный эффект 60-х годов в духе спагетти-вестернов и серф-рока.',
    howItWorks: 'Оптопара или фоторезистор периодически приглушает амплитуду звука по синусоидальной или прямоугольной форме волны.',
    soundDescription: 'Пульсирующий, гипнотический, дышащий ритмический эффект.',
    placementInChain: 'После перегрузов, перед ревербератором.',
    typicalSettings: [
      { knob: 'Speed', value: '4 Гц', hint: 'Ритмичная пульсация' },
      { knob: 'Depth', value: '70%', hint: 'Глубокий провал звука' },
    ],
    knobs: [
      { id: 'speed', label: 'Speed', min: 0, max: 100, defaultVal: 45 },
      { id: 'depth', label: 'Depth', min: 0, max: 100, defaultVal: 60 },
    ],
    accentColor: '#eab308', // Amber
    audioEffectType: 'tremolo',
  },
  {
    id: 'precision-compressor',
    name: 'Studio Optical Compressor',
    category: 'Dynamic/Utility',
    description: 'Выравнивает динамику игры: делает тихие ноты громче, а громкие пики мягче. Добавляет гитаре бесконечный сустейн и перкуссионный щелчок.',
    howItWorks: 'Снижает коэффициент усиления, когда входной сигнал превышает установленный порог (Threshold).',
    soundDescription: 'Плотный, собранный, упругий звук. Незаменим для кантри и фанка.',
    placementInChain: 'В самом начале цепочки (сразу после гитары).',
    typicalSettings: [
      { knob: 'Sustain', value: '65%', hint: 'Долгий спад ноты' },
      { knob: 'Attack', value: 'Быстрая', hint: 'Для перкуссионного фанк-чеса' },
    ],
    knobs: [
      { id: 'sustain', label: 'Sustain', min: 0, max: 100, defaultVal: 60 },
      { id: 'attack', label: 'Attack', min: 0, max: 100, defaultVal: 40 },
      { id: 'level', label: 'Output', min: 0, max: 100, defaultVal: 70 },
    ],
    accentColor: '#f43f5e', // Rose
    audioEffectType: 'overdrive',
  },
  {
    id: 'studio-graphic-eq',
    name: '7-Band Studio Graphic EQ',
    category: 'Dynamic/Utility',
    description: 'Точная скульптурная настройка частотного спектра. Позволяет срезать резонансный гул, добавить панча в середине или поднять искрящиеся верха.',
    howItWorks: 'Семь активных полосовых фильтров (100Hz, 200Hz, 400Hz, 800Hz, 1.6kHz, 3.2kHz, 6.4kHz) с диапазоном регулировки +/- 15 дБ.',
    soundDescription: 'Кардинальное изменение тембрального баланса инструмента.',
    placementInChain: 'В петле эффектов или после дисторшна для формирования характера перегруза.',
    typicalSettings: [
      { knob: 'Mids 800Hz', value: '+4 dB', hint: 'Для прорезания в пачке' },
      { knob: 'Bass 100Hz', value: '-2 dB', hint: 'Устраняет бубнеж' },
    ],
    knobs: [
      { id: 'low', label: '100Hz', min: -15, max: 15, defaultVal: 0 },
      { id: 'mid', label: '800Hz', min: -15, max: 15, defaultVal: 3 },
      { id: 'high', label: '3.2kHz', min: -15, max: 15, defaultVal: 1 },
      { id: 'level', label: 'Level', min: -15, max: 15, defaultVal: 0 },
    ],
    accentColor: '#64748b', // Slate
    audioEffectType: 'equalizer',
  }
];
