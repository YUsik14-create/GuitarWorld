import React from 'react';
import { useApp } from '../context/AppContext';
import { soundEngine } from '../utils/audioEngine';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Flame,
  BookOpen,
  Sliders,
  Award
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();

  const handleHeroSound = () => {
    // Play an open E minor chord
    soundEngine.strumChord([82.41, 123.47, 164.81, 196.0, 246.94, 329.63], 35);
  };

  const learnPoints = [
    'Как работает электрогитара и цепь сигнала',
    'Как выбрать первую гитару без переплаты',
    'Чем отличается Humbucker от Single Coil и P-90',
    'Как собрать собственный педалборд и сетап',
    'Какая гитара подойдет под Metal, Rock, Blues и Djent',
    'Как самостоятельно настроить мензуру и анкер',
    'Анатомическое устройство всех 18 ключевых деталей',
    'Как создается звук от щипка струны до динамика',
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-zinc-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/10 via-rose-600/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Главная музыкальная энциклопедия инструмента</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.1]">
              GuitarWorld — <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200">всё о гитарах</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed text-balance">
              От первой гитары до профессионального инструмента: устройство, звук, история, бренды, модели, электроника и техника игры.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('guitars')}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Изучить гитары</span>
              </button>

              <button
                onClick={() => navigateTo('quiz')}
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Подобрать гитару</span>
              </button>

              <button
                onClick={handleHeroSound}
                className="p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 border border-zinc-800 transition-colors"
                title="Тестовый аккорд гитары"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* "Ты можешь узнать" 2-column checklist */}
            <div className="pt-6 border-t border-zinc-800/60">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Ты можешь узнать в энциклопедии:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {learnPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image & Live Spotlight Widget */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
              <img
                src="/src/assets/images/hero_electric_guitar_1790620416632.jpg"
                alt="Электрогитара премиального уровня"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Bottom Spotlight Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-md">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Модель недели</span>
                    </div>
                    <p className="font-bold text-white text-sm sm:text-base mt-0.5">
                      Fender Stratocaster American Pro II
                    </p>
                    <p className="text-xs text-zinc-400">
                      V-Mod II датчики · Фирменное стекло · Мензура 25.5"
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('guitar-detail', 'fender-stratocaster')}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-colors shrink-0"
                    title="Открыть обзор модели"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick fact badge */}
            <div className="mt-4 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-zinc-200">Знаете ли вы? </span>
                <span>
                  Лео Фендер сам не умел играть на гитаре, а все прототипы проверял на слух музыкантов кантри и свинга!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-800/80">
          <div
            onClick={() => navigateTo('anatomy')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/70 border border-zinc-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-zinc-400 group-hover:text-amber-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Интерактив</span>
              <Sliders className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
              Анатомия и физика звука
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Цепочка от вибрации струны до динамика с интерактивными точками деталей.
            </p>
          </div>

          <div
            onClick={() => navigateTo('effects')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/70 border border-zinc-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-zinc-400 group-hover:text-rose-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Конструктор</span>
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-zinc-100 group-hover:text-rose-400 transition-colors">
              Педалборд онлайн
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Соберите собственную цепочку овердрайвов, дилеев и ревербераторов со звуком.
            </p>
          </div>

          <div
            onClick={() => navigateTo('tools')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/70 border border-zinc-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-zinc-400 group-hover:text-emerald-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Инструменты</span>
              <Volume2 className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Тюнер & Метроном
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Настройка по эталонным частотам струн и генератор аккордов с визуализацией.
            </p>
          </div>

          <div
            onClick={() => navigateTo('glossary')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/70 border border-zinc-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-zinc-400 group-hover:text-cyan-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Словарь</span>
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-zinc-100 group-hover:text-cyan-400 transition-colors">
              Словарь гитариста
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              От Action и Truss Rod до Impedance и Humbucking простыми словами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
