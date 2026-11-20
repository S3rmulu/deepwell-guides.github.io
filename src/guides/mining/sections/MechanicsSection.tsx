import { Cpu, RotateCcw, Zap } from 'lucide-react';
import { VisualMode } from '../../../types';

interface MechanicsSectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

const MECHANICS_CARDS = [
  {
    id: 'critical-yield',
    title: 'Golpes Críticos (Critical Yield)',
    withZap: true,
    searchText: 'golpes criticos critical yield 1% +200% mining precision exploitation sin residuo',
    body: (
      <>
        Cada ciclo de minería tiene una probabilidad base del <strong>1%</strong> de lograr un
        éxito crítico, otorgando una bonificación instantánea del <strong>+200%</strong> del valor
        extraído en ese ciclo <strong>sin consumir volumen adicional del asteroide</strong>. Las
        skills <em>Mining Precision</em> y <em>Mining Exploitation</em> escalan esta mecánica.
      </>
    ),
  },
  {
    id: 'mining-waste',
    title: 'Residuo de Minería (Waste / Residue)',
    withZap: false,
    searchText:
      'residuo waste residue tech ii cristales tipo b lunas r32 r64 mercoxit ore faction tipo a',
    body: (
      <>
        Los módulos Tech II y cristales Tipo B tienen probabilidad de destruir mineral extra del
        asteroide sin enviarlo a tu bodega. En cinturones públicos usa Tech II para maximizar
        velocidad; en <strong>Lunas raras (R32/R64) o Mercoxit</strong> usa módulos{' '}
        <strong>Tech I, ORE Faction o cristales Tipo A</strong> para no destruir patrimonio de la
        corporación.
      </>
    ),
  },
  {
    id: 'short-cycling',
    title: 'Short-Cycling & Survey Scanner',
    withZap: false,
    searchText:
      'short cycling survey scanner integrated mining surveyor cortar laser ciclo proporcional',
    body: (
      <>
        Los láseres mineros entregan el mineral proporcional al tiempo transcurrido si los apagas
        manualmente antes de terminar el ciclo. Usa el <em>Survey Scanner</em> y el{' '}
        <em>Integrated Mining Surveyor</em> de las naves ORE para cortar el láser en cuanto la roca
        se agote y no perder segundos ciclando en vacío.
      </>
    ),
  },
  {
    id: 'compression',
    title: 'Compresión en Campo vs. Estación',
    withZap: false,
    searchText: 'compresion campo estacion upwell porpoise orca rorqual gas decompression 99%',
    body: (
      <>
        Comprimir reduce el volumen del mineral hasta un 99%. Puedes hacerlo en estructuras Upwell
        con servicio de reprocesado o directamente en el cinturón junto a una{' '}
        <em>Porpoise, Orca o Rorqual</em>. <strong>Nota sobre el Gas:</strong> descomprimir gas
        conlleva una pérdida técnica (~10%, reducible con <em>Gas Decompression</em>, nunca 0%).
      </>
    ),
  },
];

export function MechanicsSection({
  searchQuery,
  visualMode,
  onResetSearch,
}: MechanicsSectionProps) {
  const q = searchQuery.trim().toLowerCase();
  const visibleItems = MECHANICS_CARDS.filter(
    (item) => !q || item.title.toLowerCase().includes(q) || item.searchText.includes(q)
  );

  return (
    <div className="space-y-6">
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
          <span>Módulo 1: Mecánicas de Extracción & Actualización Catalyst</span>
        </h2>

        {visibleItems.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-zinc-200">
              Ninguna mecánica coincide con "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={onResetSearch}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Limpiar búsqueda</span>
            </button>
          </div>
        ) : visualMode === 'dossier' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg border border-zinc-800 bg-zinc-950 divide-y md:divide-y-0 md:gap-px md:bg-zinc-800/80 overflow-hidden">
            {visibleItems.map((item) => (
              <div key={item.id} className="bg-zinc-950 p-4 sm:p-5 space-y-2">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  {item.withZap && <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2"
              >
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  {item.withZap && <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />}
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
