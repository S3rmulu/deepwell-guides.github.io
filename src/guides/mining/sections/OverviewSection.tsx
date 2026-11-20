import { AlertTriangle, Clock, Coins, Keyboard, Layers, RotateCcw } from 'lucide-react';
import { CloneFilter, ShortcutItem, VisualMode } from '../../../types';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';
import { getMiningModuleHref } from '../../../router/useHashRoute';
import {
  ACTIVITY_COMPARISON_MATRIX,
  EXPERT_SYSTEMS_CATALOG,
  MINING_SHORTCUTS,
  PLEX_MARKET_BASE,
} from '../data';

interface OverviewSectionProps {
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

const RECOMMENDED_LABELS: Record<'alpha-omega' | 'alpha-expert' | 'omega', string> = {
  'alpha-omega': 'Alpha / Omega',
  'alpha-expert': 'Alpha + Expert',
  omega: 'Solo Omega',
};

const SHORTCUT_CATEGORIES: ShortcutItem['category'][] = [
  'Minería & Módulos',
  'Drones',
  'Supervivencia & Navegación',
  'Gestión & Fitting',
];

export function OverviewSection({
  cloneFilter,
  searchQuery,
  visualMode,
  onResetSearch,
}: OverviewSectionProps) {
  const q = searchQuery.trim().toLowerCase();

  const filteredExperts = EXPERT_SYSTEMS_CATALOG.filter(
    (e) =>
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.activity.toLowerCase().includes(q) ||
      e.roiNote.toLowerCase().includes(q) ||
      e.skillsGranted.some((s) => s.toLowerCase().includes(q)) ||
      e.shipsUnlocked.some((s) => s.toLowerCase().includes(q))
  );

  const filteredMatrix = ACTIVITY_COMPARISON_MATRIX.filter(
    (row) =>
      !q ||
      row.activity.toLowerCase().includes(q) ||
      row.alphaStatus.toLowerCase().includes(q) ||
      row.expertStatus.toLowerCase().includes(q) ||
      row.omegaStatus.toLowerCase().includes(q)
  );

  const filteredShortcuts = MINING_SHORTCUTS.filter(
    (sc) =>
      !q ||
      sc.keys.toLowerCase().includes(q) ||
      sc.action.toLowerCase().includes(q) ||
      sc.tip.toLowerCase().includes(q) ||
      sc.category.toLowerCase().includes(q)
  );

  const showBaseCards =
    !q ||
    'alpha omega expert system ice harvesting trampa plex sp multiboxing venture procurer miasmos'.includes(
      q
    );

  const hasAnyMatch =
    showBaseCards ||
    filteredExperts.length > 0 ||
    filteredMatrix.length > 0 ||
    filteredShortcuts.length > 0;

  return (
    <div className="space-y-5 sm:space-y-6">
      {!hasAnyMatch && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-200">
            No hay coincidencias en Visión General para "{searchQuery}".
          </p>
          <p className="text-xs sm:text-sm text-zinc-400">
            Revisa los contadores de resultados en los demás capítulos o limpia el buscador.
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
      )}

      {showBaseCards && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Módulo 0: Visión General & Escalones de Clon</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              La minería en EVE Online se divide en tres escalones de acceso: cuenta gratuita{' '}
              <strong>Alpha</strong>, cuentas <strong>Alpha con Expert System</strong> (alquiler
              temporal de habilidades por 7 días) y suscripción completa <strong>Omega</strong>.
            </p>
          </div>

          {/* 3 Tarjetas de Escalones */}
          <div
            className={`grid grid-cols-1 ${
              cloneFilter === 'all' ? 'lg:grid-cols-3' : ''
            } gap-4 pt-1`}
          >
            {(cloneFilter === 'all' || cloneFilter === 'alpha') && (
              <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
                      1. ALPHA (GRATUITO)
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-zinc-400">
                      5M / 20.5M SP
                    </span>
                  </div>
                  <div className="rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-1">
                    <span className="text-zinc-400">Coste base:</span>
                    <span className="font-mono tabular-nums font-bold text-zinc-200">
                      {PLEX_MARKET_BASE.alphaCost}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                    <li>
                      • <strong>Entrenamiento:</strong> Velocidad 1x hasta 5M SP; hasta ~20.5M SP
                      con Daily Alpha Injectors o recompensas AIR.
                    </li>
                    <li>
                      • <strong>Naves disponibles:</strong>{' '}
                      <a
                        href={getMiningModuleHref('ships')}
                        className="underline decoration-zinc-600 hover:text-amber-300"
                      >
                        Venture, Venture Consortium Issue, Pioneer y Miasmos
                      </a>{' '}
                      (hasta 63,000 m³ de bodega).
                    </li>
                    <li>
                      • <strong>Mina de oro Alpha:</strong> Gas Huffing en Wormholes o Null-Sec
                      (20M–50M ISK/h con 2x Gas Cloud Scoop).
                    </li>
                    <li>
                      • <strong>Límites:</strong> Sin Barcazas, sin Hielo ni Mercoxit, +2% impuesto
                      industrial y prohibición de multiboxing.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {(cloneFilter === 'all' || cloneFilter === 'expert') && (
              <div className="rounded-xl border border-sky-500/40 bg-zinc-950 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/40">
                      2. ALPHA + EXPERT SYSTEM
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-sky-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />7 días
                    </span>
                  </div>
                  <div className="rounded-lg bg-sky-500/10 border border-sky-500/25 px-3 py-2 text-xs space-y-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-sky-200/90">Ref. PLEX:</span>
                      <span className="font-mono tabular-nums font-bold text-sky-300">
                        {PLEX_MARKET_BASE.expertCostPlex}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-300 font-mono tabular-nums">
                      {PLEX_MARKET_BASE.expertCostIsk}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                    <li>
                      • <strong>Puente sin pagar Omega:</strong> Alquila habilidades específicas
                      durante 7 días (no se pierden si destruyen tu cápsula).
                    </li>
                    <li>
                      • <strong>Mining Barge Operations:</strong> Desbloquea{' '}
                      <a
                        href={getMiningModuleHref('fittings', { q: 'Procurer' })}
                        className="text-sky-300 font-semibold underline decoration-sky-500/50 hover:text-sky-200"
                      >
                        Procurer, Retriever y Covetor
                      </a>{' '}
                      con <em>Strip Miner I</em> e incluso <em>Ice Harvester I</em>.
                    </li>
                    <li>
                      • <strong>Gas Harvesting System:</strong> Sube temporalmente a{' '}
                      <em>Gas Cloud Harvesting V</em> para maximizar extracción de gas.
                    </li>
                    <li>
                      • <strong>Límite clave:</strong> Sigue sujeto a módulos Tech I en skills
                      Omega, sin Exhumers T2 ni Mercoxit.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {(cloneFilter === 'all' || cloneFilter === 'omega') && (
              <div className="rounded-xl border border-amber-500/40 bg-zinc-950 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      3. OMEGA (SUSCRIPCIÓN)
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-amber-400">
                      2x SP · Sin tope
                    </span>
                  </div>
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 px-3 py-2 text-xs space-y-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-amber-200/90">Coste base:</span>
                      <span className="font-mono tabular-nums font-bold text-amber-300">
                        {PLEX_MARKET_BASE.omegaCostPlex}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-300 font-mono tabular-nums">
                      {PLEX_MARKET_BASE.omegaCostIsk}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                    <li>
                      • <strong>Acceso irrestricto:</strong>{' '}
                      <a
                        href={getMiningModuleHref('ships')}
                        className="underline decoration-amber-500/50 hover:text-amber-300"
                      >
                        Exhumers T2 (Skiff, Mackinaw, Hulk), Fragatas T2 y Mando (Porpoise, Orca,
                        Rorqual)
                      </a>
                      .
                    </li>
                    <li>
                      • <strong>Actividades exclusivas:</strong> Mercoxit (Deep Core), Hielo con Ice
                      Harvester II y Lunas R32/R64 con cristales T2.
                    </li>
                    <li>
                      • <strong>Sin recargo fiscal:</strong> Evita el +2% de impuesto Alpha en
                      industria y reacciones.
                    </li>
                    <li>
                      • <strong>Multiboxing legal:</strong> Permite operar varias cuentas Omega a la
                      vez (ej. Hulk + Porpoise comprimiendo).
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Alerta Trampa del Hielo */}
          <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-zinc-200 space-y-1">
              <p className="font-bold text-amber-300">
                Advertencia Técnica: La Trampa de Ice Harvesting en Alpha Puro
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Aunque el cliente permite a un clon Alpha entrenar <em>Ice Harvesting</em> hasta
                nivel II,{' '}
                <strong>ninguna nave de Alpha puro puede equipar módulos Ice Harvester</strong>{' '}
                (solo se montan en Barcazas, Exhumers o Endurance). No gastes SP en ello salvo que
                actives un <strong>Mining Barge Operations Expert System</strong> o pases a Omega.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BLOQUE 2: EXPERT SYSTEMS & PLEX */}
      {filteredExperts.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Coins className="w-5 h-5 text-sky-400 shrink-0" aria-hidden="true" />
                <span>Expert Systems por Actividad & Base PLEX / ISK</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Referencia de mercado en Jita para calcular retorno antes de activar un Expert
                System o pagar Omega.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono tabular-nums text-zinc-300 self-start sm:self-auto shrink-0">
              Ref. Jita (Nov 2026):{' '}
              <strong className="text-amber-400">1 PLEX ≈ {PLEX_MARKET_BASE.plexUnitIsk}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredExperts.map((exp) => (
              <div
                key={exp.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between space-y-3 hover:border-sky-500/40 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                      {exp.duration}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-zinc-400">
                      {exp.plexEstimate}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-100">{exp.name}</h4>
                  <p className="text-xs text-amber-400 font-medium">{exp.activity}</p>
                  <div className="rounded-lg bg-zinc-900/80 border border-zinc-800 p-2 text-[11px] font-mono tabular-nums text-zinc-300">
                    {exp.iskEstimate}
                  </div>
                  <div className="space-y-1 text-xs text-zinc-400">
                    <p>
                      <strong className="text-zinc-200">Naves:</strong>{' '}
                      {exp.shipsUnlocked.join(', ')}
                    </p>
                    <p>
                      <strong className="text-zinc-200">Skills clave:</strong>{' '}
                      {exp.skillsGranted.join(' · ')}
                    </p>
                  </div>
                </div>
                <p className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-sky-300">ROI estimado:</strong> {exp.roiNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOQUE 3: MATRIZ DE ACTIVIDADES */}
      {filteredMatrix.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100">
              Matriz de Actividades: Alpha vs. Alpha + Expert System vs. Omega
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Compara qué puedes hacer en cada actividad y cuál es el escalón recomendado.
            </p>
          </div>

          {visualMode === 'dossier' ? (
            <>
              {/* Tabla compacta en md+ */}
              <div
                tabIndex={0}
                role="region"
                aria-label="Tabla comparativa de actividades mineras"
                className="hidden md:block overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
              >
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                      <th className="p-3">Actividad & Rentabilidad</th>
                      <th className="p-3">Alpha (0 ISK)</th>
                      <th className="p-3 text-sky-300">Alpha + Expert</th>
                      <th className="p-3 text-amber-400">Omega</th>
                      <th className="p-3">Recomendado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {filteredMatrix.map((row) => (
                      <tr key={row.id} className="align-top hover:bg-zinc-900/40">
                        <td className="p-3 space-y-1 min-w-[13rem]">
                          <div className="font-bold text-zinc-100 text-sm">{row.activity}</div>
                          <div className="font-mono tabular-nums text-[11px] text-amber-400">
                            {row.iskPerHour}
                          </div>
                        </td>
                        <td
                          className={`p-3 text-zinc-300 leading-relaxed ${
                            cloneFilter === 'alpha' ? 'bg-zinc-900/80' : ''
                          }`}
                        >
                          {row.alphaStatus}
                        </td>
                        <td
                          className={`p-3 text-zinc-300 leading-relaxed ${
                            cloneFilter === 'expert' ? 'bg-sky-500/10' : ''
                          }`}
                        >
                          {row.expertStatus}
                        </td>
                        <td
                          className={`p-3 text-zinc-300 leading-relaxed ${
                            cloneFilter === 'omega' ? 'bg-amber-500/10' : ''
                          }`}
                        >
                          {row.omegaStatus}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                              row.recommendedTier
                            )}`}
                          >
                            {RECOMMENDED_LABELS[row.recommendedTier]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vista móvil de la matriz en Dosier */}
              <div className="md:hidden space-y-3">
                {filteredMatrix.map((row) => (
                  <div
                    key={row.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-zinc-100">{row.activity}</h4>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono tabular-nums px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          {row.iskPerHour}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                            row.recommendedTier
                          )}`}
                        >
                          Rec: {RECOMMENDED_LABELS[row.recommendedTier]}
                        </span>
                      </div>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div className="border-t border-zinc-800/80 pt-2">
                        <dt className="font-mono font-bold text-zinc-300">Alpha (0 ISK)</dt>
                        <dd className="text-zinc-300 mt-0.5">{row.alphaStatus}</dd>
                      </div>
                      <div className="border-t border-zinc-800/80 pt-2">
                        <dt className="font-mono font-bold text-sky-300">Alpha + Expert</dt>
                        <dd className="text-zinc-300 mt-0.5">{row.expertStatus}</dd>
                      </div>
                      <div className="border-t border-zinc-800/80 pt-2">
                        <dt className="font-mono font-bold text-amber-400">Omega (500 PLEX)</dt>
                        <dd className="text-zinc-300 mt-0.5">{row.omegaStatus}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {filteredMatrix.map((row) => (
                <div
                  key={row.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-zinc-100">{row.activity}</h4>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono tabular-nums px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        {row.iskPerHour}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                          row.recommendedTier
                        )}`}
                      >
                        Rec: {RECOMMENDED_LABELS[row.recommendedTier]}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div
                      className={`rounded-lg border p-3 space-y-1 ${
                        cloneFilter === 'alpha'
                          ? 'border-zinc-500 bg-zinc-900'
                          : 'border-zinc-800/90 bg-zinc-900/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase">
                        Alpha (0 ISK)
                      </span>
                      <p className="text-zinc-300 leading-relaxed">{row.alphaStatus}</p>
                    </div>

                    <div
                      className={`rounded-lg border p-3 space-y-1 ${
                        cloneFilter === 'expert'
                          ? 'border-sky-500/70 bg-sky-500/10'
                          : 'border-zinc-800/90 bg-zinc-900/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold text-sky-300 uppercase">
                        Alpha + Expert System
                      </span>
                      <p className="text-zinc-300 leading-relaxed">{row.expertStatus}</p>
                    </div>

                    <div
                      className={`rounded-lg border p-3 space-y-1 ${
                        cloneFilter === 'omega'
                          ? 'border-amber-500/70 bg-amber-500/10'
                          : 'border-zinc-800/90 bg-zinc-900/40'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                        Omega (500 PLEX)
                      </span>
                      <p className="text-zinc-300 leading-relaxed">{row.omegaStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BLOQUE 4: ATAJOS AGRUPADOS POR CATEGORÍA */}
      {filteredShortcuts.length > 0 && (
        <div
          className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
            visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Atajos Útiles de EVE Online (Agrupados por Función)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Comandos de teclado para operar más rápido en cinturones, recoger drones y escapar
              ante amenazas.
            </p>
          </div>

          <div className="space-y-4">
            {SHORTCUT_CATEGORIES.map((category) => {
              const items = filteredShortcuts.filter((sc) => sc.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map((sc) => (
                      <div
                        key={sc.keys}
                        className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 sm:p-4 space-y-1.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <kbd className="px-2.5 py-1 rounded bg-zinc-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                            {sc.keys}
                          </kbd>
                          <span className="text-xs sm:text-sm font-bold text-zinc-100">
                            {sc.action}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">{sc.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
