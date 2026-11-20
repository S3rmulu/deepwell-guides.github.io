import { Info } from 'lucide-react';
import { CloneFilter } from '../../types';

interface FilterBannerProps {
  cloneFilter: CloneFilter;
  shipsCount: number;
  skillsCount: number;
  fittingsCount: number;
  onReset: () => void;
}

export function FilterBanner({
  cloneFilter,
  shipsCount,
  skillsCount,
  fittingsCount,
  onReset,
}: FilterBannerProps) {
  if (cloneFilter === 'all') return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/25 px-3 sm:px-4 py-2 text-xs text-amber-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <span>
            Filtro activo:{' '}
            <strong className="text-amber-300 uppercase">
              {cloneFilter === 'alpha'
                ? 'Clon Alpha (Gratuito · 0 ISK / 0 PLEX)'
                : cloneFilter === 'expert'
                ? 'Alpha con Expert System (Acceso temporal 7 días)'
                : 'Clon Omega (Suscripción / 500 PLEX)'}
            </strong>{' '}
            — Mostrando {shipsCount} naves, {skillsCount} skills y {fittingsCount} fittings
            compatibles.
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="underline text-amber-400 hover:text-amber-300 font-medium px-1 py-0.5 rounded"
        >
          Restablecer filtro
        </button>
      </div>
    </div>
  );
}
