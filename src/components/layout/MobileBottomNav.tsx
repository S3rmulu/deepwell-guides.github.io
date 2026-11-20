import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { GuideId, GuideModuleId, GuideModuleMeta } from '../../types';
import { getGuideModuleHref, getHubHref } from '../../router/useHashRoute';

interface MobileBottomNavProps<TId extends GuideModuleId = GuideModuleId> {
  guideId?: GuideId;
  modules: GuideModuleMeta<TId>[];
  activeModule: TId;
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
}

export function MobileBottomNav<TId extends GuideModuleId = GuideModuleId>({
  guideId = 'mining',
  modules,
  activeModule,
  isDrawerOpen,
  onOpenDrawer,
}: MobileBottomNavProps<TId>) {
  const idx = modules.findIndex((m) => m.id === activeModule);
  const currentPos = idx >= 0 ? idx + 1 : 1;
  const prev = idx > 0 ? modules[idx - 1] : null;
  const next = idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : null;

  return (
    <nav
      aria-label="Navegación rápida en móvil"
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md px-2 pt-1.5"
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(0.5rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.5rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="max-w-lg mx-auto grid grid-cols-3 gap-1.5 items-center">
        {prev ? (
          <a
            href={getGuideModuleHref(guideId, prev.id)}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-2 text-xs font-semibold text-zinc-200 hover:border-amber-500/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="truncate">Anterior</span>
          </a>
        ) : (
          <a
            href={getHubHref()}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-2 text-xs font-semibold text-zinc-300 hover:border-amber-500/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
            <span className="truncate">Índice Hub</span>
          </a>
        )}

        <button
          type="button"
          onClick={onOpenDrawer}
          aria-controls="wiki-module-drawer"
          aria-expanded={isDrawerOpen}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-2.5 py-2 text-xs font-mono font-bold tabular-nums text-amber-300 hover:bg-amber-500/20 transition-colors"
        >
          <Menu className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>
            Cap. {currentPos}/{modules.length}
          </span>
        </button>

        {next ? (
          <a
            href={getGuideModuleHref(guideId, next.id)}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-2 text-xs font-semibold text-zinc-200 hover:border-amber-500/50 transition-colors"
          >
            <span className="truncate">Siguiente</span>
            <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          </a>
        ) : (
          <a
            href={getHubHref()}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-2 text-xs font-semibold text-amber-300 hover:border-amber-500/50 transition-colors"
          >
            <span className="truncate">Todas Guías</span>
            <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          </a>
        )}
      </div>
    </nav>
  );
}
