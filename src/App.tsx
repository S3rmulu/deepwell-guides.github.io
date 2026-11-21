import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CloneFilter, VisualMode } from './types';
import { useHashRoute } from './router/useHashRoute';
import { PORTAL_GUIDES } from './data/portalGuides';
import { FITTINGS_LIST, SHIPS_CATALOG, SKILLS_BIBLE } from './guides/mining/data';
import { getModuleSearchMatches } from './guides/mining/searchIndex';
import { INDUSTRY_SKILLS_BIBLE, STARTER_PRODUCTS } from './guides/industry/data';
import {
  getIndustrySearchMatches,
  matchesIndustrySkillQuery,
  matchesStarterProductQuery,
  MODULE_SEARCH_KEYWORDS,
  normalizeSearch,
} from './guides/industry/searchIndex';
import { matchesClone } from './components/ui/cloneBadges';
import { Header } from './components/layout/Header';
import { MobileControlsBar } from './components/layout/MobileControlsBar';
import { FilterBanner } from './components/layout/FilterBanner';
import { Footer } from './components/layout/Footer';
import { MobileModuleDrawerHandle } from './components/layout/MobileModuleDrawer';
import { HubPage } from './pages/HubPage';
import { MiningGuideLayout } from './guides/mining/MiningGuideLayout';
import { IndustryGuideLayout } from './guides/industry/IndustryGuideLayout';
import { SpecialtyTab } from './guides/mining/sections/SpecialtiesSection';

const VISUAL_MODE_STORAGE_KEY = 'deepwell-visual-mode';

function readInitialVisualMode(): VisualMode {
  if (typeof window === 'undefined') return 'dossier';
  try {
    const saved = window.localStorage.getItem(VISUAL_MODE_STORAGE_KEY);
    return saved === 'cards' ? 'cards' : 'dossier';
  } catch {
    return 'dossier';
  }
}

