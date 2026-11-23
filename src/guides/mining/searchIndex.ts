import { CloneFilter, MiningModuleId, ShipMiniGuideId } from '../../types';
import { matchesClone } from '../../components/ui/cloneBadges';
import {
  ACTIVITY_COMPARISON_MATRIX,
  EXPERT_SYSTEMS_CATALOG,
  FITTINGS_LIST,
  MINING_CRYSTAL_GROUPS,
  MINING_CRYSTAL_TYPES,
  MINING_SHORTCUTS,
  SHIP_MINI_GUIDES,
  SHIPS_CATALOG,
  SKILLS_BIBLE,
} from './data';

export function normalizeMiningSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function getMiniGuideMatchCounts(rawQuery: string): Record<ShipMiniGuideId, number> {
  const q = normalizeMiningSearch(rawQuery);
  const counts: Record<ShipMiniGuideId, number> = {
    crystals: 0,
    command: 0,
    stealth: 0,
    hauling: 0,
  };
  if (!q) return counts;

  for (const mg of SHIP_MINI_GUIDES) {
    let hits = 0;
    if (
      normalizeMiningSearch(mg.title).includes(q) ||
      normalizeMiningSearch(mg.shortLabel).includes(q) ||
      normalizeMiningSearch(mg.summary).includes(q) ||
      normalizeMiningSearch(mg.searchText).includes(q) ||
      mg.appliesTo.some((cls) => normalizeMiningSearch(cls).includes(q)) ||
      mg.keyPoints.some(
        (kp) =>
          normalizeMiningSearch(kp.title).includes(q) ||
          normalizeMiningSearch(kp.detail).includes(q)
      ) ||
      (mg.warnings?.some((w) => normalizeMiningSearch(w).includes(q)) ?? false) ||
      mg.skills.some(
        (s) =>
          normalizeMiningSearch(s.name).includes(q) || normalizeMiningSearch(s.role).includes(q)
      )
    ) {
      hits += 1;
    }

    if (mg.id === 'crystals') {
      hits += MINING_CRYSTAL_TYPES.filter(
        (ct) =>
          normalizeMiningSearch(ct.name).includes(q) ||
          normalizeMiningSearch(ct.badge).includes(q) ||
          normalizeMiningSearch(ct.bestFor).includes(q) ||
          normalizeMiningSearch(ct.wasteProfile).includes(q)
      ).length;

      hits += MINING_CRYSTAL_GROUPS.filter(
        (cg) =>
          normalizeMiningSearch(cg.group).includes(q) ||
          normalizeMiningSearch(cg.ores).includes(q) ||
          normalizeMiningSearch(cg.skill).includes(q) ||
          normalizeMiningSearch(cg.recommendedType).includes(q) ||
          normalizeMiningSearch(cg.note).includes(q)
      ).length;
    }

    counts[mg.id] = hits;
  }

  return counts;
}

export const MECHANICS_TOPICS = [
  {
    id: 'critical-yield',
    title: 'Golpes Críticos (Critical Yield)',
    searchText:
      'golpes criticos critical yield 1% +200% mining precision mining exploitation sin residuo',
  },
  {
    id: 'mining-waste',
    title: 'Residuo de Minería (Waste / Residue)',
    searchText:
      'residuo waste residue tech ii cristales tipo b lunas r32 r64 mercoxit ore faction tipo a',
  },
  {
    id: 'short-cycling',
    title: 'Short-Cycling & Survey Scanner',
    searchText:
      'short cycling survey scanner integrated mining surveyor cortar laser ciclo proporcional',
  },
  {
    id: 'compression',
    title: 'Compresión en Campo vs. Estación',
    searchText:
      'compresion campo estacion upwell porpoise orca rorqual gas decompression 99%',
  },
];

export const NULLSEC_RULES = [
  {
    id: 'regla-01',
    code: 'REGLA 01',
    title: 'El chat Local es tu radar',
    searchText: 'local radar pilotos neutral rojo standing azul verde alinear warp estacion overview',
  },
  {
    id: 'regla-02',
    code: 'REGLA 02',
    title: 'Canales Intel & D-Scan',
    searchText: 'intel d-scan inteligencia coalicion interdictores flotas hostiles shift + r drones',
  },
  {
    id: 'regla-03',
    code: 'REGLA 03',
    title: 'Bookmarks tácticos (Perches)',
    searchText: 'bookmarks perches 150 250 km burbujas interdiccion cinturon puerta anomalia',
  },
  {
    id: 'regla-04',
    code: 'REGLA 04',
    title: 'Minar alineado & Flota Standing',
    searchText: 'minar alineado standing fleet ciudadela warp 2 segundos fragata destructor',
  },
];

