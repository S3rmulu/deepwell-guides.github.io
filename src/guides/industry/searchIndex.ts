import { CloneFilter, IndustryModuleId } from '../../types';
import { matchesClone } from '../../components/ui/cloneBadges';
import {
  ADVANCED_CHAINS_PREVIEW,
  BLUEPRINT_COMPARISON,
  DECRYPTORS_REFERENCE,
  EFFICIENCY_PARAMETERS,
  INDUSTRY_SKILLS_BIBLE,
  STARTER_PRODUCTS,
  UPWELL_ENGINEERING_COMPLEXES,
} from './data';

const OVERVIEW_KEYWORDS =
  'flujo industrial materias primas minerales pi gas reacciones planos blueprints bpo bpc investigacion me te fabricacion tech i invencion tech ii datacores decryptors producto final venta distribucion hub jita dodixie amarr alpha omega recargo 2%';

const WORKFLOW_KEYWORDS =
  'proceso industrial paso a paso adquisicion investigacion plano t1 alt + r blueprints reactions ordenes npc research me 10 te 20 copias invencion tech ii invention 1x bpc datacores decryptor probabilidad exito runs ensamblaje hangar sci start';

const ECONOMY_KEYWORDS =
  'economia margen neto impuestos punto de equilibrio break-even costes mercado sales tax impuesto venta 5,02% 5.02% accounting 11% broker fee comision corredor 2,03% 3% broker relations standing ingreso neto 210 isk 195,195 191,31 buy order orden compra';

export function getIndustrySearchMatches(
  rawQuery: string,
  cloneFilter: CloneFilter
): Record<IndustryModuleId, number> {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return {
      overview: 0,
      blueprints: 0,
      workflow: 0,
      economy: 0,
      skills: 0,
    };
  }

  const overviewMatch = OVERVIEW_KEYWORDS.includes(q) ? 1 : 0;

  const bpRows = BLUEPRINT_COMPARISON.filter(
    (b) =>
      b.type.toLowerCase().includes(q) ||
      b.acquisition.toLowerCase().includes(q) ||
      b.usage.toLowerCase().includes(q) ||
      b.t2Rule.toLowerCase().includes(q)
  ).length;

  const effRows = EFFICIENCY_PARAMETERS.filter(
    (e) =>
      e.parameter.toLowerCase().includes(q) ||
      e.impact.toLowerCase().includes(q) ||
      e.maxLevel.toLowerCase().includes(q)
  ).length;

  const upwellRows = UPWELL_ENGINEERING_COMPLEXES.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.roleBonus.toLowerCase().includes(q) ||
      u.rigNote.toLowerCase().includes(q)
  ).length;

  const sciMatch = 'system cost index sci jita perimeter raitaru azbel sotiyo regla de oro t2'.includes(
    q
  )
    ? 1
    : 0;

  const decryptorMatches = DECRYPTORS_REFERENCE.filter(
    (d) => d.name.toLowerCase().includes(q) || d.useCase.toLowerCase().includes(q)
  ).length;

  const workflowMatch = (WORKFLOW_KEYWORDS.includes(q) ? 1 : 0) + decryptorMatches;

  const economyMatch = ECONOMY_KEYWORDS.includes(q) ? 1 : 0;

  const starterCount = STARTER_PRODUCTS.filter(
    (p) =>
      matchesClone(p.clone, cloneFilter) &&
      (p.category.toLowerCase().includes(q) ||
        p.rotationNote.toLowerCase().includes(q) ||
        p.upgradePath.toLowerCase().includes(q) ||
        p.items.some((it) => it.name.toLowerCase().includes(q)))
  ).length;

  const chainsCount = ADVANCED_CHAINS_PREVIEW.filter(
    (c) =>
      matchesClone(c.clone, cloneFilter) &&
      (c.label.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.inputs.some((inp) => inp.toLowerCase().includes(q)))
  ).length;

  const skillsCount = INDUSTRY_SKILLS_BIBLE.filter(
    (s) =>
      matchesClone(s.clone, cloneFilter) &&
      (s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.effect.toLowerCase().includes(q))
  ).length;

  return {
    overview: overviewMatch,
    blueprints: bpRows + effRows + upwellRows + sciMatch,
    workflow: workflowMatch,
    economy: economyMatch,
    skills: starterCount + chainsCount + skillsCount,
  };
}
