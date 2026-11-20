export function Footer() {
  return (
    <footer
      className="border-t border-zinc-800/90 bg-zinc-950 pt-6 px-3 sm:px-6 mt-10 sm:mt-12"
      style={{
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="DeepwellGuides"
            className="w-5 h-5"
          />
          <span>
            <strong className="text-zinc-300">DeepwellGuides</strong> · Archivo Técnico EVE Online
          </span>
        </div>
        <p className="text-zinc-400">
          Hecho por <span className="text-amber-400 font-semibold">@S3rmulu</span>
        </p>
      </div>
    </footer>
  );
}