export const SPECIALTIES_TOPICS = [
  {
    id: 'ore',
    label: 'Minerales & Lunas',
    searchText:
      'minerales lunas r4 r16 r32 r64 bistot arkonor spodumain crokite dark ochre megacyte zydrine nocxium athanor tatara moon mining',
  },
  {
    id: 'gas',
    label: 'Gas Huffing',
    searchText:
      'gas huffing fullerites cytoserocin mykoserocin cosmic signatures nebula reservoir wormholes sleepers ninja tick gas cloud scoop',
  },
  {
    id: 'ice',
    label: 'Hielo (Expert / Omega)',
    searchText:
      'hielo ice harvesting isotopes helium hydrogen nitrogen oxygen heavy water liquid ozone 1000 m3 cyno',
  },
  {
    id: 'mercoxit',
    label: 'Mercoxit (Omega)',
    searchText: 'mercoxit morphite deep core mining nube toxica 10 km omega tech ii',
  },
];

export function getModuleSearchMatches(
  rawQuery: string,
  cloneFilter: CloneFilter
): Record<MiningModuleId, number> {
  const q = normalizeMiningSearch(rawQuery);
  if (!q) {
    return {
      overview: 0,
      mechanics: 0,
      ships: 0,
      skills: 0,
      nullsec: 0,
      specialties: 0,
      fittings: 0,
    };
  }

  const overviewExperts = EXPERT_SYSTEMS_CATALOG.filter(
    (e) =>
      normalizeMiningSearch(e.name).includes(q) ||
      normalizeMiningSearch(e.activity).includes(q) ||
      normalizeMiningSearch(e.roiNote).includes(q) ||
      e.skillsGranted.some((s) => normalizeMiningSearch(s).includes(q)) ||
      e.shipsUnlocked.some((s) => normalizeMiningSearch(s).includes(q))
  ).length;

  const overviewMatrix = ACTIVITY_COMPARISON_MATRIX.filter(
    (row) =>
      normalizeMiningSearch(row.activity).includes(q) ||
      normalizeMiningSearch(row.alphaStatus).includes(q) ||
      normalizeMiningSearch(row.expertStatus).includes(q) ||
      normalizeMiningSearch(row.omegaStatus).includes(q)
  ).length;

  const overviewShortcuts = MINING_SHORTCUTS.filter(
    (sc) =>
      normalizeMiningSearch(sc.keys).includes(q) ||
      normalizeMiningSearch(sc.action).includes(q) ||
      normalizeMiningSearch(sc.tip).includes(q) ||
      normalizeMiningSearch(sc.category).includes(q)
  ).length;

  const overviewBaseMatch =
    'alpha omega expert system ice harvesting trampa plex sp multiboxing'.includes(q) ? 1 : 0;

  const mechanicsCount = MECHANICS_TOPICS.filter(
    (m) => normalizeMiningSearch(m.title).includes(q) || normalizeMiningSearch(m.searchText).includes(q)
  ).length;

  const shipsCatalogCount = SHIPS_CATALOG.filter(
    (ship) =>
      matchesClone(ship.clone, cloneFilter) &&
      (normalizeMiningSearch(ship.name).includes(q) ||
        normalizeMiningSearch(ship.shipClass).includes(q) ||
        normalizeMiningSearch(ship.tier).includes(q) ||
        normalizeMiningSearch(ship.role).includes(q) ||
        normalizeMiningSearch(ship.requirements).includes(q) ||
        ship.bonuses.some((b) => normalizeMiningSearch(b).includes(q)) ||
        normalizeMiningSearch(ship.nullsecNote).includes(q))
  ).length;

  const miniGuideCounts = getMiniGuideMatchCounts(rawQuery);
  const miniGuidesTotal = Object.values(miniGuideCounts).reduce((acc, n) => acc + n, 0);
  const shipsCount = shipsCatalogCount + miniGuidesTotal;

  const skillsCount = SKILLS_BIBLE.filter(
    (skill) =>
      matchesClone(skill.clone, cloneFilter) &&
      (normalizeMiningSearch(skill.name).includes(q) ||
        normalizeMiningSearch(skill.effect).includes(q) ||
        normalizeMiningSearch(skill.category).includes(q))
  ).length;

  const nullsecCount = NULLSEC_RULES.filter(
    (rule) =>
      normalizeMiningSearch(rule.title).includes(q) || normalizeMiningSearch(rule.searchText).includes(q)
  ).length;

  const specialtiesCount = SPECIALTIES_TOPICS.filter(
    (spec) =>
      normalizeMiningSearch(spec.label).includes(q) || normalizeMiningSearch(spec.searchText).includes(q)
  ).length;

  const fittingsCount = FITTINGS_LIST.filter(
    (fit) =>
      matchesClone(fit.clone, cloneFilter) &&
      (normalizeMiningSearch(fit.title).includes(q) ||
        normalizeMiningSearch(fit.ship).includes(q) ||
        normalizeMiningSearch(fit.environment).includes(q) ||
        normalizeMiningSearch(fit.notes).includes(q) ||
        normalizeMiningSearch(fit.eft).includes(q))
  ).length;

  return {
    overview: overviewExperts + overviewMatrix + overviewShortcuts + overviewBaseMatch,
    mechanics: mechanicsCount,
    ships: shipsCount,
    skills: skillsCount,
    nullsec: nullsecCount,
    specialties: specialtiesCount,
    fittings: fittingsCount,
  };
}
