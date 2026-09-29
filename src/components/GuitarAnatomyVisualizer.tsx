import React, { useState } from 'react';
import { GUITAR_ANATOMY_PARTS, SIGNAL_CHAIN_STAGES, AnatomyPart, SignalStage } from '../data/anatomyData';
import { soundEngine } from '../utils/audioEngine';
import {
  Activity,
  Zap,
  Sliders,
  Layers,
  Volume2,
  Cpu,
  Speaker,
  Play,
  Info,
  CheckCircle,
  AlertTriangle,
  Wrench,
  ChevronRight
} from 'lucide-react';

export const GuitarAnatomyVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'physics'>('physics');

  // Selected Anatomy Part
  const [selectedPart, setSelectedPart] = useState<AnatomyPart>(GUITAR_ANATOMY_PARTS[0]);

  // Selected Signal Chain Stage
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isPlayingChain, setIsPlayingChain] = useState<boolean>(false);

  const handleStepPlay = (idx: number) => {
    setActiveStageIndex(idx);
    // Play pitch corresponding to step
    const tones = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63, 440.0];
    soundEngine.pluckString(tones[idx % tones.length], 2.0, 0.7);
  };

  const handleAutoChainPlay = () => {
    if (isPlayingChain) return;
    setIsPlayingChain(true);
    let current = 0;
    const interval = setInterval(() => {
      handleStepPlay(current);
      current++;
      if (current >= SIGNAL_CHAIN_STAGES.length) {
        clearInterval(interval);
        setIsPlayingChain(false);
      }
    }, 1200);
  };

  const currentStage = SIGNAL_CHAIN_STAGES[activeStageIndex];

  return (
    <div className="py-8 space-y-10">
      {/* Page Header */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Как работает гитара: анатомия и физика звука
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          От физических колебаний стальной струны и закона индукции Фарадея до строения каждой детали инструмента.
        </p>
      </div>

      {/* Segmented Mode Selector */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('physics')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'physics'
              ? 'bg-amber-500 text-zinc-950 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          1. Физическая цепь создания звука
        </button>
        <button
          onClick={() => setActiveTab('anatomy')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'anatomy'
              ? 'bg-amber-500 text-zinc-950 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          2. Интерактивная анатомия деталей гитары
        </button>
      </div>

      {activeTab === 'physics' ? (
        /* Section 1: Physical Signal Chain */
        <div className="space-y-8">
          {/* Signal Chain Stage Pills */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Цепочка: Струна → Индукция → Кабель → Эффекты → Предусилитель → Усилитель → Динамик
              </span>
              <button
                onClick={handleAutoChainPlay}
                disabled={isPlayingChain}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlayingChain ? 'Воспроизведение...' : 'Запустить демонстрацию'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {SIGNAL_CHAIN_STAGES.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => handleStepPlay(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeStageIndex === idx
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-amber-500">#{st.stageNumber}</span>
                  </div>
                  <p className="text-xs font-semibold leading-tight line-clamp-2">
                    {st.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Stage Exploration Stage */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Этап #{currentStage.stageNumber}: {currentStage.subTitle}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {currentStage.title}
                </h3>
              </div>

              {/* Scientific physics explanation */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Activity className="w-4 h-4" />
                  <span>Физические основы процесса</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {currentStage.physicsDescription}
                </p>
              </div>

              {/* "Простыми словами" callout as requested in #46 */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Объяснение простыми словами:
                </span>
                <p className="text-xs sm:text-sm text-zinc-200">
                  {currentStage.explanationSimple}
                </p>
              </div>
            </div>

            {/* Right: Technical Parameters Spec */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Ключевые величины этапа</span>
              </h4>
              <div className="space-y-3">
                {currentStage.keyParameters.map((param) => (
                  <div key={param.label} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">{param.label}</span>
                    <span className="text-xs font-semibold text-zinc-100 font-mono mt-0.5 block">
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => soundEngine.pluckString(220 * (activeStageIndex + 1), 1.5, 0.8)}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Прослушать гармоники этапа</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Section 2: Interactive Guitar Anatomy */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive list of parts */}
          <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-1">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 px-1">
              Выберите деталь гитары ({GUITAR_ANATOMY_PARTS.length}):
            </p>
            {GUITAR_ANATOMY_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPart(part)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                  selectedPart.id === part.id
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <span className="text-sm font-semibold block group-hover:text-amber-400 transition-colors">
                    {part.russianName}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {part.name} · {part.category}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedPart.id === part.id ? 'text-amber-500 translate-x-1' : 'text-zinc-600'}`} />
              </button>
            ))}
          </div>

          {/* Right: Selected Part Deep Dive Inspector */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                Категория: {selectedPart.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {selectedPart.russianName} ({selectedPart.name})
              </h3>
            </div>

            {/* What is it & Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Что это такое:</span>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedPart.whatIsIt}</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Основное назначение:</span>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedPart.purpose}</p>
              </div>
            </div>

            {/* Materials and Sound Impact */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Материалы изготовления:
                </span>
                <p className="text-xs text-zinc-200">{selectedPart.materials}</p>
              </div>
              <div className="pt-2 border-t border-zinc-800/60">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Влияние на звучание:
                </span>
                <p className="text-xs text-zinc-200">{selectedPart.influenceOnSound}</p>
              </div>
            </div>

            {/* Failures & Maintenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Типичные поломки:</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedPart.howItFails}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Правильный уход:</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedPart.maintenanceTips}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
