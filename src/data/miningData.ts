import { GuideCardItem, ShipItem, SkillItem, FittingItem } from '../types';

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

export const SHIPS_CATALOG: ShipItem[] = [
  {
    name: 'Venture',
    tier: 'Tier 1 · Fragata Minera',
    role: 'Inicio, Gas Huffing & Ninja Mining',
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    cargo: '5,000 m³ (Bodega Mineral/Gas)',
    bonuses: [
      '+100% rendimiento en láseres de minería y gas',
      '+2 fuerza de estabilización de núcleo de salto (Warp Core) integrada',
      'Alta velocidad y alineamiento rápido (< 4s)',
    ],
    requirements: 'Mining Frigate I',
    nullsecNote: 'Excelente para extraer gas y minerales caros con mínimo riesgo financiero.',
  },
  {
    name: 'Venture Consortium Issue',
    tier: 'Tier 1 · Fragata de Facción',
    role: 'Extracción Rápida & Movilidad',
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    cargo: '6,500 m³ (Bodega Mineral/Gas)',
    bonuses: [
      'Mayor rendimiento base y tanqueo de escudo frente a la Venture estándar',
      'Mantiene el bono integrado de +2 Warp Core Stability',
    ],
    requirements: 'Mining Frigate I',
    nullsecNote: 'Mayor coste ISK; úsala solo cuando domines el uso del chat Local e Intel.',
  },
  {
    name: 'Pioneer',
    tier: 'Tier 1.5 · Destructor Minero',
    role: 'Puente Intermedio de Extracción',
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    cargo: '8,500 m³ (Bodega Mineral)',
    bonuses: [
      'Mayor alcance de láseres y potencia de extracción que la Venture',
      '3 torretas de minería con coste contenido',
    ],
    requirements: 'Mining Destroyer I',
    nullsecNote: 'Alternativa económica antes de dar el salto a barcazas mineras.',
  },
  {
    name: 'Prospect',
    tier: 'Tier 2 · Fragata de Expedición T2',
    role: 'Operaciones Encubiertas & Gas de Alto Riesgo',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    cargo: '10,000 m³ (Bodega Mineral/Gas)',
    bonuses: [
      'Puede equipar Covert Ops Cloaking Device II (viajar y hacer warp invisible)',
      'Firma radar diminuta y gran bodega sin penalizar agilidad',
      'Pierde el bono de +2 Warp Core de la Venture',
    ],
    requirements: 'Mining Frigate V + Expedition Frigates I',
    nullsecNote: 'La reina para infiltrarse en sistemas hostiles o Wormholes de clase alta.',
  },
  {
    name: 'Endurance',
    tier: 'Tier 2 · Fragata de Expedición T2',
    role: 'Cosecha de Hielo Táctica',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    cargo: '15,000 m³ (Bodega de Hielo)',
    bonuses: [
      'Bonificaciones masivas al tiempo de ciclo de Ice Harvesters',
      'Puede moverse camuflada a alta velocidad',
    ],
    requirements: 'Mining Frigate V + Expedition Frigates I',
    nullsecNote: 'Ideal para minar anomalías de hielo en Null-Sec con amenazas cercanas.',
  },
  {
    name: 'Procurer',
    tier: 'Tier 3 · Mining Barge',
    role: 'Tanqueo Extremo & Supervivencia Null-Sec',
    clone: 'alpha-expert',
    cloneLabel: 'OMEGA (o ALPHA con Expert System)',
    cargo: '12,000 m³ (Bodega Mineral)',
    bonuses: [
      'Escudos masivos (EHP nivel crucero pesado)',
      '+50% daño y puntos de golpe a drones (limpia ratas de Null-Sec solo)',
    ],
    requirements: 'Mining Barge I (o Mining Barge Expert System por 7 días)',
    nullsecNote: 'El estándar recomendado para barcazas T1 en Null-Sec.',
  },
  {
    name: 'Retriever',
    tier: 'Tier 3 · Mining Barge',
    role: 'Almacenamiento Masivo en Solitario',
    clone: 'alpha-expert',
    cloneLabel: 'OMEGA (o ALPHA con Expert System)',
    cargo: '27,500 m³ (Bodega Mineral)',
    bonuses: [
      'La mayor bodega de mineral entre las barcazas T1',
      'Minimiza los viajes de descarga cuando no hay compresión en flota',
    ],
    requirements: 'Mining Barge I (o Mining Barge Expert System por 7 días)',
    nullsecNote: 'Frágil frente a ratas de Null-Sec o gankers; requiere vigilancia constante.',
  },
  {
    name: 'Covetor',
    tier: 'Tier 3 · Mining Barge',
    role: 'Máximo Rendimiento en Flota',
    clone: 'alpha-expert',
    cloneLabel: 'OMEGA (o ALPHA con Expert System)',
    cargo: '7,000 m³ (Bodega Mineral)',
    bonuses: [
      'Extrae entre un 15% y 20% más rápido que Procurer y Retriever',
      'Mayor alcance de Strip Miners',
    ],
    requirements: 'Mining Barge I (o Mining Barge Expert System por 7 días)',
    nullsecNote: 'Imprescindible operar junto a una Porpoise, Orca o Rorqual comprimiendo.',
  },
  {
    name: 'Skiff',
    tier: 'Tier 4 · Exhumer Tech II',
    role: 'Fortaleza de Extracción Null-Sec',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    cargo: '15,000 m³ (Bodega Mineral)',
    bonuses: [
      'Resistencias T2 y EHP comparable a un acorazado',
      'Drones letales capaces de destruir cruceros NPC',
    ],
    requirements: 'Mining Barge V + Astrogeology V + Exhumers I',
    nullsecNote: 'La opción más segura cuando hay actividad hostil intermitente en la región.',
  },
  {
    name: 'Mackinaw',
    tier: 'Tier 4 · Exhumer Tech II',
    role: 'Resistencia Autárquica & Bodega Gigante',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    cargo: '35,000 m³ (Bodega Mineral)',
    bonuses: [
      'Bodega colosal con mejores resistencias de escudo que la Retriever',
      'Excelente autonomía para minar hielo o lunas',
    ],
    requirements: 'Mining Barge V + Astrogeology V + Exhumers I',
    nullsecNote: 'Muy eficiente en sistemas tranquilos con buena red de Inteligencia.',
  },
  {
    name: 'Hulk',
    tier: 'Tier 4 · Exhumer Tech II',
    role: 'Élite de Extracción Industrial',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    cargo: '8,500 m³ (Bodega Mineral)',
    bonuses: [
      'La mayor velocidad de extracción sub-capital de todo EVE Online',
      'Escalado brutal con boosts de Rorqual y cristales Tipo A/B',
    ],
    requirements: 'Mining Barge V + Astrogeology V + Exhumers I',
    nullsecNote: 'Requiere flota organizada y compresión continua en campo.',
  },
  {
    name: 'Porpoise / Orca / Rorqual',
    tier: 'Tier 5 · Mando Industrial & Capital',
    role: 'Boosts de Flota, Compresión & PANIC',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    cargo: '50,000 m³ – 300,000+ m³ (Bodega Flota/Mineral)',
    bonuses: [
      'Command Bursts: reducen ciclo de láser, aumentan alcance y reducen residuo',
      'Compresión en el espacio (reducen el volumen del mineral hasta un 99%)',
      'Rorqual: Módulo PANIC (invulnerabilidad temporal de flota) y drones Excavator',
    ],
    requirements: 'Industrial Command Ships / Capital Industrial Ships',
    nullsecNote: 'Porpoise es ideal por agilidad y coste; Rorqual requiere paraguas capital aliado.',
  },
  {
    name: 'Miasmos',
    tier: 'Logística · Carguero Industrial Gallente',
    role: 'Transporte Masivo de Mineral Crudo',
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    cargo: '46,200 m³ – 63,000 m³ (Bodega de Mineral)',
    bonuses: [
      '+10% capacidad de bodega especializada de mineral por nivel de Gallente Industrial',
      'Acceso total para cuentas Alpha con mínimo entrenamiento',
    ],
    requirements: 'Gallente Industrial I (recomendado IV)',
    nullsecNote: 'Indispensable para mover mineral sin comprimir entre estaciones o hacia centros de reprocesado.',
  },
];

