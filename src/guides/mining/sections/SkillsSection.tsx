import { SkillItem } from '../../../types';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
          Módulo 3: Biblia de Habilidades (Alpha / Expert System / Omega)
        </h2>
        <p className="text-xs text-zinc-400">
          Orden óptimo de entrenamiento para maximizar ISK/hora y evitar gastar SP en skills
          bloqueadas.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-zinc-200">
            Ninguna skill coincide con los filtros actuales.
          </p>
          <p className="text-xs text-zinc-400">
            Cambia el filtro de Clon o limpia el buscador para consultar toda la Biblia de Skills.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill) => (
            <article
              key={skill.name}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-zinc-100">{skill.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                    {skill.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      skill.priority === 'Crítica'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    Prioridad {skill.priority}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{skill.effect}</p>
              </div>

              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:flex sm:flex-col sm:items-end justify-between sm:justify-center gap-1.5 sm:gap-1 shrink-0 text-xs font-mono border-t sm:border-t-0 pt-2.5 sm:pt-0 border-zinc-800">
                <span className="text-zinc-300">
                  Alpha: <strong className="text-zinc-100">{skill.alphaCap}</strong>
                </span>
                {skill.expertCap && (
                  <span className="text-sky-300">
                    Expert: <strong>{skill.expertCap}</strong>
                  </span>
                )}
                <span className="text-amber-400">
                  Omega: <strong>{skill.omegaCap}</strong>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
