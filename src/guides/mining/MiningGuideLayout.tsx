import { AlertTriangle, ArrowLeft, Search, X } from 'lucide-react';
import { RefObject } from 'react';
import {
  CloneFilter,
  FittingItem,
  MiningModuleGroup,
  MiningModuleId,
  ShipItem,
  SkillItem,
  VisualMode,
} from '../../types';
import { getHubHref, getMiningModuleHref } from '../../router/useHashRoute';
import { WikiPager } from '../../components/layout/WikiPager';
import {
  MobileModuleDrawer,
  MobileModuleDrawerHandle,
} from '../../components/layout/MobileModuleDrawer';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { MINING_GUIDE_TITLE, MINING_MODULES } from './index';
import { OverviewSection } from './sections/OverviewSection';
import { MechanicsSection } from './sections/MechanicsSection';
import { ShipsSection } from './sections/ShipsSection';
import { SkillsSection } from './sections/SkillsSection';
import { NullSecSection } from './sections/NullSecSection';
import { SpecialtiesSection, SpecialtyTab } from './sections/SpecialtiesSection';
import { FittingsSection } from './sections/FittingsSection';

interface MiningGuideLayoutProps {
  activeModule: MiningModuleId;
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
  invalidSlug?: string;
  onDismissInvalidSlug: () => void;
  matchCounts: Record<MiningModuleId, number>;
  ships: ShipItem[];
  skills: SkillItem[];
  fittings: FittingItem[];
  shipTierFilter: string;
  onTierFilterChange: (tier: string) => void;
  specialtyTab: SpecialtyTab;
  onSpecialtyTabChange: (tab: SpecialtyTab) => void;
  copiedId: string | null;
  copyErrorId: string | null;
  onCopyEft: (id: string, title: string, eft: string) => void;
  onInspectShipFittings: (shipName: string) => void;
  onResetFilters: () => void;
  onResetSearch: () => void;
  drawerRef: RefObject<MobileModuleDrawerHandle>;
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  onDrawerOpenChange: (open: boolean) => void;
}

const GROUP_ORDER: MiningModuleGroup[] = ['Fundamentos', 'Flota & Skills', 'Operaciones & Fittings'];

