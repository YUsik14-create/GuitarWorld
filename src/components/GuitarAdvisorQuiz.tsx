import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GuitarCard } from './GuitarCard';
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';

interface QuizState {
  experience: string;
  budget: string;
  genre: string;
  guitarType: string;
  heavySound: string;
  cleanSound: string;
  strings: string;
  floydRose: string;
  bodyShape: string;
  artistsVibe: string;
}

export const GuitarAdvisorQuiz: React.FC = () => {
  const { allGuitars, navigateTo } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [answers, setAnswers] = useState<QuizState>({
    experience: 'beginner',
    budget: 'mid',
    genre: 'rock',
    guitarType: 'electric',
    heavySound: 'yes',
    cleanSound: 'versatile',
    strings: '6',
    floydRose: 'fixed',
    bodyShape: 'strat',
    artistsVibe: 'classic',
  });

  const questions = [
    {
      id: 'experience',
      title: '1. Какой у вас опыт игры на гитаре?',
      desc: 'Это поможет определиться с удобством грифа, сложностью обслуживания и стартовым бюджетом.',
      options: [
        { id: 'beginner', label: 'Полный новичок', hint: 'Никогда не играл или только начинаю учить первые аккорды' },
        { id: 'amateur', label: 'Любитель с опытом', hint: 'Играю дома для себя 1–3 года, знаю базовые риффы и соло' },
        { id: 'advanced', label: 'Продвинутый музыкант', hint: 'Играю в группе, выступаю на сцене или записываю треки' },
      ],
    },
    {
      id: 'guitarType',
      title: '2. Какой основной тип инструмента вы ищете?',
      desc: 'Выбор между электрическим усилением и естественной акустикой.',
      options: [
        { id: 'electric', label: 'Электрогитара', hint: 'Хочу играть через усилитель, в наушники, с перегрузом и педалями' },
        { id: 'acoustic', label: 'Акустическая гитара', hint: 'Звонкий металлический звук без подключения к розетке' },
        { id: 'classical', label: 'Классическая гитара', hint: 'Широкий гриф и мягкие нейлоновые струны для академической музыки' },
        { id: 'bass', label: 'Бас-гитара', hint: 'Фундамент ритм-секции, грув и низкие частоты' },
      ],
    },
    {
      id: 'budget',
      title: '3. Какой планируемый бюджет на гитару?',
      desc: 'Мы подберем лучший инструмент в вашей финансовой категории без переплаты за лишний маркетинг.',
      options: [
        { id: 'entry', label: 'До $300 (Бюджетный)', hint: 'Начальный инструмент для уверенного старта' },
        { id: 'mid', label: 'От $300 до $800 (Оптимальный)', hint: 'Отличная «рабочая лошадка» для дома и репетиций' },
        { id: 'pro', label: 'От $800 до $2000 (Профессиональный)', hint: 'Японские или американские инструменты высшего уровня' },
        { id: 'luxury', label: 'От $2000+ (Премиум / Custom)', hint: 'Бескомпромиссное дерево, топовая фурнитура и статус' },
      ],
    },
    {
      id: 'genre',
      title: '4. Какая музыка вам ближе всего по духу?',
      desc: 'От стиля зависит форма корпуса, порода дерева и тип звукоснимателей.',
      options: [
        { id: 'metal', label: 'Heavy Metal / Djent / Core', hint: 'Скоростные риффы, плотный перегруз, глубокие строи' },
        { id: 'rock', label: 'Classic Rock / Hard Rock / Grunge', hint: 'Драйв, хрустящий кранч, певучие пентатонические соло' },
        { id: 'blues', label: 'Blues / Funk / Pop Rock', hint: 'Динамика, прозрачное «стекло», игра пальцами и медиатором' },
        { id: 'jazz', label: 'Jazz / Neo-Soul / Инди', hint: 'Сложные бархатные аккорды, теплые глубокие обертоны' },
      ],
    },
    {
      id: 'heavySound',
      title: '5. Насколько для вас важен мощный тяжелый перегруз?',
      desc: 'Определяет необходимость хамбакера в бриджевой позиции.',
      options: [
        { id: 'critical', label: 'Критически важен!', hint: 'Обязателен мощный хамбакер без фонового шума для дисторшна' },
        { id: 'medium', label: 'Иногда нужен кранч', hint: 'Универсальный баланс: легкий драйв для соло и рока' },
        { id: 'no', label: 'Тяжелый перегруз не нужен', hint: 'Предпочитаю чистый, мягкий или акустический звук' },
      ],
    },
    {
      id: 'cleanSound',
      title: '6. Какой характер чистого звука вам нравится больше?',
      desc: 'Определяет тип магнитов и конфигурацию катушек.',
      options: [
        { id: 'glass', label: 'Звонкий и стеклянный', hint: 'Яркие колокольные верха синглов в духе Стратокастера' },
        { id: 'warm', label: 'Теплый и густой', hint: 'Бархатистый, джазово-блюзовый тон некового хамбакера' },
        { id: 'versatile', label: 'И то, и другое', hint: 'Хочу переключаться между звонким и жирным звуком' },
      ],
    },
    {
      id: 'strings',
      title: '7. Сколько струн вам необходимо?',
      desc: 'Для классического строя достаточно 6 струн, для современного прогрессива — 7 или 8.',
      options: [
        { id: '6', label: 'Классические 6 струн', hint: 'Стандарт для 95% музыки в мире' },
        { id: '7', label: '7 струн (расширенный диапазон)', hint: 'Дополнительная басовая струна Си (B) для тяжелых риффов' },
        { id: '8', label: '8 струн (экстремально низкие строи)', hint: 'Для полиритмии Meshuggah, Animals as Leaders и джента' },
      ],
    },
    {
      id: 'floydRose',
      title: '8. Нужна ли вам система тремоло или Floyd Rose?',
      desc: 'Плавающее тремоло дает свободу трюков, но фиксированный бридж намного проще настраивать.',
      options: [
        { id: 'fixed', label: 'Фиксированный бридж (Hardtail)', hint: 'Максимальная стабильность строя, моментальная смена строя и струн' },
        { id: 'vintage', label: 'Классическое тремоло (Strat)', hint: 'Мягкие вибрато и покачивания аккордов без лишних сложностей' },
        { id: 'floyd', label: 'Floyd Rose с двойным замком', hint: 'Для экстремальных дайв-бомб и соло в стиле Ван Халена и Вая' },
      ],
    },
    {
      id: 'bodyShape',
      title: '9. Какая форма корпуса визуально вам нравится больше всего?',
      desc: 'Эстетика инструмента должна мотивировать вас брать его в руки каждый день!',
      options: [
        { id: 'strat', label: 'Двойной вырез (Stratocaster / Superstrat)', hint: 'Самая эргономичная и сбалансированная форма' },
        { id: 'singlecut', label: 'Одинарный вырез (Les Paul / Telecaster)', hint: 'Классическая солидная винтажная эстетика' },
        { id: 'acoustic-dread', label: 'Акустический корпус (Dreadnought / Grand Auditorium)', hint: 'Большая резонирующая деревянная дека' },
        { id: 'headless', label: 'Безголовая футуристическая (Headless)', hint: 'Компактный ультралегкий инструмент будущего' },
      ],
    },
    {
      id: 'artistsVibe',
      title: '10. На чьем творчестве вы бы хотели ориентироваться?',
      desc: 'Артистический вектор звука.',
      options: [
        { id: 'classic', label: 'Хендрикс, Гилмор, Слэш, Пейдж', hint: 'Золотая эра рока, блюза и классического гитарного соло' },
        { id: 'modern-metal', label: 'Metallica, Slipknot, Periphery, Polyphia', hint: 'Современный агрессивный ритм и виртуозный метал' },
        { id: 'acoustic-folk', label: 'Эд Ширан, Боб Дилан, The Beatles', hint: 'Акустические баллады, песни под гитару, фингерстайл' },
      ],
    },
  ];

  const handleSelectOption = (field: keyof QuizState, val: string) => {
    setAnswers((prev) => ({ ...prev, [field]: val }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Recommender logic: compute match scores for all guitars
  const recommendedGuitars = React.useMemo(() => {
    if (!isCompleted) return [];

    return allGuitars
      .map((guitar) => {
        let score = 0;
        let reasons: string[] = [];

        // Type match
        if (answers.guitarType === 'electric' && (guitar.type === 'electric' || guitar.type === '7-string' || guitar.type === '8-string')) {
          score += 30;
        } else if (answers.guitarType === guitar.type) {
          score += 35;
        }

        // Budget match
        if (answers.budget === 'entry' && guitar.priceEstimateUSD < 500) {
          score += 25;
          reasons.push('Отлично вписывается в комфортный начальный бюджет');
        } else if (answers.budget === 'mid' && guitar.priceEstimateUSD >= 300 && guitar.priceEstimateUSD <= 1200) {
          score += 25;
          reasons.push('Идеальное соотношение цены и качества');
        } else if (answers.budget === 'pro' && guitar.priceEstimateUSD >= 1000) {
          score += 25;
          reasons.push('Инструмент профессионального концертного уровня');
        }

        // Genre & Heavy Sound match
        if (answers.heavySound === 'critical') {
          if (guitar.specs.pickupConfig === 'HH' || guitar.specs.pickupConfig === 'HSH' || guitar.specs.pickupConfig === 'HSS') {
            score += 20;
            reasons.push('Наличие хамбакера гарантирует плотный перегруз без шума');
          }
        } else if (answers.cleanSound === 'glass') {
          if (guitar.specs.pickupConfig.includes('S')) {
            score += 20;
            reasons.push('Синглы дают искрящееся прозрачное «стекло» на чистом звуке');
          }
        }

        // Bridge match
        if (answers.floydRose === 'floyd' && guitar.specs.bridge.includes('Floyd')) {
          score += 20;
          reasons.push('Оснащена двусторонним тремоло Floyd Rose для экстремальных соло');
        } else if (answers.floydRose === 'fixed' && guitar.specs.bridge.includes('Fixed')) {
          score += 15;
          reasons.push('Фиксированный бридж гарантирует максимальную стабильность строя');
        }

        // Strings count match
        if (answers.strings === '7' && guitar.type === '7-string') {
          score += 30;
          reasons.push('7-струнный диапазон для низких строев');
        } else if (answers.strings === '8' && guitar.type === '8-string') {
          score += 30;
          reasons.push('8-струнный баритон для глубоких джент-партий');
        }

        return { guitar, score, reasons };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [allGuitars, answers, isCompleted]);

  const currentQ = questions[currentStep];

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Интерактивный мастер подбора инструмента</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Какая гитара мне подойдет?
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto">
          Ответьте на 10 простых вопросов, и наша система подберет наиболее подходящие варианты инструментов с понятным обоснованием выбора.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span>Вопрос {currentStep + 1} из {questions.length}</span>
              <span className="font-mono text-amber-500">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <h3 className="font-bold text-xl sm:text-2xl text-white">
              {currentQ.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              {currentQ.desc}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(currentQ.id as keyof QuizState, opt.id)}
                className="p-4 rounded-2xl bg-zinc-950/70 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/60 text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-zinc-200 group-hover:text-amber-400 transition-colors">
                    {opt.label}
                  </span>
                  <div className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-amber-500 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-amber-500 transition-colors" />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {opt.hint}
                </p>
              </button>
            ))}
          </div>

          {/* Back Navigation Button */}
          {currentStep > 0 && (
            <div className="pt-2 border-t border-zinc-800 flex justify-between">
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Предыдущий вопрос</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-display text-2xl font-bold text-white">
              Мы подобрали лучшие инструменты под ваши критерии!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Мы не выделяем одну «абсолютно лучшую» гитару, поскольку музыка индивидуальна. Ниже представлены три наиболее подходящих варианта с объяснением их сильных сторон.
            </p>
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Пройти тест заново</span>
            </button>
          </div>

          {/* Recommended Guitars List with Explanations */}
          <div className="space-y-6">
            {recommendedGuitars.map((item, idx) => (
              <div
                key={item.guitar.id}
                className="p-5 sm:p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 relative">
                  <img
                    src={item.guitar.image}
                    alt={item.guitar.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-zinc-900/90 text-[10px] font-bold text-amber-400 uppercase">
                    Вариант #{idx + 1}
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-amber-500 uppercase">{item.guitar.brand}</span>
                    <h4 className="font-bold text-lg sm:text-xl text-white mt-0.5">
                      {item.guitar.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Ориентировочная цена: <strong className="text-zinc-200 font-mono">${item.guitar.priceEstimateUSD}</strong> · Уровень: {item.guitar.playerLevel}
                    </p>
                  </div>

                  {/* Why it matches */}
                  <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Почему подходит именно вам:
                    </p>
                    <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                      {item.reasons.length > 0 ? (
                        item.reasons.map((r, i) => <li key={i}>{r}</li>)
                      ) : (
                        <li>Отличный универсальный выбор по соотношению цены и удобства грифа.</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => navigateTo('guitar-detail', item.guitar.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
                    >
                      Подробнее о модели
                    </button>
                    <button
                      onClick={() => navigateTo('guitars')}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-colors"
                    >
                      Смотреть аналог в каталоге
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
