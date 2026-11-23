import { KeyboardEvent, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Gem,
  Lock,
  Pickaxe,
  Radio,
  RotateCcw,
  Shield,
  Truck,
} from 'lucide-react';
import { CloneFilter, ShipClass, ShipMiniGuideId, VisualMode } from '../../../types';
import { getCloneBadgeClasses } from '../../../components/ui/cloneBadges';
import { getMiningModuleHref } from '../../../router/useHashRoute';
import { MINING_CRYSTAL_GROUPS, MINING_CRYSTAL_TYPES, SHIP_MINI_GUIDES } from '../data';
import { getMiniGuideMatchCounts, normalizeMiningSearch } from '../searchIndex';

interface ShipMiniGuidesPanelProps {
  activeGuideId: ShipMiniGuideId;
  onSelectGuide: (id: ShipMiniGuideId, replace?: boolean) => void;
  onViewClassShips: (shipClass: ShipClass) => void;
  onResetSearch: () => void;
  cloneFilter: CloneFilter;
  searchQuery: string;
  visualMode: VisualMode;
}

const GUIDE_ICONS: Record<ShipMiniGuideId, React.ReactNode> = {
  crystals: <Gem className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
  command: <Radio className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
  stealth: <Shield className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
  hauling: <Truck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />,
};

type CrystalCategoryFilter = 'all' | 'ore' | 'moon';

const IS_MOON_GROUP = (group: string) => group.includes('Moon');

