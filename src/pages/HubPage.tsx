import { ChevronRight, Sparkles } from 'lucide-react';
import { GuideCardItem } from '../types';
import { getMiningModuleHref } from '../router/useHashRoute';

interface HubPageProps {
  guides: GuideCardItem[];
}

export function HubPage({ guides }: HubPageProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-5 sm:p-10 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 sm:space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Portal Modular de Conocimiento · EVE Online</span>
          </div>
          <h1
            className="font-extrabold tracking-tight text-zinc-100 leading-tight"
            style={{ fontSize: 'clamp(1.625rem, 1.15rem + 2.2vw, 2.25rem)' }}
          >
            Domina la industria y la supervivencia en{' '}
            <span className="text-amber-400">New Eden</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Guías técnicas contrastadas, libres de mitos y diseñadas por módulos para pilotos Alpha
            y Omega. Selecciona una guía del catálogo para desplegar sus módulos interactivos.
          </p>
        </div>
      </div>

      {guides.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-zinc-200">
            Ninguna guía coincide con tu búsqueda o filtro de clon.
          </p>
          <p className="text-xs text-zinc-400">
            Limpia el buscador o cambia el filtro de estado de clon para ver todo el índice.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {guides.map((guide) => (
            <article
              key={guide.id}
              className={`rounded-xl border p-4 sm:p-6 flex flex-col justify-between transition-all ${
                guide.status === 'active'
                  ? 'border-zinc-700/90 bg-zinc-900/70 hover:border-amber-500/60 shadow-lg'
                  : 'border-zinc-800/70 bg-zinc-950/60 opacity-75'
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
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {guide.status === 'active' ? 'Disponible' : 'En Desarrollo'}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-zinc-100">{guide.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{guide.summary}</p>

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
                <span className="text-xs text-zinc-500">
                  Lectura: {guide.readTime} · {guide.updatedAt}
                </span>
                {guide.status === 'active' ? (
                  <a
                    href={getMiningModuleHref('overview')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
                  >
                    <span>Abrir Guía Maestra</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-zinc-500">PRÓXIMAMENTE</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
