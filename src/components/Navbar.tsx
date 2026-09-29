import React, { useState } from 'react';
import { useApp, NavigationPage } from '../context/AppContext';
import {
  Search,
  SlidersHorizontal,
  Heart,
  Menu,
  X,
  Type,
  Shield,
  Layers,
  Sparkles,
  ChevronDown,
  Github
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cycleFontSize,
    fontSize,
    activePage,
    navigateTo,
    favorites,
    compareList,
    setIsSearchOpen,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGuitarsDropdownOpen, setIsGuitarsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const guitarCategories: { id: string; label: string }[] = [
    { id: 'all', label: 'Все гитары' },
    { id: 'electric', label: 'Электрогитары' },
    { id: 'acoustic', label: 'Акустические' },
    { id: 'bass', label: 'Бас-гитары' },
    { id: 'semi-hollow', label: 'Полуакустические' },
    { id: '7-string', label: '7- и 8-струнные' },
    { id: 'classical', label: 'Классические' },
    { id: '12-string', label: '12-струнные & Баритон' },
  ];

  const mainNavItems: { id: NavigationPage; label: string }[] = [
    { id: 'brands', label: 'Бренды' },
    { id: 'genres', label: 'Жанры' },
    { id: 'anatomy', label: 'Устройство' },
    { id: 'pickups', label: 'Электроника' },
    { id: 'effects', label: 'Эффекты' },
    { id: 'amplifiers', label: 'Усилители' },
  ];

  const secondaryNavItems: { id: NavigationPage; label: string }[] = [
    { id: 'glossary', label: 'Словарь терминов' },
    { id: 'guides', label: 'Гайды & Обслуживание' },
    { id: 'tools', label: 'Инструменты: Тюнер & Метроном' },
    { id: 'quiz', label: 'Подбор гитары (Тест)' },
    { id: 'prices', label: 'Цены & Бюджетные сетапы' },
    { id: 'history', label: 'История & Музыканты' },
    { id: 'comparison', label: 'Сравнение моделей' },
  ];

  const handleNavClick = (page: NavigationPage, category?: string) => {
    navigateTo(page, undefined, category);
    setIsMobileMenuOpen(false);
    setIsGuitarsDropdownOpen(false);
    setIsMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/85 dark:bg-zinc-950/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark conforming strictly to Top Bar Contract */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-display text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-amber-500 transition-colors shrink-0"
        >
          GuitarWorld
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-zinc-300">
          {/* Guitars with quick category dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsGuitarsDropdownOpen(!isGuitarsDropdownOpen)}
              className={`flex items-center gap-1 py-1 transition-colors whitespace-nowrap ${
                activePage === 'guitars'
                  ? 'text-amber-500 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>Гитары</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isGuitarsDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsGuitarsDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-52 p-2 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl z-20 flex flex-col gap-1">
                  {guitarCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick('guitars', cat.id)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activePage === 'guitars'
                          ? 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap transition-colors py-1 ${
                activePage === item.id
                  ? 'text-amber-500 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* "Ещё" Dropdown for secondary pages */}
          <div className="relative">
            <button
              onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
              className="flex items-center gap-1 text-zinc-300 hover:text-white py-1 transition-colors whitespace-nowrap"
            >
              <span>Разделы</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isMoreDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMoreDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl z-20 flex flex-col gap-1">
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activePage === item.id
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="h-px bg-zinc-800 my-1" />
                  <button
                    onClick={() => handleNavClick('quiz')}
                    className="flex items-center gap-2 text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Мастер подбора гитары</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Zone 3: 1-2 primary actions & utility affordances */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Global Search trigger with Cmd+K hint */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
            title="Поиск по сайту (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Поиск</span>
            <kbd className="hidden md:inline text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Comparison button with counter */}
          <button
            onClick={() => handleNavClick('comparison')}
            className={`relative p-2 rounded-lg transition-colors ${
              compareList.length > 0
                ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
            title="Сравнение гитар"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Favorites button */}
          <button
            onClick={() => handleNavClick('profile')}
            className={`relative p-2 rounded-lg transition-colors ${
              favorites.length > 0
                ? 'text-rose-400 bg-rose-500/10 hover:bg-rose-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
            title="Избранное и профиль"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Text Size adjuster */}
          <button
            onClick={cycleFontSize}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            title={`Размер текста: ${fontSize.toUpperCase()}`}
          >
            <Type className="w-4 h-4" />
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/YUsik14-create"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            title="GitHub (YUsik14-create)"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Admin panel launcher */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden sm:flex p-2 rounded-lg transition-colors ${
              activePage === 'admin'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
            title="Демо-админ панель"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Меню"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 py-1">
              Каталог гитар
            </p>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {guitarCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick('guitars', cat.id)}
                  className="text-left px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 py-1">
              Энциклопедия и устройство
            </p>
            <div className="space-y-1 mt-1">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePage === item.id
                      ? 'bg-amber-500/10 text-amber-400 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 py-1">
              Инструменты, гайды и справочники
            </p>
            <div className="space-y-1 mt-1">
              {secondaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePage === item.id
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => handleNavClick('quiz')}
              className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold rounded-lg text-xs text-center transition-colors"
            >
              Подобрать гитару
            </button>
            <a
              href="https://github.com/YUsik14-create"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs flex items-center justify-center transition-colors"
              title="GitHub (YUsik14-create)"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => handleNavClick('admin')}
              className="py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs text-center transition-colors"
            >
              Админ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
