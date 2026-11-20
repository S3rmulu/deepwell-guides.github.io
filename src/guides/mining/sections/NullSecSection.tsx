import { AlertOctagon, Keyboard, RotateCcw, ShieldAlert } from 'lucide-react';
import { VisualMode } from '../../../types';
import { MINING_SHORTCUTS } from '../data';

interface NullSecSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

const RULES = [
  {
    id: 'regla-01',
    code: 'REGLA 01',
    title: 'El chat Local es tu radar',
    searchText: 'local radar pilotos neutral rojo standing azul verde alinear warp estacion overview',
    body: (
      <>
        Mantén la lista de pilotos del canal <strong>Local</strong> siempre desplegada y visible. En
        cuanto aparezca un piloto neutral o rojo (sin standing azul/verde),{' '}
        <strong>alinea y haz warp a estación</strong> sin esperar a verlo en tu Overview.
      </>
    ),
  },
  {
    id: 'regla-02',
    code: 'REGLA 02',
    title: 'Canales Intel & D-Scan',
    searchText: 'intel d-scan inteligencia coalicion interdictores flotas hostiles shift + r drones',
    body: (
      <>
        Monitoriza el canal de Inteligencia de la coalición. Si reportan interdictores o flotas
        hostiles a 2–3 saltos, recoge tus drones (<code className="text-amber-300">Shift + R</code>)
        y resguárdate antes de que entren en sistema.
      </>
    ),
  },
  {
    id: 'regla-03',
    code: 'REGLA 03',
    title: 'Bookmarks tácticos (Perches)',
    searchText: 'bookmarks perches 150 250 km burbujas interdiccion cinturon puerta anomalia',
    body: (
      <>
        Nunca saltes directamente a 0 km de un cinturón o puerta si hay actividad cercana. Crea
        puntos guardados (<em>bookmarks</em>) a <strong>150–250 km por encima o por debajo</strong>{' '}
        de la anomalía para tener visión limpia y evitar burbujas de interdicción.
      </>
    ),
  },
  {
    id: 'regla-04',
    code: 'REGLA 04',
    title: 'Minar alineado & Flota Standing',
    searchText: 'minar alineado standing fleet ciudadela warp 2 segundos fragata destructor',
    body: (
      <>
        Únete siempre a la <em>Standing Fleet</em> de defensa regional. Si minas en solitario en una
        fragata o destructor, mantente alineado hacia una ciudadela aliada para entrar en warp en
        menos de 2 segundos ante cualquier amenaza.
      </>
    ),
  },
];

const SURVIVAL_SHORTCUTS = MINING_SHORTCUTS.filter(
  (sc) => sc.category === 'Supervivencia & Navegación' || sc.category === 'Drones'
);

export function NullSecSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: NullSecSectionProps) {
  const q = searchQuery.trim().toLowerCase();
  const visibleRules = RULES.filter(
    (r) =>
      !q ||
      r.code.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.searchText.includes(q)
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <div
        className={`border p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier'
            ? 'rounded-lg border-amber-500/40 bg-zinc-950'
            : 'rounded-xl border-zinc-800 bg-zinc-900/60'
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
              {visualMode === 'dossier' ? (
                <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              )}
              <span>Módulo 4: Protocolo de Supervivencia en Null-Sec</span>
            </h2>
            {visualMode === 'dossier' && (
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/40">
                SIN CONCORD · RIESGO REAL
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            En espacio nulo (seguridad 0.0 a -1.0) no existe CONCORD. Tu supervivencia depende de la
            disciplina táctica.
          </p>
        </div>

        {visibleRules.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-zinc-200">
              Ninguna regla de Null-Sec coincide con "{searchQuery}".
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
        ) : visualMode === 'dossier' ? (
          <ol className="divide-y divide-zinc-800/90 rounded-lg border border-zinc-800 bg-zinc-900/30">
            {visibleRules.map((rule) => (
              <li key={rule.id} className="p-4 sm:p-5 space-y-1.5">
                <h3 className="text-xs sm:text-sm font-mono text-amber-400 font-bold uppercase tracking-wide">
                  {rule.code} · {rule.title}
                </h3>
                <p className="text-sm text-zinc-200 leading-relaxed">{rule.body}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleRules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2"
              >
                <h3 className="text-xs font-mono text-amber-400 font-bold uppercase">
                  {rule.code} · {rule.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{rule.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Atajos de escape colocados directamente en el contexto de supervivencia */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Teclas de Respuesta Rápida en Grid</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Atajos críticos de D-Scan, recogida de drones y alineamiento de emergencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SURVIVAL_SHORTCUTS.map((sc) => (
            <div
              key={sc.keys}
              className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 space-y-1.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <kbd className="px-2 py-0.5 rounded bg-zinc-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                  {sc.keys}
                </kbd>
                <span className="text-xs font-bold text-zinc-100">{sc.action}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{sc.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
