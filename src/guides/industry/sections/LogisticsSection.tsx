import {
  AlertTriangle,
  ExternalLink,
  Factory,
  PackageCheck,
  RotateCcw,
  Truck,
} from 'lucide-react';
import { VisualMode } from '../../../types';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import {
  HAULING_LOGISTICS_RULES,
  LOGISTICS_KEY_POINTS,
  LOGISTICS_READING_LINKS,
  REPROCESSING_YIELD_COMPARISON,
} from '../data';
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
      {/* BLOQUE 07: REPROCESADO, MINERALES Y LOGÍSTICA DE MATERIALES */}
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
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed list-disc list-inside">
            {LOGISTICS_KEY_POINTS.map((point) => (
              <li key={point}>{point}</li>
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

      {/* COMPARATIVA DE RENDIMIENTO DE REPROCESADO (NPC VS ATHANOR VS TATARA) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Factory className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Rendimiento de Reprocesado: Estación NPC vs. Refinerías Upwell</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Reprocesar sin skills ni refinería equipada con rigs destruye entre un 15% y un 35% del
            valor del mineral frente a vender la mena comprimida.
          </p>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-labelledby="reprocessing-table-caption"
          className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
        >
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <caption id="reprocessing-table-caption" className="sr-only">
              Comparativa de rendimiento de reprocesado por tipo de instalación
            </caption>
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                <th scope="col" className="p-3">
                  Instalación
                </th>
                <th scope="col" className="p-3">
                  Espacio
                </th>
                <th scope="col" className="p-3">
                  Base Estructura
                </th>
                <th scope="col" className="p-3">
                  Máx. con Skills
                </th>
                <th scope="col" className="p-3">
                  Criterio Industrial
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {REPROCESSING_YIELD_COMPARISON.map((row) => (
                <tr key={row.facility} className="hover:bg-zinc-900/40">
                  <th scope="row" className="p-3 font-bold text-zinc-100 whitespace-nowrap">
                    {row.facility}
                  </th>
                  <td className="p-3 font-mono text-xs text-zinc-300 whitespace-nowrap">
                    {row.security}
                  </td>
                  <td className="p-3 font-mono tabular-nums text-zinc-200 whitespace-nowrap">
                    {row.baseYield}
                  </td>
                  <td className="p-3 font-mono tabular-nums font-bold text-amber-400 whitespace-nowrap">
                    {row.maxSkillYield}
                  </td>
                  <td className="p-3 text-xs text-zinc-300 leading-relaxed min-w-[16rem]">
                    {row.verdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGLAS OPERATIVAS DE HAULING, COMPRESIÓN Y STOCK */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
            Protocolo de Transporte, Collateral y Separación de Stock
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Cuatro reglas logísticas para no perder el margen de toda una semana en un gank o en un
            error de inventario.
          </p>
        </div>

        {visualMode === 'dossier' ? (
          <ol className="divide-y divide-zinc-800/90 rounded-lg border border-zinc-800 bg-zinc-950">
            {HAULING_LOGISTICS_RULES.map((rule) => (
              <li key={rule.code} className="p-4 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-amber-400 uppercase">
                    {rule.code} · {rule.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-amber-300">
                    {rule.metric}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{rule.detail}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HAULING_LOGISTICS_RULES.map((rule) => (
              <SpotlightCard
                key={rule.code}
                tone="amber"
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-amber-400 uppercase">
                    {rule.code} · {rule.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/35 text-amber-300">
                    {rule.metric}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{rule.detail}</p>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
