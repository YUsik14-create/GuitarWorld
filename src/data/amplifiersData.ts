import { Amplifier } from '../types/guitar';

export const AMPLIFIERS_DATA: Amplifier[] = [
  {
    id: 'fender-twin-reverb',
    name: 'Fender 65 Twin Reverb',
    type: 'Ламповый (Tube)',
    format: 'Комбо',
    powerWatt: '85 Вт (лампы 4x 6L6 в оконечнике)',
    description: 'Абсолютный эталон чистого звука (Clean Headroom). Этот комбо невозможно перегрузить даже на высокой громкости — он выдает кристально ясный, сочный и глубокий тембр со встроенным пружинным ревербератором и оптическим тремоло.',
    tonalCharacter: 'Кристальный верх, глубокий бархатный бас и слегка проваленная середина (Fender Scoop).',
    controlsExplanation: [
      { knob: 'Volume', functionRu: 'Громкость канала (остается чистой почти до 7-8 делений)' },
      { knob: 'Treble / Middle / Bass', functionRu: 'Пассивный трехполосный эквалайзер с характерным провалом середины' },
      { knob: 'Reverb', functionRu: 'Глубина настоящей аналоговой пружинной реверберации' },
      { knob: 'Speed & Intensity', functionRu: 'Регулировка встроенного лампово-оптического тремоло' },
      { knob: 'Bright Switch', functionRu: 'Тумблер добавления искрящихся верхних частот на малых громкостях' },
    ],
    bestForGenres: ['Blues', 'Country', 'Funk', 'Surf Rock', 'Jazz', 'Indie', 'Shoegaze'],
    pros: [
      'Непревзойденная платформа для любых педалей эффектов (Pedal Platform)',
      'Колоссальный запас чистой громкости для стадионов и фестивалей',
      'Настоящая длинная пружина Accutronics'
    ],
    cons: [
      'Огромный вес (около 29 кг)',
      'Нет встроенного перегруза (нужны педали дисторшна)'
    ]
  },
  {
    id: 'marshall-jcm800-2203',
    name: 'Marshall JCM800 2203',
    type: 'Ламповый (Tube)',
    format: 'Голова + Кабинет',
    powerWatt: '100 Вт (лампы 4x EL34)',
    description: 'Голос хард-рока и хэви-метала 1980-х. Именно на этом усилителе записаны главные риффы Guns N Roses, Slayer, Iron Maiden, AC/DC и ранней Metallica. Оснащен раздельными регуляторами Pre-Amp Volume и Master Volume.',
    tonalCharacter: 'Агрессивный британский кранч с плотной, пробивной верхней серединой и сухим собранным низом.',
    controlsExplanation: [
      { knob: 'Pre-Amp Volume (Gain)', functionRu: 'Уровень перегруза каскадов предусилителя' },
      { knob: 'Master Volume', functionRu: 'Общая выходная громкость усилителя мощности' },
      { knob: 'Presence', functionRu: 'Регулировка ультра-высоких частот в цепи отрицательной обратной связи' },
      { knob: 'Bass / Middle / Treble', functionRu: 'Британский стек тембров с акцентированной серединой' },
    ],
    bestForGenres: ['Hard Rock', 'Heavy Metal', 'Thrash Metal', 'Punk', 'Grunge'],
    pros: [
      'Легендарный тембр, мгновенно узнаваемый на сотнях платиновых записей',
      'Пробивает любую стену барабанов и баса в живом миксе',
      'Отлично дружит с грелками (Tube Screamer / SD-1)'
    ],
    cons: [
      'Чистый звук довольно сухой и быстро начинает подгружаться',
      'Требует игры на приличной громкости для раскрытия ламп оконечника'
    ]
  },
  {
    id: 'mesa-boogie-dual-rectifier',
    name: 'Mesa/Boogie Dual Rectifier Solo Head',
    type: 'Ламповый (Tube)',
    format: 'Голова + Кабинет',
    powerWatt: '100 Вт (переключаемые выпрямители кремниевые диоды / лампы 5U4G)',
    description: 'Икона альтернативного метала и ню-метала 1990-2000-х годов (Linkin Park, Korn, Rammstein, Tool). Славится сокрушительным низкочастотным «утюгом» и массивным хайгейном.',
    tonalCharacter: 'Стена ультра-плотного массивного хайгейна с громоподобным низом и компрессией.',
    controlsExplanation: [
      { knob: 'Raw / Vintage / Modern', functionRu: 'Переключатель характера гейна: от мягкого блюзового брейкапа до модернового среза ООС' },
      { knob: 'Rectifier Select (Tube / Silicon)', functionRu: 'Ламповое «проседание» динамики (Sag) или жесткая атака диодов' },
      { knob: 'Presence', functionRu: 'Острота атаки на перегрузе' },
    ],
    bestForGenres: ['Nu Metal', 'Modern Metal', 'Post-Grunge', 'Industrial', 'Death Metal'],
    pros: [
      'Колоссальная мощность и стеноподобная мощь в пониженных строях',
      'Гибкая трехканальная конфигурация (Clean, Raw/Vintage, Modern Lead)'
    ],
    cons: [
      'Сложная и чувствительная эквализация (нужно время для отстройки)',
      'Низкие частоты могут бубнить без грелки на входе'
    ]
  },
  {
    id: 'vox-ac30-custom',
    name: 'Vox AC30 Custom',
    type: 'Ламповый (Tube)',
    format: 'Комбо',
    powerWatt: '30 Вт (лампы 4x EL84, класс A/AB без ООС)',
    description: 'Сердце британского вторжения 1960-х. Гитаристы The Beatles, The Edge (U2), Брайан Мэй (Queen) и Radiohead создали свое фирменное звучание на канале Top Boost этого комбо.',
    tonalCharacter: 'Знаменитый британский «Chime» (колокольный звон), богатый гармониками брейкап при атаке медиатором.',
    controlsExplanation: [
      { knob: 'Top Boost Volume', functionRu: 'Громкость знаменитого верхнего канала с искрящимся перегрузом' },
      { knob: 'Tone Cut', functionRu: 'Уникальный фильтр верхних частот в оконечнике (работает в обратную сторону)' },
      { knob: 'Tremolo Speed & Depth', functionRu: 'Винтажное пульсирующее тремоло' },
    ],
    bestForGenres: ['Indie', 'Alternative', 'Britpop', 'Classic Rock', 'Pop Rock', 'Shoegaze'],
    pros: [
      'Уникальный звонкий колокольный тембр, который невозможно повторить другими лампами',
      'Очень чутко реагирует на ручку громкости на самой гитаре'
    ],
    cons: [
      'Тяжелый и громкий для домашних репетиций'
    ]
  },
  {
    id: 'boss-katana-100-mk2',
    name: 'Boss Katana 100 Gen 3',
    type: 'Цифровой моделирующий (Digital)',
    format: 'Комбо',
    powerWatt: '100 Вт (с аттенюатором до 0.5 Вт)',
    description: 'Самый популярный современный домашний и репетиционный комбоусилитель в мире. Сочетает передовое цифровое моделирование аналоговой схемы Tube Logic со встроенным процессором из более чем 60 эффектов BOSS.',
    tonalCharacter: 'Широкая палитра: от кристального акустического до плотного Brown Sound в стиле Van Halen.',
    controlsExplanation: [
      { knob: 'Amp Type', functionRu: 'Выбор схемы: Acoustic, Clean, Crunch, Lead, Brown' },
      { knob: 'Power Control', functionRu: 'Снижение мощности: 100 Вт / 50 Вт / 0.5 Вт (для тихой ночной игры дома)' },
      { knob: 'Booster / Mod / FX / Delay / Reverb', functionRu: 'Управление блоками встроенных педалей эффектов' },
      { knob: 'USB Audio', functionRu: 'Встроенная звуковая карта для прямой записи в компьютер' },
    ],
    bestForGenres: ['Все жанры (универсальный инструмент для обучения, дома и концертов)'],
    pros: [
      'Идеален для домашних занятий на 0.5 Вт без потери плотности перегруза',
      'Включает в себя десятки культовых педалей BOSS (DS-1, BD-2, CE-2, DD-3)',
      'Легкий вес, вход для наушников и прямая запись по USB'
    ],
    cons: [
      'Цифровой отклик динамики слегка отличается от чисто лампового аппарата на предельной громкости'
    ]
  }
];
