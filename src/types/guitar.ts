export type GuitarType =
  | 'electric'
  | 'acoustic'
  | 'classical'
  | 'bass'
  | '7-string'
  | '8-string'
  | '12-string'
  | 'semi-hollow'
  | 'baritone'
  | 'travel';

export type BodyShape =
  | 'Stratocaster'
  | 'Telecaster'
  | 'Les Paul'
  | 'SG'
  | 'Superstrat'
  | 'Explorer'
  | 'Flying V'
  | 'Jazzmaster'
  | 'Offset'
  | 'Singlecut'
  | 'Dreadnought'
  | 'Auditorium'
  | 'Classical 4/4'
  | 'Modern Bass'
  | 'Headless';

export type PickupConfig = 'SSS' | 'HSS' | 'HSH' | 'HH' | 'SS' | 'P90' | 'Piezo' | 'Single' | 'H' | 'Acoustic-Mic';

export type ElectronicsType = 'Passive' | 'Active' | 'Acoustic-Preamp' | 'Passive+Piezo';

export type BridgeType =
  | 'Fixed (Hardtail)'
  | 'Vintage Tremolo'
  | 'Floyd Rose (Double Locking)'
  | 'Tune-O-Matic'
  | 'Bigsby'
  | 'Acoustic Pin Bridge'
  | 'Classical Tie Block'
  | 'Modern Bass Bridge';

export type PlayerLevel = 'Новичок' | 'Любитель' | 'Продвинутый' | 'Профессионал';

export interface SoundProfile {
  brightness: number; // 0 - 100
  warmth: number;
  aggression: number;
  clarity: number;
  density: number;
  sustain: number;
}

export interface GuitarSpecs {
  bodyWood: string;
  neckWood: string;
  fretboardWood: string;
  fretsCount: number;
  scaleLength: string; // e.g. "25.5\" (648 мм)"
  scaleLengthInches: number;
  nutWidth: string; // e.g. "42.8 мм"
  fretboardRadius: string; // e.g. "9.5\""
  bridge: BridgeType;
  tuners: string;
  pickups: string;
  pickupConfig: PickupConfig;
  controls: string;
  electronics: ElectronicsType;
  weightKg: number;
  originCountry: string;
}

export interface Guitar {
  id: string;
  name: string;
  brand: string;
  yearCreated: number;
  type: GuitarType;
  priceEstimateUSD: number;
  priceNote: string;
  image: string;
  description: string;
  specs: GuitarSpecs;
  soundProfile: SoundProfile;
  soundDescription: string;
  pros: string[];
  features: string[];
  suitableGenres: string[];
  playerLevel: PlayerLevel;
  history: string;
  famousArtists: string[];
  similarModelIds: string[];
  rating: number;
  isPopular?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  foundedYear: number;
  description: string;
  famousSeries: string[];
  popularModels: string[];
  priceTiers: string;
  signatureArtists: string[];
  philosophy: string;
  historySummary: string;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  recommendedGuitarTypes: string[];
  stringsCount: string;
  pickups: string;
  tunings: string[];
  ampStyle: string;
  effects: string[];
  toneRecipe: string;
  icon: string;
  famousArtists: string[];
}

export interface EffectPedal {
  id: string;
  name: string;
  category: 'Drive' | 'Modulation' | 'Time/Space' | 'Dynamic/Utility';
  description: string;
  howItWorks: string;
  soundDescription: string;
  placementInChain: string;
  typicalSettings: { knob: string; value: string; hint: string }[];
  knobs: { id: string; label: string; min: number; max: number; defaultVal: number; step?: number }[];
  accentColor: string;
  audioEffectType: 'overdrive' | 'distortion' | 'fuzz' | 'delay' | 'reverb' | 'chorus' | 'tremolo' | 'equalizer';
}

export interface Amplifier {
  id: string;
  name: string;
  type: 'Ламповый (Tube)' | 'Транзисторный (Solid-State)' | 'Цифровой моделирующий (Digital)';
  format: 'Комбо' | 'Голова + Кабинет' | 'Предусилитель';
  powerWatt: string;
  description: string;
  tonalCharacter: string;
  controlsExplanation: { knob: string; functionRu: string }[];
  bestForGenres: string[];
  pros: string[];
  cons: string[];
}

export interface Article {
  id: string;
  title: string;
  category: 'Для новичков' | 'Электрогитара' | 'Акустика' | 'Электроника' | 'Обслуживание' | 'Звук и сетап' | 'Теория';
  readTimeMin: number;
  publishedDate: string;
  author: string;
  excerpt: string;
  content: string[]; // Structured paragraphs/subheadings
  tags: string[];
}

export interface Term {
  id: string;
  term: string;
  russianName: string;
  definition: string;
  simpleExplanation: string;
  practicalImpact: string;
  category: 'Конструкция' | 'Звукосниматели' | 'Электроника' | 'Звук и эффекты' | 'Настройка';
}

export interface Tuning {
  id: string;
  name: string;
  stringsCount: number;
  notes: string[]; // e.g. ["E2", "A2", "D3", "G3", "B3", "E4"]
  frequencies: number[]; // e.g. [82.41, 110.00, 146.83, 196.00, 246.94, 329.63]
  description: string;
  popularGenres: string[];
}

export interface ChordDiagram {
  id: string;
  name: string;
  type: 'Major' | 'Minor' | '7' | 'Maj7' | 'm7' | 'sus2' | 'sus4' | 'dim' | 'aug';
  frets: number[]; // 6 elements: -1 for muted (X), 0 for open, 1-12 for fret
  baseFret: number;
  fingerings: number[]; // 0 for none, 1-4 for index, middle, ring, pinky
  barre?: { fret: number; fromString: number; toString: number };
}

export interface TroubleshootingItem {
  id: string;
  problem: string;
  symptoms: string[];
  probableCauses: string[];
  safeFixes: string[];
  needsLuthierWarning?: string;
}

export interface BudgetSetupItem {
  category: string;
  name: string;
  priceUSD: number;
  whyChosen: string;
}

export interface BudgetSetup {
  id: string;
  budgetUSD: number;
  title: string;
  description: string;
  items: BudgetSetupItem[];
  totalActualUSD: number;
  idealFor: string;
}

export interface ActivePedalInstance {
  instanceId: string;
  pedalId: string;
  isEnabled: boolean;
  knobValues: Record<string, number>;
}
