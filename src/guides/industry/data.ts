import {
  IndustryChainTabItem,
  IndustryStarterProductItem,
  SkillItem,
} from '../../types';

export interface ExternalResourceLink {
  label: string;
  url: string;
  note?: string;
}

export interface IndustryBaseConceptItem {
  term: string;
  detail: string;
}

export const INDUSTRY_LIBRARY_INTRO =
  'Este foro agrupa guías para fabricación, blueprints, investigación, invention T2, reacciones, PI, reprocesado, logística, costes y herramientas industriales.';

export const INDUSTRY_LIBRARY_LINKS: {
  oficialBase: ExternalResourceLink[];
  guiasPrincipales: ExternalResourceLink[];
  herramientas: ExternalResourceLink[];
} = {
  oficialBase: [
    {
      label: 'EVE Academy Industrialist',
      url: 'https://www.eveonline.com/eve-academy/careers/industrialist',
    },
    {
      label: 'Soporte EVE, pedidos de compra y venta',
      url: 'https://support.eveonline.com/hc/es/articles/203218932-Pedidos-de-compra-y-venta',
    },
  ],
  guiasPrincipales: [
    { label: 'EVE University Industry', url: 'https://wiki.eveuniversity.org/Industry' },
    { label: 'Manufacturing', url: 'https://wiki.eveuniversity.org/Manufacturing' },
    { label: 'Blueprints', url: 'https://wiki.eveuniversity.org/Blueprints' },
    { label: 'Research', url: 'https://wiki.eveuniversity.org/Research' },
    { label: 'Invention', url: 'https://wiki.eveuniversity.org/Invention' },
    { label: 'Reactions', url: 'https://wiki.eveuniversity.org/Reactions' },
    { label: 'Planetary Industry', url: 'https://wiki.eveuniversity.org/Planetary_Industry' },
    { label: 'Reprocessing', url: 'https://wiki.eveuniversity.org/Reprocessing' },
  ],
  herramientas: [
    { label: 'Ravworks', url: 'https://ravworks.com/' },
    { label: 'EVE Cookbook', url: 'https://evecookbook.com/' },
    { label: 'Fuzzwork Blueprint Calculator', url: 'https://www.fuzzwork.co.uk/blueprint/' },
    { label: 'Adam4EVE', url: 'https://www.adam4eve.eu/' },
    { label: 'EVE Ref', url: 'https://everef.net/' },
    { label: 'Janice', url: 'https://janice.e-351.com/' },
    { label: 'EVE Tycoon', url: 'https://evetycoon.com/' },
  ],
};

export const INDUSTRY_BASE_CONCEPTS: IndustryBaseConceptItem[] = [
  {
    term: 'Job',
    detail: 'Trabajo de fabricación, copia, research, invention o reacción.',
  },
  {
    term: 'Facility tax',
    detail: 'Impuesto de la estructura donde produces.',
  },
  {
    term: 'System cost index',
    detail: 'Coste del sistema; sube si mucha gente produce allí.',
  },
  {
    term: 'Material Efficiency / ME',
    detail: 'Reduce materiales necesarios.',
  },
  {
    term: 'Time Efficiency / TE',
    detail: 'Reduce tiempo de fabricación.',
  },
  {
    term: 'Slot / capacidad',
    detail: 'Límite práctico de trabajos activos por personaje/cuenta.',
  },
];

export const BLUEPRINT_CHECK_ITEMS: string[] = [
  'ME: materiales, suele ser lo primero que duele en el margen.',
  'TE: tiempo; importa más cuando produces volumen o usas estructuras caras.',
  'Runs: usos disponibles en una copia.',
  'Skills requeridas y materiales especiales.',
  'Si el blueprint merece investigación o sale mejor comprar copias.',
];

export const RESEARCH_PRIORITIES: { label: string; detail: string }[] = [
  { label: 'ME', detail: 'Primero si el ítem consume materiales caros.' },
  { label: 'TE', detail: 'Si produces mucho volumen o los jobs son largos.' },
  { label: 'Copying', detail: 'Para invention, contratos internos o producción distribuida.' },
  {
    label: 'Capital líquido',
    detail: 'No inmovilizar todo el capital en BPOs si aún no sabes vender el producto.',
  },
];

export const BLUEPRINT_READING_LINKS: ExternalResourceLink[] = [
  { label: 'Blueprints (EVE University)', url: 'https://wiki.eveuniversity.org/Blueprints' },
  { label: 'Research (EVE University)', url: 'https://wiki.eveuniversity.org/Research' },
];

