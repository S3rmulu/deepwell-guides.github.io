import { BookOpen, Cpu, Flame, Layers, Pickaxe, Rocket, ShieldAlert } from 'lucide-react';
import { GuideModuleMeta } from '../../types';

export interface MiningModuleItem extends GuideModuleMeta {
  icon: React.ReactNode;
}

export const MINING_GUIDE_TITLE = 'Minería Integral & Operaciones en Null-Sec';

export const MINING_MODULES: MiningModuleItem[] = [
  {
    id: 'overview',
    slug: 'resumen',
    label: '0. Visión General & Clones',
    shortLabel: '0. Visión General',
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 'mechanics',
    slug: 'mecanicas',
    label: '1. Mecánicas & Catalyst',
    shortLabel: '1. Mecánicas',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: 'ships',
    slug: 'naves',
    label: '2. Catálogo de Naves ORE',
    shortLabel: '2. Naves ORE',
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    id: 'skills',
    slug: 'skills',
    label: '3. Biblia de Skills',
    shortLabel: '3. Skills',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'nullsec',
    slug: 'nullsec',
    label: '4. Protocolo Null-Sec',
    shortLabel: '4. Null-Sec',
    icon: <ShieldAlert className="w-4 h-4" />,
  },
  {
    id: 'specialties',
    slug: 'especialidades',
    label: '5. Gas, Hielo & Mercoxit',
    shortLabel: '5. Especialidades',
    icon: <Flame className="w-4 h-4" />,
  },
  {
    id: 'fittings',
    slug: 'fittings',
    label: '6. Fittings (Copiar EFT)',
    shortLabel: '6. Fittings EFT',
    icon: <Pickaxe className="w-4 h-4" />,
  },
];
