import {
  AlertTriangle,
  ArrowDown,
  BookOpen,
  ChevronRight,
  GitFork,
  Layers,
  RotateCcw,
} from 'lucide-react';
import {
  CloneFilter,
  IndustryModuleGroup,
  IndustryModuleId,
  VisualMode,
} from '../../../types';
import { getIndustryModuleHref } from '../../../router/useHashRoute';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TacticalGridBackground } from '@/components/ui/TacticalGridBackground';
import { INDUSTRY_GROUP_ORDER } from '../index';
import { INDUSTRY_BASE_CONCEPTS, INDUSTRY_LIBRARY_INTRO } from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface IndustryOverviewSectionProps {
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

const GROUPED_ROADMAP: {
  group: IndustryModuleGroup;
  chapters: {
    id: IndustryModuleId;
    step: string;
    title: string;
    desc: string;
  }[];
}[] = [
  {
    group: 'Fundamentos & Planos',
    chapters: [
      {
        id: 'blueprints',
        step: 'Cap. 1',
        title: 'Blueprints, ME/TE & SCI',
        desc: 'BPO vs BPC, investigación, cuándo esperar, simulador ME por lote y complejos Upwell.',
      },
    ],
  },
  {
    group: 'Producción & Logística',
    chapters: [
      {
        id: 't1',
        step: 'Cap. 2',
        title: 'Fabricación T1',
        desc: 'Primeros lotes sin quemar ISK, checklist previo y productos de rotación diaria.',
      },
      {
        id: 'logistics',
        step: 'Cap. 3',
        title: 'Reprocesado & Logística',
        desc: 'Rendimiento de reprocesado NPC vs Athanor/Tatara, compresión, hauling y collateral.',
      },
      {
        id: 'economy',
        step: 'Cap. 4',
        title: 'Economía & Break-Even',
        desc: 'Sales Tax, Broker Fee, preajustes por skills y calculadora de punto de equilibrio.',
      },
    ],
  },
  {
    group: 'Escala T2, Reacciones & Alianza',
    chapters: [
      {
        id: 'workflow',
        step: 'Cap. 5',
        title: 'Invención & Producción T2',
        desc: 'Probabilidad promedio, datacores, tabla de decryptors y salto a Tech II.',
      },
      {
        id: 'reactions',
        step: 'Cap. 6',
        title: 'Reacciones & Moon Goo',
        desc: 'Composite, Biochemical, Hybrid T3 y cadenas avanzadas (HAM T2, Moon Goo, Capitales).',
      },
      {
        id: 'alliance',
        step: 'Cap. 7',
        title: 'Industria de Alianza',
        desc: 'Buyback con Janice (x% Jita Buy), contratos internos y suministro de doctrina.',
      },
    ],
  },
  {
    group: 'Herramientas & Habilidades',
    chapters: [
      {
        id: 'tools',
        step: 'Cap. 8',
        title: 'Herramientas & Enlaces',
        desc: 'Directorio completo de calculadoras, tasación, mercados y guías de EVE University.',
      },
      {
        id: 'skills',
        step: 'Cap. 9',
        title: 'Biblia de Skills',
        desc: 'Habilidades de Producción, Ciencia/Invención y Comercio con topes Alpha y Omega.',
      },
    ],
  },
];

export function IndustryOverviewSection({
  cloneFilter,
  searchQuery,
  visualMode,
  onResetSearch,
}: IndustryOverviewSectionProps) {
  const q = normalizeSearch(searchQuery);
  const matchesOverview = !q || MODULE_SEARCH_KEYWORDS.overview.includes(q);

  if (!matchesOverview) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          No hay coincidencias en Índice & Conceptos Base para &quot;{searchQuery}&quot;.
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
      {/* BLOQUE 01: QUÉ ESTÁS PAGANDO REALMENTE + FLUJO INDUSTRIAL */}
      <div
        className={`relative overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <TacticalGridBackground />

        <div className="relative z-10 space-y-5">
          {/* Barra compacta de acceso al Directorio de la Biblioteca (Bloque 00 -> Cap. 8) */}
          <div className="rounded-xl border border-amber-500/35 bg-zinc-950/90 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-0.5">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  Biblioteca de Industria / Producción
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{INDUSTRY_LIBRARY_INTRO}</p>
              </div>
            </div>
            <a
              href={getIndustryModuleHref('tools')}
              className="tactical-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 transition-colors shrink-0"
            >
              <span>Abrir Herramientas y Enlaces (Cap. 8)</span>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              <GitFork className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Qué estás pagando realmente</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Fabricar no es convertir minerales en ISK gratis. Cada job tiene coste, tiempo,
              impuestos, materiales, riesgo de mercado y coste de oportunidad.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Conceptos clave
            </h3>

            {visualMode === 'dossier' ? (
              <div
                tabIndex={0}
                role="region"
                aria-labelledby="base-concepts-caption"
                className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
              >
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <caption id="base-concepts-caption" className="sr-only">
                    Conceptos base de un trabajo industrial en EVE Online
                  </caption>
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                      <th scope="col" className="p-3">
                        Parámetro / Concepto
                      </th>
                      <th scope="col" className="p-3">
                        Impacto real en tu fabricación
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {INDUSTRY_BASE_CONCEPTS.map((item) => (
                      <tr key={item.term} className="hover:bg-zinc-900/40">
                        <th
                          scope="row"
                          className="p-3 font-mono font-bold text-amber-300 whitespace-nowrap"
                        >
                          {item.term}
                        </th>
                        <td className="p-3 text-zinc-300 leading-relaxed">{item.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {INDUSTRY_BASE_CONCEPTS.map((item) => (
                  <SpotlightCard
                    key={item.term}
                    tone="amber"
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 space-y-1"
                  >
                    <h4 className="text-xs font-mono font-bold text-amber-300">{item.term}</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-bold text-amber-200 leading-relaxed">
              Si no has calculado coste total, precio de venta y volumen vendido, no estás
              fabricando: estás apostando con pasos extra.
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
                        Vía Tech I (Alpha & Omega)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-100">Fabricación Directa Tech I</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Ensamblaje directo desde el BPO o BPC T1 usando minerales estándar (Tritanium
                      a Megacyte). Sirve para aprender a rotar stock y abastecer hubs.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Insumo: Minerales T1</span>
                    <span className="text-zinc-200 font-semibold">→ Producto T1</span>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Vía Tech II (Solo Omega)
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-amber-300">
                      Invención (Invention) T2 + Datacores + Decryptors
                    </h4>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 space-y-1">
                      <div className="text-xs font-bold text-zinc-100">
                        Resultado: BPC (Copia) Tech II
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Pasa a Fabricación T2 junto con Morphite, componentes avanzados, PI y R.A.M.
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
      </div>

      {/* DIFERENCIAS DE CLON EN INDUSTRIA (ALPHA VS OMEGA) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Escalones de Clon en Industria: Alpha vs. Omega</span>
          </h2>
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
            <SpotlightCard
              tone="zinc"
              className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 sm:p-5 space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
                    INDUSTRIA EN CLON ALPHA
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">Tech I & Investigación</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed list-disc list-inside">
                  <li>
                    <strong>Fabricación Tech I completa:</strong> Puedes comprar BPOs T1,
                    investigarlos hasta <strong>ME 10 / TE 20</strong>, sacar copias y fabricar
                    drones, munición, módulos y naves T1.
                  </li>
                  <li>
                    <strong>Límite de líneas:</strong> Hasta 4 trabajos de manufactura (
                    <em>Mass Production III</em>) y 4 de laboratorio (
                    <em>Laboratory Operation III</em>) en paralelo.
                  </li>
                  <li>
                    <strong>Recargo fiscal Alpha (+2%):</strong> Todos los trabajos industriales
                    lanzados por un clon Alpha pagan un impuesto adicional del 2% sobre el coste
                    estimado del objeto.
                  </li>
                  <li>
                    <strong>Restricciones:</strong> Las habilidades de ciencias,{' '}
                    <em>Encryption Methods</em> y <em>Reactions</em> están bloqueadas (sin Invención
                    T2 ni reacciones Moon Goo).
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-zinc-800/80">
                <a
                  href={getIndustryModuleHref('t1')}
                  className="inline-flex items-center gap-1 py-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Ir a Fabricación T1 y productos de alta rotación</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </SpotlightCard>
          )}

          {(cloneFilter === 'all' || cloneFilter === 'omega' || cloneFilter === 'expert') && (
            <SpotlightCard
              tone="amber"
              className="rounded-xl border border-amber-500/40 bg-zinc-950 p-4 sm:p-5 space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    INDUSTRIA EN CLON OMEGA
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400">
                    Invención T2 · Reacciones · 11 Slots
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed list-disc list-inside">
                  <li>
                    <strong>Invención y Manufactura Tech II:</strong> Desbloquea disciplinas
                    científicas, <em>Encryption Methods</em> y uso de Datacores/Decryptors para
                    crear BPCs T2.
                  </li>
                  <li>
                    <strong>Producción masiva en paralelo:</strong> Hasta <strong>11 líneas</strong>{' '}
                    de fabricación, <strong>11 de laboratorio</strong> y{' '}
                    <strong>11 de reacciones</strong> por personaje en la cuenta.
                  </li>
                  <li>
                    <strong>Sin recargo Alpha y menores impuestos:</strong> Elimina el +2% de tasa
                    Alpha y permite llevar <em>Accounting V</em> y <em>Broker Relations V</em> al
                    máximo para proteger el margen neto.
                  </li>
                  <li>
                    <strong>Reacciones e Industria Capital:</strong> Acceso a refinerías{' '}
                    <em>Athanor/Tatara</em> para Moon Goo y construcción de componentes capitales en{' '}
                    <em>Azbel/Sotiyo</em>.
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-zinc-800/80">
                <a
                  href={getIndustryModuleHref('workflow')}
                  className="inline-flex items-center gap-1 py-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Ir a Invención & Producción T2</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </SpotlightCard>
          )}
        </div>
      </div>

      {/* MAPA DE PROGRESIÓN POR FASES (CAPÍTULOS 1 A 9) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
            Hoja de Ruta · Los 9 Capítulos Técnicos de la Guía
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Ordenados por fases desde la lectura del primer blueprint hasta producción de alianza y
            herramientas.
          </p>
        </div>

        <div className="space-y-4">
          {INDUSTRY_GROUP_ORDER.map((groupName) => {
            const phase = GROUPED_ROADMAP.find((g) => g.group === groupName);
            if (!phase) return null;

            return (
              <div key={groupName} className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {groupName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {phase.chapters.map((card) => (
                    <a
                      key={card.id}
                      href={getIndustryModuleHref(card.id)}
                      className="group rounded-xl border border-zinc-800 bg-zinc-950 hover:border-amber-500/50 p-4 flex flex-col justify-between gap-2.5 transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                          {card.step}
                        </span>
                        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-400 inline-flex items-center gap-1 pt-1">
                        <span>Abrir capítulo</span>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
