import {
  GuideCardItem,
  ShipItem,
  SkillItem,
  FittingItem,
  ExpertSystemItem,
  ActivityMatrixItem,
  ShortcutItem,
} from '../types';

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

export const SHIP_TYPE_IDS: Record<string, number> = {
  Venture: 32880,
  'Venture Consortium Issue': 89648,
  Pioneer: 89240,
  Prospect: 33697,
  Endurance: 37135,
  Procurer: 17480,
  Retriever: 17478,
  Covetor: 17476,
  Skiff: 22546,
  Mackinaw: 22548,
  Hulk: 22544,
  Porpoise: 42244,
  Orca: 28606,
  Rorqual: 28352,
  Miasmos: 656,
};

export const SHIPS_CATALOG: ShipItem[] = [
  {
    name: 'Venture',
    typeId: SHIP_TYPE_IDS.Venture,
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
    typeId: SHIP_TYPE_IDS['Venture Consortium Issue'],
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
    typeId: SHIP_TYPE_IDS.Pioneer,
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
    typeId: SHIP_TYPE_IDS.Prospect,
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
    typeId: SHIP_TYPE_IDS.Endurance,
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
    typeId: SHIP_TYPE_IDS.Procurer,
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
    typeId: SHIP_TYPE_IDS.Retriever,
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
    typeId: SHIP_TYPE_IDS.Covetor,
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
    typeId: SHIP_TYPE_IDS.Skiff,
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
    typeId: SHIP_TYPE_IDS.Mackinaw,
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
    typeId: SHIP_TYPE_IDS.Hulk,
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
    typeId: SHIP_TYPE_IDS.Orca,
    secondaryHulls: [
      { name: 'Porpoise', typeId: SHIP_TYPE_IDS.Porpoise },
      { name: 'Orca', typeId: SHIP_TYPE_IDS.Orca },
      { name: 'Rorqual', typeId: SHIP_TYPE_IDS.Rorqual },
    ],
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
    typeId: SHIP_TYPE_IDS.Miasmos,
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
    expertCap: 'Nivel V (Gas Expert System)',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: 'Permite operar +1 módulo extractor de gas por nivel (en Alpha II equipas los 2 de la Venture; con Expert System llegas al V y habilitas Barcazas para gas).',
    priority: 'Crítica',
  },
  {
    name: 'Astrogeology',
    category: 'Rendimiento Base',
    alphaCap: 'Bloqueada (0)',
    expertCap: 'Nivel III–IV (Barge Expert System)',
    omegaCap: 'Nivel V',
    clone: 'alpha-expert',
    effect: '+5% rendimiento de extracción por nivel y requisito obligatorio para Barcazas y Exhumers. Accesible temporalmente con Mining Barge Operations Expert System.',
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
    expertCap: 'Nivel I–II usable en Barcaza T1',
    omegaCap: 'Nivel V',
    clone: 'alpha-expert',
    effect: 'En Alpha puro ninguna nave puede equipar Ice Harvesters (no gastes SP ahí). Con Mining Barge Operations Expert System sí puedes usar Ice Harvester I en Procurer/Retriever/Covetor durante 7 días.',
    priority: 'Especializada',
  },
];

