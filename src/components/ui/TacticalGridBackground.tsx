import { cn } from '@/lib/utils';

interface TacticalGridBackgroundProps {
  className?: string;
}

/**
 * 21st.dev style Tactical Grid & Radar Beam overlay for EVE Online hero sections.
 */
export function TacticalGridBackground({ className }: TacticalGridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden select-none', className)}
    >
      {/* Tactical Coordinate Grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245, 158, 11, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245, 158, 11, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 75% 30%, black 20%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 75% 30%, black 20%, transparent 80%)',
        }}
      />

      {/* Ambient ORE Gold Nebula Glow */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, transparent 70%)',
        }}
      />

      {/* Top HUD Telemetry Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
