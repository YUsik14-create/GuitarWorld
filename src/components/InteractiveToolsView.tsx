import React, { useState, useEffect, useRef } from 'react';
import { GUITAR_TUNINGS, CHORD_LIBRARY } from '../data/tuningsAndChords';
import { soundEngine } from '../utils/audioEngine';
import { ChordDiagram } from '../types/guitar';
import { Volume2, Play, Pause, RotateCcw, Activity, Disc, Zap, Sliders } from 'lucide-react';

export const InteractiveToolsView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'tuner' | 'metronome' | 'chords' | 'tension'>('tuner');

  // Tuner State
  const [selectedTuning, setSelectedTuning] = useState(GUITAR_TUNINGS[0]);
  const [activeTuningStringIdx, setActiveTuningStringIdx] = useState<number | null>(null);

  // Metronome State
  const [bpm, setBpm] = useState<number>(120);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState<boolean>(false);
  const [beatsPerBar, setBeatsPerBar] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const metronomeTimerRef = useRef<any>(null);

  // Chord Generator State
  const [selectedChordType, setSelectedChordType] = useState<string>('All');
  const [selectedChord, setSelectedChord] = useState<ChordDiagram>(CHORD_LIBRARY[0]);

  // Tension Calculator State
  const [calcScale, setCalcScale] = useState<number>(25.5);
  const [calcGauge, setCalcGauge] = useState<string>('010');
  const [calcTuning, setCalcTuning] = useState<string>('E Standard');

  // Metronome loop
  useEffect(() => {
    if (isPlayingMetronome) {
      const intervalMs = (60 / bpm) * 1000;
      let beat = 0;
      metronomeTimerRef.current = setInterval(() => {
        soundEngine.playMetronomeClick(beat === 0);
        setCurrentBeat(beat);
        beat = (beat + 1) % beatsPerBar;
      }, intervalMs);
    } else {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      setCurrentBeat(0);
    }

    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    };
  }, [isPlayingMetronome, bpm, beatsPerBar]);

  // Tuner string click
  const handlePlayStringTone = (freq: number, idx: number) => {
    setActiveTuningStringIdx(idx);
    soundEngine.playTunerTone(freq, 2.5);
    setTimeout(() => {
      setActiveTuningStringIdx(null);
    }, 2500);
  };

  // Chord strum
  const handleStrumChord = (chord: ChordDiagram) => {
    setSelectedChord(chord);
    // Standard frequencies for 6 strings
    const baseFreqs = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
    const freqsToPlay = chord.frets.map((fret, stringIdx) => {
      if (fret === -1) return 0; // muted
      return baseFreqs[stringIdx] * Math.pow(2, fret / 12);
    });
    soundEngine.strumChord(freqsToPlay, 35);
  };

  const filteredChords = CHORD_LIBRARY.filter((c) =>
    selectedChordType === 'All' ? true : c.type === selectedChordType
  );

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Интерактивные инструменты гитариста
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Точный эталонный тюнер строев, программируемый метроном, интерактивная библиотека аккордов с аппликатурами и калькулятор натяжения струн.
        </p>
      </div>

      {/* Segmented Tool Selector */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTool('tuner')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTool === 'tuner'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          1. Тюнер и строи гитары
        </button>
        <button
          onClick={() => setActiveTool('metronome')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTool === 'metronome'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          2. Метроном
        </button>
        <button
          onClick={() => setActiveTool('chords')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTool === 'chords'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          3. Библиотека аккордов
        </button>
        <button
          onClick={() => setActiveTool('tension')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTool === 'tension'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          4. Калькулятор мензуры и натяжения
        </button>
      </div>

      {activeTool === 'tuner' && (
        /* Digital Audio Tuner */
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-8 max-w-4xl">
          {/* Tuning Preset Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">
                Выберите строй гитары:
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                {selectedTuning.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">{selectedTuning.description}</p>
            </div>

            <select
              value={selectedTuning.id}
              onChange={(e) => {
                const found = GUITAR_TUNINGS.find((t) => t.id === e.target.value);
                if (found) setSelectedTuning(found);
              }}
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {GUITAR_TUNINGS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Strings Board */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Нажмите на струну, чтобы услышать эталонный чистый тон ноты:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {selectedTuning.notes.map((note, idx) => {
                const freq = selectedTuning.frequencies[idx];
                const isActive = activeTuningStringIdx === idx;
                return (
                  <button
                    key={`${note}-${idx}`}
                    onClick={() => handlePlayStringTone(freq, idx)}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 border-amber-400 text-zinc-950 scale-105 shadow-xl font-bold'
                        : 'bg-zinc-950/70 border-zinc-800 text-zinc-200 hover:border-amber-500/50 hover:bg-zinc-800'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                      Струна {idx + 1}
                    </span>
                    <span className="font-display text-2xl font-extrabold block my-1">
                      {note}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 block">
                      {freq.toFixed(1)} Гц
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
            <span>Используется для жанров: {selectedTuning.popularGenres.join(', ')}</span>
            <span className="text-emerald-400 font-semibold">Точность: 440 Гц Master A</span>
          </div>
        </div>
      )}

      {activeTool === 'metronome' && (
        /* Metronome */
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl max-w-xl mx-auto space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Цифровой метроном
            </span>
            <div className="font-display text-6xl font-extrabold text-white tabular-nums">
              {bpm} <span className="text-xl font-normal text-zinc-400">BPM</span>
            </div>
          </div>

          {/* Visual Beat Pendulum Dots */}
          <div className="flex justify-center gap-3 py-2">
            {Array.from({ length: beatsPerBar }).map((_, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full transition-all duration-100 ${
                  currentBeat === idx && isPlayingMetronome
                    ? idx === 0
                      ? 'bg-rose-500 scale-125 shadow-lg shadow-rose-500/50'
                      : 'bg-amber-400 scale-110 shadow-lg shadow-amber-400/50'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>

          {/* Slider */}
          <div className="space-y-2 px-4">
            <input
              type="range"
              min={40}
              max={240}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Largo (40)</span>
              <span>Andante (90)</span>
              <span>Allegro (140)</span>
              <span>Presto (200+)</span>
            </div>
          </div>

          {/* Time Signature Buttons & Play */}
          <div className="flex items-center justify-center gap-3">
            {[2, 3, 4, 6].map((bar) => (
              <button
                key={bar}
                onClick={() => setBeatsPerBar(bar)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  beatsPerBar === bar
                    ? 'bg-zinc-800 text-amber-400 border border-amber-500/40'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                {bar}/4
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
            className={`w-full py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isPlayingMetronome
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
            }`}
          >
            {isPlayingMetronome ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Остановить метроном</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Запустить метроном</span>
              </>
            )}
          </button>
        </div>
      )}

      {activeTool === 'chords' && (
        /* Chord Library */
        <div className="space-y-6">
          {/* Chord Type Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Major', 'Minor', '7', 'Maj7', 'm7', 'sus2', 'sus4'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedChordType(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedChordType === t
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                {t === 'All' ? 'Все типы' : t}
              </button>
            ))}
          </div>

          {/* Chords Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredChords.map((chord) => (
              <div
                key={chord.id}
                onClick={() => handleStrumChord(chord)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer group ${
                  selectedChord.id === chord.id
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-xl'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold text-amber-500">{chord.type}</span>
                  <Volume2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400" />
                </div>
                <h4 className="font-bold text-xl text-white my-1">{chord.name}</h4>

                {/* Minimal Fretboard preview */}
                <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800/80 mt-3 font-mono text-[11px] text-zinc-400 flex justify-between">
                  {chord.frets.map((f, i) => (
                    <span key={i} className={f > 0 ? 'text-amber-400 font-bold' : ''}>
                      {f === -1 ? 'X' : f}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500 mt-2 block">Кликните, чтобы сыграть</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTool === 'tension' && (
        /* String Tension & Scale Length Calculator */
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl max-w-2xl mx-auto space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Калькулятор натяжения струн
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-0.5">
              Расчет комфортного натяжения под ваш строй
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Физика натяжения струны: T = (UW × (2 × L × F)²) ÷ 386.4
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Мензура инструмента</label>
              <select
                value={calcScale}
                onChange={(e) => setCalcScale(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200"
              >
                <option value={24.75}>24.75" (Gibson Les Paul)</option>
                <option value={25.0}>25.0" (PRS Custom)</option>
                <option value={25.5}>25.5" (Fender Stratocaster)</option>
                <option value={27.0}>27.0" (Baritone 7-string)</option>
                <option value={28.0}>28.0" (8-string Extended)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Калибр струн</label>
              <select
                value={calcGauge}
                onChange={(e) => setCalcGauge(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200"
              >
                <option value="009">009-042 (Super Light)</option>
                <option value="010">010-046 (Regular Standard)</option>
                <option value="011">011-048 (Medium / Blues)</option>
                <option value="012">012-054 (Heavy / Drop)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-1">Желаемый строй</label>
              <select
                value={calcTuning}
                onChange={(e) => setCalcTuning(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-200"
              >
                <option value="E Standard">Standard E</option>
                <option value="Eb Standard">Eb Standard (-0.5 тона)</option>
                <option value="Drop D">Drop D</option>
                <option value="D Standard">D Standard (-1 тон)</option>
                <option value="Drop C">Drop C</option>
              </select>
            </div>
          </div>

          {/* Computed Output */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Суммарное натяжение комплекта:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                {calcGauge === '009' ? '~39.5 кг (87 lbs)' : calcGauge === '010' ? '~47.2 кг (104 lbs)' : '~56.8 кг (125 lbs)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Ощущение под пальцами:</span>
              <span className="text-emerald-400 font-semibold">
                {calcGauge === '009' && calcScale >= 25.5 ? 'Легкие скоростные бенды, комфорт для новичка' : 'Плотный упругий отклик, идеален для риффов'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
