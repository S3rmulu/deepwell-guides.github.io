import {
  MiningCrystalGroupItem,
  MiningCrystalTypeInfo,
  ShipClass,
  ShipMiniGuideId,
  ShipMiniGuideMeta,
} from '../../../types';

export const MINING_CRYSTAL_TYPES: MiningCrystalTypeInfo[] = [
  {
    id: 'type-a',
    name: 'Tipo A (I & II)',
    badge: 'Bajo Residuo · Lunas & Mercoxit',
    yieldProfile: 'Alto rendimiento por m³ de asteroide; conserva el volumen total de la roca.',
    wasteProfile: 'T1: 0% residuo · T2: residuo moderado/bajo (multiplicador 1x).',
    bestFor: 'Lunas corporativas (R16, R32, R64), Mercoxit y anomalías de valor limitado.',
    warning: 'Imprescindible en lunas privadas de alianza para no destruir patrimonio ajeno.',
  },
  {
    id: 'type-b',
    name: 'Tipo B (I & II)',
    badge: 'Máxima Velocidad · Anomalías',
    yieldProfile: 'Ciclo más rápido: máximo m³/s e ISK/hora por láser.',
    wasteProfile: 'Residuo alto (~64% probabilidad de destruir volumen adicional del asteroide).',
    bestFor: 'Anomalías soberanas públicas, cinturones normales o rocas donde sobra volumen.',
    warning: 'Evítalo en lunas R32/R64 o Mercoxit: muchas corporaciones prohíben Tipo B en lunas.',
  },
  {
    id: 'type-c',
    name: 'Tipo C (I & II)',
    badge: 'Destrucción de Roca · Ofensivo',
    yieldProfile: 'Extracción mínima hacia tu bodega; diseñado para vaciar asteroides rápido.',
    wasteProfile: 'Residuo extremo (~84% probabilidad con multiplicador masivo de destrucción).',
    bestFor: 'Minería ofensiva en lunas enemigas o limpiar rocas basura para forzar respawn.',
    warning: 'No lo uses para farmear ISK: destruye casi todo el mineral en lugar de recogerlo.',
  },
];

export const MINING_CRYSTAL_GROUPS: MiningCrystalGroupItem[] = [
  {
    group: 'Simple Ore',
    ores: 'Veldspar, Scordite, Pyroxeres, Plagioclase',
    skill: 'Simple Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo B',
    note: 'Minerales base (Tritanium / Pyerite). Prioriza velocidad con Tipo B en cinturones.',
  },
  {
    group: 'Coherent Ore',
    ores: 'Hemorphite, Hedbergite, Jaspet, Kernite, Omber',
    skill: 'Coherent Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A / B',
    note: 'Isogen y Nocxium de Low-Sec y anomalías. Usa Tipo A si el volumen es escaso.',
  },
  {
    group: 'Variegated Ore',
    ores: 'Crokite, Dark Ochre, Gneiss',
    skill: 'Variegated Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo B',
    note: 'Muy abundantes en anomalías de Null-Sec; Tipo B maximiza ISK/h.',
  },
  {
    group: 'Complex Ore',
    ores: 'Arkonor, Bistot, Spodumain',
    skill: 'Complex Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A / B',
    note: 'Fuente principal de Megacyte y Zydrine en Null-Sec. Tipo A si el sitio es pequeño.',
  },
  {
    group: 'Abyssal Ore',
    ores: 'Bezdnacine, Rakovene, Talassonite',
    skill: 'Abyssal Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A',
    note: 'Exclusivo de espacio Triglavian (Pochven). Roca muy valiosa: minimiza residuo.',
  },
  {
    group: 'Mercoxit',
    ores: 'Mercoxit (única fuente de Morphite)',
    skill: 'Mercoxit Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A',
    note: 'Requiere Modulated Deep Core Strip Miner II + Deep Core Mining (V recomendado).',
  },
  {
    group: 'Ubiquitous Moon (R4)',
    ores: 'Bitumens, Coesite, Sylvite, Zeolites',
    skill: 'Ubiquitous Moon Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo B',
    note: 'Lunas comunes de High-Sec y Null-Sec; suele permitirse Tipo B por alto volumen.',
  },
  {
    group: 'Common Moon (R8)',
    ores: 'Cobaltite, Euxenite, Scheelite, Titanite',
    skill: 'Common Moon Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A / B',
    note: 'Consulta la política de tu corporación antes de cargar Tipo B.',
  },
  {
    group: 'Uncommon Moon (R16)',
    ores: 'Chromite, Otavite, Sperrylite, Vanadinite',
    skill: 'Uncommon Moon Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A',
    note: 'Buen valor en reacciones T2; usa Tipo A para no desperdiciar la extracción.',
  },
  {
    group: 'Rare Moon (R32)',
    ores: 'Carnotite, Cinnabar, Pollucite, Zircon',
    skill: 'Rare Moon Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A',
    note: 'Alto valor estratégico. Tipo A obligatorio en casi todas las alianzas.',
  },
  {
    group: 'Exceptional Moon (R64)',
    ores: 'Loparite, Monazite, Xenotime, Ytterbite',
    skill: 'Exceptional Moon Ore Processing',
    t1Req: 'Nivel III',
    t2Req: 'Nivel IV',
    recommendedType: 'Tipo A',
    note: 'Las rocas más rentables de EVE. Tipo A II o módulos ORE Faction (0% residuo).',
  },
];

