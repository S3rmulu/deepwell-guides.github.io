import { CloneFilter } from '../../types';

export function getCloneBadgeClasses(clone: 'alpha-omega' | 'alpha-expert' | 'omega'): string {
  if (clone === 'alpha-omega') {
    return 'bg-zinc-900 text-zinc-200 border-zinc-700';
  }
  if (clone === 'alpha-expert') {
    return 'bg-sky-500/15 text-sky-300 border-sky-500/40';
  }
  return 'bg-amber-500/15 text-amber-400 border-amber-500/40';
}

export function matchesClone(
  itemClone: 'alpha-omega' | 'alpha-expert' | 'omega',
  cloneFilter: CloneFilter
): boolean {
  if (cloneFilter === 'all') return true;
  if (cloneFilter === 'alpha') {
    return itemClone === 'alpha-omega';
  }
  if (cloneFilter === 'expert') {
    return itemClone === 'alpha-omega' || itemClone === 'alpha-expert';
  }
  return itemClone === 'omega';
}
