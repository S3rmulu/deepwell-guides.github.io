import {
  ActivityMatrixItem,
  ExpertSystemItem,
  ShortcutItem,
} from '../../../types';

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
