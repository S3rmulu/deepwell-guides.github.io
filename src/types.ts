export type CloneFilter = 'all' | 'alpha' | 'omega';

export type GuideModuleId =
  | 'overview'
  | 'mechanics'
  | 'ships'
  | 'skills'
  | 'nullsec'
  | 'specialties'
  | 'fittings';

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
  omegaCap: string;
  clone: 'alpha-omega' | 'omega';
  effect: string;
  priority: 'Crítica' | 'Alta' | 'Especializada';
}

export interface FittingItem {
  id: string;
  title: string;
  ship: string;
  clone: 'alpha-omega' | 'alpha-expert' | 'omega';
  cloneLabel: string;
  environment: string;
  estimatedCost: string;
  notes: string;
  eft: string;
}