export function ShipMiniGuidesPanel({
  activeGuideId,
  onSelectGuide,
  onViewClassShips,
  onResetSearch,
  cloneFilter,
  searchQuery,
  visualMode,
}: ShipMiniGuidesPanelProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [crystalCategory, setCrystalCategory] = useState<CrystalCategoryFilter>('all');

  const q = normalizeMiningSearch(searchQuery);
  const matchCounts = getMiniGuideMatchCounts(searchQuery);

  const activeGuide =
    SHIP_MINI_GUIDES.find((g) => g.id === activeGuideId) ?? SHIP_MINI_GUIDES[0];

  const isOmegaOnlyForCurrentClone =
    activeGuide.clone === 'omega' && (cloneFilter === 'alpha' || cloneFilter === 'expert');

  const filteredCrystalGroups = MINING_CRYSTAL_GROUPS.filter((cg) => {
    const categoryOk =
      crystalCategory === 'all' ||
      (crystalCategory === 'moon' ? IS_MOON_GROUP(cg.group) : !IS_MOON_GROUP(cg.group));
    if (!categoryOk) return false;
    if (!q) return true;
    return (
      normalizeMiningSearch(cg.group).includes(q) ||
      normalizeMiningSearch(cg.ores).includes(q) ||
      normalizeMiningSearch(cg.skill).includes(q) ||
      normalizeMiningSearch(cg.recommendedType).includes(q) ||
      normalizeMiningSearch(cg.note).includes(q)
    );
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % SHIP_MINI_GUIDES.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + SHIP_MINI_GUIDES.length) % SHIP_MINI_GUIDES.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = SHIP_MINI_GUIDES.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    onSelectGuide(SHIP_MINI_GUIDES[nextIndex].id, true);
    tabRefs.current[nextIndex]?.focus();
  };

  const panelRadius = visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl';

  // Deduplicate warnings: if unified Alpha/Expert Omega-only banner is shown on 'crystals', skip warnings[0]
  const visibleWarnings = (activeGuide.warnings ?? []).filter(
    (_, idx) => !(activeGuide.id === 'crystals' && isOmegaOnlyForCurrentClone && idx === 0)
  );

  return (
    <div className="space-y-5">
      {/* Selector de Mini-Guías (WAI-ARIA tablist) */}
      <div
        role="tablist"
        aria-label="Mini-guías técnicas por familia de naves"
        className="flex flex-wrap gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 p-1.5"
      >
        {SHIP_MINI_GUIDES.map((guide, index) => {
          const isSelected = guide.id === activeGuide.id;
          const hits = matchCounts[guide.id] ?? 0;
          const lockedForAlpha = guide.clone === 'omega' && cloneFilter === 'alpha';
          return (
            <button
              key={guide.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`miniguide-tab-${guide.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={isSelected ? `miniguide-panel-${guide.id}` : undefined}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectGuide(guide.id, true)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500 text-zinc-950'
                  : lockedForAlpha
                  ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100'
              }`}
            >
              {lockedForAlpha ? (
                <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              ) : (
                GUIDE_ICONS[guide.id]
              )}
              <span>{guide.shortLabel}</span>
              {q && hits > 0 && (
                <span
                  className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                    isSelected
                      ? 'bg-zinc-950/20 text-zinc-950'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {hits}
                  <span className="sr-only"> coincidencias</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Contenido de la Mini-Guía Activa */}
      <div
        id={`miniguide-panel-${activeGuide.id}`}
        role="tabpanel"
        aria-labelledby={`miniguide-tab-${activeGuide.id}`}
        className={`${panelRadius} border border-zinc-800 bg-zinc-950 p-4 sm:p-6 space-y-6`}
      >
        {/* Cabecera */}
        <div className="space-y-3 border-b border-zinc-800/80 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400">Ver naves en Catálogo:</span>
                {activeGuide.appliesTo.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => onViewClassShips(cls)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 hover:border-amber-500/60 hover:text-amber-300 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                    <span>{cls}</span>
                  </button>
                ))}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-100">{activeGuide.title}</h3>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border shrink-0 ${getCloneBadgeClasses(
                activeGuide.clone
              )}`}
            >
              {activeGuide.cloneLabel}
            </span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">{activeGuide.summary}</p>
        </div>

        {/* Aviso único unificado si el filtro Alpha o Alpha+Expert no cubre esta guía Solo Omega */}
        {isOmegaOnlyForCurrentClone && (
          <div
            className={`rounded-lg border p-3.5 flex items-start gap-2.5 text-sm ${
              cloneFilter === 'expert'
                ? 'border-sky-500/40 bg-sky-500/10 text-sky-100'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-100'
            }`}
          >
            <Lock
              className={`w-4 h-4 shrink-0 mt-0.5 ${
                cloneFilter === 'expert' ? 'text-sky-300' : 'text-amber-400'
              }`}
              aria-hidden="true"
            />
            <p className="leading-relaxed">
              {activeGuide.id === 'crystals' ? (
                <>
                  <strong className={cloneFilter === 'expert' ? 'text-sky-300' : 'text-amber-300'}>
                    Referencia futura (Solo Omega):
                  </strong>{' '}
                  los Mining Crystals solo funcionan en <em>Modulated Strip Miner II</em>. Con{' '}
                  {cloneFilter === 'expert'
                    ? 'Alpha + Expert System usarás Strip Miner I (0% residuo, sin cristales)'
                    : 'clon Alpha puro no puedes equipar Barcazas ni cristales'}
                  ; consulta esta guía para planificar tu paso a Omega.
                </>
              ) : (
                <>
                  <strong className={cloneFilter === 'expert' ? 'text-sky-300' : 'text-amber-300'}>
                    Referencia futura (Solo Omega):
                  </strong>{' '}
                  las naves de mando industrial (Porpoise, Orca, Rorqual) y sus Command Bursts son
                  exclusivas de suscripción Omega.
                </>
              )}
            </p>
          </div>
        )}

        {/* Advertencias específicas */}
        {visibleWarnings.length > 0 && (
          <div className="space-y-2">
            {visibleWarnings.map((warn, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-500/35 bg-amber-500/10 p-3.5 flex items-start gap-2.5 text-sm text-amber-100"
              >
                <AlertTriangle
                  className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="leading-relaxed">{warn}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bloque Especial: Comparativa Tipo A / B / C + Tabla de 11 Grupos para Mining Crystals */}
        {activeGuide.id === 'crystals' && (
          <div className="space-y-6">
            <section className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Comparativa de Cristales: Tipo A vs. Tipo B vs. Tipo C
              </h4>
              <div
                className={
                  visualMode === 'dossier'
                    ? 'grid grid-cols-1 md:grid-cols-3 rounded-lg border border-zinc-800 divide-y md:divide-y-0 md:divide-x divide-zinc-800 overflow-hidden bg-zinc-900/30'
                    : 'grid grid-cols-1 md:grid-cols-3 gap-3'
                }
              >
                {MINING_CRYSTAL_TYPES.map((ct) => (
                  <div
                    key={ct.id}
                    className={
                      visualMode === 'dossier'
                        ? 'p-4 space-y-2'
                        : `${panelRadius} border p-4 space-y-2.5 ${
                            ct.id === 'type-a'
                              ? 'border-amber-500/40 bg-amber-500/5'
                              : ct.id === 'type-b'
                              ? 'border-sky-500/35 bg-sky-500/5'
                              : 'border-zinc-700 bg-zinc-900/60'
                          }`
                    }
                  >
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-zinc-100">{ct.name}</h5>
                      <span
                        className={`inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-950 border ${
                          ct.id === 'type-a'
                            ? 'border-amber-500/40 text-amber-300'
                            : ct.id === 'type-b'
                            ? 'border-sky-500/40 text-sky-300'
                            : 'border-zinc-700 text-zinc-300'
                        }`}
                      >
                        {ct.badge}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed">{ct.yieldProfile}</p>
                    <p className="text-xs text-zinc-300">
                      <strong className="text-zinc-100">Residuo:</strong> {ct.wasteProfile}
                    </p>
                    <p className="text-xs text-zinc-300">
                      <strong className="text-zinc-100">Ideal para:</strong> {ct.bestFor}
                    </p>
                    <p className="text-xs text-amber-300/95 border-t border-zinc-800/80 pt-2">
                      {ct.warning}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Grupos de Mineral & Luna ({filteredCrystalGroups.length}/
                    {MINING_CRYSTAL_GROUPS.length})
                  </h4>
                  <p className="text-xs font-mono text-zinc-400">
                    Regla única: Reprocessing IV · Cristales T1 = Processing III · Cristales T2 =
                    Processing IV
                  </p>
                </div>

                {/* Filtro rápido Minerales vs Lunas */}
                <div
                  role="group"
                  aria-label="Filtrar grupos de cristales"
                  className="inline-flex rounded-lg border border-zinc-800 bg-zinc-900/70 p-1 self-start sm:self-auto shrink-0"
                >
                  {(
                    [
                      { id: 'all', label: 'Todos (11)' },
                      { id: 'ore', label: 'Minerales (6)' },
                      { id: 'moon', label: 'Lunas (5)' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={crystalCategory === opt.id}
                      onClick={() => setCrystalCategory(opt.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                        crystalCategory === opt.id
                          ? 'bg-zinc-100 text-zinc-950'
                          : 'text-zinc-300 hover:text-zinc-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredCrystalGroups.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 text-center space-y-3">
                  <p className="text-sm text-zinc-200">
                    Ningún grupo de cristal coincide con "{searchQuery}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCrystalCategory('all');
                      onResetSearch();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Limpiar búsqueda</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Tabla Desktop (sin columna redundante T1 / T2) */}
                  <div
                    tabIndex={0}
                    role="region"
                    aria-label="Tabla de grupos de Mining Crystals y skills de Processing"
                    className="hidden md:block overflow-x-auto rounded-lg border border-zinc-800 bg-[#070709]"
                  >
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/70 text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                          <th scope="col" className="p-3">
                            Grupo & Rocas
                          </th>
                          <th scope="col" className="p-3">
                            Skill Processing (III / IV)
                          </th>
                          <th scope="col" className="p-3 whitespace-nowrap">
                            Recomendado
                          </th>
                          <th scope="col" className="p-3">
                            Criterio Táctico
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80">
                        {filteredCrystalGroups.map((cg) => (
                          <tr key={cg.group} className="align-top hover:bg-zinc-900/40">
                            <td className="p-3 min-w-[13rem]">
                              <div className="font-bold text-zinc-100 text-sm">{cg.group}</div>
                              <div className="text-xs text-zinc-400 mt-0.5">{cg.ores}</div>
                            </td>
                            <td className="p-3 font-mono text-zinc-200">{cg.skill}</td>
                            <td className="p-3 whitespace-nowrap">
                              <span
                                className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                  cg.recommendedType === 'Tipo A'
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                    : cg.recommendedType === 'Tipo B'
                                    ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                                    : 'bg-zinc-900 text-zinc-200 border-zinc-700'
                                }`}
                              >
                                {cg.recommendedType}
                              </span>
                            </td>
                            <td className="p-3 text-zinc-300 leading-relaxed">{cg.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Tarjetas Móvil */}
                  <div className="md:hidden space-y-2.5">
                    {filteredCrystalGroups.map((cg) => (
                      <div
                        key={cg.group}
                        className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3.5 space-y-1.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-zinc-100">{cg.group}</h5>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              cg.recommendedType === 'Tipo A'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                : cg.recommendedType === 'Tipo B'
                                ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                                : 'bg-zinc-900 text-zinc-200 border-zinc-700'
                            }`}
                          >
                            {cg.recommendedType}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{cg.ores}</p>
                        <p className="text-xs font-mono text-zinc-200">{cg.skill}</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">{cg.note}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        )}

        {/* Puntos Clave Operativos */}
        <section className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Claves Operativas
          </h4>
          <div
            className={
              visualMode === 'dossier'
                ? 'grid grid-cols-1 md:grid-cols-3 rounded-lg border border-zinc-800 divide-y md:divide-y-0 md:divide-x divide-zinc-800 overflow-hidden bg-zinc-900/30'
                : 'grid grid-cols-1 md:grid-cols-3 gap-3'
            }
          >
            {activeGuide.keyPoints.map((kp) => (
              <div
                key={kp.title}
                className={
                  visualMode === 'dossier'
                    ? 'p-4 space-y-1.5'
                    : `${panelRadius} border border-zinc-800 bg-zinc-900/40 p-4 space-y-1.5`
                }
              >
                <h5 className="text-sm font-bold text-zinc-100">{kp.title}</h5>
                <p className="text-sm text-zinc-300 leading-relaxed">{kp.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Necesarias */}
        <section className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Skills Necesarias</span>
          </h4>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 divide-y divide-zinc-800/80">
            {activeGuide.skills.map((sk) => {
              const skillLockedForAlpha = sk.clone === 'omega' && cloneFilter === 'alpha';
              return (
                <div
                  key={sk.name}
                  className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 ${
                    skillLockedForAlpha ? 'bg-zinc-950/60' : ''
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-zinc-100">{sk.name}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCloneBadgeClasses(
                          sk.clone
                        )}`}
                      >
                        {sk.clone === 'alpha-omega'
                          ? 'ALPHA & OMEGA'
                          : sk.clone === 'alpha-expert'
                          ? 'ALPHA + EXPERT'
                          : 'SOLO OMEGA'}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{sk.role}</p>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-3 sm:gap-0.5 text-xs font-mono tabular-nums shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
                    <span className="text-zinc-300">
                      Mín.: <strong className="text-zinc-100">{sk.minLevel}</strong>
                    </span>
                    <span className="text-amber-400">
                      Óptimo: <strong>{sk.optimalLevel}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Enlaces cruzados a Skills y Fittings */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
          <a
            href={getMiningModuleHref('skills')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/70 hover:border-amber-500/50 text-xs font-semibold text-zinc-200 hover:text-amber-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>Ver árbol completo en Módulo 3: Skills</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href={getMiningModuleHref('fittings')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 transition-colors"
          >
            <Pickaxe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ver fittings EFT en Módulo 6</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
