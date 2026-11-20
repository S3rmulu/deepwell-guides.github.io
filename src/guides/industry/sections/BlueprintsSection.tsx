import { useId, useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Calculator,
  FileCode2,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import { VisualMode } from '../../../types';
import { ShipHullPreview } from '../../../components/ui/ShipHullPreview';
import {
  BLUEPRINT_COMPARISON,
  EFFICIENCY_PARAMETERS,
  UPWELL_ENGINEERING_COMPLEXES,
} from '../data';

interface BlueprintsSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function BlueprintsSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: BlueprintsSectionProps) {
  const q = searchQuery.trim().toLowerCase();
  const baseInputId = useId();
  const meInputId = useId();
  const structureMeInputId = useId();

  // Simulador interactivo para la fórmula M_req = ceil(M_base * (1 - ME_plano/100) * (1 - ME_estancia/100))
  const [baseMaterial, setBaseMaterial] = useState<string>('10000');
  const [blueprintMe, setBlueprintMe] = useState<number>(10);
  const [facilityMe, setFacilityMe] = useState<string>('1');

  const parsedBase = Math.max(1, Number.parseInt(baseMaterial, 10) || 0);
  const parsedFacilityMe = Math.min(10, Math.max(0, Number.parseFloat(facilityMe) || 0));

  const rawRequired =
    parsedBase * (1 - blueprintMe / 100) * (1 - parsedFacilityMe / 100);
  const ceilingRequired = Math.ceil(rawRequired);
  const unitsSaved = Math.max(0, parsedBase - ceilingRequired);

  const visibleBpRows = BLUEPRINT_COMPARISON.filter(
    (b) =>
      !q ||
      b.type.toLowerCase().includes(q) ||
      b.acquisition.toLowerCase().includes(q) ||
      b.usage.toLowerCase().includes(q) ||
      b.t2Rule.toLowerCase().includes(q)
  );

  const visibleEffRows = EFFICIENCY_PARAMETERS.filter(
    (e) =>
      !q ||
      e.parameter.toLowerCase().includes(q) ||
      e.impact.toLowerCase().includes(q) ||
      e.maxLevel.toLowerCase().includes(q)
  );

  const visibleUpwell = UPWELL_ENGINEERING_COMPLEXES.filter(
    (u) =>
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.roleBonus.toLowerCase().includes(q) ||
      u.rigNote.toLowerCase().includes(q)
  );

  const showSciBlock =
    !q ||
    'indice coste sistema system cost index sci jita perimeter raitaru azbel sotiyo'.includes(q) ||
    visibleUpwell.length > 0;

  const hasAnyMatch =
    visibleBpRows.length > 0 || visibleEffRows.length > 0 || showSciBlock;

  if (!hasAnyMatch) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ningún concepto de Planos, ME/TE o SCI coincide con "{searchQuery}".
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
      {/* 1. BPO VS BPC & REGLA DE ORO T2 */}
      {visibleBpRows.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Módulo 1: Conceptos Clave de Planos (BPO vs. BPC)</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Diferencias operativas entre planos originales y copias, límites de carreras (runs) y
              origen de los planos Tech II.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleBpRows.map((bp) => (
              <article
                key={bp.code}
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
                </dl>
              </article>
            ))}
          </div>

