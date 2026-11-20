import { useId, useState } from 'react';
import { Calculator, Coins, RotateCcw, TrendingUp } from 'lucide-react';
import { VisualMode } from '../../../types';

interface EconomySectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

export function EconomySection({
  searchQuery,
  visualMode,
  onResetSearch,
}: EconomySectionProps) {
  const q = searchQuery.trim().toLowerCase();

  const salePriceId = useId();
  const salesTaxId = useId();
  const sellBrokerId = useId();
  const buyBrokerId = useId();
  const sciCostId = useId();

  // Pre-cargado con el ejemplo práctico exacto del borrador:
  // P_venta = 210 ISK, Sales Tax = 5.02%, Broker Fee Venta = 2.03% (combinados = 7.05%), Broker Fee Compra = 2.03%
  const [salePrice, setSalePrice] = useState<string>('210');
  const [salesTaxPct, setSalesTaxPct] = useState<string>('5.02');
  const [sellBrokerPct, setSellBrokerPct] = useState<string>('2.03');
  const [buyBrokerPct, setBuyBrokerPct] = useState<string>('2.03');
  const [installCostPerUnit, setInstallCostPerUnit] = useState<string>('0');

  const pVenta = Math.max(0, Number.parseFloat(salePrice.replace(',', '.')) || 0);
  const sTax = Math.min(100, Math.max(0, Number.parseFloat(salesTaxPct.replace(',', '.')) || 0));
  const sBroker = Math.min(
    100,
    Math.max(0, Number.parseFloat(sellBrokerPct.replace(',', '.')) || 0)
  );
  const bBroker = Math.min(
    100,
    Math.max(0, Number.parseFloat(buyBrokerPct.replace(',', '.')) || 0)
  );
  const sciUnit = Math.max(0, Number.parseFloat(installCostPerUnit.replace(',', '.')) || 0);

  const combinedSellTaxPct = Math.min(100, sTax + sBroker);
  const netRevenue = pVenta * (1 - combinedSellTaxPct / 100);
  const maxDirectMaterialCost = Math.max(0, netRevenue - sciUnit);
  const maxBuyOrderPrice =
    bBroker >= 0 ? maxDirectMaterialCost / (1 + bBroker / 100) : maxDirectMaterialCost;

  const handleLoadDraftExample = () => {
    setSalePrice('210');
    setSalesTaxPct('5.02');
    setSellBrokerPct('2.03');
    setBuyBrokerPct('2.03');
    setInstallCostPerUnit('0');
  };

  const matchesEconomy =
    !q ||
    'economia margen neto impuestos punto de equilibrio break-even costes mercado sales tax impuesto venta 5,02% 5.02% accounting 11% broker fee comision corredor 2,03% 3% broker relations standing ingreso neto 210 isk 195,195 191,31 buy order orden compra'.includes(
      q
    );

  if (!matchesEconomy) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          No hay coincidencias en Economía, Margen Neto e Impuestos para "{searchQuery}".
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
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. COSTES DE MERCADO (SALES TAX & BROKER'S FEE) */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Módulo 3: Economía, Margen Neto e Impuestos</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Para garantizar la rentabilidad de cada lote antes de comprar materias primas o pulsar
            Start, calcula siempre tu <strong>Punto de Equilibrio (Break-Even)</strong> descontando
            las comisiones del mercado regional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                1. Sales Tax (Impuesto de Venta)
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/35">
                Base: 5,02%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Se cobra automáticamente al ejecutarse cualquier venta (tanto si vendes con orden a
              plazo como si vendes al instante contra una Buy Order). Es reducible mediante la
              habilidad <strong>Accounting</strong> (<strong>11% de descuento relativo</strong> por
              nivel).
            </p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                2. Broker&apos;s Fee (Comisión de Corredor)
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/35">
                Base: ~2,03% – 3,00%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Se cobra por adelantado al publicar una orden de venta (<em>Sell Order</em>) o una
              orden de compra (<em>Buy Order</em>) en el mercado. Se reduce en estaciones NPC con la
              habilidad <strong>Broker Relations</strong> y tu reputación (<em>standing</em>) con la
              facción y corporación dueña de la estación.
            </p>
          </article>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              Fórmula de Ingreso Neto por Unidad
            </div>
            <p className="text-xs text-zinc-400">
              Lo que realmente entra en tu cartera tras vender una unidad a precio P_venta:
            </p>
          </div>
          <code className="px-3 py-2 rounded-lg bg-zinc-900 border border-amber-500/30 text-amber-300 font-mono text-xs sm:text-sm">
            Ingreso Neto = P_venta × (1 - (% Sales Tax + % Broker&apos;s Fee))
          </code>
        </div>
      </div>

      {/* 2. EJEMPLO PRÁCTICO DEL BORRADOR (210 ISK) */}
      <div
        className={`border border-amber-500/40 bg-zinc-950 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Ejemplo Práctico de Rentabilidad (Caso 210 ISK)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Cálculo del techo máximo que puedes pagar por las materias primas por unidad para no
              perder ISK.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Impuestos venta combinados: 7,05% (5,02% + 2,03%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
            <div className="text-[11px] font-mono uppercase text-zinc-400">
              1. Ingreso Neto tras Venta
            </div>
            <div className="text-lg font-mono tabular-nums font-extrabold text-zinc-100">
              195,195 ISK
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Vendes a <code className="text-amber-300">210 ISK</code> con impuestos combinados del{' '}
              <code className="text-amber-300">7,05%</code>:{' '}
              <code className="text-zinc-200">210 × (1 - 0,0705) = 195,195 ISK</code>.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-4 space-y-2">
            <div className="text-[11px] font-mono uppercase text-amber-300">
              2. Techo en Compra Directa (Sell Orders)
            </div>
            <div className="text-lg font-mono tabular-nums font-extrabold text-amber-400">
              &lt; 195,19 ISK
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              Si compras los materiales al instante en el mercado, el coste total de materias primas
              (más SCI) por unidad debe ser <strong>inferior a 195,19 ISK</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-sky-500/35 bg-sky-500/10 p-4 space-y-2">
            <div className="text-[11px] font-mono uppercase text-sky-300">
              3. Techo con Orden de Compra (Buy Order)
            </div>
            <div className="text-lg font-mono tabular-nums font-extrabold text-sky-300">
              ≤ 191,31 ISK
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              Si adquieres materiales poniendo una <em>Buy Order</em> con comisión de corredor del{' '}
              <code className="text-sky-300">2,03%</code>:{' '}
              <code className="text-zinc-100">195,195 / (1 + 0,0203) ≈ 191,31 ISK</code>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. CALCULADORA INTERACTIVA DE BREAK-EVEN */}
      <div
        className={`border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-5 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Calculadora Interactiva de Punto de Equilibrio (Break-Even)</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Introduce el precio de venta de cualquier artículo en Jita/Dodixie y tus tasas reales
              para saber cuánto puedes pagar como máximo por sus insumos.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoadDraftExample}
            className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-950 hover:border-amber-500/60 text-xs font-semibold text-amber-300 transition-colors self-start sm:self-auto shrink-0"
          >
            Restaurar Ejemplo (210 ISK)
          </button>
        </div>

        <form
          aria-label="Calculadora de Punto de Equilibrio Industrial"
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <legend className="sr-only">
              Variables de precio de venta, impuestos y coste de instalación
            </legend>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={salePriceId}
                className="text-xs font-mono font-semibold text-zinc-200"
              >
                Precio Venta (P_venta ISK)
              </label>
              <input
                id={salePriceId}
                name="salePrice"
                type="text"
                inputMode="decimal"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={salesTaxId}
                className="text-xs font-mono font-semibold text-zinc-200"
              >
                Sales Tax (%)
              </label>
              <input
                id={salesTaxId}
                name="salesTaxPct"
                type="text"
                inputMode="decimal"
                value={salesTaxPct}
                onChange={(e) => setSalesTaxPct(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={sellBrokerId}
                className="text-xs font-mono font-semibold text-zinc-200"
              >
                Broker Fee Venta (%)
              </label>
              <input
                id={sellBrokerId}
                name="sellBrokerPct"
                type="text"
                inputMode="decimal"
                value={sellBrokerPct}
                onChange={(e) => setSellBrokerPct(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={buyBrokerId}
                className="text-xs font-mono font-semibold text-zinc-200"
              >
                Broker Fee Compra (%)
              </label>
              <input
                id={buyBrokerId}
                name="buyBrokerPct"
                type="text"
                inputMode="decimal"
                value={buyBrokerPct}
                onChange={(e) => setBuyBrokerPct(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={sciCostId}
                className="text-xs font-mono font-semibold text-zinc-200"
              >
                Tasa SCI / Unidad (ISK)
              </label>
              <input
                id={sciCostId}
                name="installCostPerUnit"
                type="text"
                inputMode="decimal"
                value={installCostPerUnit}
                onChange={(e) => setInstallCostPerUnit(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>
          </fieldset>

          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-1">
              <div className="text-[11px] font-mono uppercase text-zinc-400">
                Ingreso Neto por Unidad (Impuestos: {combinedSellTaxPct.toFixed(2)}%)
              </div>
              <div className="text-xl font-mono tabular-nums font-extrabold text-zinc-100">
                {netRevenue.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 3,
                })}{' '}
                ISK
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-1">
              <div className="text-[11px] font-mono uppercase text-amber-300">
                Coste Máx. Materias Primas (Compra Directa)
              </div>
              <div className="text-xl font-mono tabular-nums font-extrabold text-amber-400">
                {maxDirectMaterialCost.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ISK
              </div>
            </div>

            <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 space-y-1">
              <div className="text-[11px] font-mono uppercase text-sky-300">
                Precio Máx. en Orden de Compra (Buy Order)
              </div>
              <div className="text-xl font-mono tabular-nums font-extrabold text-sky-300">
                {maxBuyOrderPrice.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ISK
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
