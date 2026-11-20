import { BookOpen, Cpu, Flame, Layers, Pickaxe, Rocket, ShieldAlert } from 'lucide-react';
import { GuideModuleMeta, MiningModuleId } from '../../types';

export interface MiningModuleItem extends GuideModuleMeta<MiningModuleId> {
  icon: React.ReactNode;
}

export const MINING_GUIDE_TITLE = 'Minería Integral & Operaciones en Null-Sec';

export const MINING_MODULES: MiningModuleItem[] = [
  {
    id: 'overview',
    slug: 'resumen',
    label: '0. Visión General & Clones',
    shortLabel: '0. Visión General',
    group: 'Fundamentos',
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 'mechanics',
    slug: 'mecanicas',
    label: '1. Mecánicas & Catalyst',
    shortLabel: '1. Mecánicas',
    group: 'Fundamentos',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: 'ships',
    slug: 'naves',
    label: '2. Catálogo de Naves ORE',
    shortLabel: '2. Naves ORE',
    group: 'Flota & Skills',
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    id: 'skills',
    slug: 'skills',
    label: '3. Biblia de Skills',
    shortLabel: '3. Skills',
    group: 'Flota & Skills',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'nullsec',
    slug: 'nullsec',
    label: '4. Protocolo Null-Sec',
    shortLabel: '4. Null-Sec',
    group: 'Operaciones & Fittings',
    icon: <ShieldAlert className="w-4 h-4" />,
  },
  {
    id: 'specialties',
    slug: 'especialidades',
    label: '5. Gas, Hielo & Mercoxit',
    shortLabel: '5. Especialidades',
    group: 'Operaciones & Fittings',
    icon: <Flame className="w-4 h-4" />,
  },
  {
    id: 'fittings',
    slug: 'fittings',
    label: '6. Fittings (Copiar EFT)',
    shortLabel: '6. Fittings EFT',
    group: 'Operaciones & Fittings',
    icon: <Pickaxe className="w-4 h-4" />,
  },
];
