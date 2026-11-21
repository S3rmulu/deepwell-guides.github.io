import { ExternalLink, RotateCcw, Shield } from 'lucide-react';
import { VisualMode } from '../../../types';
import { ALLIANCE_PILLARS } from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface AllianceSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function AllianceSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: AllianceSectionProps) {
  const q = normalizeSearch(searchQuery);
  const matchesAlliance = !q || MODULE_SEARCH_KEYWORDS.alliance.includes(q);

  if (!matchesAlliance) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún contenido de Industria de Alianza coincide con &quot;{searchQuery}&quot;.
        </p>
        <button
          type="button"
          onClick={onResetSearch}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Limpiar búsqueda</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Industria de alianza</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Si cada piloto fabrica por su cuenta, funciona. Si se organiza, empieza a parecer una
            economía interna: buyback, contratos, doctrina, stock y logística.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALLIANCE_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-1.5"
            >
              <h3 className="text-sm sm:text-base font-bold text-amber-300">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{pillar.detail}</p>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-zinc-300">
            Referencia de tasación para contratos y buyback:
          </span>
          <a
            href="https://janice.e-351.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-amber-500/50 text-xs font-semibold text-amber-300 transition-colors"
          >
            <span>Abrir Janice</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