export const T1_STARTER_IDEAS: string[] = [
  'Munición y drones con volumen de mercado.',
  'Módulos baratos de rotación alta.',
  'Rigs o componentes si el margen acompaña.',
  'Cosas que la alianza consuma internamente.',
];

export const T1_PRE_PRODUCTION_CHECKLIST: string[] = [
  'Mira volumen diario, no solo precio.',
  'Calcula con buy price y sell price realistas.',
  'Incluye taxes, broker fees, hauling y estructura.',
  'Prueba lotes pequeños antes de llenar hangares.',
];

export const T1_TOOL_LINKS: ExternalResourceLink[] = [
  { label: 'Ravworks', url: 'https://ravworks.com/' },
  { label: 'Fuzzwork Blueprint Calculator', url: 'https://www.fuzzwork.co.uk/blueprint/' },
  { label: 'EVE Tycoon', url: 'https://evetycoon.com/' },
];

export const INVENTION_SYSTEM_PIECES: string[] = [
  'BPC T1 base.',
  'Datacores adecuados.',
  'Skills de ciencia correspondientes.',
  'Decryptors si quieres modificar runs, ME, TE o probabilidad.',
  'Componentes T2 y materiales de moon goo/reactions.',
];

export const INVENTION_READING_LINKS: ExternalResourceLink[] = [
  { label: 'Invention (EVE University)', url: 'https://wiki.eveuniversity.org/Invention' },
  { label: 'Tech 2 Production (EVE University)', url: 'https://wiki.eveuniversity.org/Tech_2_Production' },
];

export const REACTION_TYPES: { name: string; detail: string }[] = [
  { name: 'Composite reactions', detail: 'Para cadenas T2.' },
  { name: 'Biochemical reactions', detail: 'Para drogas/boosters.' },
  { name: 'Hybrid reactions', detail: 'Para producción T3.' },
];

export const REACTION_WARNINGS: string[] = [
  'Estructuras y rigs necesarios.',
  'Materiales que ocupan mucho y se mueven lentamente.',
  'Cambios de precio entre input y output.',
  'Jobs largos que bloquean capital.',
];

export const REACTION_READING_LINKS: ExternalResourceLink[] = [
  { label: 'Reactions (EVE University)', url: 'https://wiki.eveuniversity.org/Reactions' },
  { label: 'Moon mining (EVE University)', url: 'https://wiki.eveuniversity.org/Moon_mining' },
];

export const LOGISTICS_KEY_POINTS: string[] = [
  'Las skills y la estructura cambian el rendimiento del reprocesado.',
  'Comprimir ayuda muchísimo al transporte.',
  'Comprar materiales puede ser mejor que minarlo todo.',
  'El hauling y el collateral también son costes.',
  'Separar stock personal, stock corp y material vendido evita líos.',
];

export const LOGISTICS_READING_LINKS: ExternalResourceLink[] = [
  { label: 'Reprocessing (EVE University)', url: 'https://wiki.eveuniversity.org/Reprocessing' },
  { label: 'Hauling (EVE University)', url: 'https://wiki.eveuniversity.org/Hauling' },
  { label: 'Fuzzwork ore', url: 'https://www.fuzzwork.co.uk/ore/' },
];

export const ALLIANCE_PILLARS: { title: string; detail: string }[] = [
  { title: 'Buyback', detail: 'De ore, gas, salvage, y loot.' },
  { title: 'Contratos internos', detail: 'Para el suministro de materiales.' },
  {
    title: 'Productos prioritarios',
    detail: 'Munición, drones, rigs y módulos de doctrina.',
  },
  {
    title: 'Precios pactados',
    detail: 'Para evitar discusiones interminables. x% Jita Buy según web janice.',
  },
];

export const INDUSTRY_TOOL_CATEGORIES: {
  category: string;
  links: ExternalResourceLink[];
}[] = [
  {
    category: 'Planificación y cálculo',
    links: [
      { label: 'Ravworks', url: 'https://ravworks.com/' },
      { label: 'EVE Cookbook', url: 'https://evecookbook.com/' },
      { label: 'Fuzzwork Blueprint Calculator', url: 'https://www.fuzzwork.co.uk/blueprint/' },
      { label: 'Adam4EVE', url: 'https://www.adam4eve.eu/' },
    ],
  },
  {
    category: 'Precio, mercado y valoración',
    links: [
      { label: 'Janice', url: 'https://janice.e-351.com/' },
      { label: 'EVE Tycoon', url: 'https://evetycoon.com/' },
      { label: 'EVE Market Browser', url: 'https://evemarketbrowser.com/' },
      { label: 'Fuzzwork Market', url: 'https://market.fuzzwork.co.uk/' },
    ],
  },
  {
    category: 'Referencia de ítems/materiales',
    links: [
      { label: 'EVE Ref', url: 'https://everef.net/' },
      { label: 'EVE University Industry', url: 'https://wiki.eveuniversity.org/Industry' },
    ],
  },
];

