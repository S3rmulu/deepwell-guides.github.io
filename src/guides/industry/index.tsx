import {
  Atom,
  BookOpen,
  Calculator,
  FileCode2,
  FlaskConical,
  GitFork,
  Hammer,
  Shield,
  Truck,
  Wrench,
} from 'lucide-react';
import { GuideModuleMeta, IndustryModuleGroup, IndustryModuleId } from '../../types';

export interface IndustryModuleItem extends GuideModuleMeta<IndustryModuleId> {
  icon: React.ReactNode;
}

export const INDUSTRY_GUIDE_TITLE = 'Industria, Planos (BPO/BPC), Invención T2 & Economía';
export const INDUSTRY_GUIDE_AUTHOR = 'Bill Tangana';

export const INDUSTRY_GROUP_ORDER: IndustryModuleGroup[] = [
  'Fundamentos & Planos',
  'Producción & Logística',
  'Escala T2, Reacciones & Alianza',
  'Herramientas & Habilidades',
];

export const INDUSTRY_MODULES: IndustryModuleItem[] = [
  {
    id: 'overview',
    slug: 'resumen',
    label: '0. Índice & Conceptos Base',
    shortLabel: '0. Base & Flujo',
    group: 'Fundamentos & Planos',
    icon: <GitFork className="w-4 h-4" />,
  },
  {
    id: 'blueprints',
    slug: 'planos',
    label: '1. Blueprints, ME/TE & SCI',
    shortLabel: '1. Planos & ME/TE',
    group: 'Fundamentos & Planos',
    icon: <FileCode2 className="w-4 h-4" />,
  },
  {
    id: 't1',
    slug: 'fabricacion-t1',
    label: '2. Fabricación T1',
    shortLabel: '2. Fabricación T1',
    group: 'Producción & Logística',
    icon: <Hammer className="w-4 h-4" />,
  },
  {
    id: 'logistics',
    slug: 'logistica',
    label: '3. Reprocesado & Logística',
    shortLabel: '3. Logística',
    group: 'Producción & Logística',
    icon: <Truck className="w-4 h-4" />,
  },
  {
    id: 'economy',
    slug: 'economia',
    label: '4. Economía & Break-Even',
    shortLabel: '4. Economía & ISK',
    group: 'Producción & Logística',
    icon: <Calculator className="w-4 h-4" />,
  },
  {
    id: 'workflow',
    slug: 'invencion',
    label: '5. Invención & Producción T2',
    shortLabel: '5. Invención T2',
    group: 'Escala T2, Reacciones & Alianza',
    icon: <FlaskConical className="w-4 h-4" />,
  },
  {
    id: 'reactions',
    slug: 'reacciones',
    label: '6. Reacciones & Moon Goo',
    shortLabel: '6. Reacciones',
    group: 'Escala T2, Reacciones & Alianza',
    icon: <Atom className="w-4 h-4" />,
  },
  {
    id: 'alliance',
    slug: 'alianza',
    label: '7. Industria de Alianza',
    shortLabel: '7. Alianza',
    group: 'Escala T2, Reacciones & Alianza',
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: 'tools',
    slug: 'herramientas',
    label: '8. Herramientas & Enlaces',
    shortLabel: '8. Herramientas',
    group: 'Herramientas & Habilidades',
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: 'skills',
    slug: 'skills',
    label: '9. Biblia de Skills',
    shortLabel: '9. Skills',
    group: 'Herramientas & Habilidades',
    icon: <BookOpen className="w-4 h-4" />,
  },
];
