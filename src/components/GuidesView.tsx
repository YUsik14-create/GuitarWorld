import React, { useState } from 'react';
import { ARTICLES_DATA } from '../data/guidesData';
import { TROUBLESHOOTING_DATA } from '../data/troubleshootingData';
import { ASSEMBLY_STEPS } from '../data/assemblyData';
import { Article } from '../types/guitar';
import {
  BookOpen,
  Wrench,
  AlertTriangle,
  Hammer,
  CheckCircle2,
  Clock,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const GuidesView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'articles' | 'troubleshoot' | 'assembly'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(ARTICLES_DATA[0]);
  const [expandedIssue, setExpandedIssue] = useState<string | null>(TROUBLESHOOTING_DATA[0].id);

  return (
    <div className="py-8 space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          База знаний, гайды и мастерская
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-3xl">
          Обучающие статьи для новичков, интерактивный диагностический гид по устранению проблем и 17 этапов сборки электрогитары.
        </p>
      </div>

      {/* Segmented Sub-Navigation */}
      <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveSubTab('articles')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === 'articles'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Обучающие статьи ({ARTICLES_DATA.length})
        </button>
        <button
          onClick={() => setActiveSubTab('troubleshoot')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === 'troubleshoot'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Что делать, если... ({TROUBLESHOOTING_DATA.length})
        </button>
        <button
          onClick={() => setActiveSubTab('assembly')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === 'assembly'
              ? 'bg-amber-500 text-zinc-950 font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Сборка гитары (17 этапов)
        </button>
      </div>

      {activeSubTab === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Article Cards List */}
          <div className="lg:col-span-4 space-y-3">
            {ARTICLES_DATA.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedArticle?.id === art.id
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2 text-[11px] text-amber-500 font-bold mb-1">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-normal text-zinc-400">{art.readTimeMin} мин</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-100 line-clamp-2">
                  {art.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {art.excerpt}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Selected Article Full Text */}
          {selectedArticle && (
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span className="font-bold text-amber-500">{selectedArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>Автор: {selectedArticle.author}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedArticle.title}
                </h3>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-zinc-300 space-y-4 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-zinc-800 text-[11px] text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'troubleshoot' && (
        /* Diagnostic Interactive Troubleshooter */
        <div className="space-y-4 max-w-4xl">
          <p className="text-xs text-zinc-400">
            Интерактивный мастер первой помощи для гитары. Выберите возникшую проблему:
          </p>

          <div className="space-y-3">
            {TROUBLESHOOTING_DATA.map((item) => {
              const isExpanded = expandedIssue === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-zinc-900/90 border border-zinc-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedIssue(isExpanded ? null : item.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-white">
                          {item.problem}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {item.symptoms[0]}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-zinc-800/80 space-y-4 mt-3">
                      {/* Probable Causes */}
                      <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                          Вероятные причины:
                        </span>
                        <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                          {item.probableCauses.map((cause, i) => (
                            <li key={i}>{cause}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Safe Fixes */}
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                          Безопасные шаги решения:
                        </span>
                        <ul className="text-xs text-zinc-200 space-y-1.5">
                          {item.safeFixes.map((fix, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{fix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Luthier Warning if any */}
                      {item.needsLuthierWarning && (
                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Внимание мастера: </strong>
                            {item.needsLuthierWarning}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === 'assembly' && (
        /* 17 Steps Assembly Roadmap */
        <div className="space-y-6">
          <p className="text-xs text-zinc-400">
            Полный производственный цикл создания профессиональной электрогитары от сырой доски до сцены:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ASSEMBLY_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-amber-500">ЭТАП {step.step} ИЗ 17</span>
                    <span className="text-[11px] text-zinc-400">{step.category}</span>
                  </div>
                  <h4 className="font-bold text-white text-base">{step.title}</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-xs space-y-2">
                  <div>
                    <span className="text-zinc-400 font-semibold block text-[11px]">Необходимые инструменты:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {step.toolsNeeded.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/60 text-[11px] text-amber-300/90">
                    <strong>Секрет мастера:</strong> {step.crucialTips}
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