export interface BlueprintConceptRow {
  type: 'BPO (Blueprint Original)' | 'BPC (Blueprint Copy)';
  code: 'BPO' | 'BPC';
  runs: string;
  acquisition: string;
  usage: string;
  t2Rule: string;
}

export const BLUEPRINT_COMPARISON: BlueprintConceptRow[] = [
  {
    type: 'BPO (Blueprint Original)',
    code: 'BPO',
    runs: 'Infinitas (∞)',
    acquisition: 'Corporaciones NPC (órdenes masivas en mercado regional) o contratos.',
    usage: 'Investigación de eficiencia (ME/TE) y generación de copias (BPCs) o fabricación directa T1.',
    t2Rule: 'No existen BPOs Tech II en venta NPC ni se pueden generar de nuevo.',
  },
  {
    type: 'BPC (Blueprint Copy)',
    code: 'BPC',
    runs: 'Limitadas (carreras fijas)',
    acquisition: 'Copiado en laboratorio desde un BPO T1, contratos o resultado de Invención T2.',
    usage: 'Fabricación directa sin arriesgar el BPO original e insumo obligatorio para iniciar trabajos de Invención T2.',
    t2Rule: 'Toda la producción Tech II moderna procede exclusivamente de BPCs generadas por invención.',
  },
];

export interface EfficiencyParameterRow {
  parameter: string;
  code: 'ME' | 'TE';
  maxLevel: string;
  stepBonus: string;
  impact: string;
}

export const EFFICIENCY_PARAMETERS: EfficiencyParameterRow[] = [
  {
    parameter: 'ME (Material Efficiency)',
    code: 'ME',
    maxLevel: '10% (Nivel 10)',
    stepBonus: '-1% consumo de materiales por nivel',
    impact: 'Reduce el consumo de materiales por cada unidad o lote fabricado.',
  },
  {
    parameter: 'TE (Time Efficiency)',
    code: 'TE',
    maxLevel: '20% (Nivel 10)',
    stepBonus: '-2% tiempo de fabricación por nivel',
    impact: 'Reduce el tiempo total necesario para completar la fabricación.',
  },
];

export interface UpwellComplexItem {
  name: 'Raitaru' | 'Azbel' | 'Sotiyo';
  typeId: number;
  size: 'Medium (M)' | 'Large (L)' | 'Extra Large (XL)';
  roleBonus: string;
  rigNote: string;
}

export const UPWELL_ENGINEERING_COMPLEXES: UpwellComplexItem[] = [
  {
    name: 'Raitaru',
    typeId: 35825,
    size: 'Medium (M)',
    roleBonus: '-1% consumo de materiales · -15% tiempo de fabricación y ciencia · -3% coste de instalación (SCI)',
    rigNote: 'Estándar de entrada para corporaciones: ideal para investigación ME/TE, copiado, invención y fabricación subcapital.',
  },
  {
    name: 'Azbel',
    typeId: 35826,
    size: 'Large (L)',
    roleBonus: '-1% consumo de materiales · -20% tiempo de fabricación y ciencia · -4% coste de instalación (SCI)',
    rigNote: 'Admite rigs L de manufactura especializada y construcción de cargueros/capitales estándar en Low/Null-Sec.',
  },
  {
    name: 'Sotiyo',
    typeId: 35827,
    size: 'Extra Large (XL)',
    roleBonus: '-1% consumo de materiales · -30% tiempo de fabricación y ciencia · -5% coste de instalación (SCI)',
    rigNote: 'Complejo industrial pesado de alianza para producción masiva T2 y astillero de Supercapitales / Titanes.',
  },
];

export interface DecryptorReferenceItem {
  name: string;
  probabilityMod: string;
  runsMod: string;
  meMod: string;
  teMod: string;
  useCase: string;
}

