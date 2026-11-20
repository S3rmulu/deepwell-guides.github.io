export type CloneFilter = 'all' | 'alpha' | 'expert' | 'omega';

export type VisualMode = 'dossier' | 'cards';

export type GuideId = 'mining';

export type ModuleGroup = 'Fundamentos' | 'Flota & Skills' | 'Operaciones & Fittings';

export type GuideModuleId =
  | 'overview'
  | 'mechanics'
  | 'ships'
  | 'skills'
  | 'nullsec'
  | 'specialties'
  | 'fittings';

export type WikiRoute =
  | { view: 'hub' }
  | { view: 'guide'; guideId: GuideId; moduleId: GuideModuleId };

export interface GuideModuleMeta {
  id: GuideModuleId;
  slug: string;
  label: string;
  shortLabel: string;
  group: ModuleGroup;
}

export interface GuideCardItem {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'coming-soon';
  cloneAccess: 'alpha-omega' | 'omega';
  summary: string;
  readTime: string;
  updatedAt: string;
  tags: string[];
}

export interface ShipItem {
  name: string;
  typeId: number;
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
