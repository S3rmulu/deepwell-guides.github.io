import { useEffect, useId, useState } from 'react';
import { AlertTriangle, Calculator, Coins, RotateCcw, TrendingUp } from 'lucide-react';
import { VisualMode } from '../../../types';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TAX_SKILL_PRESETS, TaxSkillPresetItem } from '../data';
import { MODULE_SEARCH_KEYWORDS, normalizeSearch } from '../searchIndex';

interface EconomySectionProps {
  searchQuery: string;
  visualMode: VisualMode;
  onResetSearch: () => void;
}

const BREAKEVEN_STORAGE_KEY = 'deepwell-indy-breakeven';

interface SavedBreakEvenState {
  salePrice: string;
  salesTaxPct: string;
  sellBrokerPct: string;
  buyBrokerPct: string;
  installCostPerUnit: string;
}

function readInitialBreakEvenState(): SavedBreakEvenState {
  const defaults: SavedBreakEvenState = {
    salePrice: '210',
    salesTaxPct: '5.02',
    sellBrokerPct: '2.03',
    buyBrokerPct: '2.03',
    installCostPerUnit: '0',
  };
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.sessionStorage.getItem(BREAKEVEN_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<SavedBreakEvenState>;
    return {
      salePrice:
        typeof parsed.salePrice === 'string' ? parsed.salePrice : defaults.salePrice,
      salesTaxPct:
        typeof parsed.salesTaxPct === 'string' ? parsed.salesTaxPct : defaults.salesTaxPct,
      sellBrokerPct:
        typeof parsed.sellBrokerPct === 'string'
          ? parsed.sellBrokerPct
          : defaults.sellBrokerPct,
      buyBrokerPct:
        typeof parsed.buyBrokerPct === 'string' ? parsed.buyBrokerPct : defaults.buyBrokerPct,
      installCostPerUnit:
        typeof parsed.installCostPerUnit === 'string'
          ? parsed.installCostPerUnit
          : defaults.installCostPerUnit,
    };
  } catch {
    return defaults;
  }
}