export const DECRYPTORS_REFERENCE: DecryptorReferenceItem[] = [
  {
    name: 'Sin Decryptor (Base)',
    probabilityMod: '0%',
    runsMod: '+0',
    meMod: '2% (base BPC T2)',
    teMod: '4% (base BPC T2)',
    useCase: 'Munición T2 y módulos baratos donde el coste del decryptor supera el ahorro de materiales.',
  },
  {
    name: 'Accelerant Decryptor',
    probabilityMod: '+20%',
    runsMod: '+1',
    meMod: '+2% (Total ME 4%)',
    teMod: '+10% (Total TE 14%)',
    useCase: 'Equilibrio general para módulos T2 de rotación media con buena probabilidad de éxito.',
  },
  {
    name: 'Attainment Decryptor',
    probabilityMod: '+80%',
    runsMod: '+4',
    meMod: '-1% (Total ME 1%)',
    teMod: '+4% (Total TE 8%)',
    useCase: 'Maximizar tiradas exitosas cuando los Datacores son caros o tienes skills de ciencia bajas.',
  },
  {
    name: 'Augmentation Decryptor',
    probabilityMod: '-40%',
    runsMod: '+9',
    meMod: '-2% (Total ME 0%)',
    teMod: '+2% (Total TE 6%)',
    useCase: 'Consumibles, rigs o lotes largos donde priorizas sacar el máximo número de runs por copia.',
  },
  {
    name: 'Parity Decryptor',
    probabilityMod: '+50%',
    runsMod: '+3',
    meMod: '+1% (Total ME 3%)',
    teMod: '-2% (Total TE 2%)',
    useCase: 'Excelente para cascos T2 (Interceptors, Assault Frigates) combinando más runs, ME 3% y alta probabilidad.',
  },
  {
    name: 'Symmetry Decryptor',
    probabilityMod: '0%',
    runsMod: '+2',
    meMod: '+1% (Total ME 3%)',
    teMod: '+8% (Total TE 12%)',
    useCase: 'Alternativa económica para subir ME y runs en módulos sin penalizar la probabilidad base.',
  },
];

export const STARTER_PRODUCTS: IndustryStarterProductItem[] = [
  {
    id: 'starter-drones',
    category: 'Drones T1',
    items: [
      { name: 'Hobgoblin I', typeId: 2454 },
      { name: 'Hammerhead I', typeId: 2183 },
      { name: 'Acolyte I', typeId: 2203 },
    ],
    clone: 'alpha-omega',
    rotationNote:
      'Se destruyen o abandonan a diario en PvE, flotas mineras y PvP. Demanda constante en todos los hubs regionales.',
    upgradePath:
      'Los BPCs de estos mismos planos sirven directamente para lanzar Invención a Hobgoblin II, Hammerhead II y Acolyte II.',
  },
  {
    id: 'starter-ammo',
    category: 'Munición y Misiles T1',
    items: [
      { name: 'Scourge Heavy Assault Missile', typeId: 2629 },
      { name: 'Scourge Heavy Missile', typeId: 209 },
      { name: 'Scourge Light Missile', typeId: 213 },
    ],
    clone: 'alpha-omega',
    rotationNote:
      'Volumen de venta masivo para ratting y misiones. Coste de BPO muy bajo y ciclos de investigación rápidos.',
    upgradePath:
      'Base para consumo propio o para inventar munición T2 de alta demanda (Scourge Rage / Javelin Heavy Assault Missiles).',
  },
  {
    id: 'starter-modules',
    category: 'Módulos Frecuentes',
    items: [
      { name: '1MN Afterburner I', typeId: 434 },
      { name: '10MN Afterburner I', typeId: 12058 },
      { name: 'Medium Armor Repairer I', typeId: 3530 },
      { name: 'Large Shield Extender I', typeId: 3841 },
    ],
    clone: 'alpha-omega',
    rotationNote:
      'Equipamiento básico en pérdidas de fragatas, destructores y cruceros. Fáciles de colocar en hubs secundarios y fronteras de Low-Sec.',
    upgradePath:
      'Permite escalar a fabricación de variantes Tech II una vez entrenes las disciplinas científicas correspondientes.',
  },
  {
    id: 'starter-hulls',
    category: 'Cascos Ligeros T1',
    items: [
      { name: 'Tristan', typeId: 593 },
      { name: 'Catalyst', typeId: 16240 },
      { name: 'Venture', typeId: 32880 },
    ],
    clone: 'alpha-omega',
    rotationNote:
      'Altísima destrucción diaria (ganks, facciones, minería de gas en wormholes). Mejor margen si vendes directamente en estaciones de frontera o staging.',
    upgradePath:
      'Enseña a gestionar logística de m³ de minerales (Tritanium, Pyerite, Mexallon, Isogen) antes de pasar a cruceros.',
  },
];

