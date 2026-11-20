import { ElementType, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export type SpotlightTone = 'amber' | 'sky' | 'emerald' | 'zinc';

interface SpotlightCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  tone?: SpotlightTone;
  children: ReactNode;
}

const TONE_GLOW_MAP: Record<SpotlightTone, { fill: string; border: string }> = {
  amber: {
    fill: 'rgba(245, 158, 11, 0.11)',
    border: 'rgba(251, 191, 36, 0.45)',
  },
  sky: {
    fill: 'rgba(14, 165, 233, 0.11)',
    border: 'rgba(56, 189, 248, 0.45)',
  },
  emerald: {
    fill: 'rgba(16, 185, 129, 0.10)',
    border: 'rgba(52, 211, 153, 0.45)',
  },
  zinc: {
    fill: 'rgba(161, 161, 170, 0.08)',
    border: 'rgba(212, 212, 216, 0.30)',
  },
};

/**
 * 21st.dev style SpotlightCard adapted for EVE Online HUD telemetry cards.
 * Uses CSS @property (--spotlight-inner, --spotlight-outer) + radial-gradient mask
 * so underlying content remains 100% visible, accessible, and keyboard-reachable.
 */
export function SpotlightCard({
  as: Component = 'article',
  tone = 'amber',
  className,
  children,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    rectRef.current = el.getBoundingClientRect();
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = rectRef.current ?? el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  };

  const glow = TONE_GLOW_MAP[tone];

  return (
    <Component
      ref={containerRef}
      onPointerMove={handlePointerMove}
      style={
        {
          '--spotlight-fill': glow.fill,
          '--spotlight-border': glow.border,
        } as React.CSSProperties
      }
      className={cn('spotlight-card relative overflow-hidden', className)}
      {...props}
    >
      <div aria-hidden="true" className="spotlight-reveal-layer" />
      <div className="relative z-10 flex flex-col justify-between h-full gap-4">{children}</div>
    </Component>
  );
}
