import { Info } from 'lucide-react';
import { CloneFilter, WikiRoute } from '../../types';

interface FilterBannerProps {
  route: WikiRoute;
  cloneFilter: CloneFilter;
  guidesCount: number;
  shipsCount: number;
  skillsCount: number;
  fittingsCount: number;
  industryProductsCount?: number;
  industrySkillsCount?: number;
  onReset: () => void;
}

export function FilterBanner({
  route,
  cloneFilter,
  guidesCount,
  shipsCount,
  skillsCount,
  fittingsCount,
  industryProductsCount = 0,
  industrySkillsCount = 0,
  onReset,
}: FilterBannerProps) {
  if (cloneFilter === 'all') return null;

  const isExpert = cloneFilter === 'expert';

  const summaryText =
    route.view === 'hub'
      ? `— Mostrando ${guidesCount} guías compatibles.`
      : route.guideId === 'industry'
      ? `— ${industryProductsCount} líneas de producto y ${industrySkillsCount} skills industriales compatibles.`
      : `— ${shipsCount} naves, ${skillsCount} skills y ${fittingsCount} fittings compatibles.`;

  return (
    <div
      className={`border-b px-3 sm:px-4 py-2 text-xs ${
        isExpert
          ? 'bg-sky-500/10 border-sky-500/25 text-sky-200'
          : 'bg-amber-500/10 border-amber-500/25 text-amber-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2">
          <Info
            className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${
              isExpert ? 'text-sky-400' : 'text-amber-400'
            }`}
            aria-hidden="true"
          />
          <span>
            Filtro activo:{' '}
            <strong className={isExpert ? 'text-sky-300 uppercase' : 'text-amber-300 uppercase'}>
              {cloneFilter === 'alpha'
                ? 'Clon Alpha (Gratuito · 0 ISK / 0 PLEX)'
                : cloneFilter === 'expert'
                ? 'Alpha + Expert System (Acceso temporal 7 días)'
                : 'Solo Omega (Invención T2, Exhumers, Mercoxit y Mando)'}
            </strong>{' '}
            {summaryText}
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className={`compact-control underline font-semibold px-1.5 py-0.5 rounded ${
            isExpert ? 'text-sky-300 hover:text-sky-200' : 'text-amber-400 hover:text-amber-300'
          }`}
        >
          Restablecer filtro
        </button>
      </div>
    </div>
  );
}
