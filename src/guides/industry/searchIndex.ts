import {
  CloneFilter,
  IndustryModuleId,
  IndustryStarterProductItem,
  SkillItem,
} from '../../types';
import { matchesClone } from '../../components/ui/cloneBadges';
import {
  ADVANCED_CHAINS_PREVIEW,
  ALLIANCE_PILLARS,
  BLUEPRINT_CHECK_ITEMS,
  BLUEPRINT_COMPARISON,
  DECRYPTORS_REFERENCE,
  EFFICIENCY_PARAMETERS,
  INDUSTRY_BASE_CONCEPTS,
  INDUSTRY_LIBRARY_INTRO,
  INDUSTRY_LIBRARY_LINKS,
  INDUSTRY_SKILLS_BIBLE,
  INDUSTRY_TOOL_CATEGORIES,
  INVENTION_SYSTEM_PIECES,
  LOGISTICS_KEY_POINTS,
  REACTION_TYPES,
  REACTION_WARNINGS,
  RESEARCH_PRIORITIES,
  STARTER_PRODUCTS,
  T1_PRE_PRODUCTION_CHECKLIST,
  T1_STARTER_IDEAS,
  UPWELL_ENGINEERING_COMPLEXES,
} from './data';

export function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export const MODULE_SEARCH_KEYWORDS: Record<IndustryModuleId, string> = {
  overview: normalizeSearch(
    [
      'bill tangana biblioteca industria produccion indice enlaces rapidos',
      INDUSTRY_LIBRARY_INTRO,
      ...INDUSTRY_LIBRARY_LINKS.oficialBase.map((l) => `${l.label} ${l.url}`),
      ...INDUSTRY_LIBRARY_LINKS.guiasPrincipales.map((l) => `${l.label} ${l.url}`),
      ...INDUSTRY_LIBRARY_LINKS.herramientas.map((l) => `${l.label} ${l.url}`),
      ...INDUSTRY_BASE_CONCEPTS.map((c) => `${c.term} ${c.detail}`),
      'que estas pagando realmente fabricar no es convertir minerales en isk gratis coste oportunidad riesgo mercado',
      'si no has calculado coste total precio de venta y volumen vendido no estas fabricando estas apostando con pasos extra',
      'flujo industrial materias primas pi gas reacciones planos blueprints bpo bpc investigacion me te fabricacion tech i invencion tech ii hub jita dodixie amarr alpha omega recargo 2% jobs slots',
    ].join(' ')
  ),
  blueprints: normalizeSearch(
    [
      'blueprints planos bpo bpc me te copias runs investigacion copying research cuando esperar',
      'no siempre significa beneficio inmediato capital inmovilizar',
      ...BLUEPRINT_CHECK_ITEMS,
      ...RESEARCH_PRIORITIES.map((r) => `${r.label} ${r.detail}`),
      'system cost index sci jita perimeter raitaru azbel sotiyo regla de oro t2 simulador formula redondeo',
    ].join(' ')
  ),
  t1: normalizeSearch(
    [
      'fabricacion t1 tech i empezar sin quemar isk buen primer escalon circuito completo',
      'municion drones modulos baratos rotacion alta rigs componentes alianza',
      ...T1_STARTER_IDEAS,
      ...T1_PRE_PRODUCTION_CHECKLIST,
      'paso 1 alt + r blueprints reactions npc paso 3 ensamblaje hangar lotes jobs ravworks fuzzwork blueprint calculator eve tycoon',
    ].join(' ')
  ),
  logistics: normalizeSearch(
    [
      'reprocesado reprocessing minerales mineral no es gratis porque lo hayas minado tu valor interno precio mercado perdidas',
      'compresion comprimir transporte hauling collateral costes separar stock personal corp vendido',
      ...LOGISTICS_KEY_POINTS,
      'fuzzwork ore reprocessing hauling',
    ].join(' ')
  ),
  economy: normalizeSearch(
    [
      'economia margen neto impuestos punto de equilibrio break-even costes mercado',
      'sales tax impuesto venta 5,02% 5.02% accounting 11% broker fee comision corredor 2,03% 3% broker relations standing',
      'ingreso neto 210 isk 195,195 191,31 buy order orden compra volumen diario buy price sell price taxes hauling estructura',
    ].join(' ')
  ),
  workflow: normalizeSearch(
    [
      'invention invencion produccion t2 tech ii probabilidad fallo promedio datacores decryptors',
      'naves t2 caras modulos rigs municion t2 paso 2 atomo azul tech 2 production',
      ...INVENTION_SYSTEM_PIECES,
    ].join(' ')
  ),
  reactions: normalizeSearch(
    [
      'reacciones reactions moon goo luna r4 r64 athanor tatara gas',
      'composite reactions biochemical reactions drogas boosters hybrid reactions t3 produccion avanzada',
      ...REACTION_TYPES.map((r) => `${r.name} ${r.detail}`),
      ...REACTION_WARNINGS,
      'moon mining capitales dreadnought carriers rorqual',
    ].join(' ')
  ),
  alliance: normalizeSearch(
    [
      'industria de alianza economia interna buyback ore gas salvage loot contratos internos suministro materiales',
      'productos prioritarios municion drones rigs modulos doctrina precios pactados',
      'x% jita buy segun web janice',
      ...ALLIANCE_PILLARS.map((p) => `${p.title} ${p.detail}`),
    ].join(' ')
  ),
  tools: normalizeSearch(
    [
      'herramientas industriales planificacion calculo precio mercado valoracion referencia items materiales',
      'calcula en dos herramientas cuando vayas a meter mucho isk discrepan precios estructura impuestos me te materiales raros',
      'biblioteca enlaces rapidos oficial base guias principales planetary industry pi manufacturing',
      ...INDUSTRY_TOOL_CATEGORIES.flatMap((cat) => [
        cat.category,
        ...cat.links.map((l) => `${l.label} ${l.url}`),
      ]),
      ...INDUSTRY_LIBRARY_LINKS.oficialBase.map((l) => `${l.label} ${l.url}`),
      ...INDUSTRY_LIBRARY_LINKS.guiasPrincipales.map((l) => `${l.label} ${l.url}`),
    ].join(' ')
  ),
  skills: normalizeSearch(
    'biblia de skills biblia habilidades skills industria ciencia comercio'
  ),
};

