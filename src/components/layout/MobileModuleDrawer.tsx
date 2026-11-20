import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { GuideModuleId } from '../../types';
import { getHubHref, getMiningModuleHref } from '../../router/useHashRoute';

export interface MobileModuleDrawerHandle {
  open: () => void;
  close: () => void;
}

export interface DrawerModuleItem {
  id: GuideModuleId;
  label: string;
  icon: React.ReactNode;
}

interface MobileModuleDrawerProps {
  modules: DrawerModuleItem[];
  activeModule: GuideModuleId;
  guideTitle: string;
  onOpenChange: (open: boolean) => void;
}

export const MobileModuleDrawer = forwardRef<MobileModuleDrawerHandle, MobileModuleDrawerProps>(
  function MobileModuleDrawer({ modules, activeModule, guideTitle, onOpenChange }, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLElement>(null);

    const openDrawer = useCallback(async () => {
      const drawer = dialogRef.current;
      const scroller = scrollerRef.current;
      if (!drawer || !scroller) return;

      if (!drawer.open) {
        drawer.showModal();
      }

      if (!CSS.supports('scroll-initial-target', 'nearest')) {
        scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' as ScrollBehavior });
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );
      }

      scroller.scrollTo({ left: 0, behavior: 'auto' });
    }, []);

    const closeDrawer = useCallback(() => {
      const drawer = dialogRef.current;
      const scroller = scrollerRef.current;
      if (!drawer || !scroller || !drawer.open) return;
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'auto' });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          void openDrawer();
        },
        close: closeDrawer,
      }),
      [openDrawer, closeDrawer]
    );

    useEffect(() => {
      const drawer = dialogRef.current;
      const scroller = scrollerRef.current;
      const sheet = sheetRef.current;
      if (!drawer || !scroller || !sheet) return;

      const visibleThreshold = Math.max(0.001, 1 / Math.max(window.innerWidth, 1));

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          if (!entry) return;
          if (entry.intersectionRatio < visibleThreshold) {
            if (drawer.open) {
              drawer.close();
            }
            onOpenChange(false);
          }
          if (entry.intersectionRatio === 1 && drawer.open) {
            onOpenChange(true);
          }
        },
        { root: drawer, threshold: [visibleThreshold, 1] }
      );
      observer.observe(sheet);

      const handleCancel = (event: Event) => {
        if (event.cancelable) {
          event.preventDefault();
          closeDrawer();
        }
      };

      const handleNativeClose = () => {
        onOpenChange(false);
      };

      drawer.addEventListener('cancel', handleCancel);
      drawer.addEventListener('close', handleNativeClose);

      let removeScrollFallback: (() => void) | undefined;
      if (!CSS.supports('animation-timeline: scroll()')) {
        const handleScroll = () => {
          const width = Math.max(sheet.offsetWidth, 1);
          const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / width));
          drawer.style.setProperty('--drawer-backdrop', String(ratio));
        };
        scroller.addEventListener('scroll', handleScroll, { passive: true });
        removeScrollFallback = () => scroller.removeEventListener('scroll', handleScroll);
      }

      return () => {
        observer.disconnect();
        drawer.removeEventListener('cancel', handleCancel);
        drawer.removeEventListener('close', handleNativeClose);
        removeScrollFallback?.();
      };
    }, [closeDrawer, onOpenChange]);

    return (
      <dialog
        ref={dialogRef}
        id="wiki-module-drawer"
        className="Drawer"
        aria-label="Índice de módulos de la wiki"
        onClick={(event) => {
          const sheet = sheetRef.current;
          if (sheet && !sheet.contains(event.target as Node)) {
            closeDrawer();
          }
        }}
      >
        <div ref={scrollerRef} className="Drawer-scroller">
          <nav
            ref={sheetRef}
            aria-label="Navegación de módulos en móvil"
            className="Drawer-sheet bg-zinc-950 border-r border-zinc-800 text-zinc-100 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-zinc-800/90">
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  Índice Wiki
                </div>
                <div className="text-xs font-bold text-zinc-100 truncate">{guideTitle}</div>
              </div>
              <button
                type="button"
                autoFocus
                aria-label="Cerrar menú"
                onClick={closeDrawer}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 hover:border-amber-500/50 hover:text-zinc-100"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <ul className="p-3 space-y-1.5 overflow-y-auto">
              {modules.map((mod) => {
                const isActive = activeModule === mod.id;
                return (
                  <li key={mod.id}>
                    <a
                      href={getMiningModuleHref(mod.id)}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => closeDrawer()}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                          : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 border border-transparent'
                      }`}
                    >
                      <span
                        className={isActive ? 'text-amber-400 shrink-0' : 'text-zinc-500 shrink-0'}
                        aria-hidden="true"
                      >
                        {mod.icon}
                      </span>
                      <span className="flex-1">{mod.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="p-3 border-t border-zinc-800/90">
              <a
                href={getHubHref()}
                onClick={() => closeDrawer()}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/70 text-xs font-semibold text-zinc-200 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Todas las Guías (Índice)</span>
              </a>
            </div>
          </nav>
        </div>
      </dialog>
    );
  }
);