export const FITTINGS_LIST: FittingItem[] = [
  {
    id: 'venture-alpha-ore',
    title: 'Venture Minería Estándar (Meta 3 / T2)',
    ship: 'Venture',
    typeId: SHIP_TYPE_IDS.Venture,
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
    typeId: SHIP_TYPE_IDS.Venture,
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
    typeId: SHIP_TYPE_IDS.Procurer,
    clone: 'alpha-expert',
    cloneLabel: 'OMEGA (o ALPHA + Expert System)',
    environment: 'Null-Sec Soberanía / Lunas',
    estimatedCost: '~48M ISK',
    notes:
      'Capaz de tanquear ratas de acorazado de Null-Sec mientras sus 5 Hobgoblin II limpian el cinturón. Si la vuelas como Alpha con Mining Barge Operations Expert System, cambia a módulos Tech I: Strip Miner I, Mining Laser Upgrade I y Hobgoblin I.',
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
    id: 'procurer-expert-t1',
    title: 'Procurer T1 Lista para Expert System (Sin Residuo)',
    ship: 'Procurer',
    typeId: SHIP_TYPE_IDS.Procurer,
    clone: 'alpha-expert',
    cloneLabel: 'ALPHA + EXPERT SYSTEM / OMEGA',
    environment: 'Null-Sec / Lunas R32–R64 / Hielo T1',
    estimatedCost: '~38M ISK',
    notes:
      'Configuración 100% compatible con Alpha + Mining Barge Operations Expert System. Strip Miner I tiene 0% de residuo (Waste), ideal para lunas corporativas; para hielo sustituye los láseres por Ice Harvester I.',
    eft: `[Procurer, Deepwell Alpha Expert T1]
Damage Control II
Mining Laser Upgrade I
Mining Laser Upgrade I

Multispectrum Shield Hardener I
Multispectrum Shield Hardener I
Medium Shield Extender II
Survey Scanner I

Strip Miner I
Strip Miner I

Medium Core Defense Field Extender I
Medium Core Defense Field Extender I
Medium Thermal Shield Reinforcer I

Hobgoblin I x5
Hornet EC-300 x5`,
  },
  {
    id: 'skiff-null-elite',
    title: 'Skiff Élite Null-Sec (Exhumer T2)',
    ship: 'Skiff',
    typeId: SHIP_TYPE_IDS.Skiff,
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

export const PLEX_MARKET_BASE = {
  plexUnitIsk: '5.1M – 5.2M ISK',
  alphaCost: '0 PLEX (0 ISK)',
  expertCostPlex: '~45 – 60 PLEX equiv. (o Pack NES / Caja Jita)',
  expertCostIsk: '~230M – 310M ISK (NES) · ~15M – 40M ISK (cajas promo en Jita)',
  omegaCostPlex: '500 PLEX / 30 días',
  omegaCostIsk: '~2.55B – 2.60B ISK / mes (~85M ISK/día)',
};

export const EXPERT_SYSTEMS_CATALOG: ExpertSystemItem[] = [
  {
    id: 'mining-barge-expert',
    name: 'Mining Barge Operations Expert System',
    activity: 'Minería en Barcazas T1 & Cosecha de Hielo T1',
    duration: '7 días',
    plexEstimate: '~45 – 60 PLEX equiv. (Pack Starter / NES)',
    iskEstimate: '~230M – 310M ISK (ref. PLEX) · ~15M – 40M ISK en Jita si hay cajas activas',
    roiNote:
      'Con una Procurer/Retriever haces ~25M–45M ISK/h en Null-Sec o lunas; amortizas el coste en ~1 a 8 horas según vía de compra.',
    skillsGranted: ['Mining Barge III', 'Astrogeology III–IV', 'Ice Harvesting I–II', 'Mining Upgrades IV'],
    shipsUnlocked: ['Procurer', 'Retriever', 'Covetor'],
  },
  {
    id: 'gas-harvesting-expert',
    name: 'Gas Harvesting Expert System',
    activity: 'Gas Huffing Avanzado (Wormholes & Null-Sec)',
    duration: '7 días',
    plexEstimate: '~45 – 60 PLEX equiv. (NES / Eventos)',
    iskEstimate: '~230M – 310M ISK (ref. PLEX) · ~10M – 35M ISK en Jita en promociones',
    roiNote:
      'Una sola nube de Fullerite C320/C540 o Cytoserocin rinde 40M–75M ISK/h; en una tarde cubres sobradamente la inversión.',
    skillsGranted: ['Gas Cloud Harvesting V', 'Mining Frigate IV', 'Navigation & Capacitor básicos'],
    shipsUnlocked: ['Venture (máx. ciclo)', 'Procurer / Retriever / Covetor (hasta 5 scoops)'],
  },
  {
    id: 'simple-mining-expert',
    name: 'Simple Asteroid Mining Expert System',
    activity: 'Arranque Rápido en Fragata / Destructor Minero',
    duration: '4 – 7 días',
    plexEstimate: '~25 – 40 PLEX equiv. (Starter / NES)',
    iskEstimate: '~130M – 210M ISK (ref. PLEX) · ~6.5M – 15M ISK en mercado de Jita',
    roiNote:
      'Útil solo para cuentas recién creadas que no quieren esperar 3 días entrenando Mining IV y Mining Upgrades IV; no desbloquea barcazas.',
    skillsGranted: ['Mining IV', 'Mining Frigate IV', 'Mining Upgrades IV', 'Drones III'],
    shipsUnlocked: ['Venture', 'Venture Consortium Issue', 'Pioneer'],
  },
];

export const ACTIVITY_COMPARISON_MATRIX: ActivityMatrixItem[] = [
  {
    id: 'act-asteroids',
    activity: 'Minería de Asteroides & Anomalías (Null / High)',
    iskPerHour: '5M – 110M+ ISK/h',
    alphaStatus: 'Venture o Pioneer con láseres Meta/Miner II (5M–18M ISK/h).',
    expertStatus: 'Procurer, Retriever o Covetor con Strip Miner I (25M–45M ISK/h).',
    omegaStatus: 'Exhumers T2 (Hulk/Skiff/Mackinaw) + Cristales T2 + Boosts (55M–110M+ ISK/h).',
    recommendedTier: 'alpha-expert',
  },
  {
    id: 'act-moon',
    activity: 'Moon Mining (Lunas R4 a R64)',
    iskPerHour: '20M – 90M ISK/h',
    alphaStatus: 'Venture con Miner II (acceso básico, baja capacidad por viaje).',
    expertStatus: 'Barcaza T1 con Strip Miner I: 0% residuo (waste), ideal en lunas R32/R64.',
    omegaStatus: 'Exhumers T2 con cristales Tipo A o módulos ORE (máximo rendimiento sin desperdicio).',
    recommendedTier: 'alpha-expert',
  },
  {
    id: 'act-gas',
    activity: 'Gas Huffing (Wormholes & Null-Sec)',
    iskPerHour: '20M – 100M+ ISK/h',
    alphaStatus: 'Venture con 2x Gas Cloud Scoop I/II (tope Gas Harvesting II, 20M–50M ISK/h).',
    expertStatus: 'Gas Harvesting V desbloqueado: máximo ciclo y acceso en barcazas (35M–75M ISK/h).',
    omegaStatus: 'Prospect con Covert Ops Cloak II o Covetor con 5x Scoops en flota (50M–100M+ ISK/h).',
    recommendedTier: 'alpha-omega',
  },
  {
    id: 'act-ice',
    activity: 'Cosecha de Hielo (Isótopos & Liquid Ozone)',
    iskPerHour: '20M – 80M+ ISK/h',
    alphaStatus: 'Bloqueado: ninguna nave Alpha pura equipa Ice Harvesters.',
    expertStatus: 'Desbloqueado con Mining Barge Operations: Retriever/Procurer + Ice Harvester I (20M–35M ISK/h).',
    omegaStatus: 'Endurance camuflada y Mackinaw/Hulk con Ice Harvester II (45M–80M+ ISK/h).',
    recommendedTier: 'alpha-expert',
  },
  {
    id: 'act-mercoxit',
    activity: 'Minería Profunda de Mercoxit (Morphite)',
    iskPerHour: '70M – 130M+ ISK/h',
    alphaStatus: 'Bloqueado (Deep Core Mining no disponible en Alpha).',
    expertStatus: 'Bloqueado (no existe Expert System para Deep Core Mining).',
    omegaStatus: 'Exclusivo Omega: Deep Core Mining V + Modulated Deep Core Strip Miner II.',
    recommendedTier: 'omega',
  },
  {
    id: 'act-fleet',
    activity: 'Mando de Flota, Boosts & Compresión',
    iskPerHour: 'Soporte / Multiplicador',
    alphaStatus: 'Solo logística pasiva con carguero Miasmos (hasta 63,000 m³).',
    expertStatus: 'Miasmos + Barcaza Covetor recibiendo compresión y Command Bursts de flota.',
    omegaStatus: 'Porpoise, Orca y Rorqual: Command Bursts, compresión en campo y módulo PANIC.',
    recommendedTier: 'omega',
  },
];

export const MINING_SHORTCUTS: ShortcutItem[] = [
  {
    keys: 'F1 – F3',
    action: 'Activar / Cortar láseres (Short-Cycling)',
    category: 'Minería & Módulos',
    tip: 'Apaga el láser manualmente en cuanto el Survey Scanner indique que la roca se agotó para cobrar el mineral proporcional sin esperar el fin del ciclo.',
  },
  {
    keys: 'V',
    action: 'Lanzar Directional Scanner (D-Scan)',
    category: 'Supervivencia & Navegación',
    tip: 'Pulsa V cada 5–10 segundos en Wormholes o Null-Sec para detectar sondas de escaneo o naves hostiles antes de que caigan en tu grid.',
  },
  {
    keys: 'Shift + R',
    action: 'Recoger todos los drones a la bahía',
    category: 'Drones',
    tip: 'Úsalo en el instante en que entre un neutral en Local: no hagas warp dejando tus drones atrás si quieres evitar perderlos.',
  },
  {
    keys: 'F',
    action: 'Drones atacar / asistir al objetivo',
    category: 'Drones',
    tip: 'Fija las ratas NPC del cinturón con Ctrl + Click y pulsa F para que tus Hobgoblin/Hammerhead limpien la amenaza mientras sigues minando.',
  },
  {
    keys: 'Ctrl + Espacio',
    action: 'Detener la nave por completo',
    category: 'Supervivencia & Navegación',
    tip: 'Indispensable nada más entrar en rango de una nube de gas o asteroide para no salirte de alcance por inercia.',
  },
  {
    keys: 'Ctrl + B',
    action: 'Guardar Bookmark táctico rápido',
    category: 'Supervivencia & Navegación',
    tip: 'Pulsa Ctrl + B en mitad de un warp para crear un Safe Spot o guarda perches a 150–250 km por encima de las anomalías.',
  },
  {
    keys: 'Ctrl + Click',
    action: 'Fijar objetivo (Lock Target)',
    category: 'Minería & Módulos',
    tip: 'Selecciona varias rocas desde el Overview con Ctrl + Click para tener siempre el siguiente asteroide pre-fijado.',
  },
  {
    keys: 'Q / A / W + Click',
    action: 'Aproximarse (Q) · Alinear (A) · Orbitar (W)',
    category: 'Supervivencia & Navegación',
    tip: 'Mantén A + Click hacia una estación o ciudadela aliada al minar en Null-Sec para salir en warp en menos de 2 segundos.',
  },
  {
    keys: 'Alt + F',
    action: 'Abrir ventana de Equipamiento (Fitting)',
    category: 'Gestión & Fitting',
    tip: 'Acceso directo para importar los fittings EFT de esta guía desde el portapapeles.',
  },
  {
    keys: 'Alt + C',
    action: 'Abrir Inventario y Bodega de Mineral',
    category: 'Gestión & Fitting',
    tip: 'Revisa rápidamente la capacidad libre de tu Mining Hold y selecciona todo para comprimir junto a una Porpoise u Orca.',
  },
];
