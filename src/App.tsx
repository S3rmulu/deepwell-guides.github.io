import { useCallback, useMemo, useRef, useState } from 'react';
import { CloneFilter } from './types';
import { useHashRoute } from './router/useHashRoute';
import { PORTAL_GUIDES } from './data/portalGuides';
import { FITTINGS_LIST, SHIPS_CATALOG, SKILLS_BIBLE } from './guides/mining/data';
import { matchesClone } from './components/ui/cloneBadges';
import { Header } from './components/layout/Header';
import { MobileControlsBar } from './components/layout/MobileControlsBar';
import { FilterBanner } from './components/layout/FilterBanner';
import { Footer } from './components/layout/Footer';
import { MobileModuleDrawerHandle } from './components/layout/MobileModuleDrawer';
import { HubPage } from './pages/HubPage';
import { MiningGuideLayout } from './guides/mining/MiningGuideLayout';
import { SpecialtyTab } from './guides/mining/sections/SpecialtiesSection';

export function App() {
  const { route } = useHashRoute();
  const [cloneFilter, setCloneFilter] = useState<CloneFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [shipTierFilter, setShipTierFilter] = useState<string>('ALL');
  const [specialtyTab, setSpecialtyTab] = useState<SpecialtyTab>('ore');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerRef = useRef<MobileModuleDrawerHandle>(null);

  const handleCopyEft = useCallback((id: string, text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  }, []);

  const handleOpenDrawer = useCallback(() => {
    drawerRef.current?.open();
  }, []);

  const filteredGuides = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PORTAL_GUIDES.filter((g) => {
      const cloneOk =
        cloneFilter === 'all' ||
        ((cloneFilter === 'alpha' || cloneFilter === 'expert') && g.cloneAccess === 'alpha-omega') ||
        cloneFilter === 'omega';
      const queryOk =
        !query ||
        g.title.toLowerCase().includes(query) ||
        g.summary.toLowerCase().includes(query) ||
        g.tags.some((t) => t.toLowerCase().includes(query));
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  const filteredShips = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SHIPS_CATALOG.filter((ship) => {
      const cloneOk = matchesClone(ship.clone, cloneFilter);
      const tierOk = shipTierFilter === 'ALL' || ship.tier.includes(shipTierFilter);
      const queryOk =
        !query ||
        ship.name.toLowerCase().includes(query) ||
        ship.role.toLowerCase().includes(query) ||
        ship.requirements.toLowerCase().includes(query);
      return cloneOk && tierOk && queryOk;
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
        fit.environment.toLowerCase().includes(query);
      return cloneOk && queryOk;
    });
  }, [cloneFilter, searchQuery]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#09090b] text-zinc-100">
      <Header
        route={route}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cloneFilter={cloneFilter}
        onCloneFilterChange={setCloneFilter}
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={handleOpenDrawer}
      />

      <MobileControlsBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cloneFilter={cloneFilter}
        onCloneFilterChange={setCloneFilter}
      />

      <FilterBanner
        cloneFilter={cloneFilter}
        shipsCount={filteredShips.length}
        skillsCount={filteredSkills.length}
        fittingsCount={filteredFittings.length}
        onReset={() => setCloneFilter('all')}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {route.view === 'hub' ? (
          <HubPage guides={filteredGuides} />
        ) : (
          <MiningGuideLayout
            activeModule={route.moduleId}
            cloneFilter={cloneFilter}
            ships={filteredShips}
            skills={filteredSkills}
            fittings={filteredFittings}
            shipTierFilter={shipTierFilter}
            onTierFilterChange={setShipTierFilter}
            specialtyTab={specialtyTab}
            onSpecialtyTabChange={setSpecialtyTab}
            copiedId={copiedId}
            onCopyEft={handleCopyEft}
            drawerRef={drawerRef}
            isDrawerOpen={isDrawerOpen}
            onOpenDrawer={handleOpenDrawer}
            onDrawerOpenChange={setIsDrawerOpen}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
