import { useState } from 'react';

export default function DessertCard({ dessert, onCustomize, delay = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group cursor-pointer opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onCustomize(dessert)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream mb-6">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display italic text-stone/50">cargando…</div>
          </div>
        )}
        <img
          src={dessert.image}
          alt={dessert.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${hovered ? 'scale-105' : 'scale-100'}`}
        />

        {/* Tags overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          {dessert.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-paper text-ink px-3 py-1 label-mono text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Code number */}
        <div className="absolute top-4 right-4 label-mono text-paper bg-ink px-2 py-1">
          {dessert.code}
        </div>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-ink/0 flex items-end justify-center pb-8 transition-all duration-500 ${
          hovered ? 'bg-ink/10' : ''
        }`}>
          <div className={`bg-paper px-6 py-3 label-mono transform transition-all duration-500 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Personalizar →
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="label-mono text-stone mb-1">{dessert.category}</div>
            <h3 className="font-display text-2xl md:text-3xl leading-tight">
              {dessert.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="label-mono text-stone">desde</div>
            <div className="font-display text-xl">${Math.round(dessert.basePrice * 0.4)}</div>
          </div>
        </div>

        <p className="text-sm text-ink/60 leading-relaxed line-clamp-2">
          {dessert.description}
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs text-stone">
          <span className="label-mono">
            {dessert.flavors.length} sabores
          </span>
          <span className="text-stone/40">·</span>
          <span className="label-mono">
            {dessert.sizes.length} tamaños
          </span>
        </div>
      </div>
    </article>
  );
}
