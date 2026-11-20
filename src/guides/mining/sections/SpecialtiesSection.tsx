export type SpecialtyTab = 'ore' | 'gas' | 'ice' | 'mercoxit';

interface SpecialtiesSectionProps {
  specialtyTab: SpecialtyTab;
  onTabChange: (tab: SpecialtyTab) => void;
}

const SPECIALTY_TABS: { id: SpecialtyTab; label: string }[] = [
  { id: 'ore', label: 'Minerales & Lunas' },
  { id: 'gas', label: 'Gas Huffing' },
  { id: 'ice', label: 'Hielo (Expert / Omega)' },
  { id: 'mercoxit', label: 'Mercoxit (Omega)' },
];

export function SpecialtiesSection({
  specialtyTab,
  onTabChange,
}: SpecialtiesSectionProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
            Módulo 5: Mini-Guías Especializadas por Recurso
          </h2>
          <p className="text-xs text-zinc-400">
            Selecciona la especialidad técnica para ver mecánicas específicas y rentabilidad.
          </p>
        </div>

        <div
          className="inline-flex flex-wrap gap-1.5 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800"
          role="tablist"
          aria-label="Especialidades de extracción"
        >
          {SPECIALTY_TABS.map((tab) => {
            const isSelected = specialtyTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  isSelected ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {specialtyTab === 'ore' && (
        <div
          role="tabpanel"
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-4 text-xs text-zinc-300 leading-relaxed"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-amber-400">
              Minería de Anomalías Soberanas & Lunas (R4 – R64)
            </h3>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[11px]">
              ALPHA · EXPERT SYSTEM · OMEGA
            </span>
          </div>
          <p>
            En Null-Sec, las mejoras de soberanía generan anomalías ricas en{' '}
            <strong>Bistot, Arkonor, Spodumain, Crokite y Dark Ochre</strong>, fuentes principales
            de Megacyte, Zydrine y Nocxium.
          </p>
          <p>
            <strong>Moon Mining:</strong> Las refinerías <em>Athanor</em> y <em>Tatara</em>{' '}
            fracturan trozos de luna creando cinturones privados de altísimo valor (R16, R32 y R64).
            Consulta siempre las normas de tu alianza antes de minar una luna privada y utiliza
            equipamiento sin residuo (Tech I / Tipo A).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-400">ALPHA</span>
              <p>Venture / Pioneer con Miner II o Meta 3 (5M–18M ISK/h).</p>
            </div>
            <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-sky-300">
                ALPHA + EXPERT SYSTEM
              </span>
              <p>
                Mining Barge Operations: Procurer/Retriever con Strip Miner I (0% waste, 25M–45M
                ISK/h).
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400">OMEGA</span>
              <p>
                Exhumers T2 (Hulk/Skiff/Mackinaw) + Cristales T2 y Boosts de flota (55M–110M+
                ISK/h).
              </p>
            </div>
          </div>
        </div>
      )}

      {specialtyTab === 'gas' && (
        <div
          role="tabpanel"
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-4 text-xs text-zinc-300 leading-relaxed"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-amber-400">
              Cosecha de Gas (Fullerites, Cytoserocin & Mykoserocin)
            </h3>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[11px] tabular-nums">
              ALPHA · EXPERT SYSTEM · OMEGA · 20M–100M+ ISK/H
            </span>
          </div>
          <p>
            Se localiza escaneando firmas cósmicas (<em>Cosmic Signatures</em>) con sondas Core. Los
            sitios legítimos se llaman <strong>"[Color] Nebula"</strong> o{' '}
            <strong>"[Nombre] Reservoir"</strong>; evita sitios con nombres de laboratorios o
            instalaciones de combate si vas en una nave minera.
          </p>
          <ul className="space-y-1.5">
            <li>
              • <strong>Wormholes (Fullerites):</strong> Usados para fabricar naves Tech III. Los
              NPCs (<em>Sleepers</em>) aparecen ~15–20 minutos tras iniciar el warp al sitio. Usa un
              temporizador para extraer en modo <em>Ninja Huffing</em> antes de que lleguen.
            </li>
            <li>
              • <strong>Nubes Explosivas (Cytoserocin en Null/Low):</strong> Pueden detonar dañando
              tu escudo. Activa ambos <em>Gas Cloud Scoops</em> en el mismo tick de servidor
              (pré-actívalos antes de fijar objetivo) para minimizar las tiradas de daño.
            </li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-400">ALPHA</span>
              <p>Venture con 2x Gas Cloud Scoop (tope Gas Harvesting II, 20M–50M ISK/h).</p>
            </div>
            <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-sky-300">
                ALPHA + EXPERT SYSTEM
              </span>
              <p>
                Gas Harvesting Expert System: sube a nivel V y habilita Barcazas para gas (35M–75M
                ISK/h).
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400">OMEGA</span>
              <p>
                Prospect con Covert Ops Cloak II en WH peligrosos o Covetor con 5x Scoops en flota.
              </p>
            </div>
          </div>
        </div>
      )}

      {specialtyTab === 'ice' && (
        <div
          role="tabpanel"
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-4 text-xs text-zinc-300 leading-relaxed"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-amber-400">
              Cosecha de Hielo (Isótopos, Heavy Water & Liquid Ozone)
            </h3>
            <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/40 font-mono text-[11px]">
              ALPHA + EXPERT SYSTEM / OMEGA
            </span>
          </div>
          <p>
            A diferencia del mineral, el hielo se extrae en bloques enteros de{' '}
            <strong>1,000 m³ por ciclo</strong>. La eficiencia depende exclusivamente de reducir el
            tiempo de ciclo mediante <em>Ice Harvesting V</em>, módulos{' '}
            <em>Ice Harvester Upgrade II</em> e implantes específicos.
          </p>
          <p>
            El hielo de Null-Sec produce isótopos de facción (Helium, Hydrogen, Nitrogen, Oxygen) y{' '}
            <em>Liquid Ozone</em>, esenciales como combustible para motores de salto capitales,
            cynos y estructuras Upwell.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-400">ALPHA</span>
              <p>Bloqueado: ninguna nave Alpha pura puede equipar Ice Harvesters.</p>
            </div>
            <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-sky-300">
                ALPHA + EXPERT SYSTEM
              </span>
              <p>
                Desbloqueado con Mining Barge Operations: Procurer/Retriever + Ice Harvester I
                durante 7 días.
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400">OMEGA</span>
              <p>
                Endurance camuflada y Mackinaw/Hulk con Ice Harvester II y reducción máxima de
                ciclo.
              </p>
            </div>
          </div>
        </div>
      )}

      {specialtyTab === 'mercoxit' && (
        <div
          role="tabpanel"
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-3 text-xs text-zinc-300 leading-relaxed"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-amber-400">
              Extracción de Mercoxit (Fuente Única de Morphite)
            </h3>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[11px]">
              SOLO OMEGA (SIN EXPERT SYSTEM)
            </span>
          </div>
          <p>
            El <strong>Mercoxit</strong> aparece exclusivamente en sistemas de Null-Sec y es la única
            fuente de <strong>Morphite</strong> en todo el juego (indispensable para toda la
            industria Tech II).
          </p>
          <p>
            Requiere módulos <em>Deep Core</em> y la habilidad <em>Deep Core Mining</em> (exclusiva
            de <strong>Omega</strong>; no existe Expert System para esta actividad). Cada ciclo tiene
            probabilidad de generar una nube tóxica de 10 km que daña directamente tu escudo;
            entrenar <em>Deep Core Mining</em> a nivel V reduce esa probabilidad al 0%.
          </p>
        </div>
      )}
    </div>
  );
}