export const SKILLS_BIBLE: SkillItem[] = [
  {
    name: 'Mining',
    category: 'Rendimiento Base',
    alphaCap: 'Nivel IV',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: '+5% de rendimiento de extracción por nivel. Al nivel IV desbloquea láseres Miner II.',
    priority: 'Crítica',
  },
  {
    name: 'Mining Upgrades',
    category: 'Rendimiento Base',
    alphaCap: 'Nivel IV',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: '-5% penalización de CPU en módulos Mining Laser Upgrade por nivel. Al IV permite equipar MLU II.',
    priority: 'Crítica',
  },
  {
    name: 'Gas Cloud Harvesting',
    category: 'Especialización',
    alphaCap: 'Nivel II',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: 'Permite operar +1 módulo extractor de gas por nivel (en Alpha II equipas los 2 de la Venture).',
    priority: 'Crítica',
  },
  {
    name: 'Astrogeology',
    category: 'Rendimiento Base',
    alphaCap: 'Bloqueada (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: '+5% rendimiento de extracción por nivel y requisito obligatorio para Barcazas y Exhumers.',
    priority: 'Crítica',
  },
  {
    name: 'Mining Precision & Exploitation',
    category: 'Mecánica Catalyst (Críticos)',
    alphaCap: 'Muy limitada',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Aumenta probabilidad base (1%) y multiplicador (+200% base) de golpes críticos sin generar residuo.',
    priority: 'Alta',
  },
  {
    name: 'Deep Core Mining',
    category: 'Null-Sec Exclusivo',
    alphaCap: 'Bloqueada (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Obligatoria para Mercoxit. Reduce un 20% por nivel la probabilidad de nube tóxica dañina (0% al V).',
    priority: 'Especializada',
  },
  {
    name: 'Ore & Moon Processing (Complex / Variegated / Rares)',
    category: 'Cristales de Minería',
    alphaCap: 'Limitada',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Nivel III desbloquea cristales Tipo I; Nivel IV desbloquea cristales Tipo II para Strip Miners.',
    priority: 'Alta',
  },
  {
    name: 'Mining Foreman & Mining Director',
    category: 'Mando de Flota',
    alphaCap: 'Bloqueada (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Potencia duración, alcance y fuerza de Command Bursts industriales (velocidad y reducción de residuo).',
    priority: 'Especializada',
  },
  {
    name: 'Ice Harvesting (¡Advertencia!)',
    category: 'Trampa de Entrenamiento',
    alphaCap: 'Nivel II (Inusable)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Aunque Alpha permite entrenarla al II, ninguna nave Alpha puede equipar Ice Harvesters. No gastar SP siendo Alpha.',
    priority: 'Especializada',
  },
];