export function matchesStarterProductQuery(
  product: IndustryStarterProductItem,
  normalizedQuery: string
): boolean {
  if (!normalizedQuery) return true;
  return normalizeSearch(
    `${product.category} ${product.rotationNote} ${product.upgradePath} ${product.items
      .map((item) => item.name)
      .join(' ')}`
  ).includes(normalizedQuery);
}

export function matchesIndustrySkillQuery(
  skill: SkillItem,
  normalizedQuery: string
): boolean {
  if (!normalizedQuery) return true;
  return normalizeSearch(`${skill.name} ${skill.category} ${skill.effect}`).includes(
    normalizedQuery
  );
}

export function getIndustrySearchMatches(
  rawQuery: string,
  cloneFilter: CloneFilter
): Record<IndustryModuleId, number> {
  const q = normalizeSearch(rawQuery);
  if (!q) {
    return {
      overview: 0,
      blueprints: 0,
      t1: 0,
      logistics: 0,
      economy: 0,
      workflow: 0,
      reactions: 0,
      alliance: 0,
      tools: 0,
      skills: 0,
    };
  }

  const overviewMatch = MODULE_SEARCH_KEYWORDS.overview.includes(q) ? 1 : 0;

  const bpRows = BLUEPRINT_COMPARISON.filter((b) =>
    normalizeSearch(`${b.type} ${b.acquisition} ${b.usage} ${b.t2Rule}`).includes(q)
  ).length;
  const effRows = EFFICIENCY_PARAMETERS.filter((e) =>
    normalizeSearch(`${e.parameter} ${e.impact} ${e.maxLevel}`).includes(q)
  ).length;
  const upwellRows = UPWELL_ENGINEERING_COMPLEXES.filter((u) =>
    normalizeSearch(`${u.name} ${u.roleBonus} ${u.rigNote}`).includes(q)
  ).length;
  const bpKeywordMatch = MODULE_SEARCH_KEYWORDS.blueprints.includes(q) ? 1 : 0;

  const starterCount = STARTER_PRODUCTS.filter(
    (p) => matchesClone(p.clone, cloneFilter) && matchesStarterProductQuery(p, q)
  ).length;
  const t1Match = (MODULE_SEARCH_KEYWORDS.t1.includes(q) ? 1 : 0) + starterCount;

  const logisticsMatch = MODULE_SEARCH_KEYWORDS.logistics.includes(q) ? 1 : 0;
  const economyMatch = MODULE_SEARCH_KEYWORDS.economy.includes(q) ? 1 : 0;

  const decryptorMatches = DECRYPTORS_REFERENCE.filter((d) =>
    normalizeSearch(`${d.name} ${d.useCase} ${d.probabilityMod}`).includes(q)
  ).length;
  const workflowMatch = (MODULE_SEARCH_KEYWORDS.workflow.includes(q) ? 1 : 0) + decryptorMatches;

  const chainsCount = ADVANCED_CHAINS_PREVIEW.filter(
    (c) =>
      matchesClone(c.clone, cloneFilter) &&
      normalizeSearch(`${c.label} ${c.title} ${c.summary} ${c.inputs.join(' ')} ${c.steps.join(' ')}`).includes(q)
  ).length;
  const reactionsMatch = (MODULE_SEARCH_KEYWORDS.reactions.includes(q) ? 1 : 0) + chainsCount;

  const allianceMatch = MODULE_SEARCH_KEYWORDS.alliance.includes(q) ? 1 : 0;
  const toolsMatch = MODULE_SEARCH_KEYWORDS.tools.includes(q) ? 1 : 0;

  const cloneEligibleSkills = INDUSTRY_SKILLS_BIBLE.filter((s) =>
    matchesClone(s.clone, cloneFilter)
  );
  const skillsCount = cloneEligibleSkills.filter((s) =>
    matchesIndustrySkillQuery(s, q)
  ).length;
  const skillsKeywordMatch =
    MODULE_SEARCH_KEYWORDS.skills.includes(q) && cloneEligibleSkills.length > 0 ? 1 : 0;

  return {
    overview: overviewMatch,
    blueprints: bpRows + effRows + upwellRows + bpKeywordMatch,
    t1: t1Match,
    logistics: logisticsMatch,
    economy: economyMatch,
    workflow: workflowMatch,
    reactions: reactionsMatch,
    alliance: allianceMatch,
    tools: toolsMatch,
    skills: skillsCount > 0 ? skillsCount : skillsKeywordMatch,
  };
}
