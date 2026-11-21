import { useEffect, useId, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Calculator,
  Clock,
  ExternalLink,
  FileCode2,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { VisualMode } from '../../../types';
import { ShipHullPreview } from '../../../components/ui/ShipHullPreview';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import {
  BLUEPRINT_CHECK_ITEMS,
  BLUEPRINT_COMPARISON,
  BLUEPRINT_READING_LINKS,
  EFFICIENCY_PARAMETERS,
  RESEARCH_PRIORITIES,
  UPWELL_ENGINEERING_COMPLEXES,
} from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface BlueprintsSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

const ME_SIM_STORAGE_KEY = 'deepwell-indy-me-sim';

interface SavedMeSimState {
  baseMaterialPerRun: string;
  runsCount: string;
  blueprintMe: number;
  facilityMe: string;
}

function readInitialMeSimState(): SavedMeSimState {
  const defaults: SavedMeSimState = {
    baseMaterialPerRun: '1000',
    runsCount: '10',
    blueprintMe: 10,
    facilityMe: '1',
  };
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.sessionStorage.getItem(ME_SIM_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<SavedMeSimState>;
    return {
      baseMaterialPerRun:
        typeof parsed.baseMaterialPerRun === 'string'
          ? parsed.baseMaterialPerRun
          : defaults.baseMaterialPerRun,
      runsCount:
        typeof parsed.runsCount === 'string' ? parsed.runsCount : defaults.runsCount,
      blueprintMe:
        typeof parsed.blueprintMe === 'number' &&
        parsed.blueprintMe >= 0 &&
        parsed.blueprintMe <= 10
          ? parsed.blueprintMe
          : defaults.blueprintMe,
      facilityMe:
        typeof parsed.facilityMe === 'string' ? parsed.facilityMe : defaults.facilityMe,
    };
  } catch {
    return defaults;
  }
}

export function BlueprintsSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: BlueprintsSectionProps) {
  const q = normalizeSearch(searchQuery);
  const baseInputId = useId();
  const runsInputId = useId();
  const meInputId = useId();
  const structureMeInputId = useId();

  const [simState, setSimState] = useState<SavedMeSimState>(readInitialMeSimState);
  const { baseMaterialPerRun, runsCount, blueprintMe, facilityMe } = simState;

  useEffect(() => {
    try {
      window.sessionStorage.setItem(ME_SIM_STORAGE_KEY, JSON.stringify(simState));
    } catch {
      // Ignore storage errors
    }
  }, [simState]);

  const parsedBasePerRun = Number.parseInt(baseMaterialPerRun, 10) || 0;
  const parsedRuns = Number.parseInt(runsCount, 10) || 0;
  const totalBaseMaterial = parsedBasePerRun * parsedRuns;
  const parsedFacilityMe = Math.min(10, Math.max(0, Number.parseFloat(facilityMe) || 0));

  const rawRequired =
    totalBaseMaterial > 0
      ? totalBaseMaterial * (1 - blueprintMe / 100) * (1 - parsedFacilityMe / 100)
      : 0;
  const ceilingRequired =
    totalBaseMaterial > 0 ? Math.max(parsedRuns, Math.ceil(rawRequired)) : 0;
  const unitsSaved = Math.max(0, totalBaseMaterial - ceilingRequired);

  const visibleBpRows = BLUEPRINT_COMPARISON.filter(
    (b) =>
      !q ||
      normalizeSearch(`${b.type} ${b.acquisition} ${b.usage} ${b.t2Rule}`).includes(q)
  );

  const visibleEffRows = EFFICIENCY_PARAMETERS.filter(
    (e) =>
      !q ||
      normalizeSearch(`${e.parameter} ${e.impact} ${e.maxLevel}`).includes(q)
  );

  const visibleUpwell = UPWELL_ENGINEERING_COMPLEXES.filter(
    (u) =>
      !q ||
      normalizeSearch(`${u.name} ${u.roleBonus} ${u.rigNote}`).includes(q)
  );

  const keywordHit = !q || MODULE_SEARCH_KEYWORDS.blueprints.includes(q);
  const hasAnyMatch =
    keywordHit || visibleBpRows.length > 0 || visibleEffRows.length > 0 || visibleUpwell.length > 0;

  if (!hasAnyMatch) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún concepto de Blueprints, Investigación ME/TE o SCI coincide con &quot;{searchQuery}&quot;.
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
      {/* BLOQUE 02: BLUEPRINTS: BPO VS BPC & QUÉ MIRAR */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Blueprints: BPO vs BPC</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Un BPO es original y reutilizable. Un BPC es copia con usos limitados. Muchos
            industriales investigan BPOs para T1 y usan copias para producción, invention o
            contratos internos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(visibleBpRows.length > 0 ? visibleBpRows : BLUEPRINT_COMPARISON).map((bp) => (
            <SpotlightCard
              key={bp.code}
              tone={bp.code === 'BPO' ? 'amber' : 'sky'}
              className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
                bp.code === 'BPO'
                  ? 'border-amber-500/40 bg-zinc-950'
                  : 'border-sky-500/40 bg-zinc-950'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-zinc-100">{bp.type}</h3>
                <span
                  className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border ${
                    bp.code === 'BPO'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                      : 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                  }`}
                >
                  Runs: {bp.runs}
                </span>
              </div>
              <dl className="space-y-2 text-xs sm:text-sm">
                <div>
                  <dt className="text-[11px] font-mono uppercase text-zinc-400">Obtención</dt>
                  <dd className="text-zinc-200 mt-0.5 leading-relaxed">{bp.acquisition}</dd>
                </div>
                <div className="pt-2 border-t border-zinc-800/80">
                  <dt className="text-[11px] font-mono uppercase text-zinc-400">Uso industrial</dt>
                  <dd className="text-zinc-300 mt-0.5 leading-relaxed">{bp.usage}</dd>
                </div>
                <div className="pt-2 border-t border-zinc-800/80">
                  <dt className="text-[11px] font-mono uppercase text-amber-400">Regla Tech II</dt>
                  <dd className="text-zinc-300 mt-0.5 leading-relaxed">{bp.t2Rule}</dd>
                </div>
              </dl>
            </SpotlightCard>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Qué mirar antes de comprar o usar un plano
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 list-disc list-inside">
            {BLUEPRINT_CHECK_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm text-zinc-200 space-y-1">
            <p className="font-bold text-amber-300">
              Regla de Oro T2: Los BPO Tech II no se venden en NPCs ni se pueden generar de nuevo
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Toda la producción Tech II moderna procede de <strong>BPCs (copias)</strong> generadas
              mediante trabajos de <strong>Invention</strong> a partir de una BPC Tech I.
            </p>
          </div>
        </div>
      </div>

      {/* BLOQUE 04: INVESTIGACIÓN — ME/TE, COPYING Y CUÁNDO ESPERAR */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Investigación no siempre significa beneficio inmediato</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Subir ME/TE cuesta tiempo y, a veces, ISK que tardas mucho en recuperar. En blueprints
            baratos suele compensar; en otros, comprar BPCs buenas puede ser más sensato.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESEARCH_PRIORITIES.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 space-y-1"
            >
              <h3 className="text-xs font-mono font-bold text-amber-300">{item.label}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="pt-1 flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Lectura:</span>
          {BLUEPRINT_READING_LINKS.map((link) => (
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

      {/* TABLA ME/TE Y SIMULADOR INTERACTIVO M_req POR LOTE */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Eficiencia de Material (ME), Tiempo (TE) y Simulador de Lotes</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Valores máximos de optimización en BPOs T1 y cálculo exacto del redondeo por lote de
            carreras (runs).
          </p>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-labelledby="me-te-table-caption"
          className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
        >
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <caption id="me-te-table-caption" className="sr-only">
              Parámetros máximos de optimización de planos: Material Efficiency (ME) y Time
              Efficiency (TE)
            </caption>
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                <th scope="col" className="p-3">
                  Parámetro
                </th>
                <th scope="col" className="p-3">
                  Nivel Máximo
                </th>
                <th scope="col" className="p-3">
                  Bonificación por Nivel
                </th>
                <th scope="col" className="p-3">
                  Impacto en Producción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {(visibleEffRows.length > 0 ? visibleEffRows : EFFICIENCY_PARAMETERS).map((row) => (
                <tr key={row.code} className="hover:bg-zinc-900/40">
                  <th scope="row" className="p-3 font-bold text-zinc-100 whitespace-nowrap">
                    {row.parameter}
                  </th>
                  <td className="p-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                    {row.maxLevel}
                  </td>
                  <td className="p-3 font-mono text-xs text-zinc-300">{row.stepBonus}</td>
                  <td className="p-3 text-zinc-300 leading-relaxed">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fórmula + Simulador Interactivo con Multiplicador de Runs */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>Simulador de Material Requerido por Lote y Redondeo al Alza (⌈ ⌉)</span>
              </h3>
              <p className="text-xs text-zinc-400">
                EVE aplica el descuento porcentual sobre el total del job (Runs × Material/Run) y
                redondea al entero superior (mínimo 1 unidad por run).
              </p>
            </div>
            <code className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-500/30 text-amber-300 font-mono text-xs self-start sm:self-auto">
              M_req = max(Runs, ⌈ Runs × M_run × (1 - ME_plano) × (1 - ME_estructura) ⌉)
            </code>
          </div>

          <form
            aria-label="Simulador de reducción de materiales por ME y Runs"
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
          >
            <fieldset className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              <legend className="sr-only">
                Parámetros de material por run, número de runs, ME del plano y estructura
              </legend>

              <div className="flex flex-col justify-between gap-1.5">
                <label
                  htmlFor={baseInputId}
                  className="text-xs font-mono font-semibold text-zinc-200"
                >
                  Material por 1 Run (M_run)
                </label>
                <input
                  id={baseInputId}
                  name="baseMaterialPerRun"
                  type="text"
                  inputMode="numeric"
                  value={baseMaterialPerRun}
                  onChange={(e) =>
                    setSimState((prev) => ({
                      ...prev,
                      baseMaterialPerRun: e.target.value.replace(/[^\d]/g, ''),
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
                />
                <span className="text-[11px] text-zinc-400">Ej. 1000 uds. por unidad</span>
              </div>

              <div className="flex flex-col justify-between gap-1.5">
                <label
                  htmlFor={runsInputId}
                  className="text-xs font-mono font-semibold text-zinc-200"
                >
                  Carreras del Lote (Runs)
                </label>
                <input
                  id={runsInputId}
                  name="runsCount"
                  type="text"
                  inputMode="numeric"
                  value={runsCount}
                  onChange={(e) =>
                    setSimState((prev) => ({
                      ...prev,
                      runsCount: e.target.value.replace(/[^\d]/g, ''),
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
                />
                <span className="text-[11px] text-zinc-400">
                  Total base: {totalBaseMaterial.toLocaleString('es-ES')} uds.
                </span>
              </div>

              <div className="flex flex-col justify-between gap-1.5">
                <label
                  htmlFor={meInputId}
                  className="text-xs font-mono font-semibold text-zinc-200"
                >
                  ME del Plano: <strong className="text-amber-400">{blueprintMe}%</strong>
                </label>
                <div className="h-[38px] flex items-center px-1 rounded-lg border border-zinc-800 bg-zinc-900/60">
                  <input
                    id={meInputId}
                    name="blueprintMe"
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={blueprintMe}
                    onChange={(e) =>
                      setSimState((prev) => ({
                        ...prev,
                        blueprintMe: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <span className="text-[11px] text-zinc-400">Rango BPO T1: 0% a 10%</span>
              </div>

              <div className="flex flex-col justify-between gap-1.5">
                <label
                  htmlFor={structureMeInputId}
                  className="text-xs font-mono font-semibold text-zinc-200"
                >
                  Bonificación Estructura (% ME)
                </label>
                <select
                  id={structureMeInputId}
                  name="facilityMe"
                  value={facilityMe}
                  onChange={(e) =>
                    setSimState((prev) => ({
                      ...prev,
                      facilityMe: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100"
                >
                  <option value="0">0% · Estación NPC</option>
                  <option value="1">1% · Upwell Base (Raitaru/Azbel/Sotiyo)</option>
                  <option value="2.9">2.9% · Upwell + Rig T1 (High-Sec)</option>
                  <option value="4.2">4.2% · Upwell + Rig T2 (Null-Sec)</option>
                </select>
                <span className="text-[11px] text-zinc-400">Bono casco Upwell + Rigs</span>
              </div>
            </fieldset>

            <div
              role="status"
              aria-live="polite"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                <div className="text-[10px] font-mono uppercase text-zinc-400">
                  Total sin ME ({parsedRuns} runs)
                </div>
                <div className="text-sm font-mono tabular-nums font-bold text-zinc-200 mt-0.5">
                  {totalBaseMaterial.toLocaleString('es-ES')} uds. (Exacto:{' '}
                  {rawRequired.toLocaleString('es-ES', { maximumFractionDigits: 2 })})
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
                <div className="text-[10px] font-mono uppercase text-amber-300">
                  Material Requerido del Lote (M_req)
                </div>
                <div className="text-base font-mono tabular-nums font-extrabold text-amber-400 mt-0.5">
                  {ceilingRequired.toLocaleString('es-ES')} uds.
                </div>
              </div>
              <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-3">
                <div className="text-[10px] font-mono uppercase text-emerald-300">
                  Ahorro Neto en el Lote
                </div>
                <div className="text-sm font-mono tabular-nums font-bold text-emerald-300 mt-0.5">
                  -{unitsSaved.toLocaleString('es-ES')} uds.
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ÍNDICE DE COSTE DEL SISTEMA (SCI) & COMPLEJOS UPWELL */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Índice de Coste del Sistema (System Cost Index - SCI) & Upwell</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Lanzar cualquier trabajo industrial exige pagar la tasa del sistema sobre el valor
            estimado de los materiales (<em>Estimated Item Value - EIV</em>), que sube conforme más
            gente produce en ese sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/35 bg-zinc-950 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-mono font-bold uppercase text-red-300">
                High System Cost Index (SCI Alto)
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30">
                Evitar para grandes lotes
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Ocurre en hubs comerciales saturados (ej. <strong>Jita, Perimeter, Ashab</strong>). El
              exceso de actividad dispara la tasa de instalación y se come el margen neto.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/35 bg-zinc-950 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-mono font-bold uppercase text-emerald-300">
                Low System Cost Index (SCI Bajo)
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Ubicación óptima
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Sistemas tranquilos a pocos saltos del hub o sistemas de alianza con complejos Upwell (
              <strong>Raitaru, Azbel, Sotiyo</strong>). Reducen tasas y aplican descuentos de
              material y tiempo.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Complejos de Ingeniería Upwell (Engineering Complexes)
          </h3>

          {visualMode === 'dossier' ? (
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="upwell-complexes-caption"
              className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
            >
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <caption id="upwell-complexes-caption" className="sr-only">
                  Comparativa táctica de complejos de ingeniería Upwell: Raitaru, Azbel y Sotiyo
                </caption>
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                    <th scope="col" className="p-3">
                      Estructura
                    </th>
                    <th scope="col" className="p-3">
                      Tamaño
                    </th>
                    <th scope="col" className="p-3">
                      Bonificaciones de Casco
                    </th>
                    <th scope="col" className="p-3">
                      Rol Industrial & Rigs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {(visibleUpwell.length > 0 ? visibleUpwell : UPWELL_ENGINEERING_COMPLEXES).map(
                    (struct) => (
                      <tr key={struct.name} className="hover:bg-zinc-900/40">
                        <th
                          scope="row"
                          className="p-3 font-bold text-zinc-100 whitespace-nowrap"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={`https://images.evetech.net/types/${struct.typeId}/icon?size=64`}
                              alt=""
                              width={28}
                              height={28}
                              loading="lazy"
                              decoding="async"
                              className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 shrink-0"
                            />
                            <span>{struct.name}</span>
                          </div>
                        </th>
                        <td className="p-3 font-mono text-xs text-amber-300 whitespace-nowrap">
                          {struct.size}
                        </td>
                        <td className="p-3 font-mono text-xs text-zinc-200 leading-relaxed">
                          {struct.roleBonus}
                        </td>
                        <td className="p-3 text-xs text-zinc-300 leading-relaxed">
                          {struct.rigNote}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(visibleUpwell.length > 0 ? visibleUpwell : UPWELL_ENGINEERING_COMPLEXES).map(
                (struct) => (
                  <SpotlightCard
                    key={struct.name}
                    tone="amber"
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <ShipHullPreview typeId={struct.typeId} name={struct.name} size="md" />
                        <div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-amber-300">
                            {struct.size}
                          </span>
                          <h4 className="text-base font-bold text-zinc-100 mt-1">{struct.name}</h4>
                        </div>
                      </div>
                      <p className="text-xs font-mono text-amber-300 bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 leading-relaxed">
                        {struct.roleBonus}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800/80">
                      {struct.rigNote}
                    </p>
                  </SpotlightCard>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