export function EconomySection({
  searchQuery,
  visualMode,
  onResetSearch,
}: EconomySectionProps) {
  const q = normalizeSearch(searchQuery);

  const salePriceId = useId();
  const salesTaxId = useId();
  const sellBrokerId = useId();
  const buyBrokerId = useId();
  const sciCostId = useId();

  const [calcState, setCalcState] = useState<SavedBreakEvenState>(readInitialBreakEvenState);
  const { salePrice, salesTaxPct, sellBrokerPct, buyBrokerPct, installCostPerUnit } = calcState;

  useEffect(() => {
    try {
      window.sessionStorage.setItem(BREAKEVEN_STORAGE_KEY, JSON.stringify(calcState));
    } catch {
      // Ignore storage errors
    }
  }, [calcState]);

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

  const rawCombinedSellTaxPct = sTax + sBroker;
  const isTaxOverHundred = rawCombinedSellTaxPct >= 100;
  const combinedSellTaxPct = Math.min(100, rawCombinedSellTaxPct);
  const netRevenue = pVenta * (1 - combinedSellTaxPct / 100);
  const maxDirectMaterialCost = Math.max(0, netRevenue - sciUnit);
  const maxBuyOrderPrice =
    bBroker >= 0 ? maxDirectMaterialCost / (1 + bBroker / 100) : maxDirectMaterialCost;

  const handleApplyPreset = (preset: TaxSkillPresetItem) => {
    setCalcState((prev) => ({
      ...prev,
      salePrice: preset.id === 'draft-210' ? '210' : prev.salePrice || '210',
      salesTaxPct: preset.salesTaxPct,
      sellBrokerPct: preset.sellBrokerPct,
      buyBrokerPct: preset.buyBrokerPct,
      installCostPerUnit: preset.id === 'draft-210' ? '0' : prev.installCostPerUnit,
    }));
  };

  const matchesEconomy = !q || MODULE_SEARCH_KEYWORDS.economy.includes(q);

  if (!matchesEconomy) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-zinc-200">
          No hay coincidencias en Economía, Margen Neto e Impuestos para &quot;{searchQuery}&quot;.
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
            <span>Economía, Margen Neto e Impuestos</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Para garantizar la rentabilidad de cada lote, calcula el{' '}
            <strong>Punto de Equilibrio (Break-Even)</strong> descontando las comisiones del mercado
            regional y el coste de instalación antes de comprar insumos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpotlightCard
            tone="amber"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                1. Sales Tax (Impuesto de Venta)
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/35">
                Base: 5,02%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Se cobra al ejecutarse cualquier venta (orden a plazo o venta directa contra Buy
              Order). Se reduce con la habilidad <strong>Accounting</strong> (
              <strong>11% de descuento relativo</strong> por nivel, bajando a ~3,36% al nivel III y
              ~2,26% al nivel V).
            </p>
          </SpotlightCard>

          <SpotlightCard
            tone="sky"
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                2. Broker&apos;s Fee (Comisión de Corredor)
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/35">
                Base: ~2,03% – 3,00%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Se paga al publicar una orden de venta (<em>Sell Order</em>) o compra (
              <em>Buy Order</em>). Baja en estaciones NPC con <strong>Broker Relations</strong> (-0,3%
              por nivel) y tu <em>standing</em> con la facción y corporación dueña de la estación.
            </p>
          </SpotlightCard>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              Fórmula de Ingreso Neto por Unidad
            </div>
            <p className="text-xs text-zinc-400">
              Lo que entra en cartera tras vender una unidad a precio P_venta:
            </p>
          </div>
          <code className="px-3 py-2 rounded-lg bg-zinc-900 border border-amber-500/30 text-amber-300 font-mono text-xs sm:text-sm">
            Ingreso Neto = P_venta × (1 - (% Sales Tax + % Broker&apos;s Fee))
          </code>
        </div>
      </div>

      {/* 2. EJEMPLO PRÁCTICO (210 ISK) */}
      <div
        className={`border border-amber-500/40 bg-zinc-950 p-4 sm:p-6 space-y-4 ${
          visualMode === 'dossier' ? 'rounded-lg' : 'rounded-xl'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Ejemplo Práctico de Rentabilidad (Caso 210 ISK)</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Cálculo del techo máximo que puedes pagar por los materiales por unidad sin perder
              ISK.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Impuestos venta combinados: 7,05% (5,02% + 2,03%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
            <h3 className="text-[11px] font-mono uppercase text-zinc-400">
              1. Ingreso Neto tras Venta
            </h3>
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
            <h3 className="text-[11px] font-mono uppercase text-amber-300">
              2. Techo en Compra Directa (Sell Orders)
            </h3>
            <div className="text-lg font-mono tabular-nums font-extrabold text-amber-400">
              &lt; 195,19 ISK
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              Si compras al instante en Sell Orders, el coste total de materiales (más SCI y
              hauling) por unidad debe quedar por debajo de <strong>195,19 ISK</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-sky-500/35 bg-sky-500/10 p-4 space-y-2">
            <h3 className="text-[11px] font-mono uppercase text-sky-300">
              3. Techo con Orden de Compra (Buy Order)
            </h3>
            <div className="text-lg font-mono tabular-nums font-extrabold text-sky-300">
              ≤ 191,31 ISK
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              Si compras con <em>Buy Order</em> y broker fee del{' '}
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
        <div className="space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Calculadora Interactiva de Punto de Equilibrio (Break-Even)</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Elige un preajuste según tus skills de comercio o edita las tasas reales de la
              estación. Tus valores se conservan al cambiar de capítulo.
            </p>
          </div>

          {/* Barra de Preajustes Fiscales por Skills */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Preajustes de impuestos según nivel de skills"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Preajustes de Skills:
            </span>
            {TAX_SKILL_PRESETS.map((preset) => {
              const isSelected =
                salesTaxPct === preset.salesTaxPct &&
                sellBrokerPct === preset.sellBrokerPct &&
                buyBrokerPct === preset.buyBrokerPct;
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 border-amber-500 font-bold'
                      : 'bg-zinc-950 text-zinc-200 border-zinc-800 hover:border-amber-500/50 hover:text-amber-300'
                  }`}
                >
                  <span>{preset.label}</span>
                  <span
                    className={`ml-1.5 font-mono text-[10px] ${
                      isSelected ? 'text-zinc-900' : 'text-zinc-400'
                    }`}
                  >
                    ({preset.shortNote})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <form
          aria-label="Calculadora de Punto de Equilibrio Industrial"
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            <legend className="sr-only">
              Variables de precio de venta, impuestos y coste de instalación
            </legend>

            <div className="flex flex-col justify-between gap-1.5">
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
                onChange={(e) =>
                  setCalcState((prev) => ({ ...prev, salePrice: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col justify-between gap-1.5">
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
                onChange={(e) =>
                  setCalcState((prev) => ({ ...prev, salesTaxPct: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col justify-between gap-1.5">
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
                onChange={(e) =>
                  setCalcState((prev) => ({ ...prev, sellBrokerPct: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col justify-between gap-1.5">
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
                onChange={(e) =>
                  setCalcState((prev) => ({ ...prev, buyBrokerPct: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>

            <div className="flex flex-col justify-between gap-1.5 sm:col-span-2 xl:col-span-1">
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
                onChange={(e) =>
                  setCalcState((prev) => ({ ...prev, installCostPerUnit: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono tabular-nums text-zinc-100"
              />
            </div>
          </fieldset>

          {isTaxOverHundred && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
              <span>
                La suma de Sales Tax + Broker Fee ({rawCombinedSellTaxPct.toFixed(2)}%) alcanza o
                supera el 100%. Revisa los porcentajes introducidos.
              </span>
            </div>
          )}

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
