export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end pt-32 pb-20 overflow-hidden">
      <div className="container-custom w-full">
        {/* Top metadata row */}
        <div className="flex justify-between items-start mb-20 md:mb-32 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-2">
            <div className="label-mono text-stone">N.º 001</div>
            <div className="label-mono text-stone">Guadalajara, J · MX</div>
          </div>
          <div className="text-right space-y-2 hidden md:block">
            <div className="label-mono text-stone">Pastelería Artesanal</div>
            <div className="label-mono text-stone">2026 — Edición Primavera</div>
          </div>
        </div>

        {/* Main heading - editorial layout */}
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <h1 className="heading-display text-[14vw] md:text-[10vw] lg:text-[9rem] leading-[0.85]">
              <span className="block opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Postres
              </span>
              <span className="block italic text-stone opacity-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                hechos
              </span>
              <span className="block opacity-0 animate-slide-up" style={{ animationDelay: '0.7s' }}>
                a tu medida<span className="text-stone">.</span>
              </span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-2 lg:col-span-3 mt-8 md:mt-0 md:pb-4">
            <p className="text-sm md:text-base leading-relaxed text-ink/70 max-w-xs opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              Cada pastel es una creación única. Diseñado contigo, horneado para ti, entregado en el momento justo.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <a href="#catalogo" className="btn-primary self-start">
            Explorar el catálogo
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </a>

          <div className="flex items-center gap-8">
            <div>
              <div className="font-display text-4xl">8</div>
              <div className="label-mono text-stone mt-1">Creaciones</div>
            </div>
            <div className="h-12 w-px bg-ink/20" />
            <div>
              <div className="font-display text-4xl">∞</div>
              <div className="label-mono text-stone mt-1">Combinaciones</div>
            </div>
            <div className="h-12 w-px bg-ink/20 hidden md:block" />
            <div className="hidden md:block">
              <div className="font-display text-4xl">48h</div>
              <div className="label-mono text-stone mt-1">Anticipación</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink/10" />
    </section>
  );
}
