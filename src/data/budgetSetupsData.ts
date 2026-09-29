import { BudgetSetup } from '../types/guitar';

export const BUDGET_SETUPS: BudgetSetup[] = [
  {
    id: 'setup-300',
    budgetUSD: 300,
    title: 'Начальный домашний сетап ($300)',
    description: 'Лучший баланс для человека, который делает первые шаги и хочет качественный надежный инструмент без разочарований.',
    items: [
      { category: 'Электрогитара', name: 'Squier Sonic Stratocaster HSS или Cort G100', priceUSD: 199, whyChosen: 'Конфигурация HSS дает максимум жанровой гибкости; надежный гриф.' },
      { category: 'Комбоусилитель', name: 'Blackstar Fly 3 или NUX Mighty Lite BT', priceUSD: 69, whyChosen: 'Компактный мини-комбик с Bluetooth, выходом на наушники и отличным перегрузом ISF.' },
      { category: 'Кабель', name: 'Roxtone / Klotz Pro Instrument 3м', priceUSD: 14, whyChosen: 'Надежная пайка и плотный экран без лишнего фонового шума.' },
      { category: 'Тюнер & Аксессуары', name: 'Клипса-тюнер Snark + Ремень + Набор медиаторов Dunlop Tortex 0.88', priceUSD: 18, whyChosen: 'Все необходимое для настройки и комфортной игры стоя.' }
    ],
    totalActualUSD: 300,
    idealFor: 'Школьники, студенты, начинающие гитаристы для тихих занятий дома в наушниках.'
  },
  {
    id: 'setup-500',
    budgetUSD: 500,
    title: 'Оптимальный сетап для прогресса ($500)',
    description: 'Комплект, на котором можно не только учиться дома, но и репетировать с группой и делать первые записи на компьютер.',
    items: [
      { category: 'Электрогитара', name: 'Yamaha Pacifica 112V или Ibanez GRG121DX', priceUSD: 329, whyChosen: 'Корпус из цельной ольхи, звукосниматели Alnico V, отсечка хамбакера на пуш-пуле.' },
      { category: 'Комбоусилитель', name: 'Fender Mustang LT25 или Boss Katana Mini', priceUSD: 129, whyChosen: 'Цифровой моделирующий процессор с десятками готовых рок-пресетов и USB-портом.' },
      { category: 'Кабель', name: 'D’Addario Custom Series 4.5м', priceUSD: 19, whyChosen: 'Позолоченные разъемы и бескислородная медь.' },
      { category: 'Чехол & Стойка', name: 'Утепленный чехол Rockbag + напольная стойка Hercules', priceUSD: 23, whyChosen: 'Защита гитары от случайных падений и пыли.' }
    ],
    totalActualUSD: 500,
    idealFor: 'Любители, желающие серьезно освоить инструмент и играть разные стили музыки.'
  },
  {
    id: 'setup-1000',
    budgetUSD: 1000,
    title: 'Полупрофессиональный концертный сет ($1000)',
    description: 'Инструмент концертного уровня со сценическим комбоусилителем, способным прокачать репетиционную базу с живыми барабанами.',
    items: [
      { category: 'Электрогитара', name: 'Squier Classic Vibe 60s Strat / Tele или Epiphone Les Paul Standard 50s', priceUSD: 499, whyChosen: 'Отборное дерево, аутентичные звукосниматели Fender-Designed Alnico, винтажный лак.' },
      { category: 'Комбоусилитель', name: 'Boss Katana 100 Gen 3 или Yamaha THR30II', priceUSD: 399, whyChosen: '100 Ватт мощности, 12-дюймовый динамик, встроенные педали BOSS и петля эффектов FX Loop.' },
      { category: 'Педаль / Тюнер', name: 'Педаль Overdrive (Electro-Harmonix Soul Food) + Boss TU-3', priceUSD: 65, whyChosen: 'Классическая грелка для подогрева кранча и сценический педальный тюнер.' },
      { category: 'Коммутация', name: 'Профессиональные кабели Sommer Cable / Neutrik', priceUSD: 37, whyChosen: 'Неубиваемые швейцарские разъемы Neutrik.' }
    ],
    totalActualUSD: 1000,
    idealFor: 'Концертирующие музыканты, студийная запись и живые репетиции в группе.'
  },
  {
    id: 'setup-1500',
    budgetUSD: 1500,
    title: 'Студийный & Концертный профессионал ($1500)',
    description: 'Бескомпромиссный сетап на базе японского/мексиканского инструмента топ-класса или цифрового моделирующего процессора.',
    items: [
      { category: 'Электрогитара', name: 'Fender Player II Stratocaster / Ibanez RG550 Genesis (Japan)', priceUSD: 899, whyChosen: 'Легендарное качество сборки, лады прокатанные вручную, идеальный строй.' },
      { category: 'Процессор / Усилитель', name: 'Line 6 HX Stomp или Neural DSP Quad Cortex Mini Rig', priceUSD: 499, whyChosen: 'Студийное моделирование сотен ламповых усилителей и кабинетов, прямое подключение в микшерный пульт.' },
      { category: 'Наушники / Мониторинг', name: 'Студийные мониторные наушники Audio-Technica ATH-M50x', priceUSD: 69, whyChosen: 'Хирургически точная передача гитарного тембра при записи дома.' },
      { category: 'Кейс & Ремни', name: 'Жесткий кейс Gator Hardcase + кожаный ремень Levy’s с локами Schaller', priceUSD: 33, whyChosen: 'Максимальная безопасность инструмента на гастролях.' }
    ],
    totalActualUSD: 1500,
    idealFor: 'Опытные музыканты, гастроли, профессиональная запись альбомов.'
  }
];
