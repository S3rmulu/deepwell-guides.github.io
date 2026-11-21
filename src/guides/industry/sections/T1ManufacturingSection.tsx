import { CheckCircle2, Cpu, ExternalLink, Hammer, Lightbulb, RotateCcw } from 'lucide-react';
import { CloneFilter, IndustryStarterProductItem, VisualMode } from '../../../types';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';
import { SpotlightCard } from '../../../components/ui/SpotlightCard';
import { T1_PRE_PRODUCTION_CHECKLIST, T1_STARTER_IDEAS, T1_TOOL_LINKS } from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface T1ManufacturingSectionProps {
  products: IndustryStarterProductItem[];
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function T1ManufacturingSection({
  products,
  cloneFilter,
  searchQuery,
  visualMode,
  onResetSearch,
}: T1ManufacturingSectionProps) {
  const q = normalizeSearch(searchQuery);
  const matchesT1 = !q || MODULE_SEARCH_KEYWORDS.t1.includes(q) || products.length > 0;

  if (!matchesT1) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún contenido de Fabricación T1 coincide con &quot;{searchQuery}&quot;.
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
      {/* BLOQUE 03: FABRICACIÓN T1 — EMPEZAR SIN QUEMAR ISK */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Fabricación T1: empezar sin quemar ISK</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            <strong>Buen primer escalón:</strong> T1 sirve para aprender el circuito completo:
            conseguir materiales, calcular costes, lanzar jobs, transportar, vender y revisar margen
            real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Ideas razonables para empezar
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 list-disc list-inside">
              {T1_STARTER_IDEAS.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/35 bg-zinc-950 p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Antes de producir
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 list-disc list-inside">
              {T1_PRE_PRODUCTION_CHECKLIST.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Herramientas:
          </span>
          {T1_TOOL_LINKS.map((link) => (
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

      {/* PASOS OPERATIVOS EN EL CLIENTE DE EVE */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
          <span>Ejecución en el Cliente de EVE (BPO → Manufacturing)</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-amber-400">
                1. Compra e investigación del BPO T1
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200">
                ALPHA & OMEGA
              </span>
            </div>
            <ol className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed list-decimal list-inside">
              <li>
                Compra el BPO T1 en el mercado regional (
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-amber-500/40 text-amber-300 font-mono text-xs">
                  Alt + R
                </kbd>{' '}
                → <em>Blueprints & Reactions</em>) en órdenes de corporaciones NPC (duración &gt; 90
                días) para evitar sobreprecios.
              </li>
              <li>
                Llévalo a una estructura con servicio de <strong>Research</strong> y bajo SCI.
              </li>
              <li>
                Sube primero ME y saca copias (BPCs) si vas a producir en paralelo o usar contratos
                internos.
              </li>
            </ol>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-amber-400">
                2. Lanzar el job y recoger el lote
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200">
                Manufacturing
              </span>
            </div>
            <ol className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed list-decimal list-inside">
              <li>Mueve los minerales o insumos al hangar de la estación o complejo Upwell.</li>
              <li>
                Abre el BPO o BPC, fija la cantidad de <em>runs</em> y revisa el coste de
                instalación (SCI + facility tax).
              </li>
              <li>
                Pulsa <strong>Start</strong> y, al terminar el temporizador,{' '}
                <strong>Deliver</strong>.
              </li>
            </ol>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>
                Agrupa varios runs en un solo job en lugar de lanzar 10 jobs de 1 run para
                aprovechar el redondeo porcentual de ME sobre todo el lote.
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* PRODUCTOS DE ALTA ROTACIÓN PARA EMPEZAR (STARTER_PRODUCTS) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Ejemplos de Productos de Alta Rotación (Starter T1)</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Cuatro líneas T1 con demanda diaria constante, BPOs baratos y escalado directo a
              Invención Tech II.
            </p>
          </div>
          {cloneFilter === 'omega' && (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/35 text-amber-300">
              MODO OMEGA · INSUMOS BASE PARA INVENCIÓN T2
            </span>
          )}
        </div>

        {products.length > 0 ? (
          visualMode === 'dossier' ? (
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="starter-t1-table-caption"
              className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
            >
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <caption id="starter-t1-table-caption" className="sr-only">
                  Productos Tech I de alta rotación recomendados para empezar en industria
                </caption>
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                    <th scope="col" className="p-3">
                      Línea de Producto
                    </th>
                    <th scope="col" className="p-3">
                      Artículos Clave
                    </th>
                    <th scope="col" className="p-3">
                      Demanda & Rotación
                    </th>
                    <th scope="col" className="p-3">
                      Escalado T2 (Omega)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {products.map((prod, idx) => (
                    <tr key={prod.id} className="align-top hover:bg-zinc-900/40">
                      <th
                        scope="row"
                        className="p-3 font-bold text-amber-400 whitespace-nowrap"
                      >
                        {idx + 1}. {prod.category}
                      </th>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5 min-w-[14rem]">
                          {prod.items.map((item) => (
                            <span
                              key={item.typeId}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-100"
                            >
                              <img
                                src={`https://images.evetech.net/types/${item.typeId}/icon?size=64`}
                                alt=""
                                width={18}
                                height={18}
                                loading="lazy"
                                decoding="async"
                                className="w-4 h-4 rounded object-contain shrink-0"
                              />
                              <span>{item.name}</span>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-zinc-300 leading-relaxed min-w-[15rem]">
                        {prod.rotationNote}
                      </td>
                      <td className="p-3 text-xs text-amber-200/90 leading-relaxed min-w-[15rem]">
                        {prod.upgradePath}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((prod, idx) => (
                <SpotlightCard
                  key={prod.id}
                  tone="amber"
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-amber-400">
                        {idx + 1}. {prod.category}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                          prod.clone
                        )}`}
                      >
                        ALPHA & OMEGA
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {prod.items.map((item) => (
                        <div
                          key={item.typeId}
                          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-xs font-semibold text-zinc-100"
                        >
                          <img
                            src={`https://images.evetech.net/types/${item.typeId}/icon?size=64`}
                            alt=""
                            width={22}
                            height={22}
                            loading="lazy"
                            decoding="async"
                            className="w-5 h-5 rounded object-contain shrink-0"
                          />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {prod.rotationNote}
                    </p>
                  </div>

                  <div
                    className={`pt-2.5 border-t text-xs ${
                      cloneFilter === 'omega'
                        ? 'border-amber-500/40 text-amber-200 bg-amber-500/10 -mx-2 px-2.5 py-2 rounded-lg'
                        : 'border-zinc-800/80 text-zinc-300'
                    }`}
                  >
                    <strong className="text-amber-300">Escalado T2:</strong> {prod.upgradePath}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-400">
            Ningún ejemplo de producto coincide con el buscador actual.
          </div>
        )}
      </div>
    </div>
  );
}
