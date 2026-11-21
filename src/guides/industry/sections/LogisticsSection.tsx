import { AlertTriangle, ExternalLink, PackageCheck, RotateCcw, Truck } from 'lucide-react';
import { VisualMode } from '../../../types';
import { LOGISTICS_KEY_POINTS, LOGISTICS_READING_LINKS } from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface LogisticsSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function LogisticsSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: LogisticsSectionProps) {
  const q = normalizeSearch(searchQuery);
  const matchesLogistics = !q || MODULE_SEARCH_KEYWORDS.logistics.includes(q);

  if (!matchesLogistics) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          No hay coincidencias en Reprocesado & Logística para &quot;{searchQuery}&quot;.
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
            <Truck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Reprocesado, minerales y logística de materiales</span>
          </h2>
        </div>

        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-amber-300">
              El mineral no es gratis porque lo hayas minado tú
            </p>
            <p className="text-zinc-200 leading-relaxed">
              Para industria, todo material tiene precio de mercado o valor interno. Si ignoras eso,
              puedes fabricar con pérdidas sin darte cuenta.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <PackageCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Puntos clave</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {LOGISTICS_KEY_POINTS.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Lectura:</span>
          {LOGISTICS_READING_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 text-xs font-semibold text-amber-300 transition-colors"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
