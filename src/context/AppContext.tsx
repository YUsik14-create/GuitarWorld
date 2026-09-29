import React, { createContext, useContext, useState, useEffect } from 'react';
import { Guitar, ActivePedalInstance } from '../types/guitar';
import { INITIAL_GUITARS } from '../data/guitarsData';

export type NavigationPage =
  | 'home'
  | 'guitars'
  | 'guitar-detail'
  | 'comparison'
  | 'quiz'
  | 'brands'
  | 'genres'
  | 'anatomy'
  | 'pickups'
  | 'effects'
  | 'amplifiers'
  | 'glossary'
  | 'guides'
  | 'tools'
  | 'prices'
  | 'history'
  | 'profile'
  | 'admin';

interface AppContextType {
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
  cycleFontSize: () => void;

  activePage: NavigationPage;
  selectedGuitarId: string | null;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  navigateTo: (page: NavigationPage, guitarId?: string, category?: string) => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  compareList: string[];
  addToCompare: (id: string) => boolean; // returns false if max 4 reached
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  allGuitars: Guitar[];
  addCustomGuitar: (guitar: Guitar) => void;
  deleteCustomGuitar: (id: string) => void;

  customPedalboard: ActivePedalInstance[];
  setCustomPedalboard: (pedals: ActivePedalInstance[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  THEME: 'gw_theme',
  FONT_SIZE: 'gw_font_size',
  FAVORITES: 'gw_favorites',
  COMPARE: 'gw_compare',
  CUSTOM_GUITARS: 'gw_custom_guitars',
  PEDALBOARD: 'gw_pedalboard',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Font size state
  const [fontSize, setFontSizeState] = useState<'sm' | 'base' | 'lg'>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FONT_SIZE);
    return saved === 'sm' || saved === 'lg' ? saved : 'base';
  });

  // Navigation state
  const [activePage, setActivePage] = useState<NavigationPage>('home');
  const [selectedGuitarId, setSelectedGuitarId] = useState<string | null>('fender-stratocaster');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['fender-stratocaster', 'gibson-les-paul-standard-50s'];
    } catch {
      return ['fender-stratocaster'];
    }
  });

  // Compare state (up to 4 items)
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COMPARE);
      return saved ? JSON.parse(saved) : ['fender-stratocaster', 'gibson-les-paul-standard-50s'];
    } catch {
      return ['fender-stratocaster', 'gibson-les-paul-standard-50s'];
    }
  });

  // Global search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Custom guitars (for Admin demonstration)
  const [customGuitars, setCustomGuitars] = useState<Guitar[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOM_GUITARS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom pedalboard
  const [customPedalboard, setCustomPedalboardState] = useState<ActivePedalInstance[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PEDALBOARD);
      return saved
        ? JSON.parse(saved)
        : [
            { instanceId: 'inst-1', pedalId: 'precision-compressor', isEnabled: true, knobValues: { sustain: 50, attack: 40, level: 70 } },
            { instanceId: 'inst-2', pedalId: 'tube-screamer-od', isEnabled: true, knobValues: { drive: 30, tone: 55, level: 80 } },
            { instanceId: 'inst-3', pedalId: 'tape-analog-delay', isEnabled: true, knobValues: { time: 380, feedback: 35, mix: 30 } },
            { instanceId: 'inst-4', pedalId: 'ambient-spring-reverb', isEnabled: true, knobValues: { decay: 45, tone: 50, mix: 25 } },
          ];
    } catch {
      return [];
    }
  });

  // Enforce dark musical theme permanently
  useEffect(() => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.THEME);
    } catch {
      // ignore storage access errors
    }
    document.documentElement.classList.remove('theme-light');
    document.body.classList.remove('theme-light', 'bg-slate-50', 'text-slate-900');
    document.body.classList.add('bg-zinc-950', 'text-zinc-100');
  }, []);

  // Sync font size
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FONT_SIZE, fontSize);
    document.documentElement.classList.remove('text-size-sm', 'text-size-base', 'text-size-lg');
    document.documentElement.classList.add(`text-size-${fontSize}`);
  }, [fontSize]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  // Sync compare list
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
  }, [compareList]);

  // Sync custom guitars
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CUSTOM_GUITARS, JSON.stringify(customGuitars));
  }, [customGuitars]);

  // Sync pedalboard
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PEDALBOARD, JSON.stringify(customPedalboard));
  }, [customPedalboard]);

  // Key shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setFontSize = (size: 'sm' | 'base' | 'lg') => {
    setFontSizeState(size);
  };

  const cycleFontSize = () => {
    setFontSizeState((prev) => (prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'sm'));
  };

  const navigateTo = (page: NavigationPage, guitarId?: string, category?: string) => {
    setActivePage(page);
    if (guitarId) {
      setSelectedGuitarId(guitarId);
    }
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCompare = (id: string): boolean => {
    if (compareList.includes(id)) return true;
    if (compareList.length >= 4) return false;
    setCompareList((prev) => [...prev, id]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const isInCompare = (id: string) => compareList.includes(id);

  const clearCompare = () => setCompareList([]);

  const allGuitars = [...INITIAL_GUITARS, ...customGuitars];

  const addCustomGuitar = (guitar: Guitar) => {
    setCustomGuitars((prev) => [guitar, ...prev]);
  };

  const deleteCustomGuitar = (id: string) => {
    setCustomGuitars((prev) => prev.filter((g) => g.id !== id));
  };

  const setCustomPedalboard = (pedals: ActivePedalInstance[]) => {
    setCustomPedalboardState(pedals);
  };

  return (
    <AppContext.Provider
      value={{
        fontSize,
        setFontSize,
        cycleFontSize,
        activePage,
        selectedGuitarId,
        selectedCategory,
        setSelectedCategory,
        navigateTo,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isSearchOpen,
        setIsSearchOpen,
        allGuitars,
        addCustomGuitar,
        deleteCustomGuitar,
        customPedalboard,
        setCustomPedalboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
