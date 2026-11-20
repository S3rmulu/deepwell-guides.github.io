import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { ShipItem } from '../../types';

interface ShipHullPreviewProps {
  typeId: number;
  name: string;
  size?: 'lg' | 'md';
  secondaryHulls?: ShipItem['secondaryHulls'];
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
        className={`relative ${boxSize} aspect-square rounded-lg border border-zinc-800/90 bg-[#070709] overflow-hidden flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.10)_0%,rgba(9,9,11,0)_72%)] pointer-events-none"
        />
        {imageStage === 'fallback' ? (
          <Rocket className="w-6 h-6 text-zinc-600 relative z-10" aria-hidden="true" />
        ) : (
          <img
            src={imgUrl}
            alt={`${activeHull.name} - Render oficial EVE Online`}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className={`relative z-10 w-full h-full object-contain ${
              size === 'lg' ? 'p-1' : 'p-0.5'
            } transition-transform duration-300 group-hover:scale-105`}
          />
        )}
      </div>

      {size === 'lg' && (
        <span className="text-[10px] font-mono tabular-nums text-zinc-500 tracking-tight">
          HULL // {activeHull.typeId}
        </span>
      )}

      {hulls.length > 1 && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Seleccionar casco">
          {hulls.map((hull, idx) => (
            <button
              key={hull.typeId}
              type="button"
              onClick={() => handleSelectHull(idx)}
              className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-colors ${
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
