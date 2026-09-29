import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Heart, Shield, Github, Youtube, Music, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-zinc-800/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-white block">
              GuitarWorld
            </span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Главная интерактивная образовательная энциклопедия и портал о гитарах. От устройства первого звукоснимателя до сложных прогрессивных сетапов современности.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/YUsik14-create"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="GitHub"
                title="GitHub (YUsik14-create)"
              >
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:text-white transition-colors" aria-label="Telegram">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1: Энциклопедия */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Энциклопедия
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('guitars')} className="hover:text-amber-400 transition-colors">
                  Каталог гитар
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('anatomy')} className="hover:text-amber-400 transition-colors">
                  Устройство инструмента
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('pickups')} className="hover:text-amber-400 transition-colors">
                  Звукосниматели и схемы
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('effects')} className="hover:text-amber-400 transition-colors">
                  Педали эффектов
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('amplifiers')} className="hover:text-amber-400 transition-colors">
                  Усилители и кабинеты
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('glossary')} className="hover:text-amber-400 transition-colors">
                  Словарь терминов
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Инструменты и Гайды */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Инструменты & Гайды
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('quiz')} className="hover:text-amber-400 transition-colors">
                  Мастер подбора гитары
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('comparison')} className="hover:text-amber-400 transition-colors">
                  Сравнение моделей
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tools')} className="hover:text-amber-400 transition-colors">
                  Тюнер & Метроном
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('prices')} className="hover:text-amber-400 transition-colors">
                  Цены и бюджетные сборки
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('guides')} className="hover:text-amber-400 transition-colors">
                  Гайды по обслуживанию
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('history')} className="hover:text-amber-400 transition-colors">
                  История и гитаристы
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 3: О проекте */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              О проекте
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('brands')} className="hover:text-amber-400 transition-colors">
                  Каталог брендов
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('genres')} className="hover:text-amber-400 transition-colors">
                  Музыкальные жанры
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-amber-400 transition-colors">
                  Личный профиль
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-amber-400 transition-colors">
                  Панель администратора
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Политика конфиденциальности</span>
              </li>
              <li>
                <span className="text-zinc-500">Источники информации</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} GuitarWorld. Все права защищены. Образовательный портал.</p>
          <p className="text-center sm:text-right max-w-md">
            Все цены указаны в USD в качестве ориентировочных средних рыночных значений и не являются публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  );
};
