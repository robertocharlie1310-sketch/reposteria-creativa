import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-paper/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="group">
          <div className="flex items-baseline gap-1">
            <span className="font-display italic text-2xl md:text-3xl">Repostería</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone hidden md:block translate-y-[-2px]">
              EST. 2026
            </span>
          </div>
          <div className="font-display text-xl md:text-2xl tracking-tight -mt-1">
            Creativa<span className="text-stone">.</span>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <a href="#catalogo" className="label-mono hover:tracking-[0.3em] transition-all duration-300">
            Catálogo
          </a>
          <a href="#nosotros" className="label-mono hover:tracking-[0.3em] transition-all duration-300">
            Nosotros
          </a>
          <a href="#contacto" className="label-mono hover:tracking-[0.3em] transition-all duration-300">
            Contacto
          </a>
        </nav>

        {/* CTA */}
        <a href="#catalogo" className="hidden md:inline-flex label-mono items-center gap-2 group">
          <span>Ordenar</span>
          <svg width="14" height="14" viewBox="0 0 14 14" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 7h12M9 3l4 4-4 4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="square" />
          </svg>
        </a>

        {/* Mobile button */}
        <button className="md:hidden label-mono">Menú</button>
      </div>
    </header>
  );
}
