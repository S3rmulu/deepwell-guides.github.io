import { ShieldAlert } from 'lucide-react';

export function NullSecSection() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
          <span>Módulo 4: Protocolo de Supervivencia en Null-Sec</span>
        </h2>
        <p className="text-xs text-zinc-400">
          En espacio nulo (seguridad 0.0 a -1.0) no existe CONCORD. Tu supervivencia depende de la
          disciplina táctica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
          <span className="text-xs font-mono text-amber-400 font-bold">
            REGLA 01 · EL CHAT LOCAL ES TU RADAR
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Mantén la lista de pilotos del canal <strong>Local</strong> siempre desplegada y visible.
            En cuanto aparezca un piloto neutral o rojo (sin standing azul/verde),{' '}
            <strong>alinea y haz warp a estación</strong> sin esperar a verlo en tu Overview.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
          <span className="text-xs font-mono text-amber-400 font-bold">
            REGLA 02 · CANALES INTEL & D-SCAN
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Monitoriza el canal de Inteligencia de la coalición. Si reportan interdictores o flotas
            hostiles a 2–3 saltos, recoge tus drones (
            <code className="text-amber-300">Shift + R</code>) y resguárdate antes de que entren en
            sistema.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
          <span className="text-xs font-mono text-amber-400 font-bold">
            REGLA 03 · BOOKMARKS TÁCTICOS (PERCHES)
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Nunca saltes directamente a 0 km de un cinturón o puerta si hay actividad cercana. Crea
            puntos guardados (<em>bookmarks</em>) a <strong>150–250 km por encima o por debajo</strong>{' '}
            de la anomalía para tener visión limpia y evitar burbujas de interdicción.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
          <span className="text-xs font-mono text-amber-400 font-bold">
            REGLA 04 · MINAR ALINEADO & FLOTA STANDING
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Únete siempre a la <em>Standing Fleet</em> de defensa regional. Si minas en solitario en
            una fragata o destructor, mantente alineado hacia una ciudadela aliada para entrar en
            warp en menos de 2 segundos ante cualquier amenaza.
          </p>
        </div>
      </div>
    </div>
  );
}
