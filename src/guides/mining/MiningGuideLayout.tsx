import { ArrowLeft, Menu } from 'lucide-react';
import { RefObject } from 'react';
import {
  CloneFilter,
  FittingItem,
  GuideModuleId,
  ShipItem,
  SkillItem,
} from '../../types';
import { getHubHref, getMiningModuleHref } from '../../router/useHashRoute';
import { WikiPager } from '../../components/layout/WikiPager';
import {
  MobileModuleDrawer,
  MobileModuleDrawerHandle,
} from '../../components/layout/MobileModuleDrawer';
import { MINING_GUIDE_TITLE, MINING_MODULES } from './index';
import { OverviewSection } from './sections/OverviewSection';
import { MechanicsSection } from './sections/MechanicsSection';
import { ShipsSection } from './sections/ShipsSection';
import { SkillsSection } from './sections/SkillsSection';
import { NullSecSection } from './sections/NullSecSection';
import { SpecialtiesSection, SpecialtyTab } from './sections/SpecialtiesSection';
import { FittingsSection } from './sections/FittingsSection';

interface MiningGuideLayoutProps {
  activeModule: GuideModuleId;
  cloneFilter: CloneFilter;
  ships: ShipItem[];
  skills: SkillItem[];
  fittings: FittingItem[];
  shipTierFilter: string;
  onTierFilterChange: (tier: string) => void;
  specialtyTab: SpecialtyTab;
  onSpecialtyTabChange: (tab: SpecialtyTab) => void;
  copiedId: string | null;
  onCopyEft: (id: string, eft: string) => void;
  drawerRef: RefObject<MobileModuleDrawerHandle>;
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  onDrawerOpenChange: (open: boolean) => void;
}

export function MiningGuideLayout({
  activeModule,
  cloneFilter,
  ships,
  skills,
  fittings,
  shipTierFilter,
  onTierFilterChange,
  specialtyTab,
  onSpecialtyTabChange,
  copiedId,
  onCopyEft,
  drawerRef,
  isDrawerOpen,
  onOpenDrawer,
  onDrawerOpenChange,
}: MiningGuideLayoutProps) {
  const currentModuleMeta =
    MINING_MODULES.find((m) => m.id === activeModule) ?? MINING_MODULES[0];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Breadcrumb & Guide Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1">
          <a
            href={getHubHref()}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors mb-1"
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

      {/* Selector rápido en móvil (< lg) */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-controls="wiki-module-drawer"
          aria-expanded={isDrawerOpen}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 flex items-center justify-between gap-3 text-left hover:border-amber-500/50 transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-amber-400 shrink-0" aria-hidden="true">
              {currentModuleMeta.icon}
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Capítulo actual
              </div>
              <div className="text-xs font-bold text-zinc-100 truncate">
                {currentModuleMeta.label}
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 shrink-0">
            <Menu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Cambiar</span>
          </span>
        </button>
      </div>

      {/* Layout: Sidebar Modular (desktop) + Panel de Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="hidden lg:block lg:col-span-3 bg-zinc-950 border border-zinc-800/90 rounded-xl p-3 lg:sticky lg:top-20">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Módulos de la Guía
          </div>
          <nav aria-label="Módulos de la guía">
            <ul className="space-y-1">
              {MINING_MODULES.map((mod) => {
                const isActive = activeModule === mod.id;
                return (
                  <li key={mod.id}>
                    <a
                      href={getMiningModuleHref(mod.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
                      }`}
                    >
                      <span
                        className={isActive ? 'text-amber-400 shrink-0' : 'text-zinc-500 shrink-0'}
                        aria-hidden="true"
                      >
                        {mod.icon}
                      </span>
                      <span className="truncate flex-1">{mod.label}</span>
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
          </nav>
        </aside>

        <section className="lg:col-span-9 space-y-5 sm:space-y-6 min-w-0">
          {activeModule === 'overview' && <OverviewSection cloneFilter={cloneFilter} />}
          {activeModule === 'mechanics' && <MechanicsSection />}
          {activeModule === 'ships' && (
            <ShipsSection
              ships={ships}
              shipTierFilter={shipTierFilter}
              onTierFilterChange={onTierFilterChange}
            />
          )}
          {activeModule === 'skills' && <SkillsSection skills={skills} />}
          {activeModule === 'nullsec' && <NullSecSection />}
          {activeModule === 'specialties' && (
            <SpecialtiesSection
              specialtyTab={specialtyTab}
              onTabChange={onSpecialtyTabChange}
            />
          )}
          {activeModule === 'fittings' && (
            <FittingsSection
              fittings={fittings}
              copiedId={copiedId}
              onCopyEft={onCopyEft}
            />
          )}

          <WikiPager modules={MINING_MODULES} activeModule={activeModule} />
        </section>
      </div>

      <MobileModuleDrawer
        ref={drawerRef}
        modules={MINING_MODULES}
        activeModule={activeModule}
        guideTitle={MINING_GUIDE_TITLE}
        onOpenChange={onDrawerOpenChange}
      />
    </div>
  );
}
