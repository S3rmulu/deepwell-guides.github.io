import { ChevronRight } from 'lucide-react';
import { ShipItem } from '../../../types';
import { ShipHullPreview } from '../../../components/ui/ShipHullPreview';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';
import { getMiningModuleHref } from '../../../router/useHashRoute';
import { FITTINGS_LIST } from '../data';

interface ShipsSectionProps {
  ships: ShipItem[];
  shipTierFilter: string;
  onTierFilterChange: (tier: string) => void;
}

const TIER_FILTERS = ['ALL', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Logística'];

export function ShipsSection({
  ships,
  shipTierFilter,
  onTierFilterChange,
}: ShipsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
              Módulo 2: Catálogo de Naves Mineras ORE & Logística
            </h2>
            <p className="text-xs text-zinc-400">
              Clasificadas por Tier, requisitos de habilidad y rol táctico en Null-Sec.
            </p>
          </div>

          {/* Filtro de Tier */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar naves por Tier">
            {TIER_FILTERS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={shipTierFilter === t}
                onClick={() => onTierFilterChange(t)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold border transition-colors ${
                  shipTierFilter === t
                    ? 'bg-amber-500 text-zinc-950 border-amber-500'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {t === 'ALL' ? 'Todos los Tiers' : t}
              </button>
            ))}
          </div>
        </div>

        {ships.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-zinc-200">
              Ninguna nave coincide con los filtros actuales.
            </p>
            <p className="text-xs text-zinc-400">
              Ajusta el Tier o el filtro de Clon para volver a ver el catálogo completo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ships.map((ship) => {
              const hasFittings = FITTINGS_LIST.some((f) => f.ship === ship.name);
              return (
                <article
                  key={ship.name}
                  className="wiki-card-container group rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-colors"
                >
                  <div className="space-y-3.5">
                    <div className="wiki-card-header">
                      <ShipHullPreview
                        typeId={ship.typeId}
                        name={ship.name}
                        size="lg"
                        secondaryHulls={ship.secondaryHulls}
                      />

                      <div className="min-w-0 w-full flex-1 space-y-2">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-zinc-100 leading-tight">
                              {ship.name}
                            </h3>
                            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">{ship.tier}</p>
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
                            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                              Rol táctico
                            </div>
                            <div className="text-xs font-medium text-zinc-200 mt-0.5 leading-snug">
                              {ship.role}
                            </div>
                          </div>
                          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-2.5 py-2">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                              Capacidad de bodega
                            </div>
                            <div className="text-xs font-mono tabular-nums font-medium text-amber-400 mt-0.5 leading-snug">
                              {ship.cargo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-xs text-zinc-300 pt-1">
                      {ship.bonuses.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 shrink-0"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 space-y-1.5 text-[11px]">
                    <p className="text-zinc-400">
                      <strong className="text-zinc-200">Requisitos:</strong> {ship.requirements}
                    </p>
                    <p className="text-zinc-400">
                      <strong className="text-amber-400">Doctrina Null-Sec:</strong>{' '}
                      {ship.nullsecNote}
                    </p>
                    {hasFittings && (
                      <div className="pt-1">
                        <a
                          href={getMiningModuleHref('fittings')}
                          className="inline-flex items-center gap-1 py-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <span>Ver fittings EFT</span>
                          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
