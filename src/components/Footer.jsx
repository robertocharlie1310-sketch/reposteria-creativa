export default function Footer() {
  return (
    <footer id="contacto" className="bg-ink text-paper">
      <div className="container-custom py-20 md:py-32">
        {/* Top section */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-7">
            <h2 className="heading-display text-5xl md:text-7xl lg:text-8xl">
              ¿Listo para algo<br />
              <span className="italic text-paper/60">extraordinario?</span>
            </h2>
            <a href="#catalogo" className="inline-block mt-8 label-mono border-b border-paper/40 pb-1 hover:border-paper transition-all duration-300">
              Comenzar tu pedido →
            </a>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-9">
            <div className="label-mono text-paper/40 mb-4">Contacto</div>
            <div className="space-y-2 text-sm">
              <div>Guadalajara, Jalisco</div>
              <div>+52 477 000 0000</div>
              <div>hola@reposteria.mx</div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label-mono text-paper/40 mb-4">Horarios</div>
            <div className="space-y-2 text-sm">
              <div>Lun — Vie</div>
              <div className="text-paper/60">9:00 — 19:00</div>
              <div className="mt-2">Sáb — Dom</div>
              <div className="text-paper/60">10:00 — 16:00</div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-paper/20 flex flex-col md:flex-row md:justify-between gap-4">
          <div className="font-display italic text-2xl">
            Repostería Creativa<span className="text-paper/40">.</span>
          </div>
          <div className="flex gap-6 label-mono text-paper/60">
            <span>© 2026</span>
            <span>·</span>
            <span>Hecho con cariño</span>
            <span>·</span>
            <span>Sprint 1 · MVP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
