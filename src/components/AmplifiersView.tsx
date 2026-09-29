import React, { useState } from 'react';
import { AMPLIFIERS_DATA } from '../data/amplifiersData';
import { soundEngine } from '../utils/audioEngine';
import { Volume2, Sliders, CheckCircle2, XCircle, Zap, Radio } from 'lucide-react';

export const AmplifiersView: React.FC = () => {
  const [selectedAmp, setSelectedAmp] = useState(AMPLIFIERS_DATA[0]);

  // Knobs simulation state
  const [gain, setGain] = useState(50);
  const [bass, setBass] = useState(50);
  const [middle, setMiddle] = useState(60);
  const [treble, setTreble] = useState(65);
  const [presence, setPresence] = useState(50);
  const [master, setMaster] = useState(70);

  const handleTestAmp = () => {
    // Generate sound with tone shaped by gain & treble
    const brightness = (treble + presence) / 200;
    soundEngine.pluckString(110, 2.5, brightness);
  };

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Гитарные усилители и кабинеты
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Ламповые, транзисторные и цифровые моделирующие аппараты: конструкция, ручки управления темброблоком и формирование звучания.
        </p>
      </div>

      {/* Selector of Real Iconic Amps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {AMPLIFIERS_DATA.map((amp) => (
          <button
            key={amp.id}
            onClick={() => setSelectedAmp(amp)}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedAmp.id === amp.id
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">
              {amp.format}
            </span>
            <span className="font-bold text-xs sm:text-sm block mt-0.5 line-clamp-1">
              {amp.name}
            </span>
            <span className="text-[11px] text-zinc-500 mt-1 block">
              {amp.powerWatt}
            </span>
          </button>
        ))}
      </div>

      {/* Main Amp Showcase & Control Deck */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Amplifier Spec & Tone character */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
              <Radio className="w-3.5 h-3.5" />
              <span>{selectedAmp.type}</span>
              <span aria-hidden="true">·</span>
              <span>Формат: {selectedAmp.format}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {selectedAmp.name}
            </h3>
            <p className="text-xs font-mono text-zinc-400 mt-1">Мощность: {selectedAmp.powerWatt}</p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {selectedAmp.description}
          </p>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Характер тембра (Tonal Character):
            </span>
            <p className="text-xs text-zinc-200">{selectedAmp.tonalCharacter}</p>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Плюсы:
              </span>
              <ul className="text-xs text-zinc-300 space-y-1">
                {selectedAmp.pros.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                Минусы:
              </span>
              <ul className="text-xs text-zinc-300 space-y-1">
                {selectedAmp.cons.map((c) => (
                  <li key={c} className="flex items-start gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Interactive Amp Control Faceplate Simulator */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Панель управления (Faceplate)</span>
            </div>
            <button
              onClick={handleTestAmp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Тест звука</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Gain', val: gain, setter: setGain },
              { label: 'Bass', val: bass, setter: setBass },
              { label: 'Middle', val: middle, setter: setMiddle },
              { label: 'Treble', val: treble, setter: setTreble },
              { label: 'Presence', val: presence, setter: setPresence },
              { label: 'Master', val: master, setter: setMaster },
            ].map((k) => (
              <div key={k.label} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">{k.label}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={k.val}
                  onChange={(e) => k.setter(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-zinc-800 rounded cursor-pointer"
                />
                <span className="text-[10px] font-mono text-zinc-400">{k.val}</span>
              </div>
            ))}
          </div>

          {/* Knobs Explanation Reference */}
          <div className="pt-3 border-t border-zinc-800/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              За что отвечают ручки этого усилителя:
            </span>
            <div className="space-y-1.5 text-xs text-zinc-300 max-h-48 overflow-y-auto pr-1">
              {selectedAmp.controlsExplanation.map((c) => (
                <div key={c.knob} className="flex gap-2">
                  <span className="font-semibold text-amber-400 shrink-0">{c.knob}:</span>
                  <span className="text-zinc-400">{c.functionRu}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
