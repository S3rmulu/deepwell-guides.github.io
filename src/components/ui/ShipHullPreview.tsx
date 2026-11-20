import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { ShipItem, VisualMode } from '../../types';

interface ShipHullPreviewProps {
  typeId: number;
  name: string;
  size?: 'lg' | 'md';
  secondaryHulls?: ShipItem['secondaryHulls'];
  visualMode?: VisualMode;
}

export function ShipHullPreview({
  typeId,
  name,
  size = 'lg',
  secondaryHulls,
}: ShipHullPreviewProps) {
  const hulls = secondaryHulls && secondaryHulls.length > 0 ? secondaryHulls : [{ name, typeId }];
  const defaultIndex = Math.max(
    0,
    hulls.findIndex((h) => h.typeId === typeId)
  );
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [imageStage, setImageStage] = useState<'render' | 'icon' | 'fallback'>('render');

  const activeHull = hulls[selectedIndex] ?? hulls[0];
  const imgUrl =
    imageStage === 'render'
      ? `https://images.evetech.net/types/${activeHull.typeId}/render?size=256`
      : `https://images.evetech.net/types/${activeHull.typeId}/icon?size=128`;

  const boxSize = size === 'lg' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-14 h-14';
  const imgDim = size === 'lg' ? 96 : 56;
  const frameRadius = size === 'lg' ? 'rounded-2xl' : 'rounded-xl';

  const handleSelectHull = (idx: number) => {
    if (idx === selectedIndex) return;
    setSelectedIndex(idx);
    setImageStage('render');
  };

  const handleImageError = () => {
    setImageStage((prev) => (prev === 'render' ? 'icon' : 'fallback'));
  };

  return (
    <div className="flex flex-col items-start gap-2 shrink-0">
      <div
        className={`relative ${boxSize} aspect-square ${frameRadius} bg-[#070709] overflow-hidden flex items-center justify-center ring-1 ring-zinc-700/80 shadow-md`}
      >
        {imageStage === 'fallback' ? (
          <Rocket className="w-6 h-6 text-zinc-400 relative z-10" aria-hidden="true" />
        ) : (
          <img
            src={imgUrl}
            alt={`${activeHull.name} - Render oficial EVE Online`}
            width={imgDim}
            height={imgDim}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className="block w-full h-full object-cover rounded-[inherit] transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
        />
      </div>

      {size === 'lg' && (
        <span className="text-[10px] font-mono tabular-nums text-zinc-400 tracking-tight">
          HULL // {activeHull.typeId}
        </span>
      )}

      {hulls.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar casco">
          {hulls.map((hull, idx) => (
            <button
              key={hull.typeId}
              type="button"
              aria-pressed={idx === selectedIndex}
              onClick={() => handleSelectHull(idx)}
              className={`compact-control px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                idx === selectedIndex
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {hull.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