          {/* Alerta Regla de Oro T2 */}
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-zinc-200 space-y-1">
              <p className="font-bold text-amber-300">
                Regla de Oro T2: Los BPO Tech II no se venden en NPCs ni se pueden generar de nuevo
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Los planos originales (<strong>BPO</strong>) Tech II no se pueden comprar a
                corporaciones NPC ni crearse hoy en día. Toda la producción Tech II moderna procede
                de <strong>BPCs (copias)</strong> generadas mediante trabajos de{' '}
                <strong>Invención (Invention)</strong> a partir de una BPC Tech I.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. EFICIENCIA DE MATERIAL (ME) Y TIEMPO (TE) + SIMULADOR */}
      {visibleEffRows.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>2. Eficiencia de Material (ME) y Tiempo (TE)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Todo plano T1 original (BPO) se puede optimizar en una estación o estructura con
              servicio de laboratorio antes de fabricar o sacar copias.
            </p>
          </div>

          {/* Tabla accesible con role="region" y tabIndex={0} */}
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
                {visibleEffRows.map((row) => (
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

          {/* Fórmula matemática de materiales requeridos + Simulador Interactivo */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
              <div>
                <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Fórmula de Material Requerido y Redondeo al Alza (⌈ ⌉)</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  EVE Online redondea siempre hacia arriba al entero superior en el total del lote (o
                  nunca menos de 1 unidad por run).
                </p>
              </div>
              <code className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-500/30 text-amber-300 font-mono text-xs self-start sm:self-auto">
                M_req = ⌈ M_base × (1 - ME_plano / 100) × (1 - ME_estancia / 100) ⌉
              </code>
            </div>

            <form
              aria-label="Simulador de reducción de materiales por ME"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <legend className="sr-only">
                  Parámetros de entrada para calcular materiales requeridos
                </legend>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={baseInputId}
                    className="text-xs font-mono font-semibold text-zinc-300"
                  >
                    Material Base del Lote (M_base)
                  </label>
                  <input
                    id={baseInputId}
                    name="baseMaterial"
                    type="text"
                    inputMode="numeric"
                    value={baseMaterial}
                    onChange={(e) => setBaseMaterial(e.target.value.replace(/[^\d]/g, ''))}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
                  />
                  <span className="text-[11px] text-zinc-400">
                    Ej. 10000 unidades de Tritanium
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={meInputId}
                    className="text-xs font-mono font-semibold text-zinc-300"
                  >
                    ME del Plano: <strong className="text-amber-400">{blueprintMe}%</strong>
                  </label>
                  <input
                    id={meInputId}
                    name="blueprintMe"
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={blueprintMe}
                    onChange={(e) => setBlueprintMe(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[11px] text-zinc-400">
                    Rango BPO T1: 0% a 10%
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={structureMeInputId}
                    className="text-xs font-mono font-semibold text-zinc-300"
                  >
                    Bonificación Estructura (% ME)
                  </label>
                  <select
                    id={structureMeInputId}
                    name="facilityMe"
                    value={facilityMe}
                    onChange={(e) => setFacilityMe(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100"
                  >
                    <option value="0">0% · Estación NPC estándar</option>
                    <option value="1">1% · Raitaru / Azbel / Sotiyo (Base)</option>
                    <option value="2.9">2.9% · Complejo Upwell + Rig T1 en High-Sec</option>
                    <option value="4.2">4.2% · Complejo Upwell + Rig T2 en Null-Sec</option>
                  </select>
                  <span className="text-[11px] text-zinc-400">
                    Bono de casco Upwell + Rigs instalados
                  </span>
                </div>
              </fieldset>

              <div
                role="status"
                aria-live="polite"
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
              >
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">
                    Cálculo exacto sin redondeo
                  </div>
                  <div className="text-sm font-mono tabular-nums font-bold text-zinc-200 mt-0.5">
                    {rawRequired.toLocaleString('es-ES', { maximumFractionDigits: 2 })} uds.
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
                  <div className="text-[10px] font-mono uppercase text-amber-300">
                    Material Requerido (M_req)
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-amber-400 mt-0.5">
                    {ceilingRequired.toLocaleString('es-ES')} uds.
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-3">
                  <div className="text-[10px] font-mono uppercase text-emerald-300">
                    Ahorro Neto de Materiales
                  </div>
                  <div className="text-sm font-mono tabular-nums font-bold text-emerald-300 mt-0.5">
                    -{unitsSaved.toLocaleString('es-ES')} uds.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ÍNDICE DE COSTE DEL SISTEMA (SCI) & COMPLEJOS UPWELL */}
      {showSciBlock && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>3. Índice de Coste del Sistema (System Cost Index - SCI)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Lanzar cualquier trabajo industrial exige pagar una tasa fija del sistema calculada a
              partir del valor estimado de los materiales (<em>Estimated Item Value - EIV</em>) y el
              porcentaje de actividad industrial del sistema solar en los últimos 28 días.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-red-500/35 bg-zinc-950 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase text-red-300">
                  High System Cost Index (SCI Alto)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30">
                  Evitar para grandes lotes
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Ocurre en hubs comerciales e industriales saturados (ej.{' '}
                <strong>Jita, Perimeter, Ashab</strong>). El exceso de pilotos fabricando dispara la
                tasa de instalación y puede comerse todo tu margen neto.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/35 bg-zinc-950 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-300">
                  Low System Cost Index (SCI Bajo)
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Ubicación óptima
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Ocurre en sistemas tranquilos a pocos saltos del hub o en sistemas soberanos de
                alianza con complejos de ingeniería Upwell (<strong>Raitaru, Azbel, Sotiyo</strong>).
                Reducen drásticamente las tasas y aplican descuentos adicionales de materiales y
                tiempo.
              </p>
            </div>
          </div>

          {visibleUpwell.length > 0 && (
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Complejos de Ingeniería Upwell (Engineering Complexes)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibleUpwell.map((struct) => (
                  <div
                    key={struct.name}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <ShipHullPreview
                          typeId={struct.typeId}
                          name={struct.name}
                          size="md"
                          visualMode={visualMode}
                        />
                        <div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-amber-300">
                            {struct.size}
                          </span>
                          <h5 className="text-base font-bold text-zinc-100 mt-1">{struct.name}</h5>
                        </div>
                      </div>
                      <p className="text-xs font-mono text-amber-300 bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5 leading-relaxed">
                        {struct.roleBonus}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800/80">
                      {struct.rigNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
