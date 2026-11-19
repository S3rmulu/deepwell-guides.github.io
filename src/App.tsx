import React, { useState, useMemo } from 'react';
import {
  Pickaxe,
  ShieldAlert,
  Rocket,
  BookOpen,
  Cpu,
  Flame,
  Copy,
  Check,
  Search,
  Layers,
  Compass,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
  Info,
  Zap,
  Package,
} from 'lucide-react';
import { CloneFilter, GuideModuleId } from './types';
import {
  PORTAL_GUIDES,
  SHIPS_CATALOG,
  SKILLS_BIBLE,
  FITTINGS_LIST,
} from './data/miningData';

export function App() {
  const [activeView, setActiveView] = useState<'hub' | 'guide'>('guide');
  const [activeModule, setActiveModule] = useState<GuideModuleId>('overview');
  const [cloneFilter, setCloneFilter] = useState<CloneFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [shipTierFilter, setShipTierFilter] = useState<string>('ALL');
  const [specialtyTab, setSpecialtyTab] = useState<'ore' | 'gas' | 'ice' | 'mercoxit'>('ore');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyEft = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const matchesClone = (itemClone: 'alpha-omega' | 'alpha-expert' | 'omega') => {
    if (cloneFilter === 'all') return true;
    if (cloneFilter === 'alpha') {
      return itemClone === 'alpha-omega' || itemClone === 'alpha-expert';
    }
    return itemClone === 'omega' || itemClone === 'alpha-omega' || itemClone === 'alpha-expert';
  };

  const filteredGuides = useMemo(() => {
    return PORTAL_GUIDES.filter((g) => {
      const cloneOk =
        cloneFilter === 'all' ||
        (cloneFilter === 'alpha' && g.cloneAccess === 'alpha-omega') ||
        cloneFilter === 'omega';
      const queryOk =
        !searchQuery.trim() ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const filteredShips = useMemo(() => {
    return SHIPS_CATALOG.filter((ship) => {
      const cloneOk = matchesClone(ship.clone);
      const tierOk = shipTierFilter === 'ALL' || ship.tier.includes(shipTierFilter);
      const queryOk =
        !searchQuery.trim() ||
        ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.requirements.toLowerCase().includes(searchQuery.toLowerCase());
      return cloneOk && tierOk && queryOk;
    });
  }, [cloneFilter, shipTierFilter, searchQuery]);

  const filteredSkills = useMemo(() => {
    return SKILLS_BIBLE.filter((skill) => {
      const cloneOk = matchesClone(skill.clone);
      const queryOk =
        !searchQuery.trim() ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.effect.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const filteredFittings = useMemo(() => {
    return FITTINGS_LIST.filter((fit) => {
      const cloneOk = matchesClone(fit.clone);
      const queryOk =
        !searchQuery.trim() ||
        fit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fit.ship.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fit.environment.toLowerCase().includes(searchQuery.toLowerCase());
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const modulesNav: { id: GuideModuleId; label: string; icon: React.ReactNode; tag?: string }[] = [
    { id: 'overview', label: '0. Visión General & Clones', icon: <Layers className="w-4 h-4" /> },
    { id: 'mechanics', label: '1. Mecánicas & Catalyst', icon: <Cpu className="w-4 h-4" /> },
    { id: 'ships', label: '2. Catálogo de Naves ORE', icon: <Rocket className="w-4 h-4" /> },
    { id: 'skills', label: '3. Biblia de Skills', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'nullsec', label: '4. Protocolo Null-Sec', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'specialties', label: '5. Gas, Hielo & Mercoxit', icon: <Flame className="w-4 h-4" /> },
    { id: 'fittings', label: '6. Fittings (Copiar EFT)', icon: <Pickaxe className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100">
      {/* HEADER GLOBAL */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => setActiveView('hub')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="DeepwellGuides Logo"
              className="w-10 h-10 rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-zinc-100">
                  Deepwell<span className="text-amber-400">Guides</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-amber-400">
                  EVE ONLINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Archivo Táctico e Industrial de New Eden
              </p>
            </div>
          </button>

          {/* Search & Clone Filter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block w-56 lg:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar nave, skill, gas..."
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/70 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Clone Selector */}
            <div
              className="inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800"
              role="group"
              aria-label="Filtro de estado de clon"
            >
              {(
                [
                  { id: 'all', label: 'Todos' },
                  { id: 'alpha', label: 'Solo Alpha' },
                  { id: 'omega', label: 'Omega' },
                ] as { id: CloneFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCloneFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    cloneFilter === tab.id
                      ? 'bg-amber-500 text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Switcher */}
            <button
              onClick={() => setActiveView(activeView === 'hub' ? 'guide' : 'hub')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-700 bg-zinc-900 hover:border-amber-500/60 text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              {activeView === 'guide' ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Todas las Guías</span>
                </>
              ) : (
                <>
                  <Pickaxe className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Guía Minería</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FILTER ACTIVE BANNER */}
      {cloneFilter !== 'all' && (
        <div className="bg-amber-500/10 border-b border-amber-500/25 px-4 py-2 text-xs text-amber-200">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Filtro activo:{' '}
                <strong className="text-amber-300 uppercase">
                  {cloneFilter === 'alpha' ? 'Clon Alpha (Gratis + Expert Systems)' : 'Clon Omega (Acceso Total)'}
                </strong>{' '}
                — Mostrando {filteredShips.length} naves, {filteredSkills.length} skills y{' '}
                {filteredFittings.length} fittings compatibles.
              </span>
            </div>
            <button
              onClick={() => setCloneFilter('all')}
              className="underline text-amber-400 hover:text-amber-300 font-medium"
            >
              Restablecer filtro
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeView === 'hub' ? (
          /* ================= VISTA HUB DE GUÍAS ================= */
          <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 sm:p-10 relative overflow-hidden">
              <div className="max-w-2xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Portal Modular de Conocimiento · EVE Online
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                  Domina la industria y la supervivencia en{' '}
                  <span className="text-amber-400">New Eden</span>
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Guías técnicas contrastadas, libres de mitos y diseñadas por módulos para pilotos
                  Alpha y Omega. Selecciona una guía del catálogo para desplegar sus módulos
                  interactivos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className={`rounded-xl border p-6 flex flex-col justify-between transition-all ${
                    guide.status === 'active'
                      ? 'border-zinc-700/90 bg-zinc-900/70 hover:border-amber-500/60 shadow-lg'
                      : 'border-zinc-800/70 bg-zinc-950/60 opacity-75'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
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

                    <h2 className="text-xl font-bold text-zinc-100">{guide.title}</h2>
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

                  <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Lectura: {guide.readTime} · {guide.updatedAt}
                    </span>
                    {guide.status === 'active' ? (
                      <button
                        onClick={() => setActiveView('guide')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
                      >
                        Abrir Guía Maestra
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-zinc-500">PRÓXIMAMENTE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ================= VISTA GUÍA MAESTRA DE MINERÍA ================= */
          <div className="space-y-6">
            {/* Breadcrumb & Guide Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveView('hub')}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors mb-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Volver al Índice de Guías
                </button>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
                  Minería Integral & Operaciones en <span className="text-amber-400">Null-Sec</span>
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Estructura modular: consulta la sección general y profundiza en cada mini-guía
                  técnica.
                </p>
              </div>
            </div>

            {/* Layout: Sidebar Modular + Panel de Contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Navegación Lateral */}
              <aside className="lg:col-span-3 space-y-1.5 bg-zinc-950 border border-zinc-800/90 rounded-xl p-3 lg:sticky lg:top-20">
                <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  Módulos de la Guía
                </div>
                {modulesNav.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(mod.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
                      activeModule === mod.id
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
                    }`}
                  >
                    <span className={activeModule === mod.id ? 'text-amber-400' : 'text-zinc-500'}>
                      {mod.icon}
                    </span>
                    <span className="truncate">{mod.label}</span>
                  </button>
                ))}
              </aside>

              {/* Contenido del Módulo Activo */}
              <section className="lg:col-span-9 space-y-6">
                {/* MÓDULO 0: VISIÓN GENERAL & CLONES */}
                {activeModule === 'overview' && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                      <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-400" />
                        Sección General: Estados de Clon y Hoja de Ruta
                      </h2>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        La minería en EVE Online es una profesión escalable que abarca desde la
                        extracción sigilosa en fragatas hasta flotas capitales bajo paraguas de
                        soberanía en Null-Sec. Antes de invertir Skill Points o ISK, comprende las
                        diferencias reales entre clones <strong>Alpha</strong> y{' '}
                        <strong>Omega</strong>.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Tarjeta Alpha */}
                        {(cloneFilter === 'all' || cloneFilter === 'alpha') && (
                          <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">
                                CLON ALPHA (GRATUITO)
                              </span>
                              <span className="text-xs text-zinc-400">Límite 5M / 20.5M SP</span>
                            </div>
                            <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                              <li>
                                • <strong>Entrenamiento:</strong> Velocidad 1x hasta 5M SP; hasta
                                ~20.5M SP mediante Daily Alpha Injectors o recompensas AIR.
                              </li>
                              <li>
                                • <strong>Naves base:</strong> Venture, Venture Consortium Issue,
                                Pioneer y carguero Miasmos (hasta 63,000 m³ de bodega de mineral).
                              </li>
                              <li>
                                • <strong>Excepción Barcazas T1:</strong> Puedes volar{' '}
                                <span className="text-amber-300 font-semibold">
                                  Procurer, Retriever y Covetor
                                </span>{' '}
                                activando un <em>Mining Barge Expert System</em> (comprado con PLEX
                                o ISK en el mercado por 7 días).
                              </li>
                              <li>
                                • <strong>Mina de oro Alpha:</strong> Gas Huffing en Wormholes o
                                Null-Sec (20M–70M ISK/h).
                              </li>
                              <li>
                                • <strong>Restricciones:</strong> +2% impuesto adicional en
                                industria/ciencia y prohibición estricta de multiboxing.
                              </li>
                            </ul>
                          </div>
                        )}

                        {/* Tarjeta Omega */}
                        {(cloneFilter === 'all' || cloneFilter === 'omega') && (
                          <div className="rounded-xl border border-amber-500/40 bg-zinc-950 p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                CLON OMEGA (SUSCRIPCIÓN / PLEX)
                              </span>
                              <span className="text-xs text-amber-400">Velocidad 2x · Sin tope</span>
                            </div>
                            <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                              <li>
                                • <strong>Acceso irrestricto:</strong> Todas las Barcazas, Exhumers
                                T2 (Skiff, Mackinaw, Hulk), Fragatas de Expedición (Prospect,
                                Endurance) y Mando (Porpoise, Orca, Rorqual).
                              </li>
                              <li>
                                • <strong>Recursos exclusivos:</strong> Minería de Hielo, Mercoxit
                                (Deep Core) y Lunas R32/R64 con cristales especializados.
                              </li>
                              <li>
                                • <strong>Sin recargo fiscal:</strong> Evita el +2% de impuesto
                                Alpha en trabajos industriales y reacciones.
                              </li>
                              <li>
                                • <strong>Multiboxing legal:</strong> Permite operar múltiples
                                cuentas Omega simultáneamente (ej. Hulk + Porpoise).
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Alerta Trampa del Hielo */}
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-zinc-200 space-y-1">
                          <p className="font-bold text-amber-300">
                            Advertencia Técnica: La Trampa de Ice Harvesting en Alpha
                          </p>
                          <p className="text-zinc-300">
                            Aunque el cliente permite a un clon Alpha entrenar{' '}
                            <em>Ice Harvesting</em> hasta nivel II,{' '}
                            <strong>
                              no existe ninguna nave accesible para Alpha capaz de equipar módulos
                              Ice Harvester
                            </strong>{' '}
                            (solo se montan en Barcazas, Exhumers o Endurance). No inviertas SP ahí
                            si no vas a activar Omega o un Expert System.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MÓDULO 1: MECÁNICAS & CATALYST */}
                {activeModule === 'mechanics' && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
                      <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-amber-400" />
                        Módulo 1: Mecánicas de Extracción & Actualización Catalyst
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                            <Zap className="w-4 h-4" />
                            Golpes Críticos (Critical Yield)
                          </h3>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Cada ciclo de minería tiene una probabilidad base del{' '}
                            <strong>1%</strong> de lograr un éxito crítico, otorgando una
                            bonificación instantánea del <strong>+200%</strong> del valor extraído
                            en ese ciclo <strong>sin consumir volumen adicional del asteroide</strong>
                            . Las skills <em>Mining Precision</em> y <em>Mining Exploitation</em>{' '}
                            escalan esta mecánica.
                          </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                          <h3 className="text-sm font-bold text-amber-400">
                            Residuo de Minería (Waste / Residue)
                          </h3>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Los módulos Tech II y cristales Tipo B tienen probabilidad de destruir
                            mineral extra del asteroide sin enviarlo a tu bodega. En cinturones
                            públicos usa Tech II para maximizar velocidad; en{' '}
                            <strong>Lunas raras (R32/R64) o Mercoxit</strong> usa módulos{' '}
                            <strong>Tech I, ORE Faction o cristales Tipo A</strong> para no destruir
                            patrimonio de la corporación.
                          </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                          <h3 className="text-sm font-bold text-amber-400">
                            Short-Cycling & Survey Scanner
                          </h3>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Los láseres mineros entregan el mineral proporcional al tiempo
                            transcurrido si los apagas manualmente antes de terminar el ciclo. Usa
                            el <em>Survey Scanner</em> y el <em>Integrated Mining Surveyor</em> de
                            las naves ORE para cortar el láser en cuanto la roca se agote y no
                            perder segundos ciclando en vacío.
                          </p>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                          <h3 className="text-sm font-bold text-amber-400">
                            Compresión en Campo vs. Estación
                          </h3>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            Comprimir reduce el volumen del mineral hasta un 99%. Puedes hacerlo en
                            estructuras Upwell con servicio de reprocesado o directamente en el
                            cinturón junto a una <em>Porpoise, Orca o Rorqual</em>.{' '}
                            <strong>Nota sobre el Gas:</strong> descomprimir gas conlleva una
                            pérdida técnica (~10%, reducible con <em>Gas Decompression</em>, nunca
                            0%).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MÓDULO 2: CATÁLOGO DE NAVES */}
                {activeModule === 'ships' && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold text-zinc-100">
                            Módulo 2: Catálogo de Naves Mineras ORE & Logística
                          </h2>
                          <p className="text-xs text-zinc-400">
                            Clasificadas por Tier, requisitos de habilidad y rol táctico en
                            Null-Sec.
                          </p>
                        </div>

                        {/* Filtro de Tier */}
                        <div className="flex flex-wrap gap-1.5">
                          {['ALL', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Logística'].map(
                            (t) => (
                              <button
                                key={t}
                                onClick={() => setShipTierFilter(t)}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                                  shipTierFilter === t
                                    ? 'bg-amber-500 text-zinc-950 border-amber-500'
                                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                                }`}
                              >
                                {t === 'ALL' ? 'Todos los Tiers' : t}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredShips.map((ship) => (
                          <div
                            key={ship.name}
                            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
                          >
                            <div className="space-y-2.5">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-[11px] font-mono text-zinc-400">
                                    {ship.tier}
                                  </span>
                                  <h3 className="text-lg font-bold text-zinc-100">{ship.name}</h3>
                                </div>
                                <span
                                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                                    ship.clone === 'alpha-omega'
                                      ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                                      : ship.clone === 'alpha-expert'
                                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                      : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                  }`}
                                >
                                  {ship.cloneLabel}
                                </span>
                              </div>

                              <div className="text-xs text-amber-400 font-medium">
                                Rol: {ship.role} · Bodega: {ship.cargo}
                              </div>

                              <ul className="space-y-1 text-xs text-zinc-300 pt-1">
                                {ship.bonuses.map((b, idx) => (
                                  <li key={idx}>• {b}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-3 border-t border-zinc-800/80 space-y-1 text-[11px]">
                              <p className="text-zinc-400">
                                <strong className="text-zinc-200">Requisitos:</strong>{' '}
                                {ship.requirements}
                              </p>
                              <p className="text-zinc-400">
                                <strong className="text-amber-400">Nota Null-Sec:</strong>{' '}
                                {ship.nullsecNote}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MÓDULO 3: BIBLIA DE SKILLS */}
                {activeModule === 'skills' && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">
                        Módulo 3: Biblia de Habilidades (Prioridades & Topes Alpha/Omega)
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Orden óptimo de entrenamiento para maximizar ISK/hora y evitar gastar SP en
                        skills bloqueadas.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {filteredSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1 max-w-2xl">
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

                          <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0 text-xs font-mono border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
                            <span className="text-zinc-300">
                              Alpha: <strong className="text-zinc-100">{skill.alphaCap}</strong>
                            </span>
                            <span className="text-amber-400">
                              Omega: <strong>{skill.omegaCap}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MÓDULO 4: PROTOCOLO NULL-SEC */}
                {activeModule === 'nullsec' && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                        Módulo 4: Protocolo de Supervivencia en Null-Sec
                      </h2>
                      <p className="text-xs text-zinc-400">
                        En espacio nulo (seguridad 0.0 a -1.0) no existe CONCORD. Tu supervivencia
                        depende de la disciplina táctica.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          REGLA 01 · EL CHAT LOCAL ES TU RADAR
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Mantén la lista de pilotos del canal <strong>Local</strong> siempre
                          desplegada y visible. En cuanto aparezca un piloto neutral o rojo (sin
                          standing azul/verde), <strong>alinea y haz warp a estación</strong> sin
                          esperar a verlo en tu Overview.
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          REGLA 02 · CANALES INTEL & D-SCAN
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Monitoriza el canal de Inteligencia de la coalición. Si reportan
                          interdictores o flotas hostiles a 2–3 saltos, recoge tus drones (
                          <code className="text-amber-300">Shift + R</code>) y resguárdate antes de
                          que entren en sistema.
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          REGLA 03 · BOOKMARKS TÁCTICOS (PERCHES)
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Nunca saltes directamente a 0 km de un cinturón o puerta si hay actividad
                          cercana. Crea puntos guardados (<em>bookmarks</em>) a{' '}
                          <strong>150–250 km por encima o por debajo</strong> de la anomalía para
                          tener visión limpia y evitar burbujas de interdicción.
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          REGLA 04 · MINAR ALINEADO & FLOTA STANDING
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Únete siempre a la <em>Standing Fleet</em> de defensa regional. Si minas
                          en solitario en una fragata o destructor, mantente alineado hacia una
                          ciudadela aliada para entrar en warp en menos de 2 segundos ante cualquier
                          amenaza.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* MÓDULO 5: MINI-GUÍAS ESPECIALIZADAS */}
                {activeModule === 'specialties' && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-zinc-100">
                          Módulo 5: Mini-Guías Especializadas por Recurso
                        </h2>
                        <p className="text-xs text-zinc-400">
                          Selecciona la especialidad técnica para ver mecánicas específicas y
                          rentabilidad.
                        </p>
                      </div>

                      <div className="inline-flex flex-wrap gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                        {[
                          { id: 'ore', label: 'Minerales & Lunas' },
                          { id: 'gas', label: 'Gas Huffing' },
                          { id: 'ice', label: 'Hielo (Omega)' },
                          { id: 'mercoxit', label: 'Mercoxit (Omega)' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setSpecialtyTab(tab.id as typeof specialtyTab)}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                              specialtyTab === tab.id
                                ? 'bg-amber-500 text-zinc-950'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {specialtyTab === 'ore' && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 text-xs text-zinc-300 leading-relaxed">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-amber-400">
                            Minería de Anomalías Soberanas & Lunas (R4 – R64)
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono">
                            ALPHA & OMEGA
                          </span>
                        </div>
                        <p>
                          En Null-Sec, las mejoras de soberanía generan anomalías ricas en{' '}
                          <strong>Bistot, Arkonor, Spodumain, Crokite y Dark Ochre</strong>,
                          fuentes principales de Megacyte, Zydrine y Nocxium.
                        </p>
                        <p>
                          <strong>Moon Mining:</strong> Las refinerías <em>Athanor</em> y{' '}
                          <em>Tatara</em> fracturan trozos de luna creando cinturones privados de
                          altísimo valor (R16, R32 y R64). Consulta siempre las normas de tu
                          alianza antes de minar una luna privada y utiliza equipamiento sin
                          residuo (Tech I / Tipo A).
                        </p>
                      </div>
                    )}

                    {specialtyTab === 'gas' && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 text-xs text-zinc-300 leading-relaxed">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-amber-400">
                            Cosecha de Gas (Fullerites, Cytoserocin & Mykoserocin)
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono">
                            ALPHA & OMEGA · 20M–70M+ ISK/H
                          </span>
                        </div>
                        <p>
                          Se localiza escaneando firmas cósmicas (<em>Cosmic Signatures</em>) con
                          sondas Core. Los sitios legítimos se llaman{' '}
                          <strong>"[Color] Nebula"</strong> o{' '}
                          <strong>"[Nombre] Reservoir"</strong>; evita sitios con nombres de
                          laboratorios o instalaciones de combate si vas en una nave minera.
                        </p>
                        <ul className="space-y-1.5">
                          <li>
                            • <strong>Wormholes (Fullerites):</strong> Usados para fabricar naves
                            Tech III. Los NPCs (<em>Sleepers</em>) aparecen ~15–20 minutos tras
                            iniciar el warp al sitio. Usa un temporizador para extraer en modo{' '}
                            <em>Ninja Huffing</em> antes de que lleguen.
                          </li>
                          <li>
                            • <strong>Nubes Explosivas (Cytoserocin en Null/Low):</strong> Pueden
                            detonar dañando tu escudo. Activa ambos <em>Gas Cloud Scoops</em> en el
                            mismo tick de servidor (pré-actívalos antes de fijar objetivo) para
                            minimizar las tiradas de daño.
                          </li>
                        </ul>
                      </div>
                    )}

                    {specialtyTab === 'ice' && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 text-xs text-zinc-300 leading-relaxed">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-amber-400">
                            Cosecha de Hielo (Isótopos, Heavy Water & Liquid Ozone)
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                            SOLO OMEGA
                          </span>
                        </div>
                        <p>
                          A diferencia del mineral, el hielo se extrae en bloques enteros de{' '}
                          <strong>1,000 m³ por ciclo</strong>. La eficiencia depende exclusivamente
                          de reducir el tiempo de ciclo mediante <em>Ice Harvesting V</em>, módulos{' '}
                          <em>Ice Harvester Upgrade II</em> e implantes específicos.
                        </p>
                        <p>
                          El hielo de Null-Sec produce isótopos de facción (Helium, Hydrogen,
                          Nitrogen, Oxygen) y <em>Liquid Ozone</em>, esenciales como combustible
                          para motores de salto capitales, cynos y estructuras Upwell.
                        </p>
                      </div>
                    )}

                    {specialtyTab === 'mercoxit' && (
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 text-xs text-zinc-300 leading-relaxed">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-amber-400">
                            Extracción de Mercoxit (Fuente Única de Morphite)
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                            SOLO OMEGA
                          </span>
                        </div>
                        <p>
                          El <strong>Mercoxit</strong> aparece exclusivamente en sistemas de
                          Null-Sec y es la única fuente de <strong>Morphite</strong> en todo el
                          juego (indispensable para toda la industria Tech II).
                        </p>
                        <p>
                          Requiere módulos <em>Deep Core</em> y la habilidad{' '}
                          <em>Deep Core Mining</em>. Cada ciclo tiene probabilidad de generar una
                          nube tóxica de 10 km que daña directamente tu escudo; entrenar{' '}
                          <em>Deep Core Mining</em> a nivel V reduce esa probabilidad al 0%.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* MÓDULO 6: FITTINGS EFT */}
                {activeModule === 'fittings' && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100">
                        Módulo 6: Fittings Listos para Importar (Formato EFT)
                      </h2>
                      <p className="text-xs text-zinc-400">
                        Pulsa <strong>Copiar Fitting</strong> y dentro de EVE Online ve a{' '}
                        <em>Ventana de Equipamiento (Alt + F) → Importar desde el portapapeles</em>.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredFittings.map((fit) => (
                        <div
                          key={fit.id}
                          className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-sm font-bold text-zinc-100">{fit.title}</h3>
                                <p className="text-[11px] text-amber-400">
                                  {fit.environment} · Coste est.: {fit.estimatedCost}
                                </p>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 shrink-0">
                                {fit.cloneLabel}
                              </span>
                            </div>

                            <p className="text-xs text-zinc-400 leading-relaxed">{fit.notes}</p>

                            <pre className="p-3 rounded-lg bg-[#09090b] border border-zinc-800/90 text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                              {fit.eft}
                            </pre>
                          </div>

                          <button
                            onClick={() => handleCopyEft(fit.id, fit.eft)}
                            className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 border border-zinc-700 hover:border-amber-500 text-xs font-bold transition-all flex items-center justify-center gap-2"
                          >
                            {copiedId === fit.id ? (
                              <>
                                <Check className="w-4 h-4" />
                                ¡Copiado al portapapeles!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copiar Fitting EFT
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER GLOBAL CON FIRMA */}
      <footer className="border-t border-zinc-800/90 bg-zinc-950 py-6 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="DeepwellGuides" className="w-5 h-5" />
            <span>
              <strong className="text-zinc-300">DeepwellGuides</strong> · Archivo Técnico EVE Online
            </span>
          </div>
          <p className="text-zinc-400">
            Hecho por <span className="text-amber-400 font-semibold">@S3rmulu</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
