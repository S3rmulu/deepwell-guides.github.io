export type CloneFilter = 'all' | 'alpha' | 'expert' | 'omega';

export type VisualMode = 'dossier' | 'cards';

export type GuideId = 'mining' | 'industry';

export type MiningModuleGroup = 'Fundamentos' | 'Flota & Skills' | 'Operaciones & Fittings';
export type IndustryModuleGroup =
  | 'Fundamentos & Planos'
  | 'Producción & Logística'
  | 'Escala T2, Reacciones & Alianza'
  | 'Herramientas & Habilidades';

export type ModuleGroup = MiningModuleGroup | IndustryModuleGroup;

export type MiningModuleId =
  | 'overview'
  | 'mechanics'
  | 'ships'
  | 'skills'
  | 'nullsec'
  | 'specialties'
  | 'fittings';

export type IndustryModuleId =
  | 'overview'
  | 'blueprints'
  | 't1'
  | 'logistics'
  | 'economy'
  | 'workflow'
  | 'reactions'
  | 'alliance'
  | 'tools'
  | 'skills';

export type GuideModuleId = MiningModuleId | IndustryModuleId;

export type WikiRoute =
  | { view: 'hub' }
  | { view: 'guide'; guideId: 'mining'; moduleId: MiningModuleId }
  | { view: 'guide'; guideId: 'industry'; moduleId: IndustryModuleId };

export interface GuideModuleMeta<TId extends string = GuideModuleId> {
  id: TId;
  slug: string;
  label: string;
  shortLabel: string;
  group: ModuleGroup;
}

export interface GuideCardItem {
  id: string;
  title: string;
  author?: string;
  category: string;
  status: 'active' | 'coming-soon';
  cloneAccess: 'alpha-omega' | 'omega';
  summary: string;
  readTime: string;
  updatedAt: string;
  tags: string[];
}

export type ShipClass =
  | 'Mining Frigate'
  | 'Mining Destroyer'
  | 'Expedition Frigate'
  | 'Mining Barge'
  | 'Exhumer'
  | 'Industrial Command Ship'
  | 'Capital Industrial Ship'
  | 'Hauler / Logística';

export interface ShipItem {
  name: string;
  typeId: number;
  shipClass: ShipClass;
  secondaryHulls?: { name: string; typeId: number }[];
  tier: string;
  role: string;
  clone: 'alpha-omega' | 'alpha-expert' | 'omega';
  cloneLabel: string;
  cargo: string;
  bonuses: string[];
  requirements: string;
  nullsecNote: string;
}

export interface SkillItem {
  name: string;
  category: string;
  alphaCap: string;
  expertCap?: string;
  omegaCap: string;
  clone: 'alpha-omega' | 'alpha-expert' | 'omega';
  effect: string;
  priority: 'Crítica' | 'Alta' | 'Especializada';
}

export interface FittingItem {
  id: string;
  title: string;
  ship: string;
  typeId: number;
  clone: 'alpha-omega' | 'alpha-expert' | 'omega';
  cloneLabel: string;
  environment: string;
  estimatedCost: string;
  notes: string;
  eft: string;
}

export interface ExpertSystemItem {
  id: string;
  name: string;
  activity: string;
  duration: string;
  plexEstimate: string;
  iskEstimate: string;
  roiNote: string;
  skillsGranted: string[];
  shipsUnlocked: string[];
}

export interface ActivityMatrixItem {
  id: string;
  activity: string;
  iskPerHour: string;
  alphaStatus: string;
  expertStatus: string;
  omegaStatus: string;
  recommendedTier: 'alpha-omega' | 'alpha-expert' | 'omega';
}

export interface ShortcutItem {
  keys: string;
  action: string;
  category: 'Minería & Módulos' | 'Drones' | 'Supervivencia & Navegación' | 'Gestión & Fitting';
  tip: string;
}

export interface IndustryStarterProductItem {
  id: string;
  category: 'Drones T1' | 'Munición y Misiles T1' | 'Módulos Frecuentes' | 'Cascos Ligeros T1';
  items: { name: string; typeId: number }[];
  clone: 'alpha-omega' | 'omega';
  rotationNote: string;
  upgradePath: string;
}

export interface IndustryChainTabItem {
  id: 'ham-t2' | 'moon-goo' | 'capitals';
  label: string;
  clone: 'omega';
  title: string;
  inputs: string[];
  facility: string;
  summary: string;
  steps: string[];
}
