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

export interface ParsedHashResult {
  route: WikiRoute;
  params: URLSearchParams;
  invalidSlug?: string;
}

export function getHubHref(): string {
  return '#/guias';
}

export function getMiningModuleHref(
  moduleId: GuideModuleId,
  params?: Record<string, string | undefined>
): string {
  const base = `#/mineria/${MODULE_TO_SLUG[moduleId]}`;
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && v.trim()) search.set(k, v.trim());
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}

export function parseHash(hash: string): ParsedHashResult {
  const raw = hash.replace(/^#\/?/, '').trim();
  const [pathPart, queryPart = ''] = raw.split('?');
  const params = new URLSearchParams(queryPart);
  const cleanedPath = pathPart.toLowerCase();

  if (!cleanedPath) {
    return {
      route: { view: 'guide', guideId: 'mining', moduleId: 'overview' },
      params,
    };
  }

  const [section, sub] = cleanedPath.split('/').filter(Boolean);
  if (section === 'guias' || section === 'hub') {
    return { route: { view: 'hub' }, params };
  }

  if (section === 'mineria' || section === 'mining') {
    if (!sub) {
      return {
        route: { view: 'guide', guideId: 'mining', moduleId: 'overview' },
        params,
      };
    }
    const mapped = SLUG_TO_MODULE[sub];
    if (mapped) {
      return {
        route: { view: 'guide', guideId: 'mining', moduleId: mapped },
        params,
      };
    }
    return {
      route: { view: 'guide', guideId: 'mining', moduleId: 'overview' },
      params,
      invalidSlug: sub,
    };
  }

  return {
    route: { view: 'guide', guideId: 'mining', moduleId: 'overview' },
    params,
    invalidSlug: section,
  };
}

function scrollToTopAccessible(): void {
  if (typeof window === 'undefined') return;
  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
}

export function useHashRoute() {
  const [parsed, setParsed] = useState<ParsedHashResult>(() =>
    typeof window === 'undefined'
      ? {
          route: { view: 'guide', guideId: 'mining', moduleId: 'overview' },
          params: new URLSearchParams(),
        }
      : parseHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      setParsed(parseHash(window.location.hash));
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
      setParsed({ route: { view: 'hub' }, params: new URLSearchParams() });
      scrollToTopAccessible();
    }
  }, []);

  const navigateToMiningModule = useCallback(
    (moduleId: GuideModuleId, params?: Record<string, string | undefined>) => {
      const target = getMiningModuleHref(moduleId, params);
      if (window.location.hash !== target) {
        window.location.hash = target;
      } else {
        setParsed(parseHash(target));
        scrollToTopAccessible();
      }
    },
    []
  );

  return {
    route: parsed.route,
    params: parsed.params,
    invalidSlug: parsed.invalidSlug,
    navigateToHub,
    navigateToMiningModule,
  };
}
