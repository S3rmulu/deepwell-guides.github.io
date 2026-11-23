import { BookOpen, ChevronRight, Rocket, RotateCcw } from 'lucide-react';
import {
  CloneFilter,
  ShipClass,
  ShipItem,
  ShipMiniGuideId,
  VisualMode,
} from '../../../types';
import { ShipHullPreview } from '../../../components/ui/ShipHullPreview';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';
import { getMiningModuleHref } from '../../../router/useHashRoute';
import {
  FITTINGS_LIST,
  SHIP_CLASS_TO_MINI_GUIDE,
  SHIP_CLASSES_ORDER,
  SHIP_MINI_GUIDES,
} from '../data';
import { getMiniGuideMatchCounts } from '../searchIndex';
import { ShipMiniGuidesPanel } from './ShipMiniGuidesPanel';

interface ShipsSectionProps {
  ships: ShipItem[];
  shipTierFilter: string;
  onTierFilterChange: (tier: string) => void;
  activeMiniGuide: ShipMiniGuideId | null;
  onSelectMiniGuide: (guideId: ShipMiniGuideId | null, replace?: boolean) => void;
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onInspectShipFittings: (shipName: string) => void;
  onResetFilters: () => void;
  onResetSearch: () => void;
}

const CLASS_FILTERS = ['ALL', ...SHIP_CLASSES_ORDER];

