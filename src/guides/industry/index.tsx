import { BookOpen, Calculator, FileCode2, GitFork, Wrench } from 'lucide-react';
import { GuideModuleMeta, IndustryModuleGroup, IndustryModuleId } from '../../types';

export interface IndustryModuleItem extends GuideModuleMeta<IndustryModuleId> {
  icon: React.ReactNode;
}

export const INDUSTRY_GUIDE_TITLE = 'Industria, Planos (BPO/BPC), Invención T2 & Economía';

export const INDUSTRY_GROUP_ORDER: IndustryModuleGroup[] = [
  'Fundamentos & Planos',
  'Producción & Economía',
  'Estrategia & Habilidades',
];

export const INDUSTRY_MODULES: IndustryModuleItem[] = [
  {
    id: 'overview',
    slug: 'resumen',
    label: '0. Visión General & Flujo',
    shortLabel: '0. Flujo Industrial',
    group: 'Fundamentos & Planos',
    icon: <GitFork className="w-4 h-4" />,
  },
  {
    id: 'blueprints',
    slug: 'planos',
    label: '1. Planos, ME/TE & SCI',
    shortLabel: '1. Planos & ME/TE',
    group: 'Fundamentos & Planos',
    icon: <FileCode2 className="w-4 h-4" />,
  },
  {
    id: 'workflow',
    slug: 'proceso',
    label: '2. Proceso & Invención T2',
    shortLabel: '2. Invención T2',
    group: 'Producción & Economía',
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: 'economy',
    slug: 'economia',
    label: '3. Economía & Break-Even',
    shortLabel: '3. Economía & ISK',
    group: 'Producción & Economía',
    icon: <Calculator className="w-4 h-4" />,
  },
  {
    id: 'skills',
    slug: 'skills',
    label: '4. Productos & Skills',
    shortLabel: '4. Productos & Skills',
    group: 'Estrategia & Habilidades',
    icon: <BookOpen className="w-4 h-4" />,
  },
];
