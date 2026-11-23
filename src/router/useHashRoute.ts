import { useCallback, useEffect, useState } from 'react';
import {
  GuideId,
  GuideModuleId,
  IndustryModuleId,
  MiningModuleId,
  WikiRoute,
} from '../types';

const MINING_MODULE_TO_SLUG: Record<MiningModuleId, string> = {
  overview: 'resumen',
  mechanics: 'mecanicas',
  ships: 'naves',
  skills: 'skills',
  nullsec: 'nullsec',
  specialties: 'especialidades',
  fittings: 'fittings',
};

const SLUG_TO_MINING_MODULE: Record<string, MiningModuleId> = {
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

const INDUSTRY_MODULE_TO_SLUG: Record<IndustryModuleId, string> = {
  overview: 'resumen',
  blueprints: 'planos',
  t1: 'fabricacion-t1',
  logistics: 'logistica',
  economy: 'economia',
  workflow: 'invencion',
  reactions: 'reacciones',
  alliance: 'alianza',
  tools: 'herramientas',
  skills: 'skills',
};

const SLUG_TO_INDUSTRY_MODULE: Record<string, IndustryModuleId> = {
  resumen: 'overview',
  overview: 'overview',
  planos: 'blueprints',
  blueprints: 'blueprints',
  'fabricacion-t1': 't1',
  t1: 't1',
  fabricacion: 't1',
  logistica: 'logistics',
  logistics: 'logistics',
  reprocesado: 'logistics',
  reprocessing: 'logistics',
  materiales: 'logistics',
  economia: 'economy',
  economy: 'economy',
  impuestos: 'economy',
  invencion: 'workflow',
  invention: 'workflow',
  proceso: 'workflow',
  workflow: 'workflow',
  reacciones: 'reactions',
  reactions: 'reactions',
  moongoo: 'reactions',
  'moon-goo': 'reactions',
  alianza: 'alliance',
  alliance: 'alliance',
  buyback: 'alliance',
  herramientas: 'tools',
  tools: 'tools',
  enlaces: 'tools',
  indice: 'tools',
  skills: 'skills',
  estrategias: 'skills',
  habilidades: 'skills',
};

export interface ParsedHashResult {
  route: WikiRoute;
  params: URLSearchParams;
  invalidSlug?: string;
}

export function getHubHref(): string {
  return '#/guias';
}

function appendQueryParams(
  base: string,
  params?: Record<string, string | undefined>
): string {
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && v.trim()) search.set(k, v.trim());
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}

export function getMiningModuleHref(
  moduleId: MiningModuleId,
  params?: Record<string, string | undefined>
): string {
  const base = `#/mineria/${MINING_MODULE_TO_SLUG[moduleId]}`;
  return appendQueryParams(base, params);
}

export function getIndustryModuleHref(
  moduleId: IndustryModuleId,
  params?: Record<string, string | undefined>
): string {
  const base = `#/industria/${INDUSTRY_MODULE_TO_SLUG[moduleId]}`;
  return appendQueryParams(base, params);
}

export function getGuideModuleHref(
  guideId: GuideId,
  moduleId: GuideModuleId,
  params?: Record<string, string | undefined>
): string {
  if (guideId === 'industry') {
    const indMod = (
      moduleId in INDUSTRY_MODULE_TO_SLUG ? moduleId : 'overview'
    ) as IndustryModuleId;
    return getIndustryModuleHref(indMod, params);
  }
  const minMod = (
    moduleId in MINING_MODULE_TO_SLUG ? moduleId : 'overview'
  ) as MiningModuleId;
  return getMiningModuleHref(minMod, params);
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
    const mapped = SLUG_TO_MINING_MODULE[sub];
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

  if (section === 'industria' || section === 'industry') {
    if (!sub) {
      return {
        route: { view: 'guide', guideId: 'industry', moduleId: 'overview' },
        params,
      };
    }
    const mapped = SLUG_TO_INDUSTRY_MODULE[sub];
    if (mapped) {
      return {
        route: { view: 'guide', guideId: 'industry', moduleId: mapped },
        params,
      };
    }
    return {
      route: { view: 'guide', guideId: 'industry', moduleId: 'overview' },
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

function getRouteKey(route: WikiRoute): string {
  return route.view === 'hub' ? 'hub' : `${route.guideId}:${route.moduleId}`;
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
      const next = parseHash(window.location.hash);
      setParsed((prev) => {
        if (getRouteKey(prev.route) !== getRouteKey(next.route)) {
          scrollToTopAccessible();
        }
        return next;
      });
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
    (
      moduleId: MiningModuleId,
      params?: Record<string, string | undefined>,
      options?: { replace?: boolean }
    ) => {
      const target = getMiningModuleHref(moduleId, params);
      if (options?.replace) {
        if (window.location.hash !== target) {
          window.history.replaceState(null, '', target);
        }
        setParsed(parseHash(target));
        return;
      }
      if (window.location.hash !== target) {
        window.location.hash = target;
      } else {
        setParsed(parseHash(target));
      }
    },
    []
  );

  const navigateToIndustryModule = useCallback(
    (moduleId: IndustryModuleId, params?: Record<string, string | undefined>) => {
      const target = getIndustryModuleHref(moduleId, params);
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
    navigateToIndustryModule,
  };
}
