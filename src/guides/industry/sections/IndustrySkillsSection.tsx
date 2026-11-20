import { KeyboardEvent, useRef, useState } from 'react';
import { BookOpen, Layers, Lightbulb, Lock, RotateCcw } from 'lucide-react';
import {
  CloneFilter,
  IndustryChainTabItem,
  IndustryStarterProductItem,
  SkillItem,
  VisualMode,
} from '../../../types';
import { getCloneBadgeClasses, matchesClone } from '../../../components/ui/cloneBadges';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ADVANCED_CHAINS_PREVIEW } from '../data';

interface IndustrySkillsSectionProps {
  products: IndustryStarterProductItem[];
  skills: SkillItem[];
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetFilters: () => void;
}

const SKILL_CATEGORIES = [
  'Producción e Industria Base',
  'Ciencia e Invención',
  'Comercio y Finanzas',
] as const;

export function IndustrySkillsSection({
  products,
  skills,
  cloneFilter,
  searchQuery,
  visualMode,
  onResetFilters,
}: IndustrySkillsSectionProps) {
  const [activeChainId, setActiveChainId] = useState<IndustryChainTabItem['id']>('ham-t2');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const q = searchQuery.trim().toLowerCase();

  const visibleChains = ADVANCED_CHAINS_PREVIEW.filter(
    (c) =>
      matchesClone(c.clone, cloneFilter) &&
      (!q ||
        c.label.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.inputs.some((inp) => inp.toLowerCase().includes(q)))
  );

  const selectedChain =
    ADVANCED_CHAINS_PREVIEW.find((c) => c.id === activeChainId) ?? ADVANCED_CHAINS_PREVIEW[0];

  const handleChainTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx = idx;
    if (event.key === 'ArrowRight') {
      nextIdx = (idx + 1) % ADVANCED_CHAINS_PREVIEW.length;
    } else if (event.key === 'ArrowLeft') {
      nextIdx = (idx - 1 + ADVANCED_CHAINS_PREVIEW.length) % ADVANCED_CHAINS_PREVIEW.length;
    } else if (event.key === 'Home') {
      nextIdx = 0;
    } else if (event.key === 'End') {
      nextIdx = ADVANCED_CHAINS_PREVIEW.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActiveChainId(ADVANCED_CHAINS_PREVIEW[nextIdx].id);
    tabRefs.current[nextIdx]?.focus();
  };

  const hasAnyContent = products.length > 0 || skills.length > 0 || visibleChains.length > 0;

  if (!hasAnyContent) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún producto ni skill industrial coincide con los filtros actuales.
        </p>
        <p className="text-xs sm:text-sm text-zinc-400">
          Cambia el filtro de Clon o limpia el buscador para ver todas las recomendaciones y la
          Biblia de Skills Industriales.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Limpiar filtros</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. ESTRATEGIAS RECOMENDADAS PARA EMPEZAR (PRODUCTOS DE ALTA ROTACIÓN) */}
      {products.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Módulo 4: Productos de Alta Rotación para Empezar</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Cuatro líneas Tech I con demanda diaria garantizada, bajo coste de BPO y transición
              directa hacia Invención Tech II.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((prod, idx) => (
              <SpotlightCard
                key={prod.id}
                tone="amber"
                className={`border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3 ${
                  visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-amber-400">
                      {idx + 1}. {prod.category}
                    </h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                        prod.clone
                      )}`}
                    >
                      ALPHA & OMEGA
                    </span>
                  </div>

                  {/* Chips con iconos oficiales de EVE */}
                  <div className="flex flex-wrap gap-2">
                    {prod.items.map((item) => (
                      <div
                        key={item.typeId}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-semibold text-zinc-100"
                      >
                        <img
                          src={`https://images.evetech.net/types/${item.typeId}/icon?size=64`}
                          alt=""
                          width={22}
                          height={22}
                          loading="lazy"
                          decoding="async"
                          className="w-5 h-5 rounded object-contain shrink-0"
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {prod.rotationNote}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-zinc-800/80 text-xs text-zinc-300">
                  <strong className="text-amber-300">Escalado T2:</strong> {prod.upgradePath}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* 2. AVANCE DE CADENAS ESPECÍFICAS (HAM T2, MOON GOO, CAPITALES) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Cadenas Específicas Avanzadas (HAM T2, Moon Goo & Capitales)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Resumen técnico de las tres grandes cadenas industriales de especialización Omega.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Cadenas industriales avanzadas"
            className="inline-flex flex-wrap gap-1.5 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800"
          >
            {ADVANCED_CHAINS_PREVIEW.map((chain, index) => {
              const isSelected = selectedChain.id === chain.id;
              const isLocked = cloneFilter === 'alpha' || cloneFilter === 'expert';
              return (
                <button
                  key={chain.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`chain-tab-${chain.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`chain-panel-${chain.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveChainId(chain.id)}
                  onKeyDown={(e) => handleChainTabKeyDown(e, index)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950'
                      : 'text-zinc-300 hover:text-zinc-100'
                  }`}
                >
                  {isLocked && <Lock className="w-3 h-3 shrink-0" aria-hidden="true" />}
                  <span>{chain.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`chain-panel-${selectedChain.id}`}
          role="tabpanel"
          aria-labelledby={`chain-tab-${selectedChain.id}`}
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-4"
        >
          {(cloneFilter === 'alpha' || cloneFilter === 'expert') && (
            <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>
                Cadena exclusiva para cuentas <strong>Omega</strong> (requiere Invención T2,
                Reactions o Capital Ship Construction).
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base font-bold text-amber-400">{selectedChain.title}</h4>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/35">
              {selectedChain.facility}
            </span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">{selectedChain.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-2">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                Insumos y Requisitos Clave
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                {selectedChain.inputs.map((inp) => (
                  <li key={inp}>• {inp}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-2">
              <div className="text-xs font-mono uppercase text-sky-300 font-bold">
                Secuencia de Ejecución
              </div>
              <ol className="space-y-1.5 text-xs sm:text-sm text-zinc-300 list-decimal list-inside">
                {selectedChain.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BIBLIA DE HABILIDADES INDUSTRIALES */}
      {skills.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Habilidades Necesarias (Skills de Industria, Ciencia y Comercio)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Agrupadas por rama técnica con sus límites reales en clon Alpha y Omega.
            </p>
          </div>

          <div className="space-y-5">
            {SKILL_CATEGORIES.map((categoryName) => {
              const groupSkills = skills.filter((s) => s.category === categoryName);
              if (groupSkills.length === 0) return null;

              return (
                <section key={categoryName} className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    {categoryName}
                  </h4>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 divide-y divide-zinc-800/80">
                    {groupSkills.map((skill) => (
                      <article
                        key={skill.name}
                        className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6"
                      >
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <h5 className="text-sm font-bold text-zinc-100">{skill.name}</h5>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                                skill.clone
                              )}`}
                            >
                              {skill.clone === 'alpha-omega' ? 'ALPHA & OMEGA' : 'SOLO OMEGA'}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                skill.priority === 'Crítica'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-zinc-900 text-zinc-300 border border-zinc-700'
                              }`}
                            >
                              Prioridad {skill.priority}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">{skill.effect}</p>
                        </div>

                        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-1 gap-1.5 shrink-0 text-xs font-mono border-t lg:border-t-0 pt-2.5 lg:pt-0 border-zinc-800 lg:text-right min-w-[13rem]">
                          <span className="text-zinc-300">
                            Alpha: <strong className="text-zinc-100">{skill.alphaCap}</strong>
                          </span>
                          <span className="text-amber-400">
                            Omega: <strong>{skill.omegaCap}</strong>
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