export const SHIP_MINI_GUIDES: ShipMiniGuideMeta[] = [
  {
    id: 'crystals',
    title: 'Mining Crystals (Tipo A, B y C) para Barges & Exhumers',
    shortLabel: 'Mining Crystals',
    appliesTo: ['Mining Barge', 'Exhumer'],
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    summary:
      'Los cristales de minería disparan el rendimiento de los Modulated Strip Miner II y Modulated Deep Core Strip Miner II. Elegir mal entre Tipo A y Tipo B te hace perder ISK o infringir normas de luna de tu alianza.',
    keyPoints: [
      {
        title: 'Solo funcionan en láseres Modulated Tech II',
        detail:
          'Los Strip Miner I (los que usas con Alpha + Expert System) y los ORE Strip Miner no admiten cristales. Necesitas Modulated Strip Miner II (exclusivo Omega) para cargarlos.',
      },
      {
        title: 'Regla de skills: Nivel III = T1 · Nivel IV = T2',
        detail:
          'Cada grupo de mineral o luna pide Reprocessing IV como base y su skill de Processing al III para cristales T1 o al IV para T2. Subir Processing a V solo mejora el reprocesado en estación, no desbloquea nuevos cristales.',
      },
      {
        title: 'Lleva siempre cristales de repuesto en bodega',
        detail:
          'Los cristales sufren daño por volatilidad en cada ciclo y acaban rompiéndose (Tipo B se degrada más rápido que Tipo A). Lleva 2–4 juegos extra en tu inventario normal.',
      },
    ],
    skills: [
      {
        name: 'Mining',
        minLevel: 'Nivel IV',
        optimalLevel: 'Nivel V',
        clone: 'alpha-omega',
        role: 'Prerrequisito y +5% rendimiento base por nivel.',
      },
      {
        name: 'Astrogeology',
        minLevel: 'Nivel IV',
        optimalLevel: 'Nivel V',
        clone: 'alpha-expert',
        role: 'Requisito para Barcazas y Exhumers (+5% extracción/lvl; accesible hasta III–IV con Barge Expert System).',
      },
      {
        name: 'Reprocessing',
        minLevel: 'Nivel IV',
        optimalLevel: 'Nivel V',
        clone: 'alpha-omega',
        role: 'Desbloquea todas las skills de Ore & Moon Processing.',
      },
      {
        name: 'Ore / Moon Processing (según grupo)',
        minLevel: 'Nivel III (T1)',
        optimalLevel: 'Nivel IV (T2)',
        clone: 'omega',
        role: 'Habilita los cristales T1 (Lvl III) y T2 (Lvl IV) del grupo de mineral o luna correspondiente.',
      },
      {
        name: 'Deep Core Mining',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel V',
        clone: 'omega',
        role: 'Obligatoria para Modulated Deep Core Strip Miner II y cristales de Mercoxit.',
      },
    ],
    warnings: [
      'Si vuelas Procurer, Retriever o Covetor con Alpha + Expert System, usarás Strip Miner I (0% residuo, sin cristales): no entrenes skills de Processing hasta pasar a Omega.',
    ],
    searchText:
      'mining crystals cristales tipo a tipo b tipo c modulated strip miner ii deep core reprocessing processing lunas r32 r64 bistot arkonor veldspar mercoxit residuo waste barge exhumer',
  },
  {
    id: 'command',
    title: 'Command Bursts, Industrial Core & PANIC (Mando Industrial)',
    shortLabel: 'Command & Compresión',
    appliesTo: ['Industrial Command Ship', 'Capital Industrial Ship'],
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    summary:
      'Operar una Porpoise, Orca o Rorqual multiplica el rendimiento de toda la flota mediante Command Bursts y compresión en campo, pero activar el Industrial Core te inmoviliza durante el ciclo.',
    keyPoints: [
      {
        title: '3 cargas de Mining Foreman Burst',
        detail:
          'Mining Laser Field Enhancement (más alcance), Mining Laser Optimization (ciclo más corto y menos capacitor) y Mining Equipment Preservation (reduce residuo y alarga la vida de los cristales).',
      },
      {
        title: 'Industrial Core e inmovilidad',
        detail:
          'Activar el Industrial Core consume Heavy Water, habilita la compresión en campo y potencia los boosts, pero te impide hacer warp, recibir logística remota (en Rorqual) o moverte hasta acabar el ciclo.',
      },
      {
        title: 'Porpoise vs. Orca vs. Rorqual',
        detail:
          'Porpoise = ciclo corto (2.5 min), ágil y barata para Null-Sec/WH. Orca = gran Ship Bay y tanqueo para High-Sec o sistemas seguros. Rorqual = Jump Drive, drones Excavator y módulo PANIC bajo paraguas capital.',
      },
    ],
    skills: [
      {
        name: 'Mining Foreman',
        minLevel: 'Nivel IV',
        optimalLevel: 'Nivel V',
        clone: 'omega',
        role: 'Base obligatoria para operar Mining Foreman Bursts en flota.',
      },
      {
        name: 'Mining Director',
        minLevel: 'Nivel III',
        optimalLevel: 'Nivel V',
        clone: 'omega',
        role: 'Aumenta la fuerza y duración de las cargas de Command Burst.',
      },
      {
        name: 'Industrial Command Ships',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel IV–V',
        clone: 'omega',
        role: 'Escala fuerza de boosts, drones y capacidad en Porpoise y Orca.',
      },
      {
        name: 'Industrial Reconfiguration',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel IV–V',
        clone: 'omega',
        role: 'Habilita el Industrial Core en Rorqual y mejora la eficiencia de los cores de Porpoise (Compact) y Orca (Large).',
      },
      {
        name: 'Jump Drive Operation & Calibration',
        minLevel: 'Nivel IV',
        optimalLevel: 'Nivel V',
        clone: 'omega',
        role: 'Imprescindible en Rorqual para saltar mediante baliza cyno (Cynosural Field) de forma segura.',
      },
    ],
    warnings: [
      'Corta el auto-repeat del Industrial Core si aparece actividad hostil en Intel: necesitas estar fuera de ciclo para poder alinear y hacer warp.',
      'Nunca lances una Rorqual sin cyno operativo, combustible de salto y paraguas capital aliado confirmado.',
    ],
    searchText:
      'command bursts industrial core panic heavy water compresion porpoise orca rorqual excavator cyno jump drive mining foreman mining director field optimization preservation',
  },
  {
    id: 'stealth',
    title: 'Cloaking, Warp Core & Ninja Ops (Fragatas y Destructores)',
    shortLabel: 'Cloaking & Ninja Ops',
    appliesTo: ['Mining Frigate', 'Mining Destroyer', 'Expedition Frigate'],
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    summary:
      'Las fragatas mineras sobreviven por evasión, firma radar diminuta y velocidad de alineamiento, no por tanqueo bruto. Dominar el bono de Warp Core y el camuflaje Covert Ops define si vuelves con la bodega llena.',
    keyPoints: [
      {
        title: '+2 Warp Core Stability integrado (Venture y Venture Consortium Issue)',
        detail:
          'Permite escapar de un único Warp Disruptor (+1) o Warp Scrambler (+2) sin gastar slots bajos. Ojo: la Prospect pierde este bono a cambio de poder usar Covert Ops Cloak II.',
      },
      {
        title: 'Prospect vs. Endurance (Camuflaje T2)',
        detail:
          'La Prospect hace warp camuflada (Covert Ops Cloak II) y es imbatible para gas en Wormholes peligrosos. La Endurance no warpea invisible, pero puede moverse rápido camuflada y lidera la cosecha táctica de hielo.',
      },
      {
        title: 'Regla del D-Scan y alineamiento en Ninja Huffing',
        detail:
          'Pulsa V cada 5–10 segundos en J-Space (espacio Wormhole sin chat Local), guarda un Safe Spot antes de bajar a la nube y detén la nave (Ctrl + Espacio) dentro de rango.',
      },
    ],
    skills: [
      {
        name: 'Mining Frigate',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel V',
        clone: 'alpha-omega',
        role: 'Sube rendimiento en Venture / Venture Consortium Issue (VCI) y al V desbloquea Prospect y Endurance.',
      },
      {
        name: 'Mining Destroyer',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel IV',
        clone: 'alpha-omega',
        role: 'Habilita y potencia el rendimiento y alcance del Pioneer.',
      },
      {
        name: 'Expedition Frigates',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel IV–V',
        clone: 'omega',
        role: 'Bonifica extracción de gas/mineral en Prospect y ciclo de hielo en Endurance.',
      },
      {
        name: 'Cloaking',
        minLevel: 'Nivel IV',
        optimalLevel: 'Nivel IV',
        clone: 'omega',
        role: 'Requisito exacto para equipar Covert Ops Cloaking Device II en Prospect.',
      },
      {
        name: 'Astrometrics',
        minLevel: 'Nivel III',
        optimalLevel: 'Nivel IV',
        clone: 'alpha-omega',
        role: 'Acelera el escaneo de firmas cósmicas de gas en Wormholes y Null-Sec.',
      },
    ],
    warnings: [
      'Las burbujas de interdicción en Null-Sec anulan el bono de +2 Warp Core Stability: evita saltar directo a 0 km de puertas si hay neutrales en Local.',
    ],
    searchText:
      'cloaking covert ops cloak ii warp core stability ninja huffing venture prospect endurance pioneer astrometrics d-scan wormholes gas hielo',
  },
  {
    id: 'hauling',
    title: 'Transporte Seguro, MWD + Cloak & Anti-Ganking (Haulers)',
    shortLabel: 'Haulers & Logística',
    appliesTo: ['Hauler / Logística'],
    clone: 'alpha-omega',
    cloneLabel: 'ALPHA & OMEGA',
    summary:
      'Mover mineral crudo en una Miasmos o trasladar una flota entera en una Bowhead es el momento de mayor exposición financiera. Un buen protocolo de viaje evita pérdidas evitables en puertas.',
    keyPoints: [
      {
        title: 'Truco MWD + Cloak (Miasmos en Low/Null-Sec)',
        detail:
          'Al salir de una puerta: alinea a destino → activa Improved Cloaking Device II + 50MN Microwarpdrive casi a la vez (en ese orden/mismo tick) → cuando el ciclo del MWD esté al 80–90%, desactiva el cloak y pulsa Warp.',
      },
      {
        title: 'Comprime siempre antes de mover grandes volúmenes',
        detail:
          'Una Miasmos mueve hasta 63,000 m³ de mineral crudo sin comprimir, pero comprimir en estación o junto a una Porpoise reduce el volumen hasta un 99%, eliminando decenas de viajes arriesgados.',
      },
      {
        title: 'Bowhead en High-Sec: regla de valor y webs',
        detail:
          'La Bowhead transporta hasta 1,625,000 m³ de naves ensambladas y equipadas, pero es lenta al alinear. Usa tanqueo de escudo completo, evita sobrepasar un valor atractivo para gankers en sistemas 0.5 y usa un alt con Stasis Webifier para entrar en warp al instante.',
      },
    ],
    skills: [
      {
        name: 'Gallente Industrial',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel IV–V',
        clone: 'alpha-omega',
        role: '+10% capacidad de bodega de mineral en Miasmos por nivel (hasta 63,000 m³).',
      },
      {
        name: 'Evasive Maneuvering',
        minLevel: 'Nivel III',
        optimalLevel: 'Nivel IV–V',
        clone: 'alpha-omega',
        role: 'Reduce el tiempo de alineamiento y entrada en warp en todos los cargueros.',
      },
      {
        name: 'High Speed Maneuvering & Cloaking',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel I–III',
        clone: 'omega',
        role: 'Necesarias para ejecutar el truco MWD + Improved Cloak II en haulers.',
      },
      {
        name: 'Advanced Spaceship Command',
        minLevel: 'Nivel V',
        optimalLevel: 'Nivel V',
        clone: 'omega',
        role: 'Prerrequisito obligatorio para entrenar ORE Freighter y mejorar agilidad.',
      },
      {
        name: 'ORE Freighter',
        minLevel: 'Nivel I',
        optimalLevel: 'Nivel IV–V',
        clone: 'omega',
        role: '+5% Ship Maintenance Bay y agilidad por nivel en la Bowhead.',
      },
    ],
    warnings: [
      'Nunca pongas el piloto automático (Autopilot) con una Bowhead o una Miasmos cargada: te deja a 10 km de cada puerta, blanco fácil para gankers.',
    ],
    searchText:
      'hauler logistica miasmos bowhead mwd cloak truco ganking high-sec freighter ore freighter ship maintenance bay gallente industrial evasive maneuvering webs',
  },
];

export const SHIP_CLASS_TO_MINI_GUIDE: Record<ShipClass, ShipMiniGuideId> = {
  'Mining Frigate': 'stealth',
  'Mining Destroyer': 'stealth',
  'Expedition Frigate': 'stealth',
  'Mining Barge': 'crystals',
  Exhumer: 'crystals',
  'Industrial Command Ship': 'command',
  'Capital Industrial Ship': 'command',
  'Hauler / Logística': 'hauling',
};
