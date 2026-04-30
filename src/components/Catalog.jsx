import DessertCard from './DessertCard';

export default function Catalog({ desserts, categories, activeCategory, onCategoryChange, onCustomize }) {
  return (
    <section id="catalogo" className="py-20 md:py-32">
      <div className="container-custom">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-2">
            <div className="label-mono text-stone">N.º 002</div>
            <div className="label-mono text-stone mt-2">El catálogo</div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h2 className="heading-display text-5xl md:text-7xl lg:text-8xl">
              Una colección<br />
              <span className="italic text-stone">curada</span> de creaciones.
            </h2>
            <p className="mt-8 text-base md:text-lg text-ink/70 max-w-xl">
              Cada pieza está diseñada para ser personalizada. Elige tu favorito, ajusta los detalles y reserva con la anticipación que mereces.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12 md:mb-16 pb-8 border-b border-ink/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-5 py-2 label-mono transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-ink text-paper border-ink'
                  : 'border-ink/20 hover:border-ink hover:tracking-[0.25em]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-y-24">
          {desserts.map((dessert, idx) => (
            <DessertCard
              key={dessert.id}
              dessert={dessert}
              onCustomize={onCustomize}
              delay={idx * 0.1}
            />
          ))}
        </div>

        {/* Empty state */}
        {desserts.length === 0 && (
          <div className="text-center py-32">
            <p className="font-display italic text-3xl text-stone">
              Sin resultados en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
