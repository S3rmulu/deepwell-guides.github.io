import { ChevronRight, RotateCcw } from 'lucide-react';
import { ShipItem, VisualMode } from '../../../types';
import { ShipHullPreview } from '../../../components/ui/ShipHullPreview';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';
import { getMiningModuleHref } from '../../../router/useHashRoute';
import { FITTINGS_LIST, SHIP_CLASSES_ORDER } from '../data';

interface ShipsSectionProps {
  ships: ShipItem[];
  shipTierFilter: string;
  onTierFilterChange: (tier: string) => void;
  visualMode: VisualMode;
  onInspectShipFittings: (shipName: string) => void;
  onResetFilters: () => void;
}

const CLASS_FILTERS = ['ALL', ...SHIP_CLASSES_ORDER];

export function ShipsSection({
  ships,
  shipTierFilter,
  onTierFilterChange,
  visualMode,
  onInspectShipFittings,
  onResetFilters,
}: ShipsSectionProps) {
  return (
    <div className="space-y-4">
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
              Módulo 2: Catálogo de Naves Mineras ORE & Logística
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Clasificadas por clase y tamaño de casco, requisitos de habilidad y rol táctico en
              Null-Sec.
            </p>
          </div>

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
        </div>

        {ships.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-zinc-200">
              Ninguna nave coincide con los filtros actuales.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400">
              Ajusta la clase de nave, el filtro de Clon o el buscador para ver todo el catálogo
              ORE.
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
        ) : (
          <div className="space-y-6">
            {SHIP_CLASSES_ORDER.map((shipClass) => {
              const groupShips = ships.filter((s) => s.shipClass === shipClass);
              if (groupShips.length === 0) return null;

              return (
                <section key={shipClass} className="space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-zinc-800/80">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                      {shipClass}
                    </h3>
                    <span className="text-[11px] font-mono tabular-nums text-zinc-400">
                      {groupShips.length} {groupShips.length === 1 ? 'casco' : 'cascos'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupShips.map((ship) => {
                      const shipFittingsCount = FITTINGS_LIST.filter(
                        (f) => f.ship === ship.name
                      ).length;
                      const spotlightTone =
                        ship.clone === 'omega'
                          ? 'amber'
                          : ship.clone === 'alpha-expert'
                          ? 'sky'
                          : 'emerald';
                      return (
                        <SpotlightCard
                          key={ship.name}
                          tone={spotlightTone}
                          className={`wiki-card-container group border border-zinc-800 bg-zinc-950 p-4 sm:p-5 hover:border-zinc-700 transition-colors ${
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
                                    {shipFittingsCount === 1 ? 'fitting EFT' : 'fittings EFT'} de{' '}
                                    {ship.name}
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </a>
                              </div>
                            )}
                          </div>
                        </SpotlightCard>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
