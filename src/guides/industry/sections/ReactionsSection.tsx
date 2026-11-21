import { KeyboardEvent, useRef, useState } from 'react';
import { AlertTriangle, Atom, ExternalLink, Layers, Lock, RotateCcw } from 'lucide-react';
import { CloneFilter, IndustryChainTabItem, VisualMode } from '../../../types';
import { matchesClone } from '../../../components/ui/cloneBadges';
import {
  ADVANCED_CHAINS_PREVIEW,
  REACTION_READING_LINKS,
  REACTION_TYPES,
  REACTION_WARNINGS,
} from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface ReactionsSectionProps {
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function ReactionsSection({
  cloneFilter,
  searchQuery,
  visualMode,
  onResetSearch,
}: ReactionsSectionProps) {
  const [activeChainId, setActiveChainId] = useState<IndustryChainTabItem['id']>('moon-goo');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const q = normalizeSearch(searchQuery);

  const visibleChains = ADVANCED_CHAINS_PREVIEW.filter(
    (c) =>
      matchesClone(c.clone, cloneFilter) &&
      (!q ||
        normalizeSearch(
          `${c.label} ${c.title} ${c.summary} ${c.inputs.join(' ')} ${c.steps.join(' ')}`
        ).includes(q))
  );

  const keywordHit = !q || MODULE_SEARCH_KEYWORDS.reactions.includes(q);
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

  if (!keywordHit && visibleChains.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún contenido de Reacciones & Moon Goo coincide con &quot;{searchQuery}&quot;.
        </p>
        <button
          type="button"
          onClick={onResetSearch}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Limpiar búsqueda</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* BLOQUE 06: REACCIONES, MOON GOO Y PRODUCCIÓN AVANZADA */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Atom className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Reacciones, moon goo y producción avanzada</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            <strong>Para qué sirven:</strong> Las reacciones convierten materiales lunares, gas u
            otros insumos en componentes usados por T2, T3 y cadenas avanzadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {REACTION_TYPES.map((type) => (
            <div
              key={type.name}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-1"
            >
              <div className="text-xs font-mono font-bold text-amber-300">{type.name}</div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{type.detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 p-4 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Cuidado con</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-200">
            {REACTION_WARNINGS.map((warn) => (
              <li key={warn}>• {warn}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Lectura:</span>
          {REACTION_READING_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 text-xs font-semibold text-amber-300 transition-colors"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* SELECTOR CON PESTAÑAS DE CADENAS AVANZADAS (HAM T2, MOON GOO, CAPITALES) */}
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
    </div>
  );
}
