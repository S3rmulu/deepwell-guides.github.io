import { CheckCircle2, Cpu, FlaskConical, RotateCcw, Wrench } from 'lucide-react';
import { CloneFilter, VisualMode } from '../../../types';
import { DECRYPTORS_REFERENCE } from '../data';

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
  const q = searchQuery.trim().toLowerCase();

  const visibleDecryptors = DECRYPTORS_REFERENCE.filter(
    (d) =>
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.useCase.toLowerCase().includes(q) ||
      d.probabilityMod.toLowerCase().includes(q)
  );

  const showStep1 =
    !q ||
    'paso 1 adquisicion investigacion plano t1 bpo mercado regional alt + r blueprints reactions npc research me 10 te 20 copias bpc'.includes(
      q
    );

  const showStep2 =
    !q ||
    'paso 2 invencion tech ii invention bpc t1 datacores decryptor probabilidad exito runs me te'.includes(
      q
    ) ||
    visibleDecryptors.length > 0;

  const showStep3 =
    !q ||
    'paso 3 fabricacion ensamblaje minerales componentes hangar bpc runs coste instalacion sci start'.includes(
      q
    );

  if (!showStep1 && !showStep2 && !showStep3) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún paso del proceso industrial coincide con "{searchQuery}".
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
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Módulo 2: Proceso Industrial Paso a Paso</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Secuencia operativa desde que compras un plano original sin investigar hasta que sacas
            lotes Tech I o Tech II listos para vender.
          </p>
        </div>

        {/* PASO 1 */}
        {showStep1 && (
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/40 font-mono text-xs text-amber-300">
                  01
                </span>
                <span>Paso 1: Adquisición e Investigación del Plano T1</span>
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200">
                ALPHA & OMEGA
              </span>
            </div>

            <ol className="space-y-2.5 text-sm text-zinc-300 leading-relaxed list-decimal list-inside">
              <li>
                Compra el <strong>BPO T1</strong> en el mercado regional (
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-amber-500/40 text-amber-300 font-mono text-xs">
                  Alt + R
                </kbd>{' '}
                → <em>Blueprints & Reactions</em>) verificando las órdenes de venta de corporaciones
                NPC (duración superior a 90 días) para no pagar sobreprecio a revendedores.
              </li>
              <li>
                Traslada el BPO a una estación o complejo de ingeniería Upwell (<em>Raitaru</em> /{' '}
                <em>Azbel</em>) con servicio de <strong>Research</strong> y bajo índice de coste
                (SCI).
              </li>
              <li>
                Lanza trabajos de investigación para llevar el plano hasta{' '}
                <strong>ME 10 / TE 20</strong> (en planos baratos de munición, drones o módulos T1
                los primeros niveles tardan apenas minutos u horas).
              </li>
              <li>
                Saca copias (<strong>BPC T1</strong>) para fabricar en serie sin mover el BPO
                original o como insumo directo para trabajos de invención.
              </li>
            </ol>
          </section>
        )}

        {/* PASO 2 */}
        {showStep2 && (
          <section className="rounded-xl border border-amber-500/40 bg-zinc-950 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/40 font-mono text-xs text-amber-300">
                  02
                </span>
                <span>Paso 2: Invención Tech II (Invention)</span>
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300">
                SOLO OMEGA
              </span>
            </div>

            {cloneFilter === 'alpha' && (
              <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-200">
                Nota para filtro <strong>Alpha</strong>: la pestaña de Invención requiere skills de
                ciencia y <em>Encryption Methods</em> exclusivas de cuentas Omega.
              </div>
            )}

            <p className="text-sm text-zinc-300 leading-relaxed">
              Para generar planos de munición, módulos, drones, rigs o naves Tech II:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3.5 space-y-1">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                  1. Copia Base (1x BPC T1)
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Cada intento de invención consume 1 run de tu <strong>BPC T1</strong>. El nivel de
                  ME/TE de la copia T1 no altera el ME/TE del BPC T2 resultante.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3.5 space-y-1">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                  2. Datacores (x2 ramas)
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Se consumen en cada intento (tenga éxito o falle). Se obtienen con puntos de
                  investigación de agentes R&D, exploración Data Sites o en el mercado de Jita.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3.5 space-y-1">
                <div className="text-xs font-mono uppercase text-sky-300 font-bold">
                  3. Decryptor (Opcional)
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Modifica la probabilidad de éxito, las carreras (<em>runs</em>) y los valores de
                  ME/TE del BPC T2 resultante (base sin decryptor: <strong>ME 2% / TE 4%</strong>).
                </p>
              </div>
            </div>

            <ol
              start={2}
              className="space-y-2 text-sm text-zinc-300 leading-relaxed list-decimal list-inside pt-1"
            >
              <li>
                Abre la ventana de <strong>Industry</strong> → pestaña <strong>Invention</strong>{' '}
                (icono de átomo azul).
              </li>
              <li>
                Selecciona el producto T2 objetivo (si un plano T1 permite inventar varias variantes,
                como munición <em>Rage</em> vs. <em>Javelin</em> o distintos cascos T2, elige la
                variante antes de pulsar Start).
              </li>
              <li>
                Inicia el trabajo. En caso de éxito, recibirás en el hangar una{' '}
                <strong>BPC T2</strong> con runs limitados lista para fabricar.
              </li>
            </ol>

            {/* Tabla de Referencia de Decryptors */}
            {visibleDecryptors.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tabla de Referencia de Decryptors (Modificadores sobre BPC T2)</span>
                </h4>
                <div
                  tabIndex={0}
                  role="region"
                  aria-labelledby="decryptors-table-caption"
                  className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40"
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
                      {visibleDecryptors.map((dec) => (
                        <tr key={dec.name} className="hover:bg-zinc-900/60">
                          <th
                            scope="row"
                            className="p-2.5 font-bold text-zinc-100 whitespace-nowrap"
                          >
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* PASO 3 */}
        {showStep3 && (
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/40 font-mono text-xs text-amber-300">
                  03
                </span>
                <span>Paso 3: Fabricación y Ensamblaje</span>
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-amber-400" aria-hidden="true" />
                <span>Manufacturing</span>
              </span>
            </div>

            <ol className="space-y-2.5 text-sm text-zinc-300 leading-relaxed list-decimal list-inside">
              <li>
                Traslada los minerales (para T1) o componentes avanzados, Morphite, materiales
                planetarios y R.A.M. (para T2) al hangar de la estación o complejo Upwell de
                fabricación. <em>Nota:</em> para fabricar un objeto T2 necesitas también{' '}
                <strong>1 unidad de la versión T1</strong> por cada run.
              </li>
              <li>
                Abre el plano o la <strong>BPC</strong> (T1 o T2), ajusta la cantidad de{' '}
                <em>runs</em> deseados y verifica en la esquina inferior derecha el coste de
                instalación (<strong>SCI</strong> + impuestos de la estructura).
              </li>
              <li>
                Haz clic en <strong>Start</strong> y espera a que finalice el temporizador para
                pulsar <strong>Deliver</strong> y recoger el lote terminado en tu hangar de salida.
              </li>
            </ol>

            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>
                Consejo de lote: agrupa varios runs en un solo trabajo (en vez de lanzar 10 trabajos
                de 1 run) para aprovechar el redondeo porcentual de ME sobre el total del lote.
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
