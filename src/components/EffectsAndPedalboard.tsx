import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EFFECTS_DATA } from '../data/effectsData';
import { soundEngine } from '../utils/audioEngine';
import { EffectPedal, ActivePedalInstance } from '../types/guitar';
import {
  Sliders,
  Plus,
  Trash2,
  Power,
  Volume2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Save,
  Check
} from 'lucide-react';

export const EffectsAndPedalboard: React.FC = () => {
  const { customPedalboard, setCustomPedalboard } = useApp();
  const [activeTab, setActiveTab] = useState<'board' | 'catalog'>('board');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add pedal to custom board
  const handleAddPedal = (pedalId: string) => {
    const pedalDef = EFFECTS_DATA.find((p) => p.id === pedalId);
    if (!pedalDef) return;

    const defaultKnobs: Record<string, number> = {};
    pedalDef.knobs.forEach((k) => {
      defaultKnobs[k.id] = k.defaultVal;
    });

    const newInstance: ActivePedalInstance = {
      instanceId: `pedal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      pedalId,
      isEnabled: true,
      knobValues: defaultKnobs,
    };

    setCustomPedalboard([...customPedalboard, newInstance]);
  };

  // Remove pedal
  const handleRemovePedal = (instanceId: string) => {
    setCustomPedalboard(customPedalboard.filter((p) => p.instanceId !== instanceId));
  };

  // Toggle pedal state
  const handleTogglePedal = (instanceId: string) => {
    setCustomPedalboard(
      customPedalboard.map((p) =>
        p.instanceId === instanceId ? { ...p, isEnabled: !p.isEnabled } : p
      )
    );
  };

  // Move pedal left in signal chain
  const handleMoveLeft = (index: number) => {
    if (index === 0) return;
    const newBoard = [...customPedalboard];
    const temp = newBoard[index - 1];
    newBoard[index - 1] = newBoard[index];
    newBoard[index] = temp;
    setCustomPedalboard(newBoard);
  };

  // Move pedal right in signal chain
  const handleMoveRight = (index: number) => {
    if (index === customPedalboard.length - 1) return;
    const newBoard = [...customPedalboard];
    const temp = newBoard[index + 1];
    newBoard[index + 1] = newBoard[index];
    newBoard[index] = temp;
    setCustomPedalboard(newBoard);
  };

  // Update knob value
  const handleKnobChange = (instanceId: string, knobId: string, value: number) => {
    setCustomPedalboard(
      customPedalboard.map((p) =>
        p.instanceId === instanceId
          ? { ...p, knobValues: { ...p.knobValues, [knobId]: value } }
          : p
      )
    );
  };

  // Test sound of the current custom board
  const handleTestBoardAudio = () => {
    const activeEffectTypes = customPedalboard
      .filter((p) => p.isEnabled)
      .map((p) => {
        const def = EFFECTS_DATA.find((item) => item.id === p.pedalId);
        return def ? def.audioEffectType : '';
      })
      .filter(Boolean);

    soundEngine.playPedalboardDemo(activeEffectTypes, 220);
  };

  const handleSaveBoard = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Педали эффектов и конструктор педалборда
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Изучайте принципы работы гитарных эффектов и собирайте интерактивную цепочку с реальным звуком.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('board')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'board'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Конструктор педалборда ({customPedalboard.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Каталог эффектов
          </button>
        </div>
      </div>

      {activeTab === 'board' ? (
        /* Interactive Pedalboard Builder Stage */
        <div className="space-y-6">
          {/* Signal Chain Controls Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Сигнал: Гитара →
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {customPedalboard.length} эффектов в цепи
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                → Усилитель
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleTestBoardAudio}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Прослушать цепочку</span>
              </button>

              <button
                onClick={handleSaveBoard}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Сохранено!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Сохранить сетап</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Pedalboard Rack Floor */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-2xl relative min-h-[380px] flex items-center overflow-x-auto">
            {/* Metallic rails texture simulation */}
            <div className="absolute inset-x-0 top-6 h-3 bg-zinc-900 border-y border-zinc-800/50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-6 h-3 bg-zinc-900 border-y border-zinc-800/50 pointer-events-none" />

            {customPedalboard.length === 0 ? (
              <div className="w-full text-center py-12 space-y-3">
                <Sliders className="w-12 h-12 text-zinc-700 mx-auto" />
                <p className="text-sm font-semibold text-zinc-300">Педалборд пуст</p>
                <p className="text-xs text-zinc-500">Добавьте педали из каталога снизу, чтобы построить сигнальную цепочку.</p>
              </div>
            ) : (
              <div className="flex items-center gap-4 py-4 w-full">
                {customPedalboard.map((instance, idx) => {
                  const def = EFFECTS_DATA.find((p) => p.id === instance.pedalId);
                  if (!def) return null;

                  return (
                    <div
                      key={instance.instanceId}
                      className="shrink-0 w-52 sm:w-56 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl p-4 flex flex-col justify-between space-y-4 relative transition-all"
                      style={{
                        boxShadow: instance.isEnabled
                          ? `0 10px 25px -5px ${def.accentColor}25, 0 8px 10px -6px ${def.accentColor}20`
                          : undefined,
                      }}
                    >
                      {/* Pedal Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: instance.isEnabled ? def.accentColor : '#52525b' }}
                          />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                            #{idx + 1} {def.category}
                          </span>
                        </div>

                        {/* Reorder and Delete controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveLeft(idx)}
                            disabled={idx === 0}
                            className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                            title="Сдвинуть влево в цепи"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveRight(idx)}
                            disabled={idx === customPedalboard.length - 1}
                            className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                            title="Сдвинуть вправо в цепи"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRemovePedal(instance.instanceId)}
                            className="p-1 text-zinc-500 hover:text-rose-400"
                            title="Удалить педаль"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Pedal Name */}
                      <div className="text-center py-1">
                        <h4 className="font-bold text-zinc-100 text-sm">{def.name}</h4>
                      </div>

                      {/* Knobs Grid */}
                      <div className="grid grid-cols-2 gap-3 py-1">
                        {def.knobs.map((knob) => {
                          const currentVal = instance.knobValues[knob.id] ?? knob.defaultVal;
                          return (
                            <div key={knob.id} className="text-center space-y-1">
                              <span className="text-[10px] text-zinc-400 font-medium block">
                                {knob.label}
                              </span>
                              <input
                                type="range"
                                min={knob.min}
                                max={knob.max}
                                step={knob.step ?? 1}
                                value={currentVal}
                                onChange={(e) =>
                                  handleKnobChange(instance.instanceId, knob.id, Number(e.target.value))
                                }
                                className="w-full accent-amber-500 h-1 bg-zinc-800 rounded cursor-pointer"
                              />
                              <span className="text-[10px] font-mono text-zinc-500">{currentVal}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footswitch Stomp Button */}
                      <div className="pt-2 border-t border-zinc-800 flex justify-center">
                        <button
                          onClick={() => handleTogglePedal(instance.instanceId)}
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                            instance.isEnabled
                              ? 'bg-zinc-800 border-amber-400 text-amber-400 shadow-lg'
                              : 'bg-zinc-950 border-zinc-700 text-zinc-600'
                          }`}
                          title={instance.isEnabled ? 'Выключить (Bypass)' : 'Включить'}
                        >
                          <Power className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Add Tray */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Быстрое добавление педалей в педалборд:
            </span>
            <div className="flex flex-wrap gap-2">
              {EFFECTS_DATA.map((pedal) => (
                <button
                  key={pedal.id}
                  onClick={() => handleAddPedal(pedal.id)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/50 text-xs text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-500" />
                  <span>{pedal.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Full Effects Educational Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EFFECTS_DATA.map((pedal) => (
            <div
              key={pedal.id}
              className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${pedal.accentColor}20`, color: pedal.accentColor }}
                  >
                    {pedal.category}
                  </span>
                  <button
                    onClick={() => soundEngine.playPedalboardDemo([pedal.audioEffectType], 220)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 text-zinc-300 hover:text-zinc-950 transition-colors"
                    title="Послушать эффект"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-bold text-lg text-white">{pedal.name}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{pedal.description}</p>

                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs space-y-1">
                  <span className="font-semibold text-zinc-400 block">Как работает физически:</span>
                  <p className="text-zinc-300">{pedal.howItWorks}</p>
                </div>

                <div className="text-xs text-zinc-400">
                  <span className="font-semibold text-zinc-300">Место в цепочке: </span>
                  <span>{pedal.placementInChain}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  handleAddPedal(pedal.id);
                  setActiveTab('board');
                }}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить в свой педалборд</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
