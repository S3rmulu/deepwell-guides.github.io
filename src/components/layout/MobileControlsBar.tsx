import { Search, X } from 'lucide-react';
import { CloneFilter } from '../../types';

interface MobileControlsBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  cloneFilter: CloneFilter;
  onCloneFilterChange: (filter: CloneFilter) => void;
}

const MOBILE_CLONE_TABS: { id: CloneFilter; label: string; ariaLabel?: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'alpha', label: 'Alpha' },
  { id: 'expert', label: 'Expert', ariaLabel: 'Alpha + Expert System' },
  { id: 'omega', label: 'Omega' },
];

export function MobileControlsBar({
  searchQuery,
  onSearchChange,
  cloneFilter,
  onCloneFilterChange,
}: MobileControlsBarProps) {
  return (
    <div className="md:hidden border-b border-zinc-800/80 bg-zinc-950/90 px-3 py-2.5 space-y-2">
      <div className="relative">
        <Search
          className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar nave, skill, gas, fitting..."
          aria-label="Buscar en la wiki"
          className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/70 rounded-lg pl-9 pr-10 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-2 text-zinc-400 hover:text-zinc-100 rounded-md"
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
                ? 'bg-amber-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
