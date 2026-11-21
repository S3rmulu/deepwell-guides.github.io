import { AlertTriangle, BookOpen, ExternalLink, RotateCcw, Wrench } from 'lucide-react';
import { VisualMode } from '../../../types';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import {
  INDUSTRY_LIBRARY_INTRO,
  INDUSTRY_LIBRARY_LINKS,
  INDUSTRY_TOOL_CATEGORIES,
} from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface ToolsSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function ToolsSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: ToolsSectionProps) {
  const q = normalizeSearch(searchQuery);
  const matchesTools = !q || MODULE_SEARCH_KEYWORDS.tools.includes(q);

  if (!matchesTools) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          Ninguna herramienta o guía coincide con &quot;{searchQuery}&quot;.
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
      {/* BLOQUE 09: HERRAMIENTAS INDUSTRIALES */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Herramientas Industriales</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Calculadoras de blueprints, visores de mercado regional, tasadores de lotes y bases de
            datos de materiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INDUSTRY_TOOL_CATEGORIES.map((group) => (
            <SpotlightCard
              key={group.category}
              tone="amber"
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3"
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 py-1 text-xs sm:text-sm text-zinc-200 hover:text-amber-300 transition-colors"
                    >
                      <ExternalLink
                        className="w-3.5 h-3.5 text-amber-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="underline decoration-zinc-700 group-hover:decoration-amber-400">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>

        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-amber-300">Uso recomendado</p>
            <p className="text-zinc-200 leading-relaxed">
              Calcula en dos herramientas cuando vayas a meter mucho ISK. Si ambas discrepan mucho,
              revisa precios, estructura, impuestos, ME/TE y materiales raros.
            </p>
          </div>
        </div>
      </div>

      {/* DIRECTORIO COMPLETO DE BIBLIOTECA (BLOQUE 00) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Biblioteca de Industria / Producción (Directorio Oficial & Wikis)</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">{INDUSTRY_LIBRARY_INTRO}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Oficial / base
            </h3>
            <ul className="space-y-1.5">
              {INDUSTRY_LIBRARY_LINKS.oficialBase.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 py-1 text-xs sm:text-sm text-zinc-200 hover:text-amber-300 transition-colors"
                  >
                    <ExternalLink
                      className="w-3.5 h-3.5 text-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="underline decoration-zinc-700 group-hover:decoration-amber-400">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Guías principales (EVE University)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {INDUSTRY_LIBRARY_LINKS.guiasPrincipales.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 py-1 text-xs sm:text-sm text-zinc-200 hover:text-amber-300 transition-colors"
                  >
                    <ExternalLink
                      className="w-3.5 h-3.5 text-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="underline decoration-zinc-700 group-hover:decoration-amber-400">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
