import { BookOpen, RotateCcw } from 'lucide-react';
import { CloneFilter, SkillItem, VisualMode } from '../../../types';
import { getCloneBadgeClasses, matchesClone } from '../../../components/ui/cloneBadges';
import { INDUSTRY_SKILLS_BIBLE } from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface IndustrySkillsSectionProps {
  skills: SkillItem[];
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  onResetFilters: () => void;
}

const SKILL_CATEGORIES = [
  'Producción e Industria Base',
  'Ciencia e Invención',
  'Comercio y Finanzas',
] as const;

export function IndustrySkillsSection({
  skills,
  cloneFilter,
  searchQuery,
  visualMode,
  onResetFilters,
}: IndustrySkillsSectionProps) {
  const q = normalizeSearch(searchQuery);
  const matchesSkillsKeyword = Boolean(q) && MODULE_SEARCH_KEYWORDS.skills.includes(q);
  const displayedSkills =
    skills.length > 0
      ? skills
      : matchesSkillsKeyword
      ? INDUSTRY_SKILLS_BIBLE.filter((skill) => matchesClone(skill.clone, cloneFilter))
      : [];

  if (displayedSkills.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ninguna skill industrial coincide con los filtros actuales.
        </p>
        <p className="text-xs sm:text-sm text-zinc-400">
          Cambia el filtro de Clon o limpia el buscador para ver toda la Biblia de Skills
          Industriales.
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
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Habilidades Necesarias (Skills de Industria, Ciencia y Comercio)</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Agrupadas por rama técnica con sus límites reales en clon Alpha y Omega.
          </p>
        </div>

        <div className="space-y-5">
          {SKILL_CATEGORIES.map((categoryName) => {
            const groupSkills = displayedSkills.filter((s) => s.category === categoryName);
            if (groupSkills.length === 0) return null;

            return (
              <section key={categoryName} className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {categoryName}
                </h3>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950 divide-y divide-zinc-800/80">
                  {groupSkills.map((skill) => (
                    <article
                      key={skill.name}
                      className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-zinc-100">{skill.name}</h4>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                              skill.clone
                            )}`}
                          >
                            {skill.clone === 'alpha-omega' ? 'ALPHA & OMEGA' : 'SOLO OMEGA'}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              skill.priority === 'Crítica'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-zinc-900 text-zinc-300 border border-zinc-700'
                            }`}
                          >
                            Prioridad {skill.priority}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">{skill.effect}</p>
                      </div>

                      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-1 gap-1.5 shrink-0 text-xs font-mono border-t lg:border-t-0 pt-2.5 lg:pt-0 border-zinc-800 lg:text-right min-w-[13rem]">
                        <span className="text-zinc-300">
                          Alpha: <strong className="text-zinc-100">{skill.alphaCap}</strong>
                        </span>
                        <span className="text-amber-400">
                          Omega: <strong>{skill.omegaCap}</strong>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
