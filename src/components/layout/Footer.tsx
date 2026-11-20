interface FooterProps {
  hasMobileBottomNav?: boolean;
}

export function Footer({ hasMobileBottomNav = false }: FooterProps) {
  return (
    <footer
      className={`border-t border-zinc-800/90 bg-zinc-950 pt-6 px-3 sm:px-6 mt-10 sm:mt-12 ${
        hasMobileBottomNav ? 'pb-24 lg:pb-6' : 'pb-6'
      }`}
      style={{
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="DeepwellGuides"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span>
            <strong className="text-zinc-200">DeepwellGuides</strong> · Archivo Técnico EVE Online
          </span>
        </div>
        <p className="text-zinc-400">
          Hecho por <span className="text-amber-400 font-semibold">@S3rmulu</span>
        </p>
      </div>
    </footer>
  );
}