export const FITTINGS_LIST: FittingItem[] = [
  {
    id: 'venture-alpha-ore',
    title: 'Venture Minería Estándar (Meta 3 / T2)',
    ship: 'Venture',
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    environment: 'Null-Sec / Low-Sec / High-Sec',
    estimatedCost: '~1.2M ISK',
    notes:
      'Usa láseres EP-S Gaussian Scoped (+20% rendimiento por ~15k ISK) hasta tener Mining IV para cambiar a Miner II (+50%).',
    eft: `[Venture, Deepwell Alpha Ore Miner]
Mining Laser Upgrade I

1MN Afterburner I
Medium Shield Extender I
Survey Scanner I

EP-S Gaussian Scoped Mining Laser
EP-S Gaussian Scoped Mining Laser

Small Core Defense Field Extender I
Small Core Defense Field Extender I
Small EM Shield Reinforcer I

Hobgoblin I x2`,
  },
  {
    id: 'venture-alpha-gas',
    title: 'Venture Ninja Gas Huffing (Wormholes & Null)',
    ship: 'Venture',
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    environment: 'Wormholes (J-Space) & Null-Sec',
    estimatedCost: '~3.5M ISK',
    notes:
      'En nubes Cytoserocin que detonan, activa ambos harvesters en el mismo tick de servidor (pre-actívalos antes de fijar objetivo).',
    eft: `[Venture, Deepwell Ninja Gas Huffer]
Damage Control I

5MN Y-T8 Compact Microwarpdrive
Medium Shield Extender I
Survey Scanner I

Gas Cloud Scoop I
Gas Cloud Scoop I
Core Probe Launcher I

Small Core Defense Field Extender I
Small Hyperspatial Velocity Optimizer I
Small Hyperspatial Velocity Optimizer I

Hobgoblin I x2
Core Scanner Probe I x8`,
  },
  {
    id: 'procurer-null-tank',
    title: 'Procurer Tanque Null-Sec (Barcaza T1)',
    ship: 'Procurer',
    clone: 'alpha-expert',
    cloneLabel: 'OMEGA (o ALPHA + Expert System)',
    environment: 'Null-Sec Soberanía / Lunas',
    estimatedCost: '~48M ISK',
    notes:
      'Capaz de tanquear ratas de acorazado de Null-Sec mientras sus 5 Hobgoblin II limpian el cinturón. Incluye Hornet EC-300 para romper target y escapar.',
    eft: `[Procurer, Deepwell Null-Sec Tank]
Damage Control II
Mining Laser Upgrade II
Mining Laser Upgrade II

Multispectrum Shield Hardener II
Multispectrum Shield Hardener II
Medium Shield Extender II
Survey Scanner II

Modulated Strip Miner II
Modulated Strip Miner II

Medium Core Defense Field Extender I
Medium Core Defense Field Extender I
Medium Thermal Shield Reinforcer I

Hobgoblin II x5
Hornet EC-300 x5`,
  },
  {
    id: 'skiff-null-elite',
    title: 'Skiff Élite Null-Sec (Exhumer T2)',
    ship: 'Skiff',
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    environment: 'Null-Sec Caliente / Anomalías Raras',
    estimatedCost: '~340M ISK',
    notes:
      'Resistencia T2 masiva. Usa cristales Tipo A para rocas de Luna R32/R64 o Mercoxit (minimizando residuo) y Tipo B para anomalías públicas.',
    eft: `[Skiff, Deepwell Null-Sec Brick]
Damage Control II
Mining Laser Upgrade II
Mining Laser Upgrade II

Multispectrum Shield Hardener II
Multispectrum Shield Hardener II
Large Shield Extender II
Large Shield Extender II
Survey Scanner II

Modulated Strip Miner II
Modulated Strip Miner II

Medium Core Defense Field Extender II
Medium Core Defense Field Extender II

Hobgoblin II x5
Hammerhead II x5`,
  },
];