export function App() {
  const { route, params, invalidSlug, navigateToMiningModule } = useHashRoute();
  const [cloneFilter, setCloneFilter] = useState<CloneFilter>('all');
  const [searchQuery, setSearchQuery] = useState(() => params.get('q') ?? '');
  const [shipTierFilter, setShipTierFilter] = useState<string>('ALL');
  const [specialtyTab, setSpecialtyTab] = useState<SpecialtyTab>('ore');
  const [visualMode, setVisualMode] = useState<VisualMode>(readInitialVisualMode);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyErrorId, setCopyErrorId] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [dismissedInvalidSlug, setDismissedInvalidSlug] = useState<string | undefined>(undefined);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerRef = useRef<MobileModuleDrawerHandle>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const qParam = params.get('q');
    if (qParam !== null) {
      setSearchQuery(qParam);
    }
    const tabParam = params.get('tab');
    if (tabParam === 'ore' || tabParam === 'gas' || tabParam === 'ice' || tabParam === 'mercoxit') {
      setSpecialtyTab(tabParam);
    }
  }, [params]);

  useEffect(() => {
    try {
      window.localStorage.setItem(VISUAL_MODE_STORAGE_KEY, visualMode);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [visualMode]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((event.key === 'k' || event.key === 'K') && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        if (window.innerWidth < 768) {
          setMobileControlsOpen(true);
        } else {
          searchInputRef.current?.focus();
        }
      } else if (event.key === '/' && !isInput && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        if (window.innerWidth < 768) {
          setMobileControlsOpen(true);
        } else {
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEft = useCallback(async (id: string, title: string, text: string) => {
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }

    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }

    if (!ok) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        ok = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        ok = false;
      }
    }

    if (ok) {
      setCopyErrorId(null);
      setCopiedId(id);
      setLiveAnnouncement(`Fitting "${title}" copiado al portapapeles.`);
    } else {
      setCopiedId(null);
      setCopyErrorId(id);
      setLiveAnnouncement(`No se pudo copiar "${title}" automáticamente.`);
    }

    copyTimerRef.current = window.setTimeout(() => {
      setCopiedId(null);
      setCopyErrorId(null);
      copyTimerRef.current = null;
    }, 2600);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    drawerRef.current?.open();
  }, []);

  const handleResetFilters = useCallback(() => {
    setCloneFilter('all');
    setSearchQuery('');
    setShipTierFilter('ALL');
    setLiveAnnouncement('Filtros y búsqueda restablecidos.');
  }, []);

  const handleResetSearch = useCallback(() => {
    setSearchQuery('');
    setLiveAnnouncement('Búsqueda limpiada.');
  }, []);

  const handleInspectShipFittings = useCallback(
    (shipName: string) => {
      setSearchQuery(shipName);
      navigateToMiningModule('fittings', { q: shipName });
    },
    [navigateToMiningModule]
  );

  const handleCloneFilterChange = useCallback((filter: CloneFilter) => {
    setCloneFilter(filter);
    setLiveAnnouncement(`Filtro de clon cambiado a ${filter}.`);
  }, []);

  const filteredGuides = useMemo(() => {
    const query = normalizeSearch(searchQuery);
    return PORTAL_GUIDES.filter((g) => {
      const cloneOk =
        cloneFilter === 'all' ||
        ((cloneFilter === 'alpha' || cloneFilter === 'expert') && g.cloneAccess === 'alpha-omega') ||
        (cloneFilter === 'omega' && g.cloneAccess === 'omega');
      const queryOk =
        !query ||
        normalizeSearch(g.title).includes(query) ||
        normalizeSearch(g.summary).includes(query) ||
        (g.author ? normalizeSearch(g.author).includes(query) : false) ||
        g.tags.some((t) => normalizeSearch(t).includes(query));
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const filteredShips = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SHIPS_CATALOG.filter((ship) => {
      const cloneOk = matchesClone(ship.clone, cloneFilter);
      const classOk = shipTierFilter === 'ALL' || ship.shipClass === shipTierFilter;
      const queryOk =
        !query ||
        ship.name.toLowerCase().includes(query) ||
        ship.shipClass.toLowerCase().includes(query) ||
        ship.tier.toLowerCase().includes(query) ||
        ship.role.toLowerCase().includes(query) ||
        ship.requirements.toLowerCase().includes(query) ||
        ship.bonuses.some((b) => b.toLowerCase().includes(query)) ||
        ship.nullsecNote.toLowerCase().includes(query);
      return cloneOk && classOk && queryOk;
    });
  }, [cloneFilter, shipTierFilter, searchQuery]);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SKILLS_BIBLE.filter((skill) => {
      const cloneOk = matchesClone(skill.clone, cloneFilter);
      const queryOk =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.effect.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query);
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const filteredFittings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FITTINGS_LIST.filter((fit) => {
      const cloneOk = matchesClone(fit.clone, cloneFilter);
      const queryOk =
        !query ||
        fit.title.toLowerCase().includes(query) ||
        fit.ship.toLowerCase().includes(query) ||
        fit.environment.toLowerCase().includes(query) ||
        fit.notes.toLowerCase().includes(query) ||
        fit.eft.toLowerCase().includes(query);
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const filteredIndustryProducts = useMemo(() => {
    const query = normalizeSearch(searchQuery);
    return STARTER_PRODUCTS.filter(
      (prod) => matchesClone(prod.clone, cloneFilter) && matchesStarterProductQuery(prod, query)
    );
  }, [cloneFilter, searchQuery]);

  const filteredIndustrySkills = useMemo(() => {
    const query = normalizeSearch(searchQuery);
    return INDUSTRY_SKILLS_BIBLE.filter(
      (skill) => matchesClone(skill.clone, cloneFilter) && matchesIndustrySkillQuery(skill, query)
    );
  }, [cloneFilter, searchQuery]);

  const bannerIndustrySkillsCount = useMemo(() => {
    if (filteredIndustrySkills.length > 0) return filteredIndustrySkills.length;
    const query = normalizeSearch(searchQuery);
    if (query && MODULE_SEARCH_KEYWORDS.skills.includes(query)) {
      return INDUSTRY_SKILLS_BIBLE.filter((skill) => matchesClone(skill.clone, cloneFilter)).length;
    }
    return 0;
  }, [cloneFilter, filteredIndustrySkills.length, searchQuery]);

  const miningMatchCounts = useMemo(
    () => getModuleSearchMatches(searchQuery, cloneFilter),
    [searchQuery, cloneFilter]
  );

  const industryMatchCounts = useMemo(
    () => getIndustrySearchMatches(searchQuery, cloneFilter),
    [searchQuery, cloneFilter]
  );

  const visibleInvalidSlug =
    invalidSlug && invalidSlug !== dismissedInvalidSlug ? invalidSlug : undefined;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#09090b] text-zinc-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-lg focus:bg-amber-500 focus:text-zinc-950 focus:font-bold focus:text-xs"
      >
        Saltar al contenido principal
      </a>

      <div role="status" aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>

      <Header
        route={route}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cloneFilter={cloneFilter}
        onCloneFilterChange={handleCloneFilterChange}
        visualMode={visualMode}
        onVisualModeChange={setVisualMode}
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={handleOpenDrawer}
        mobileControlsOpen={mobileControlsOpen}
        onToggleMobileControls={() => setMobileControlsOpen((prev) => !prev)}
        searchInputRef={searchInputRef}
      />

      <MobileControlsBar
        isOpen={mobileControlsOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cloneFilter={cloneFilter}
        onCloneFilterChange={handleCloneFilterChange}
        visualMode={visualMode}
        onVisualModeChange={setVisualMode}
      />

      <FilterBanner
        route={route}
        cloneFilter={cloneFilter}
        guidesCount={filteredGuides.length}
        shipsCount={filteredShips.length}
        skillsCount={filteredSkills.length}
        fittingsCount={filteredFittings.length}
        industryProductsCount={filteredIndustryProducts.length}
        industrySkillsCount={bannerIndustrySkillsCount}
        onReset={() => handleCloneFilterChange('all')}
      />

      <main
        id="main-content"
        className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8"
      >
        {route.view === 'hub' ? (
          <HubPage
            guides={filteredGuides}
            visualMode={visualMode}
            onResetFilters={handleResetFilters}
          />
        ) : route.guideId === 'industry' ? (
          <IndustryGuideLayout
            activeModule={route.moduleId}
            cloneFilter={cloneFilter}
            searchQuery={searchQuery}
            visualMode={visualMode}
            invalidSlug={visibleInvalidSlug}
            onDismissInvalidSlug={() => setDismissedInvalidSlug(invalidSlug)}
            matchCounts={industryMatchCounts}
            products={filteredIndustryProducts}
            skills={filteredIndustrySkills}
            onResetFilters={handleResetFilters}
            onResetSearch={handleResetSearch}
            drawerRef={drawerRef}
            isDrawerOpen={isDrawerOpen}
            onOpenDrawer={handleOpenDrawer}
            onDrawerOpenChange={setIsDrawerOpen}
          />
        ) : (
          <MiningGuideLayout
            activeModule={route.moduleId}
            cloneFilter={cloneFilter}
            searchQuery={searchQuery}
            visualMode={visualMode}
            invalidSlug={visibleInvalidSlug}
            onDismissInvalidSlug={() => setDismissedInvalidSlug(invalidSlug)}
            matchCounts={miningMatchCounts}
            ships={filteredShips}
            skills={filteredSkills}
            fittings={filteredFittings}
            shipTierFilter={shipTierFilter}
            onTierFilterChange={setShipTierFilter}
            specialtyTab={specialtyTab}
            onSpecialtyTabChange={setSpecialtyTab}
            copiedId={copiedId}
            copyErrorId={copyErrorId}
            onCopyEft={handleCopyEft}
            onInspectShipFittings={handleInspectShipFittings}
            onResetFilters={handleResetFilters}
            onResetSearch={handleResetSearch}
            drawerRef={drawerRef}
            isDrawerOpen={isDrawerOpen}
            onOpenDrawer={handleOpenDrawer}
            onDrawerOpenChange={setIsDrawerOpen}
          />
        )}
      </main>

      <Footer hasMobileBottomNav={route.view === 'guide'} />
    </div>
  );
}

export default App;
