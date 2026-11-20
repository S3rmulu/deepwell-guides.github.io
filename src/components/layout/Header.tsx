import { Compass, LayoutGrid, ListFilter, Menu, Pickaxe, Search, TableProperties, X } from 'lucide-react';
import { RefObject } from 'react';
import { CloneFilter, VisualMode, WikiRoute } from '../../types';
import { getHubHref, getMiningModuleHref } from '../../router/useHashRoute';

interface HeaderProps {
  route: WikiRoute;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  cloneFilter: CloneFilter;
  onCloneFilterChange: (filter: CloneFilter) => void;
  visualMode: VisualMode;
  onVisualModeChange: (mode: VisualMode) => void;
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  mobileControlsOpen: boolean;
  onToggleMobileControls: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
}

const CLONE_TABS: { id: CloneFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'alpha', label: 'Alpha' },
  { id: 'expert', label: 'Alpha + Expert' },
  { id: 'omega', label: 'Solo Omega' },
];

export function Header({
  route,
  searchQuery,
  onSearchChange,
  cloneFilter,
  onCloneFilterChange,
  visualMode,
  onVisualModeChange,
  isDrawerOpen,
  onOpenDrawer,
  mobileControlsOpen,
  onToggleMobileControls,
  searchInputRef,
}: HeaderProps) {
  const isGuide = route.view === 'guide';
  const hasActiveMobileFilter = Boolean(searchQuery.trim()) || cloneFilter !== 'all';

  return (
    <header
      className="sticky top-0 z-40 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 min-h-14 sm:min-h-16 py-2 flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {isGuide && (
            <button
              type="button"
              onClick={onOpenDrawer}
              aria-label="Abrir índice de módulos"
              aria-expanded={isDrawerOpen}
              aria-controls="wiki-module-drawer"
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-200 hover:border-amber-500/60 transition-colors shrink-0"
            >
              <Menu className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span className="hidden min-[380px]:inline">Índice</span>
            </button>
          )}

          <a
            href={getHubHref()}
            aria-current={!isGuide ? 'page' : undefined}
            className="flex items-center gap-2 sm:gap-3 text-left group min-w-0 rounded-lg"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="DeepwellGuides Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-transform duration-200 group-hover:scale-105 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-base sm:text-lg text-zinc-100 truncate">
                  Deepwell<span className="text-amber-400">Guides</span>
                </span>
                <span className="hidden xl:inline-block text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-amber-400 shrink-0">
                  EVE ONLINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block truncate">
                Archivo Táctico e Industrial de New Eden
              </p>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Search */}
          <div className="relative hidden md:block w-48 lg:w-56">
            <Search
              className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar... (/)"
              aria-label="Buscar en la wiki (atajo: /)"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/70 rounded-lg pl-8 pr-8 py-1.5 text-xs text-zinc-100 placeholder-zinc-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
                className="compact-control absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-100 rounded"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Desktop Clone Filter */}
          <div
            className="hidden md:inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800"
            role="group"
            aria-label="Filtro de estado de clon"
          >
            {CLONE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={cloneFilter === tab.id}
                onClick={() => onCloneFilterChange(tab.id)}
                className={`px-2 lg:px-2.5 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  cloneFilter === tab.id
                    ? tab.id === 'expert'
                      ? 'bg-sky-500 text-zinc-950 shadow-sm'
                      : 'bg-amber-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop Visual Mode Comparison Switcher */}
          <div
            className="hidden md:inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800"
            role="group"
            aria-label="Comparar estilo visual"
          >
            <button
              type="button"
              aria-pressed={visualMode === 'dossier'}
              onClick={() => onVisualModeChange('dossier')}
              title="Vista Dosier Táctico (tablas densas y alertas EVE)"
              className={`px-2 py-1 rounded-md text-[11px] font-mono font-semibold inline-flex items-center gap-1 transition-colors ${
                visualMode === 'dossier'
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <TableProperties className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden xl:inline">Dosier</span>
            </button>
            <button
              type="button"
              aria-pressed={visualMode === 'cards'}
              onClick={() => onVisualModeChange('cards')}
              title="Vista Tarjetas Pulidas"
              className={`px-2 py-1 rounded-md text-[11px] font-mono font-semibold inline-flex items-center gap-1 transition-colors ${
                visualMode === 'cards'
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden xl:inline">Tarjetas</span>
            </button>
          </div>

          {/* Mobile Controls Toggle */}
          <button
            type="button"
            onClick={onToggleMobileControls}
            aria-expanded={mobileControlsOpen}
            aria-controls="mobile-controls-panel"
            aria-label="Mostrar búsqueda, filtros y vista"
            className={`md:hidden relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              mobileControlsOpen || hasActiveMobileFilter
                ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                : 'border-zinc-800 bg-zinc-900 text-zinc-200'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden min-[420px]:inline">Filtros</span>
            {hasActiveMobileFilter && (
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
              />
            )}
          </button>

          {/* Hub / Guide Switcher */}
          <a
            href={isGuide ? getHubHref() : getMiningModuleHref('overview')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-700 bg-zinc-900 hover:border-amber-500/60 text-zinc-200 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            {isGuide ? (
              <>
                <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="sm:hidden">Guías</span>
                <span className="hidden sm:inline">Todas las Guías</span>
              </>
            ) : (
              <>
                <Pickaxe className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="sm:hidden">Minería</span>
                <span className="hidden sm:inline">Guía Minería</span>
              </>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}
