import { ExternalLink, FileSpreadsheet, RotateCcw, Shield } from 'lucide-react';
import { VisualMode } from '../../../types';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { ALLIANCE_PILLARS, ALLIANCE_WORKFLOW_STEPS } from '../data';
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
      {/* BLOQUE 08: INDUSTRIA DE ALIANZA */}
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

        {visualMode === 'dossier' ? (
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="alliance-pillars-caption"
            className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
          >
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption id="alliance-pillars-caption" className="sr-only">
                Los cuatro pilares de la industria organizada de alianza
              </caption>
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                  <th scope="col" className="p-3">
                    Código
                  </th>
                  <th scope="col" className="p-3">
                    Pilar Operativo
                  </th>
                  <th scope="col" className="p-3">
                    Función en la Economía Interna
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {ALLIANCE_PILLARS.map((pillar) => (
                  <tr key={pillar.title} className="hover:bg-zinc-900/40">
                    <td className="p-3 font-mono text-xs text-amber-400 whitespace-nowrap">
                      {pillar.code}
                    </td>
                    <th scope="row" className="p-3 font-bold text-zinc-100 whitespace-nowrap">
                      {pillar.title}
                    </th>
                    <td className="p-3 text-zinc-300 leading-relaxed">{pillar.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALLIANCE_PILLARS.map((pillar) => (
              <SpotlightCard
                key={pillar.title}
                tone="amber"
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-amber-300">{pillar.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                    {pillar.code}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{pillar.detail}</p>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>

      {/* FLUJO OPERATIVO: TASACIÓN EN JANICE -> BUYBACK -> SEEDING DE DOCTRINA */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Circuito Práctico: De Janice al Mercado de Staging</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Cómo cerrar el ciclo entre mineros/ratters y fabricantes sin fricciones de precios ni
            viajes innecesarios a Jita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ALLIANCE_WORKFLOW_STEPS.map((wf) => (
            <div
              key={wf.step}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 font-mono text-xs font-bold text-amber-300">
                    PASO {wf.step}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">{wf.actor}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100">{wf.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{wf.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-amber-500/35 bg-zinc-950 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              Tasador Estándar de Lotes (Jita Buy / Sell)
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              Pega los ítems de tu inventario en Janice para generar el enlace de valoración (
              <strong className="text-amber-300">x% Jita Buy según web janice.</strong>).
            </p>
          </div>
          <a
            href="https://janice.e-351.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="tactical-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
          >
            <span>Abrir Janice</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