export function ShipsSection({
  ships,
  shipTierFilter,
  onTierFilterChange,
  activeMiniGuide,
  onSelectMiniGuide,
  cloneFilter,
  searchQuery,
  visualMode,
  onInspectShipFittings,
  onResetFilters,
  onResetSearch,
}: ShipsSectionProps) {
  const isMiniGuidesView = activeMiniGuide !== null;
  const hasSearch = searchQuery.trim().length > 0;
  const miniGuideMatchCounts = getMiniGuideMatchCounts(searchQuery);
  const totalMiniGuideMatches = Object.values(miniGuideMatchCounts).reduce((a, b) => a + b, 0);

  const firstMatchingGuideId: ShipMiniGuideId | undefined = SHIP_MINI_GUIDES.find(
    (g) => (miniGuideMatchCounts[g.id] ?? 0) > 0
  )?.id;

  const preferredDefaultGuide: ShipMiniGuideId =
    firstMatchingGuideId ?? (cloneFilter === 'alpha' ? 'stealth' : 'crystals');

  const handleViewClassShips = (shipClass: ShipClass) => {
    if (hasSearch) {
      onResetSearch();
    }
    onTierFilterChange(shipClass);
    onSelectMiniGuide(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        {/* Cabecera + Conmutador de Sub-vista (estilo neutro zinc-100 para no competir con tabs hijos ámbar) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
              Módulo 2: Catálogo de Naves Mineras ORE & Mini-Guías Técnicas
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Naves clasificadas por clase de casco y mini-guías operativas (Mining Crystals,
              Command Bursts, Cloaking y Haulers).
            </p>
          </div>

          <div
            role="group"
            aria-label="Sub-vista del módulo de naves"
            className="inline-flex rounded-lg bg-zinc-950 p-1 border border-zinc-800 self-start lg:self-auto shrink-0"
          >
            <button
              type="button"
              aria-pressed={!isMiniGuidesView}
              onClick={() => onSelectMiniGuide(null)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                !isMiniGuidesView
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'text-zinc-300 hover:text-zinc-100'
              }`}
            >
              <Rocket className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Catálogo ({ships.length})</span>
            </button>
            <button
              type="button"
              aria-pressed={isMiniGuidesView}
              onClick={() => onSelectMiniGuide(activeMiniGuide ?? preferredDefaultGuide)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                isMiniGuidesView
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'text-zinc-300 hover:text-zinc-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Mini-Guías ({SHIP_MINI_GUIDES.length})</span>
              {hasSearch && totalMiniGuideMatches > 0 && (
                <span
                  className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                    isMiniGuidesView
                      ? 'bg-zinc-950 text-amber-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {totalMiniGuideMatches} coinc.
                </span>
              )}
            </button>
          </div>
        </div>

        {isMiniGuidesView ? (
          <ShipMiniGuidesPanel
            activeGuideId={activeMiniGuide}
            onSelectGuide={(id, replace) => onSelectMiniGuide(id, replace)}
            onViewClassShips={handleViewClassShips}
            onResetSearch={onResetSearch}
            cloneFilter={cloneFilter}
            searchQuery={searchQuery}
            visualMode={visualMode}
          />
        ) : (
          <>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar naves por clase y tamaño"
            >
              {CLASS_FILTERS.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  aria-pressed={shipTierFilter === cls}
                  onClick={() => onTierFilterChange(cls)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                    shipTierFilter === cls
                      ? 'bg-amber-500 text-zinc-950 border-amber-500'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:text-zinc-100'
                  }`}
                >
                  {cls === 'ALL' ? 'Todas las clases' : cls}
                </button>
              ))}
            </div>

            {ships.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
                <p className="text-sm font-semibold text-zinc-200">
                  Ninguna nave coincide con los filtros actuales.
                </p>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {totalMiniGuideMatches > 0 && firstMatchingGuideId ? (
                    <>
                      Hay <strong className="text-amber-300">{totalMiniGuideMatches}</strong>{' '}
                      coincidencias en{' '}
                      <strong>
                        {SHIP_MINI_GUIDES.find((g) => g.id === firstMatchingGuideId)?.shortLabel}
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      Ajusta la clase de nave, el filtro de Clon o revisa la pestaña{' '}
                      <strong>Mini-Guías</strong> si buscas Mining Crystals, Command Bursts o MWD +
                      Cloak.
                    </>
                  )}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Limpiar filtros</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectMiniGuide(preferredDefaultGuide)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:border-amber-500/50 text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                    <span>
                      {firstMatchingGuideId
                        ? `Abrir Mini-Guía: ${
                            SHIP_MINI_GUIDES.find((g) => g.id === firstMatchingGuideId)?.shortLabel
                          }`
                        : 'Abrir Mini-Guías'}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {SHIP_CLASSES_ORDER.map((shipClass) => {
                  const groupShips = ships.filter((s) => s.shipClass === shipClass);
                  if (groupShips.length === 0) return null;

                  const linkedGuideId = SHIP_CLASS_TO_MINI_GUIDE[shipClass];
                  const linkedGuide = SHIP_MINI_GUIDES.find((g) => g.id === linkedGuideId);

                  return (
                    <section key={shipClass} className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-zinc-800/80">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                            {shipClass}
                          </h3>
                          <span className="text-[11px] font-mono tabular-nums text-zinc-400">
                            · {groupShips.length} {groupShips.length === 1 ? 'casco' : 'cascos'}
                          </span>
                        </div>

                        {linkedGuide && (
                          <a
                            href={getMiningModuleHref('ships', {
                              guide: linkedGuide.id,
                              q: hasSearch ? searchQuery : undefined,
                            })}
                            onClick={(event) => {
                              event.preventDefault();
                              onSelectMiniGuide(linkedGuide.id);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                            <span>Mini-guía: {linkedGuide.shortLabel}</span>
                            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groupShips.map((ship) => {
                          const shipFittingsCount = FITTINGS_LIST.filter(
                            (f) => f.ship === ship.name
                          ).length;
                          return (
                            <article
                              key={ship.name}
                              className={`wiki-card-container group border border-zinc-800 bg-zinc-950 p-4 sm:p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-colors ${
                                visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
                              }`}
                            >
                              <div className="space-y-3.5">
                                <div className="wiki-card-header">
                                  <ShipHullPreview
                                    typeId={ship.typeId}
                                    name={ship.name}
                                    size="lg"
                                    secondaryHulls={ship.secondaryHulls}
                                    visualMode={visualMode}
                                  />

                                  <div className="min-w-0 w-full flex-1 space-y-2">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                      <div className="min-w-0">
                                        <h4 className="text-lg font-bold text-zinc-100 leading-tight">
                                          {ship.name}
                                        </h4>
                                        <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                                          {ship.tier}
                                        </p>
                                      </div>
                                      <span
                                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${getCloneBadgeClasses(
                                          ship.clone
                                        )}`}
                                      >
                                        {ship.cloneLabel}
                                      </span>
                                    </div>

                                    <div className="wiki-card-telemetry pt-0.5">
                                      <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-2.5 py-2">
                                        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                                          Rol táctico
                                        </div>
                                        <div className="text-xs font-medium text-zinc-200 mt-0.5 leading-snug">
                                          {ship.role}
                                        </div>
                                      </div>
                                      <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-2.5 py-2">
                                        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                                          Capacidad de bodega
                                        </div>
                                        <div className="text-xs font-mono tabular-nums font-medium text-amber-400 mt-0.5 leading-snug">
                                          {ship.cargo}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <ul className="space-y-1.5 text-sm text-zinc-300 pt-1">
                                  {ship.bonuses.map((b, idx) => (
                                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                      <span
                                        aria-hidden="true"
                                        className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-2 shrink-0"
                                      />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-3 border-t border-zinc-800/80 space-y-2 text-xs">
                                <p className="text-zinc-300">
                                  <strong className="text-zinc-100">Requisitos:</strong>{' '}
                                  {ship.requirements}
                                </p>
                                <p className="text-zinc-300">
                                  <strong className="text-amber-400">Doctrina Null-Sec:</strong>{' '}
                                  {ship.nullsecNote}
                                </p>
                                {shipFittingsCount > 0 && (
                                  <div className="pt-1">
                                    <a
                                      href={getMiningModuleHref('fittings', { q: ship.name })}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        onInspectShipFittings(ship.name);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-amber-500/35 bg-amber-500/10 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
                                    >
                                      <span>
                                        Ver {shipFittingsCount}{' '}
                                        {shipFittingsCount === 1 ? 'fitting EFT' : 'fittings EFT'}{' '}
                                        de {ship.name}
                                      </span>
                                      <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
