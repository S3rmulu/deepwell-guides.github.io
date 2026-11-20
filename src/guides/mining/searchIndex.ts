import { CloneFilter, GuideModuleId } from '../../types';
import { matchesClone } from '../../components/ui/cloneBadges';
import {
  ACTIVITY_COMPARISON_MATRIX,
  EXPERT_SYSTEMS_CATALOG,
  FITTINGS_LIST,
  MINING_SHORTCUTS,
  SHIPS_CATALOG,
  SKILLS_BIBLE,
} from './data';

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
): Record<GuideModuleId, number> {
  const q = rawQuery.trim().toLowerCase();
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
      e.name.toLowerCase().includes(q) ||
      e.activity.toLowerCase().includes(q) ||
      e.roiNote.toLowerCase().includes(q) ||
      e.skillsGranted.some((s) => s.toLowerCase().includes(q)) ||
      e.shipsUnlocked.some((s) => s.toLowerCase().includes(q))
  ).length;

  const overviewMatrix = ACTIVITY_COMPARISON_MATRIX.filter(
    (row) =>
      row.activity.toLowerCase().includes(q) ||
      row.alphaStatus.toLowerCase().includes(q) ||
      row.expertStatus.toLowerCase().includes(q) ||
      row.omegaStatus.toLowerCase().includes(q)
  ).length;

  const overviewShortcuts = MINING_SHORTCUTS.filter(
    (sc) =>
      sc.keys.toLowerCase().includes(q) ||
      sc.action.toLowerCase().includes(q) ||
      sc.tip.toLowerCase().includes(q) ||
      sc.category.toLowerCase().includes(q)
  ).length;

  const overviewBaseMatch =
    'alpha omega expert system ice harvesting trampa plex sp multiboxing'.includes(q) ? 1 : 0;

  const mechanicsCount = MECHANICS_TOPICS.filter(
    (m) => m.title.toLowerCase().includes(q) || m.searchText.includes(q)
  ).length;

  const shipsCount = SHIPS_CATALOG.filter(
    (ship) =>
      matchesClone(ship.clone, cloneFilter) &&
      (ship.name.toLowerCase().includes(q) ||
        ship.shipClass.toLowerCase().includes(q) ||
        ship.tier.toLowerCase().includes(q) ||
        ship.role.toLowerCase().includes(q) ||
        ship.requirements.toLowerCase().includes(q) ||
        ship.bonuses.some((b) => b.toLowerCase().includes(q)) ||
        ship.nullsecNote.toLowerCase().includes(q))
  ).length;

  const skillsCount = SKILLS_BIBLE.filter(
    (skill) =>
      matchesClone(skill.clone, cloneFilter) &&
      (skill.name.toLowerCase().includes(q) ||
        skill.effect.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q))
  ).length;

  const nullsecCount = NULLSEC_RULES.filter(
    (rule) => rule.title.toLowerCase().includes(q) || rule.searchText.includes(q)
  ).length;

  const specialtiesCount = SPECIALTIES_TOPICS.filter(
    (spec) => spec.label.toLowerCase().includes(q) || spec.searchText.includes(q)
  ).length;

  const fittingsCount = FITTINGS_LIST.filter(
    (fit) =>
      matchesClone(fit.clone, cloneFilter) &&
      (fit.title.toLowerCase().includes(q) ||
        fit.ship.toLowerCase().includes(q) ||
        fit.environment.toLowerCase().includes(q) ||
        fit.notes.toLowerCase().includes(q) ||
        fit.eft.toLowerCase().includes(q))
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
