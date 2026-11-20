import {
  AlertTriangle,
  ArrowDown,
  ChevronRight,
  GitFork,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CloneFilter, VisualMode } from '../../../types';
import { getIndustryModuleHref } from '../../../router/useHashRoute';

interface IndustryOverviewSectionProps {
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function IndustryOverviewSection({
  cloneFilter,
  searchQuery,
  visualMode,
  onResetSearch,
}: IndustryOverviewSectionProps) {
  const q = searchQuery.trim().toLowerCase();

  const matchesOverview =
    !q ||
    'flujo industrial materias primas minerales pi gas reacciones planos blueprints bpo bpc investigacion me te fabricacion tech i invencion tech ii datacores decryptors producto final venta distribucion hub jita dodixie amarr alpha omega recargo 2%'.includes(
      q
    );

  if (!matchesOverview) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          No hay coincidencias en Visión General del Flujo Industrial para "{searchQuery}".
        </p>
        <p className="text-xs sm:text-sm text-zinc-400">
          Revisa los contadores en los demás capítulos de la guía o limpia el buscador.
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
      {/* BLOQUE 1: VISIÓN GENERAL Y DIAGRAMA DEL FLUJO INDUSTRIAL */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Módulo 0: Visión General del Flujo Industrial</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            La industria en New Eden transforma recursos primarios en bienes terminados mediante{' '}
            <strong>Planos (Blueprints)</strong> e instalaciones industriales. Este manual cubre
            toda la cadena de valor: adquisición e investigación de planos originales, invención y
            fabricación Tech II, costes de instalación (SCI) e impuestos de mercado.
          </p>
        </div>

        {/* Diagrama Visual y Semántico del Flujo Industrial */}
        <figure
          aria-labelledby="industry-flow-caption"
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 space-y-4"
        >
          <figcaption
            id="industry-flow-caption"
            className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-800/80"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Esquema Táctico · Cadena de Valor Industrial (T1 & T2)
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              Materias Primas → Planos → Manufactura → Hubs
            </span>
          </figcaption>

          <div className="max-w-3xl mx-auto space-y-3">
            {/* Etapa 1: Materias Primas */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-900/80 p-3.5 text-center space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                1. Materias Primas
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 font-semibold">
                Minerales · Recursos Planetarios (PI) · Gas · Reacciones Moon Goo
              </p>
            </div>

            <div className="flex justify-center" aria-hidden="true">
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </div>

            {/* Etapa 2: Planos (Blueprints) */}
            <div className="rounded-xl border border-amber-500/40 bg-zinc-900/40 p-4 space-y-3">
              <div className="text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  2. Planos (Blueprints) · Laboratorio de Investigación
                </span>
              </div>

              <div className="max-w-md mx-auto space-y-2.5">
                <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-center">
                  <div className="text-xs sm:text-sm font-bold text-zinc-100">
                    BPO (Original) Tech I
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Ejecuciones infinitas (comprado a NPC)
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 text-[11px] font-mono text-amber-400">
                  <span>Investigación (ME 10% / TE 20%) + Copiado</span>
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </div>

                <div className="rounded-lg border border-sky-500/40 bg-zinc-950 p-3 text-center">
                  <div className="text-xs sm:text-sm font-bold text-sky-300">
                    BPC (Copia) Tech I
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Carreras (runs) limitadas · Hereda el ME/TE del BPO
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center" aria-hidden="true">
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </div>

            {/* Etapa 3: Bifurcación T1 vs Invención T2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {/* Rama Izquierda: Tech I */}
              <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
                      Vía Tech I (Alpha & Omega)
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-100">Fabricación Directa Tech I</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Ensamblaje directo desde el BPO o BPC T1 usando minerales estándar (Tritanium a
                    Megacyte). Ideal para aprender a rotar stock y abastecer hubs.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                  <span>Insumo: Minerales T1</span>
                  <span className="text-zinc-200 font-semibold">→ Producto T1</span>
                </div>
              </div>

              {/* Rama Derecha: Tech II */}
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Vía Tech II (Solo Omega)
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-amber-300">
                    Invención (Invention) T2 + Datacores + Decryptors
                  </h3>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 space-y-1">
                    <div className="text-xs font-bold text-zinc-100">
                      Resultado: BPC (Copia) Tech II
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Se lleva a Fabricación T2 junto con Morphite, componentes avanzados, PI y
                      R.A.M.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-amber-500/20 text-[11px] font-mono text-amber-300 flex items-center justify-between">
                  <span>Insumo: BPC T2 + Comp.</span>
                  <span className="font-semibold">→ Producto T2</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center" aria-hidden="true">
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </div>

            {/* Etapa 4: Producto Final */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-900/80 p-3.5 text-center space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                4. Producto Final
              </div>
              <p className="text-xs sm:text-sm text-zinc-100 font-bold">
                Naves · Módulos · Municiones · Drones · Rigs
              </p>
            </div>

            <div className="flex justify-center" aria-hidden="true">
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </div>

            {/* Etapa 5: Venta en Hub */}
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-center space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                5. Venta / Distribución en Hub Comercial
              </div>
              <p className="text-xs sm:text-sm text-zinc-100 font-semibold">
                Jita · Dodixie · Amarr · Hek · Rens · Staging de Alianza en Null-Sec
              </p>
            </div>
          </div>
        </figure>
      </div>

      {/* BLOQUE 2: DIFERENCIAS DE CLON EN INDUSTRIA (ALPHA VS OMEGA) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Escalones de Clon en Industria: Alpha vs. Omega</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Qué parte de la cadena industrial puedes operar gratis y dónde empieza el terreno
            exclusivo de Omega.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 ${
            cloneFilter === 'all' || cloneFilter === 'expert' ? 'md:grid-cols-2' : ''
          } gap-4`}
        >
          {(cloneFilter === 'all' || cloneFilter === 'alpha' || cloneFilter === 'expert') && (
            <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
                    INDUSTRIA EN CLON ALPHA
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">Tech I & Investigación</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                  <li>
                    • <strong>Fabricación Tech I completa:</strong> Puedes comprar BPOs T1,
                    investigarlos hasta <strong>ME 10 / TE 20</strong>, sacar copias y fabricar
                    drones, munición, módulos y naves T1.
                  </li>
                  <li>
                    • <strong>Límite de líneas:</strong> Hasta 4 trabajos de manufactura (
                    <em>Mass Production III</em>) y 4 de laboratorio (
                    <em>Laboratory Operation III</em>) en paralelo.
                  </li>
                  <li>
                    • <strong>Recargo fiscal Alpha (+2%):</strong> Todos los trabajos industriales
                    lanzados por un clon Alpha pagan un impuesto adicional del 2% sobre el coste
                    estimado del objeto.
                  </li>
                  <li>
                    • <strong>Restricciones:</strong> Las habilidades de ciencias,{' '}
                    <em>Encryption Methods</em> y <em>Reactions</em> están bloqueadas (sin Invención
                    T2 ni reacciones Moon Goo).
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-zinc-800/80">
                <a
                  href={getIndustryModuleHref('skills')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Ver productos T1 de alta rotación para empezar</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          {(cloneFilter === 'all' || cloneFilter === 'omega' || cloneFilter === 'expert') && (
            <div className="rounded-xl border border-amber-500/40 bg-zinc-950 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    INDUSTRIA EN CLON OMEGA
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">
                    Invención T2 · Reacciones · 11 Slots
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                  <li>
                    • <strong>Invención y Manufactura Tech II:</strong> Desbloquea disciplinas
                    científicas, <em>Encryption Methods</em> y uso de Datacores/Decryptors para
                    crear BPCs T2.
                  </li>
                  <li>
                    • <strong>Producción masiva en paralelo:</strong> Hasta <strong>11 líneas</strong>{' '}
                    de fabricación, <strong>11 de laboratorio</strong> y{' '}
                    <strong>11 de reacciones</strong> por personaje en la cuenta.
                  </li>
                  <li>
                    • <strong>Sin recargo Alpha y menores impuestos:</strong> Elimina el +2% de tasa
                    Alpha y permite llevar <em>Accounting V</em> y <em>Broker Relations V</em> al
                    máximo para proteger el margen neto.
                  </li>
                  <li>
                    • <strong>Reacciones e Industria Capital:</strong> Acceso a refinerías{' '}
                    <em>Athanor/Tatara</em> para Moon Goo y construcción de componentes capitales en{' '}
                    <em>Azbel/Sotiyo</em>.
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-zinc-800/80">
                <a
                  href={getIndustryModuleHref('workflow')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Ir al proceso de Invención Tech II paso a paso</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-zinc-200 space-y-1">
            <p className="font-bold text-amber-300">
              Regla Fundamental antes de fabricar cualquier plano
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Los minerales que minas tú mismo <strong>no son gratis</strong>: tienen un coste de
              oportunidad igual al precio al que podrías venderlos hoy mismo en Jita o en el
              programa de recompra (<em>Buyback</em>) de tu corporación. Si el producto terminado se
              vende por debajo del valor de sus materias primas + tasas de instalación + impuestos de
              mercado, estás destruyendo ISK al fabricarlo.
            </p>
          </div>
        </div>
      </div>

      {/* Accesos rápidos a los capítulos técnicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {(
          [
            {
              id: 'blueprints',
              step: 'Capítulo 1',
              title: 'Planos, ME/TE & SCI',
              desc: 'BPO vs BPC, Regla de Oro T2 y simulador de materiales.',
            },
            {
              id: 'workflow',
              step: 'Capítulo 2',
              title: 'Proceso & Invención T2',
              desc: 'De comprar el BPO NPC a inventar con Datacores y Decryptors.',
            },
            {
              id: 'economy',
              step: 'Capítulo 3',
              title: 'Economía & Break-Even',
              desc: 'Sales Tax, Broker Fee y calculadora de punto de equilibrio.',
            },
            {
              id: 'skills',
              step: 'Capítulo 4',
              title: 'Productos & Skills',
              desc: 'Artículos de alta rotación, cadenas T2 y biblia de habilidades.',
            },
          ] as const
        ).map((card) => (
          <a
            key={card.id}
            href={getIndustryModuleHref(card.id)}
            className="group rounded-xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 p-4 flex flex-col justify-between gap-2 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  {card.step}
                </span>
                <Sparkles
                  className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h4 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                {card.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
            </div>
            <span className="text-[11px] font-semibold text-amber-400 inline-flex items-center gap-1 pt-1">
              <span>Abrir módulo</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
