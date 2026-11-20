import { RotateCcw } from 'lucide-react';
import { SkillItem, VisualMode } from '../../../types';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';

interface SkillsSectionProps {
  skills: SkillItem[];
  visualMode: VisualMode;
  onResetFilters: () => void;
}

const PRIORITY_GROUPS: { priority: SkillItem['priority']; label: string }[] = [
  { priority: 'Crítica', label: 'Prioridad Crítica · Base obligatoria' },
  { priority: 'Alta', label: 'Prioridad Alta · Rendimiento y Cristales' },
  { priority: 'Especializada', label: 'Especializada · Flota, Mercoxit y Avisos' },
];

export function SkillsSection({ skills, visualMode, onResetFilters }: SkillsSectionProps) {
  return (
    <div
      className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
        visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
      }`}
    >
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
          Módulo 3: Biblia de Habilidades (Alpha / Expert System / Omega)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Orden óptimo de entrenamiento agrupado por prioridad para no desperdiciar SP en skills
          bloqueadas.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-200">
            Ninguna skill coincide con los filtros actuales.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400">
            Cambia el filtro de Clon o limpia el buscador para consultar toda la Biblia de Skills.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Limpiar filtros</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {PRIORITY_GROUPS.map((grp) => {
            const groupSkills = skills.filter((s) => s.priority === grp.priority);
            if (groupSkills.length === 0) return null;

            return (
              <section key={grp.priority} className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  {grp.label}
                </h3>

                {visualMode === 'dossier' ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 divide-y divide-zinc-800/80">
                    {groupSkills.map((skill) => (
                      <article
                        key={skill.name}
                        className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6"
                      >
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-zinc-100">{skill.name}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                              {skill.category}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                                skill.clone
                              )}`}
                            >
                              {skill.clone === 'alpha-omega'
                                ? 'ALPHA & OMEGA'
                                : skill.clone === 'alpha-expert'
                                ? 'ALPHA + EXPERT'
                                : 'SOLO OMEGA'}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">{skill.effect}</p>
                        </div>

                        <div className="grid grid-cols-1 min-[420px]:grid-cols-3 lg:grid-cols-1 gap-1.5 shrink-0 text-xs font-mono border-t lg:border-t-0 pt-2.5 lg:pt-0 border-zinc-800 lg:text-right min-w-[12rem]">
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
                ) : (
                  <div className="space-y-3">
                    {groupSkills.map((skill) => (
                      <article
                        key={skill.name}
                        className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                      >
                        <div className="space-y-1.5 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-zinc-100">{skill.name}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                              {skill.category}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                skill.priority === 'Crítica'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-zinc-800 text-zinc-200'
                              }`}
                            >
                              Prioridad {skill.priority}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">{skill.effect}</p>
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
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
