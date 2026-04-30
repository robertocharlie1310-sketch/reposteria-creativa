export default function Marquee() {
  const items = [
    'Hecho a mano',
    '✦',
    'Ingredientes selectos',
    '✦',
    'Personalización total',
    '✦',
    'Entrega puntual',
    '✦',
    'Sin conservadores',
    '✦',
    'Recetas auténticas',
    '✦',
  ];

  return (
    <section className="border-y border-ink/10 py-6 overflow-hidden bg-cream">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-display italic text-2xl md:text-3xl px-8 text-ink/80">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