export const ADVANCED_CHAINS_PREVIEW: IndustryChainTabItem[] = [
  {
    id: 'ham-t2',
    label: 'Munición HAM T2',
    clone: 'omega',
    title: 'Cadena de Munición Heavy Assault Missiles T2 (Rage & Javelin)',
    inputs: ['BPC T1 (Scourge/Nova HAM)', 'Datacores: Rocket Science + Mechanical Engineering', 'Morphite + Rocket Fuel + RAM Ammunition Tech'],
    facility: 'Raitaru / Azbel con rigs de munición y laboratorio de invención',
    summary:
      'Una de las cadenas T2 más líquidas de New Eden: bajo volumen m³ para transportar a Jita o stagings de Null-Sec y rotación en horas.',
    steps: [
      'Copia tu BPO T1 de Heavy Assault Missiles en lotes de copias del máximo de runs.',
      'Lanza Invención con Rocket Science y Mechanical Engineering (normalmente sin Decryptor o con Augmentation si el margen acompaña).',
      'Fabrica los lotes de Rage/Javelin HAM usando Morphite, componentes planetarios (PI) como Rocket Fuel y R.A.M.- Ammunition Tech.',
    ],
  },
  {
    id: 'moon-goo',
    label: 'Reacciones Moon Goo',
    clone: 'omega',
    title: 'Reacciones Bioquímicas & Compuestas (Moon Goo R4 – R64)',
    inputs: ['Minerales lunares reprocesados (Silicates, Cobalt, Titanium, Promethium, Technetium...)', 'Fuel Blocks de facción', 'Fórmulas de Reacción (Reaction Formulas)'],
    facility: 'Refinerías Athanor o Tatara en Low-Sec / Null-Sec / Wormhole (prohibidas en High-Sec)',
    summary:
      'El corazón económico de la fabricación Tech II: transforma materias primas de luna en materiales intermedios y compuestos para componentes T2.',
    steps: [
      'Reprocesa la mena lunar extraída en Athanor/Tatara para obtener los elementos puros (R4 a R64).',
      'Ejecuta Reacciones Simples (ej. Carbon Polymers, Ceramic Powder, Crystallite Alloy) combinando 2 elementos lunares + Fuel Blocks.',
      'Pasa los materiales simples a Reacciones Compuestas (ej. Ferrogel, Fullerides, Hypersynaptic Fibers) que alimentan los planos de componentes T2.',
    ],
  },
  {
    id: 'capitals',
    label: 'Construcción de Capitales',
    clone: 'omega',
    title: 'Construcción Pesada de Naves Capitales (Dreadnoughts, Carriers, Rorqual)',
    inputs: ['Capital Construction Parts BPOs (ME 10 / TE 20)', 'Componentes Core Temperature Regulator & Neurolink Protection Cell', 'Isótopos, PI P4, Reacciones de Gas/Luna y Minerales masivos'],
    facility: 'Azbel o Sotiyo en sistemas soberanos con bajo SCI y rigs de componentes/cascos capitales',
    summary:
      'Industria de escala corporativa donde cada punto porcentual de ME ahorra cientos de millones de ISK en componentes intermedios.',
    steps: [
      'Investiga todos los BPOs de componentes capitales a ME 10 / TE 20 (nunca fabriques componentes capitales desde planos sin investigar).',
      'Produce en paralelo los bloques de materiales intermedios: reacciones de gas/luna, componentes avanzados y subsistemas de protección.',
      'Ensambla los componentes capitales en una Sotiyo bonificada y lanza el casco final vigilando el System Cost Index del sistema.',
    ],
  },
];

