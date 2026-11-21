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
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
              {T1_STARTER_IDEAS.map((idea) => (
                <li key={idea}>• {idea}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/35 bg-zinc-950 p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Antes de producir
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
              {T1_PRE_PRODUCTION_CHECKLIST.map((check) => (
                <li key={check}>• {check}</li>
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

      {/* PASO 1 Y PASO 3 OPERATIVOS EN EL CLIENTE DE EVE */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
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
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>2. Lanzar el job y recoger el lote</span>
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
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Ejemplos de Productos de Alta Rotación (Starter T1)</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Cuatro líneas T1 con demanda diaria constante, BPOs baratos y escalado directo a T2.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((prod, idx) => (
              <SpotlightCard
                key={prod.id}
                tone="amber"
                className={`border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3 ${
                  visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-amber-400">
                      {idx + 1}. {prod.category}
                    </h4>
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

                <div className="pt-2.5 border-t border-zinc-800/80 text-xs text-zinc-300">
                  <strong className="text-amber-300">Escalado T2:</strong> {prod.upgradePath}
                </div>
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-400">
            {cloneFilter === 'omega'
              ? 'El filtro está fijado en "Solo Omega" (estas líneas son Alpha & Omega, también fabricables en Omega).'
              : 'Ningún ejemplo de producto coincide con el buscador actual.'}
          </div>
        )}
      </div>
    </div>
  );
}
