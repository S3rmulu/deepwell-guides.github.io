import { LayoutGrid, Search, TableProperties, X } from 'lucide-react';
import { CloneFilter, VisualMode } from '../../types';

interface MobileControlsBarProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  cloneFilter: CloneFilter;
  onCloneFilterChange: (filter: CloneFilter) => void;
  visualMode: VisualMode;
  onVisualModeChange: (mode: VisualMode) => void;
}

const MOBILE_CLONE_TABS: { id: CloneFilter; label: string; ariaLabel?: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'alpha', label: 'Alpha' },
  { id: 'expert', label: 'Expert', ariaLabel: 'Alpha + Expert System' },
  { id: 'omega', label: 'Omega', ariaLabel: 'Solo Omega' },
];

export function MobileControlsBar({
  isOpen,
  searchQuery,
  onSearchChange,
  cloneFilter,
  onCloneFilterChange,
  visualMode,
  onVisualModeChange,
}: MobileControlsBarProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-controls-panel"
      className="md:hidden border-b border-zinc-800/80 bg-zinc-950/95 px-3 py-3 space-y-2.5"
    >
      <div className="relative">
        <Search
          className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar nave, skill, gas, fitting..."
          aria-label="Buscar en toda la wiki"
          className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/70 rounded-lg pl-9 pr-10 py-2 text-sm text-zinc-100 placeholder-zinc-400 transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Limpiar búsqueda"
            className="compact-control absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1.5 text-zinc-400 hover:text-zinc-100 rounded-md"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div
        className="grid grid-cols-4 gap-1 rounded-lg bg-zinc-900 p-1 border border-zinc-800"
        role="group"
        aria-label="Filtro de estado de clon"
      >
        {MOBILE_CLONE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-label={tab.ariaLabel}
            aria-pressed={cloneFilter === tab.id}
            onClick={() => onCloneFilterChange(tab.id)}
            className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all text-center ${
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

      <div
        className="grid grid-cols-2 gap-1 rounded-lg bg-zinc-900 p-1 border border-zinc-800"
        role="group"
        aria-label="Estilo visual"
      >
        <button
          type="button"
          aria-pressed={visualMode === 'dossier'}
          onClick={() => onVisualModeChange('dossier')}
          className={`px-2 py-1.5 rounded-md text-xs font-mono font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
            visualMode === 'dossier' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          <TableProperties className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Dosier Táctico</span>
        </button>
        <button
          type="button"
          aria-pressed={visualMode === 'cards'}
          onClick={() => onVisualModeChange('cards')}
          className={`px-2 py-1.5 rounded-md text-xs font-mono font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
            visualMode === 'cards' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Tarjetas Pulidas</span>
        </button>
      </div>
    </div>
  );
}