export const INDUSTRY_SKILLS_BIBLE: SkillItem[] = [
  // Producción e Industria Base
  {
    name: 'Industry',
    category: 'Producción e Industria Base',
    alphaCap: 'Nivel V',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: '+4% de velocidad de fabricación por nivel (-20% tiempo total al V). Requisito base de toda la rama industrial.',
    priority: 'Crítica',
  },
  {
    name: 'Mass Production',
    category: 'Producción e Industria Base',
    alphaCap: 'Nivel III (4 líneas máx. en Alpha)',
    omegaCap: 'Nivel V (6 líneas base)',
    clone: 'alpha-omega',
    effect: '+1 trabajo de fabricación simultáneo por nivel. Permite producir varios lotes en paralelo.',
    priority: 'Crítica',
  },
  {
    name: 'Advanced Industry',
    category: 'Producción e Industria Base',
    alphaCap: 'Nivel III',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: '-3% tiempo de todos los trabajos de fabricación e investigación por nivel. Al V es requisito obligatorio para producción T2 y capital.',
    priority: 'Crítica',
  },
  {
    name: 'Advanced Mass Production',
    category: 'Producción e Industria Base',
    alphaCap: 'Bloqueada (0)',
    omegaCap: 'Nivel V (+5 líneas extra)',
    clone: 'omega',
    effect: 'Añade hasta 5 líneas de fabricación adicionales sobre Mass Production V (hasta 11 slots de manufactura por personaje).',
    priority: 'Alta',
  },
  // Ciencia e Invención
  {
    name: 'Research & Metallurgy',
    category: 'Ciencia e Invención',
    alphaCap: 'Nivel III',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: 'Research acelera un +5%/nivel la investigación de TE (Time Efficiency); Metallurgy acelera un +5%/nivel la investigación de ME (Material Efficiency).',
    priority: 'Alta',
  },
  {
    name: 'Laboratory Operation & Advanced Lab Operation',
    category: 'Ciencia e Invención',
    alphaCap: 'Nivel III (Lab Operation)',
    omegaCap: 'Nivel V / V (hasta 11 slots)',
    clone: 'alpha-omega',
    effect: '+1 trabajo de laboratorio en paralelo por nivel (copiado, ME/TE e invención). Advanced Laboratory Operation es exclusiva de Omega.',
    priority: 'Crítica',
  },
  {
    name: 'Encryption Methods (Caldari, Gallente, Amarr, Minmatar)',
    category: 'Ciencia e Invención',
    alphaCap: 'Bloqueada (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Incrementa la probabilidad de éxito base en cada intento de Invención Tech II según la facción del plano.',
    priority: 'Alta',
  },
  {
    name: 'Disciplinas Científicas (Mechanical, Electronic, Rocket Science...)',
    category: 'Ciencia e Invención',
    alphaCap: 'Bloqueadas (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Requisito para usar los Datacores de cada rama en Invención T2, incrementa la probabilidad de éxito y desbloquea la fabricación del BPC T2 resultante.',
    priority: 'Alta',
  },
  {
    name: 'Reactions & Mass Reactions',
    category: 'Ciencia e Invención',
    alphaCap: 'Bloqueadas (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: '-4% tiempo de reacciones bioquímicas y de Moon Goo por nivel, y +1 slot de reacción simultáneo por nivel en Athanor/Tatara.',
    priority: 'Especializada',
  },
  // Comercio y Finanzas
  {
    name: 'Accounting',
    category: 'Comercio y Finanzas',
    alphaCap: 'Nivel III',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: 'Reduce el Sales Tax (Impuesto de Venta, base 5,02%) un 11% relativo por nivel (bajando hasta ~2,26% al nivel V).',
    priority: 'Crítica',
  },
  {
    name: 'Broker Relations',
    category: 'Comercio y Finanzas',
    alphaCap: 'Nivel II',
    omegaCap: 'Nivel V',
    clone: 'alpha-omega',
    effect: 'Reduce un 0,3% absoluto por nivel la comisión de corredor (Broker’s Fee) en estaciones NPC, complementado por tu standing con la corporación.',
    priority: 'Crítica',
  },
  {
    name: 'Advanced Broker Relations',
    category: 'Comercio y Finanzas',
    alphaCap: 'Bloqueada (0)',
    omegaCap: 'Nivel V',
    clone: 'omega',
    effect: 'Reduce la penalización al modificar el precio de órdenes de compra o venta ya publicadas en el mercado (Relist Fee).',
    priority: 'Especializada',
  },
  {
    name: 'Trade / Retail / Wholesale / Tycoon',
    category: 'Comercio y Finanzas',
    alphaCap: 'Trade IV / Retail II (17 órdenes máx.)',
    omegaCap: 'Nivel V (hasta 305 órdenes)',
    clone: 'alpha-omega',
    effect: 'Aumentan la cantidad máxima de órdenes de compra y venta activas simultáneamente en el mercado regional.',
    priority: 'Alta',
  },
];
