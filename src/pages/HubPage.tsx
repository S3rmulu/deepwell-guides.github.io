import { ChevronRight, RotateCcw, Sparkles, User } from 'lucide-react';
import { GuideCardItem, VisualMode } from '../types';
import { getIndustryModuleHref, getMiningModuleHref } from '../router/useHashRoute';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TacticalGridBackground } from '@/components/ui/TacticalGridBackground';

interface HubPageProps {
  guides: GuideCardItem[];
  visualMode: VisualMode;
  onResetFilters: () => void;
}

function getGuidePrimaryHref(guideId: string): string {
  if (guideId === 'industry-reactions') {
    return getIndustryModuleHref('overview');
  }
  return getMiningModuleHref('overview');
}

function getGuideQuickLinks(guideId: string): { id: string; label: string; href: string }[] {
  if (guideId === 'industry-reactions') {
    return [
      { id: 'blueprints', label: 'Planos, ME/TE & SCI', href: getIndustryModuleHref('blueprints') },
      { id: 't1', label: 'Fabricación T1', href: getIndustryModuleHref('t1') },
      { id: 'reactions', label: 'Reacciones & Moon Goo', href: getIndustryModuleHref('reactions') },
      { id: 'tools', label: 'Herramientas & Enlaces', href: getIndustryModuleHref('tools') },
    ];
  }
  return [
    { id: 'ships', label: 'Catálogo Naves ORE', href: getMiningModuleHref('ships') },
    { id: 'skills', label: 'Biblia de Skills', href: getMiningModuleHref('skills') },
    { id: 'nullsec', label: 'Protocolo Null-Sec', href: getMiningModuleHref('nullsec') },
    { id: 'fittings', label: 'Fittings EFT', href: getMiningModuleHref('fittings') },
  ];
}

export function HubPage({ guides, visualMode, onResetFilters }: HubPageProps) {
  const activeGuides = guides.filter((g) => g.status === 'active');
  const plannedGuides = guides.filter((g) => g.status === 'coming-soon');

  return (
    <div className="space-y-6 sm:space-y-8">
      <section
        className={`border border-zinc-800 p-5 sm:p-8 relative overflow-hidden ${
          visualMode === 'dossier'
            ? 'rounded-lg bg-zinc-950'
            : 'rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900'
        }`}
      >
        <TacticalGridBackground />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-amber-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>Base de Conocimiento · New Eden</span>
          </div>
          <h1
            className="font-extrabold tracking-tight text-zinc-100 leading-tight"
            style={{ fontSize: 'clamp(1.625rem, 1.15rem + 2.2vw, 2.25rem)' }}
          >
            Manuales técnicos para industria y supervivencia en{' '}
            <span className="text-amber-400">EVE Online</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Referencia práctica por módulos para pilotos Alpha, Alpha con Expert System y Omega. Sin
            relleno: datos verificados de naves ORE, cadenas industriales BPO/BPC, invención Tech II,
            márgenes de mercado y fittings listos para importar en EFT.
          </p>
        </div>
      </section>

      {guides.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-200">
            Ninguna guía coincide con tu búsqueda o filtro de clon.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400">
            Limpia el buscador o cambia el filtro de estado de clon para ver el índice completo.
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
      ) : visualMode === 'dossier' ? (
        <div className="space-y-6">
          {activeGuides.map((guide) => {
            const primaryHref = getGuidePrimaryHref(guide.id);
            const quickLinks = getGuideQuickLinks(guide.id);
            return (
              <SpotlightCard
                key={guide.id}
                tone="amber"
                className="rounded-lg border border-amber-500/40 bg-zinc-950 p-5 sm:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                        {guide.category}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        MANUAL ACTIVO · {guide.readTime} · {guide.updatedAt}
                      </span>
                      {guide.author && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-zinc-700">
                          <User className="w-3 h-3 text-amber-400 shrink-0" aria-hidden="true" />
                          <span>
                            Guía creada por <strong className="text-amber-300">{guide.author}</strong>
                          </span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">{guide.title}</h2>
                    <p className="text-sm text-zinc-300 leading-relaxed">{guide.summary}</p>
                  </div>

                  <a
                    href={primaryHref}
                    className="tactical-btn inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors shrink-0"
                  >
                    <span>Abrir Guía Maestra</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="pt-4 border-t border-zinc-800/90 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Accesos directos por capítulo
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickLinks.map((quick) => (
                      <a
                        key={quick.id}
                        href={quick.href}
                        className="tactical-btn rounded-md border border-zinc-800 bg-zinc-900/70 hover:border-amber-500/50 px-3 py-2 text-xs font-semibold text-zinc-200 hover:text-amber-300 flex items-center justify-between gap-2 transition-colors"
                      >
                        <span className="truncate">{quick.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}

          {plannedGuides.length > 0 && (
            <section aria-label="Roadmap de próximas guías" className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Roadmap · Próximos manuales en redacción
              </h2>
              <div className="divide-y divide-zinc-800/80 rounded-lg border border-zinc-800 bg-zinc-950">
                {plannedGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono uppercase text-amber-400">
                          {guide.category}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          · {guide.cloneAccess === 'omega' ? 'OMEGA' : 'ALPHA & OMEGA'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-zinc-200">{guide.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{guide.summary}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 self-start sm:self-center shrink-0">
                      EN DESARROLLO
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {guides.map((guide) => (
            <SpotlightCard
              key={guide.id}
              tone={guide.status === 'active' ? 'amber' : 'zinc'}
              className={`rounded-xl border p-4 sm:p-6 transition-all ${
                guide.status === 'active'
                  ? 'border-zinc-700/90 bg-zinc-900/70 hover:border-amber-500/60 shadow-lg'
                  : 'border-zinc-800 bg-zinc-950/90'
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    {guide.category}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      guide.status === 'active'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {guide.status === 'active' ? 'Disponible' : 'En Desarrollo'}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-zinc-100">{guide.title}</h2>
                {guide.author && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-200 border border-zinc-800">
                    <User className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                    <span>
                      Guía creada por <strong className="text-amber-300">{guide.author}</strong>
                    </span>
                  </div>
                )}
                <p className="text-sm text-zinc-300 leading-relaxed">{guide.summary}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 sm:pt-6 mt-5 sm:mt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-400">
                  Lectura: {guide.readTime} · {guide.updatedAt}
                </span>
                {guide.status === 'active' ? (
                  <a
                    href={getGuidePrimaryHref(guide.id)}
                    className="tactical-btn inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
                  >
                    <span>Abrir Guía Maestra</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-zinc-400">PRÓXIMAMENTE</span>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
}
