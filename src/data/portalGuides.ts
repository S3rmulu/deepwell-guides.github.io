import { GuideCardItem } from '../types';

export const PORTAL_GUIDES: GuideCardItem[] = [
  {
    id: 'mining-master',
    title: 'Minería Integral & Operaciones en Null-Sec',
    category: 'Industria & Extracción',
    status: 'active',
    cloneAccess: 'alpha-omega',
    summary:
      'Manual maestro modular: límites reales Alpha vs. Omega, Mining Barge Expert Systems, mecánicas Catalyst (críticos y residuo), catálogo ORE, supervivencia en Null-Sec, Gas, Hielo y fittings listos para importar.',
    readTime: '18 min',
    updatedAt: 'Noviembre 2026',
    tags: ['Null-Sec', 'Alpha & Omega', 'ORE', 'Gas Huffing', 'Mercoxit'],
  },
  {
    id: 'exploration-wh',
    title: 'Exploración Relic/Data & Navegación Wormhole',
    category: 'Exploración & Reconocimiento',
    status: 'coming-soon',
    cloneAccess: 'alpha-omega',
    summary:
      'Escaneo con sondas, hackeo de sitios Sansha/Guristas en Null-Sec, bookmarks de agujeros de gusano y evasión de gatecamps.',
    readTime: '14 min',
    updatedAt: 'Próximamente',
    tags: ['J-Space', 'Hacking', 'D-Scan'],
  },
  {
    id: 'industry-reactions',
    title: 'Reprocesado, Reacciones Bioquímicas & T2',
    category: 'Manufactura Avanzada',
    status: 'coming-soon',
    cloneAccess: 'omega',
    summary:
      'Cadenas de producción desde mineral comprimido y gas Fullerite/Cytoserocin hasta componentes T2, boosters y naves capitales.',
    readTime: '22 min',
    updatedAt: 'Próximamente',
    tags: ['Reacciones', 'Morphite', 'Boosters'],
  },
  {
    id: 'nullsec-survival',
    title: 'Doctrina de Supervivencia & Flotas Standing',
    category: 'Táctica & Inteligencia',
    status: 'coming-soon',
    cloneAccess: 'alpha-omega',
    summary:
      'Uso avanzado de canales Intel, interdictores, burbujas, alineamiento táctico y respuesta rápida ante flotas hostiles.',
    readTime: '12 min',
    updatedAt: 'Próximamente',
    tags: ['Intel', 'PvP Defensivo', 'SovNull'],
  },
];