export function MiningGuideLayout({
  activeModule,
  cloneFilter,
  searchQuery,
  visualMode,
  invalidSlug,
  onDismissInvalidSlug,
  matchCounts,
  ships,
  skills,
  fittings,
  shipTierFilter,
  onTierFilterChange,
  specialtyTab,
  onSpecialtyTabChange,
  copiedId,
  copyErrorId,
  onCopyEft,
  onInspectShipFittings,
  onResetFilters,
  onResetSearch,
  drawerRef,
  isDrawerOpen,
  onOpenDrawer,
  onDrawerOpenChange,
}: MiningGuideLayoutProps) {
  const hasSearch = searchQuery.trim().length > 0;
  const currentMatches = matchCounts[activeModule] ?? 0;
  const otherModuleMatches = MINING_MODULES.filter(
    (m) => m.id !== activeModule && (matchCounts[m.id] ?? 0) > 0
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Breadcrumb & Guide Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1">
          <a
            href={getHubHref()}
            className="inline-flex items-center gap-1.5 py-1 text-xs text-zinc-400 hover:text-amber-400 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Volver al Índice de Guías</span>
          </a>
          <h1
            className="font-extrabold tracking-tight text-zinc-100 leading-tight"
            style={{ fontSize: 'clamp(1.375rem, 1.05rem + 1.6vw, 1.875rem)' }}
          >
            Minería Integral & Operaciones en <span className="text-amber-400">Null-Sec</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Estructura modular: consulta la sección general y profundiza en cada capítulo técnico.
          </p>
        </div>
      </div>

      {/* Aviso si la URL tenía un capítulo desconocido */}
      {invalidSlug && (
        <div
          role="status"
          className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>
              No existe el capítulo <code className="text-amber-300">{invalidSlug}</code>. Mostrando{' '}
              <strong>0. Visión General & Clones</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={onDismissInvalidSlug}
            aria-label="Cerrar aviso"
            className="compact-control p-1 text-amber-300 hover:text-amber-100 rounded"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Banner de coincidencias transversales cuando hay búsqueda activa */}
      {hasSearch && (otherModuleMatches.length > 0 || currentMatches === 0) && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex flex-wrap items-center gap-2 text-zinc-300">
            <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>
              Coincidencias para <strong className="text-amber-300">"{searchQuery}"</strong>:
            </span>
            {otherModuleMatches.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {otherModuleMatches.map((m) => (
                  <a
                    key={m.id}
                    href={getMiningModuleHref(m.id)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-amber-500/60 text-zinc-200 hover:text-amber-300 transition-colors"
                  >
                    <span>{m.shortLabel}</span>
                    <span className="font-mono tabular-nums text-amber-400">
                      ({matchCounts[m.id]})
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <span className="text-zinc-400">0 resultados en toda la guía.</span>
            )}
          </div>
          <button
            type="button"
            onClick={onResetSearch}
            className="compact-control text-amber-400 hover:text-amber-300 underline font-semibold"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Layout: Sidebar Modular Agrupado (desktop) + Panel de Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="hidden lg:block lg:col-span-3 bg-zinc-950 border border-zinc-800/90 rounded-xl p-3 lg:sticky lg:top-20">
          <nav aria-label="Módulos de la guía" className="space-y-4">
            {GROUP_ORDER.map((groupName) => {
              const items = MINING_MODULES.filter((m) => m.group === groupName);
              return (
                <div key={groupName} className="space-y-1">
                  <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {groupName}
                  </div>
                  <ul className="space-y-1">
                    {items.map((mod) => {
                      const isActive = activeModule === mod.id;
                      const count = matchCounts[mod.id] ?? 0;
                      return (
                        <li key={mod.id}>
                          <a
                            href={getMiningModuleHref(mod.id)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                              isActive
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                                : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
                            }`}
                          >
                            <span
                              className={
                                isActive ? 'text-amber-400 shrink-0' : 'text-zinc-400 shrink-0'
                              }
                              aria-hidden="true"
                            >
                              {mod.icon}
                            </span>
                            <span className="truncate flex-1">{mod.label}</span>
                            {hasSearch && (
                              <span
                                className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                                  count > 0
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-zinc-900 text-zinc-400'
                                }`}
                              >
                                {count}
                              </span>
                            )}
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                              />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        <section className="lg:col-span-9 space-y-5 sm:space-y-6 min-w-0">
          {activeModule === 'overview' && (
            <OverviewSection
              cloneFilter={cloneFilter}
              searchQuery={searchQuery}
              visualMode={visualMode}
              onResetSearch={onResetSearch}
            />
          )}
          {activeModule === 'mechanics' && (
            <MechanicsSection
              searchQuery={searchQuery}
              visualMode={visualMode}
              onResetSearch={onResetSearch}
            />
          )}
          {activeModule === 'ships' && (
            <ShipsSection
              ships={ships}
              shipTierFilter={shipTierFilter}
              onTierFilterChange={onTierFilterChange}
              visualMode={visualMode}
              onInspectShipFittings={onInspectShipFittings}
              onResetFilters={onResetFilters}
            />
          )}
          {activeModule === 'skills' && (
            <SkillsSection
              skills={skills}
              visualMode={visualMode}
              onResetFilters={onResetFilters}
            />
          )}
          {activeModule === 'nullsec' && (
            <NullSecSection
              searchQuery={searchQuery}
              visualMode={visualMode}
              onResetSearch={onResetSearch}
            />
          )}
          {activeModule === 'specialties' && (
            <SpecialtiesSection
              specialtyTab={specialtyTab}
              onTabChange={onSpecialtyTabChange}
              cloneFilter={cloneFilter}
              searchQuery={searchQuery}
              visualMode={visualMode}
            />
          )}
          {activeModule === 'fittings' && (
            <FittingsSection
              fittings={fittings}
              copiedId={copiedId}
              copyErrorId={copyErrorId}
              visualMode={visualMode}
              onCopyEft={onCopyEft}
              onResetFilters={onResetFilters}
            />
          )}

          <WikiPager modules={MINING_MODULES} activeModule={activeModule} />
        </section>
      </div>

      <MobileBottomNav
        modules={MINING_MODULES}
        activeModule={activeModule}
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={onOpenDrawer}
      />

      <MobileModuleDrawer
        ref={drawerRef}
        modules={MINING_MODULES}
        activeModule={activeModule}
        guideTitle={MINING_GUIDE_TITLE}
        searchQuery={searchQuery}
        matchCounts={matchCounts}
        onOpenChange={onDrawerOpenChange}
      />
    </div>
  );
}
