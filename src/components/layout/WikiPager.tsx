import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GuideModuleId, GuideModuleMeta } from '../../types';
import { getHubHref, getMiningModuleHref } from '../../router/useHashRoute';

interface WikiPagerProps {
  modules: GuideModuleMeta[];
  activeModule: GuideModuleId;
}

export function WikiPager({ modules, activeModule }: WikiPagerProps) {
  const currentIndex = modules.findIndex((m) => m.id === activeModule);
  const prev = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <nav
      aria-label="Paginación entre capítulos de la guía"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
    >
      {prev ? (
        <a
          href={getMiningModuleHref(prev.id)}
          className="group rounded-xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 p-3.5 sm:p-4 flex items-center gap-3 transition-colors"
        >
          <ChevronLeft
            className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Capítulo anterior
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-amber-300 truncate">
              {prev.label}
            </div>
          </div>
        </a>
      ) : (
        <a
          href={getHubHref()}
          className="group rounded-xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 p-3.5 sm:p-4 flex items-center gap-3 transition-colors"
        >
          <ChevronLeft
            className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Volver al portal
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-amber-300 truncate">
              Índice de Todas las Guías
            </div>
          </div>
        </a>
      )}

      {next ? (
        <a
          href={getMiningModuleHref(next.id)}
          className="group rounded-xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 p-3.5 sm:p-4 flex items-center justify-between gap-3 text-right transition-colors sm:col-start-2"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Siguiente capítulo
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-amber-300 truncate">
              {next.label}
            </div>
          </div>
          <ChevronRight
            className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 shrink-0"
            aria-hidden="true"
          />
        </a>
      ) : (
        <a
          href={getHubHref()}
          className="group rounded-xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 p-3.5 sm:p-4 flex items-center justify-between gap-3 text-right transition-colors sm:col-start-2"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Fin del manual
            </div>
            <div className="text-xs sm:text-sm font-semibold text-amber-300 group-hover:text-amber-200 truncate">
              Explorar Índice de Guías
            </div>
          </div>
          <ChevronRight
            className="w-4 h-4 text-amber-400 shrink-0"
            aria-hidden="true"
          />
        </a>
      )}
    </nav>
  );
}
