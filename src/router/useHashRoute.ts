import { useCallback, useEffect, useState } from 'react';
import { GuideModuleId, WikiRoute } from '../types';

const MODULE_TO_SLUG: Record<GuideModuleId, string> = {
  overview: 'resumen',
  mechanics: 'mecanicas',
  ships: 'naves',
  skills: 'skills',
  nullsec: 'nullsec',
  specialties: 'especialidades',
  fittings: 'fittings',
};

const SLUG_TO_MODULE: Record<string, GuideModuleId> = {
  resumen: 'overview',
  overview: 'overview',
  mecanicas: 'mechanics',
  mechanics: 'mechanics',
  naves: 'ships',
  ships: 'ships',
  skills: 'skills',
  nullsec: 'nullsec',
  especialidades: 'specialties',
  specialties: 'specialties',
  fittings: 'fittings',
};

export function getHubHref(): string {
  return '#/guias';
}

export function getMiningModuleHref(moduleId: GuideModuleId): string {
  return `#/mineria/${MODULE_TO_SLUG[moduleId]}`;
}

export function parseHash(hash: string): WikiRoute {
  const cleaned = hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!cleaned) {
    return { view: 'guide', guideId: 'mining', moduleId: 'overview' };
  }

  const [section, sub] = cleaned.split('/').filter(Boolean);
  if (section === 'guias' || section === 'hub') {
    return { view: 'hub' };
  }

  if (section === 'mineria' || section === 'mining') {
    const moduleId = (sub && SLUG_TO_MODULE[sub]) || 'overview';
    return { view: 'guide', guideId: 'mining', moduleId };
  }

  return { view: 'guide', guideId: 'mining', moduleId: 'overview' };
}

function scrollToTopAccessible(): void {
  if (typeof window === 'undefined') return;
  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
}

export function useHashRoute() {
  const [route, setRoute] = useState<WikiRoute>(() =>
    typeof window === 'undefined'
      ? { view: 'guide', guideId: 'mining', moduleId: 'overview' }
      : parseHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      scrollToTopAccessible();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToHub = useCallback(() => {
    const target = getHubHref();
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      setRoute({ view: 'hub' });
      scrollToTopAccessible();
    }
  }, []);

  const navigateToMiningModule = useCallback((moduleId: GuideModuleId) => {
    const target = getMiningModuleHref(moduleId);
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      setRoute({ view: 'guide', guideId: 'mining', moduleId });
      scrollToTopAccessible();
    }
  }, []);

  return {
    route,
    navigateToHub,
    navigateToMiningModule,
  };
}
