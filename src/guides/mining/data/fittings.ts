import { FittingItem } from '../../../types';
import { SHIP_TYPE_IDS } from './ships';

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
    title: 'Procurer Tanque Null-Sec T2 (Barcaza Omega)',
    ship: 'Procurer',
    typeId: SHIP_TYPE_IDS.Procurer,
    clone: 'omega',
    cloneLabel: 'SOLO OMEGA',
    environment: 'Null-Sec Soberanía / Lunas',
    estimatedCost: '~48M ISK',
    notes:
      'Capaz de tanquear ratas de acorazado de Null-Sec mientras sus 5 Hobgoblin II limpian el cinturón. Equipa módulos Tech II (Modulated Strip Miner II y MLU II): si juegas con Alpha + Expert System, usa el fitting "Procurer T1 Lista para Expert System" de abajo.',
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
    cloneLabel: 'ALPHA + EXPERT',
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
