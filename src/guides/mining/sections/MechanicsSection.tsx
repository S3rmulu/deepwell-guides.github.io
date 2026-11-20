import { Cpu, Zap } from 'lucide-react';

export function MechanicsSection() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5">
        <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
          <span>Módulo 1: Mecánicas de Extracción & Actualización Catalyst</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Golpes Críticos (Critical Yield)</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Cada ciclo de minería tiene una probabilidad base del <strong>1%</strong> de lograr un
              éxito crítico, otorgando una bonificación instantánea del <strong>+200%</strong> del
              valor extraído en ese ciclo <strong>sin consumir volumen adicional del asteroide</strong>
              . Las skills <em>Mining Precision</em> y <em>Mining Exploitation</em> escalan esta
              mecánica.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <h3 className="text-sm font-bold text-amber-400">
              Residuo de Minería (Waste / Residue)
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Los módulos Tech II y cristales Tipo B tienen probabilidad de destruir mineral extra del
              asteroide sin enviarlo a tu bodega. En cinturones públicos usa Tech II para maximizar
              velocidad; en <strong>Lunas raras (R32/R64) o Mercoxit</strong> usa módulos{' '}
              <strong>Tech I, ORE Faction o cristales Tipo A</strong> para no destruir patrimonio de
              la corporación.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <h3 className="text-sm font-bold text-amber-400">Short-Cycling & Survey Scanner</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Los láseres mineros entregan el mineral proporcional al tiempo transcurrido si los
              apagas manualmente antes de terminar el ciclo. Usa el <em>Survey Scanner</em> y el{' '}
              <em>Integrated Mining Surveyor</em> de las naves ORE para cortar el láser en cuanto la
              roca se agote y no perder segundos ciclando en vacío.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <h3 className="text-sm font-bold text-amber-400">Compresión en Campo vs. Estación</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Comprimir reduce el volumen del mineral hasta un 99%. Puedes hacerlo en estructuras
              Upwell con servicio de reprocesado o directamente en el cinturón junto a una{' '}
              <em>Porpoise, Orca o Rorqual</em>. <strong>Nota sobre el Gas:</strong> descomprimir
              gas conlleva una pérdida técnica (~10%, reducible con <em>Gas Decompression</em>, nunca
              0%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
