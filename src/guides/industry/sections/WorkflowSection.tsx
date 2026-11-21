import { AlertTriangle, ExternalLink, FlaskConical, RotateCcw } from 'lucide-react';
import { CloneFilter, VisualMode } from '../../../types';
import {
  ADVANCED_CHAINS_PREVIEW,
  DECRYPTORS_REFERENCE,
  INVENTION_READING_LINKS,
  INVENTION_SYSTEM_PIECES,
} from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface WorkflowSectionProps {
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function WorkflowSection({
  cloneFilter,
  searchQuery,
  visualMode,
  onResetSearch,
}: WorkflowSectionProps) {
  const q = normalizeSearch(searchQuery);

  const visibleDecryptors = DECRYPTORS_REFERENCE.filter(
    (d) =>
      !q ||
      normalizeSearch(`${d.name} ${d.useCase} ${d.probabilityMod}`).includes(q)
  );

  const keywordHit = !q || MODULE_SEARCH_KEYWORDS.workflow.includes(q);
  const hamT2Chain = ADVANCED_CHAINS_PREVIEW.find((c) => c.id === 'ham-t2');

  if (!keywordHit && visibleDecryptors.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún contenido de Invención y Producción T2 coincide con &quot;{searchQuery}&quot;.
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
      {/* BLOQUE 05: INVENTION Y PRODUCCIÓN T2 */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Invention y producción T2</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong>Qué es invention:</strong> Invention convierte copias T1 en posibles BPCs T2
              usando datacores, skills y a veces decryptors. Tiene probabilidad de fallo, así que
              se calcula en promedio, no por intento suelto.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300">
            SOLO OMEGA
          </span>
        </div>

        {(cloneFilter === 'alpha' || cloneFilter === 'expert') && (
          <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-200">
            Nota para filtro <strong>{cloneFilter === 'alpha' ? 'Alpha' : 'Expert System'}</strong>
            : la pestaña de Invención requiere skills de ciencia y <em>Encryption Methods</em>{' '}
            exclusivas de cuentas Omega.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Piezas del sistema
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
              {INVENTION_SYSTEM_PIECES.map((piece) => (
                <li key={piece}>• {piece}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold text-amber-300">Consejo</p>
              <p className="text-zinc-200 leading-relaxed">
                No empieces por naves T2 caras si aún no controlas margen, logística y rotación.
                Módulos, rigs o munición T2 suelen enseñar mejor y doler menos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Lectura:</span>
          {INVENTION_READING_LINKS.map((link) => (
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

      {/* EJECUCIÓN DE INVENTION + TABLA DE DECRYPTORS */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <h3 className="text-base sm:text-lg font-bold text-zinc-100">
          Proceso de Invención paso a paso
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 space-y-1">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              1. Copia Base (1x BPC T1)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Cada intento consume 1 run de tu <strong>BPC T1</strong>. El ME/TE de la copia T1 no
              altera el ME/TE del BPC T2 resultante.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 space-y-1">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              2. Datacores (x2 ramas)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Se consumen en cada intento (salga bien o falle). Se obtienen con agentes R&amp;D,
              Data Sites o comprando en Jita.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 space-y-1">
            <div className="text-xs font-mono uppercase text-sky-300 font-bold">
              3. Decryptor (Opcional)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Modifica probabilidad, carreras (<em>runs</em>) y ME/TE del BPC T2 (base sin
              decryptor: <strong>ME 2% / TE 4%</strong>).
            </p>
          </div>
        </div>

        <ol className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed list-decimal list-inside">
          <li>
            Abre <strong>Industry</strong> → pestaña <strong>Invention</strong> (icono de átomo
            azul).
          </li>
          <li>
            Selecciona la variante T2 objetivo (ej. <em>Rage</em> vs. <em>Javelin</em> o casco T2
            concreto) antes de pulsar <strong>Start</strong>.
          </li>
          <li>
            Para fabricar la BPC T2 resultante necesitarás también{' '}
            <strong>1 unidad de la versión T1</strong> por cada run, además de Morphite, componentes
            T2, PI y R.A.M.
          </li>
        </ol>

        <div className="space-y-2.5 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tabla de Referencia de Decryptors (Modificadores sobre BPC T2)</span>
          </h4>
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="decryptors-table-caption"
            className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
          >
            <table className="w-full text-left border-collapse text-xs">
              <caption id="decryptors-table-caption" className="sr-only">
                Modificadores de probabilidad, runs, ME y TE de los Decryptors en Invención T2
              </caption>
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/90 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                  <th scope="col" className="p-2.5">
                    Decryptor
                  </th>
                  <th scope="col" className="p-2.5">
                    Probabilidad
                  </th>
                  <th scope="col" className="p-2.5">
                    Runs Extra
                  </th>
                  <th scope="col" className="p-2.5">
                    ME Resultante
                  </th>
                  <th scope="col" className="p-2.5">
                    TE Resultante
                  </th>
                  <th scope="col" className="p-2.5">
                    Uso Recomendado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {(visibleDecryptors.length > 0 ? visibleDecryptors : DECRYPTORS_REFERENCE).map(
                  (dec) => (
                    <tr key={dec.name} className="hover:bg-zinc-900/60">
                      <th scope="row" className="p-2.5 font-bold text-zinc-100 whitespace-nowrap">
                        {dec.name}
                      </th>
                      <td className="p-2.5 font-mono tabular-nums text-amber-300 whitespace-nowrap">
                        {dec.probabilityMod}
                      </td>
                      <td className="p-2.5 font-mono tabular-nums text-sky-300 whitespace-nowrap">
                        {dec.runsMod}
                      </td>
                      <td className="p-2.5 font-mono tabular-nums text-zinc-200 whitespace-nowrap">
                        {dec.meMod}
                      </td>
                      <td className="p-2.5 font-mono tabular-nums text-zinc-200 whitespace-nowrap">
                        {dec.teMod}
                      </td>
                      <td className="p-2.5 text-zinc-300 leading-relaxed min-w-[16rem]">
                        {dec.useCase}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EJEMPLO DE CADENA T2 (HAM T2) */}
      {hamT2Chain && (
        <div
          className={`border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm sm:text-base font-bold text-amber-400">{hamT2Chain.title}</h4>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/35">
              {hamT2Chain.facility}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{hamT2Chain.summary}</p>
          <ol className="space-y-1 text-xs sm:text-sm text-zinc-300 list-decimal list-inside">
            {hamT2Chain.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
