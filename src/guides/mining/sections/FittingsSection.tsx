import { AlertCircle, Check, Copy, RotateCcw } from 'lucide-react';
import { FittingItem, VisualMode } from '../../../types';
import { ShipHullPreview } from '../../../components/ui/ShipHullPreview';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';

interface FittingsSectionProps {
  fittings: FittingItem[];
  copiedId: string | null;
  copyErrorId: string | null;
  visualMode: VisualMode;
  onCopyEft: (id: string, title: string, eft: string) => void;
  onResetFilters: () => void;
}

export function FittingsSection({
  fittings,
  copiedId,
  copyErrorId,
  visualMode,
  onCopyEft,
  onResetFilters,
}: FittingsSectionProps) {
  return (
    <div
      className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 ${
        visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
      }`}
    >
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
          Módulo 6: Fittings Listos para Importar (Formato EFT)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Pulsa <strong>Copiar Fitting EFT</strong> y dentro de EVE Online ve a{' '}
          <em>Ventana de Equipamiento (Alt + F) → Importar desde el portapapeles</em>.
        </p>
      </div>

      {fittings.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-zinc-200">
            Ningún fitting coincide con los filtros actuales.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400">
            Cambia el filtro de Clon o limpia el buscador para ver todas las configuraciones EFT.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fittings.map((fit) => {
            const isCopied = copiedId === fit.id;
            const hasError = copyErrorId === fit.id;
            return (
              <article
                key={fit.id}
                className={`wiki-card-container group border border-zinc-800 bg-zinc-950 p-4 sm:p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-colors ${
                  visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
                }`}
              >
                <div className="space-y-3">
                  <div className="wiki-card-header">
                    <ShipHullPreview
                      typeId={fit.typeId}
                      name={fit.ship}
                      size="md"
                      visualMode={visualMode}
                    />

                    <div className="min-w-0 w-full flex-1 space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-zinc-100 leading-snug">
                            {fit.title}
                          </h3>
                          <p className="text-[11px] font-mono tabular-nums text-zinc-400 mt-0.5">
                            {fit.ship} · HULL // {fit.typeId}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${getCloneBadgeClasses(
                            fit.clone
                          )}`}
                        >
                          {fit.cloneLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-zinc-800 bg-zinc-900/70 text-[11px] text-zinc-300">
                          {fit.environment}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-amber-500/30 bg-amber-500/10 text-[11px] font-mono tabular-nums font-semibold text-amber-400">
                          Est. {fit.estimatedCost}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{fit.notes}</p>

                  <div className="rounded-lg border border-zinc-800/90 bg-[#070709] overflow-hidden">
                    <div className="px-3 py-1.5 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-zinc-400 tracking-wide">
                        [EFT // {fit.ship.toUpperCase()}]
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Alt + F</span>
                    </div>
                    <pre
                      tabIndex={0}
                      role="region"
                      aria-label={`Código EFT de ${fit.title}`}
                      className="p-3 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed"
                    >
                      {fit.eft}
                    </pre>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onCopyEft(fit.id, fit.title, fit.eft)}
                  className={`w-full py-2.5 px-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    hasError
                      ? 'bg-red-500/15 border-red-500/50 text-red-300'
                      : isCopied
                      ? 'bg-amber-500 border-amber-500 text-zinc-950'
                      : 'bg-zinc-900 hover:bg-amber-500 text-zinc-100 hover:text-zinc-950 border-zinc-700 hover:border-amber-500'
                  }`}
                >
                  {hasError ? (
                    <>
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Sin permiso de portapapeles · copia el bloque manualmente</span>
                    </>
                  ) : isCopied ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>¡Copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Copiar Fitting EFT</span>
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
