import { useState, useEffect } from 'react';

export default function CustomizeModal({ dessert, onClose, onConfirm }) {
  const [selectedFlavor, setSelectedFlavor] = useState(dessert.flavors[0]);
  const [selectedSize, setSelectedSize] = useState(dessert.sizes[1]); // default mediano
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calcular precio total
  const unitPrice = Math.round(dessert.basePrice * selectedSize.priceMultiplier);
  const totalPrice = unitPrice * quantity;

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleConfirm = () => {
    onConfirm({
      dessert,
      flavor: selectedFlavor,
      size: selectedSize,
      quantity,
      specialInstructions,
      unitPrice,
      totalPrice,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-6xl bg-paper m-0 md:m-6 grid grid-cols-1 md:grid-cols-2 animate-scale-in max-h-screen overflow-y-auto">
        {/* Image side */}
        <div className="relative aspect-square md:aspect-auto md:min-h-[600px] bg-cream">
          <img
            src={dessert.image}
            alt={dessert.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 label-mono text-paper bg-ink px-3 py-1.5">
            {dessert.code}
          </div>
        </div>

        {/* Content side */}
        <div className="p-8 md:p-12 flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="label-mono text-stone mb-2">{dessert.category}</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                {dessert.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="label-mono hover:tracking-[0.3em] transition-all duration-300 shrink-0 ml-4"
              aria-label="Cerrar"
            >
              Cerrar ✕
            </button>
          </div>

          <p className="text-base text-ink/70 leading-relaxed mb-10">
            {dessert.description}
          </p>

          {/* Flavor */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="label-mono">Sabor</h3>
              <span className="font-display italic text-stone">{selectedFlavor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dessert.flavors.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-4 py-2 text-sm border transition-all duration-300 ${
                    selectedFlavor === flavor
                      ? 'bg-ink text-paper border-ink'
                      : 'border-ink/20 hover:border-ink'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="label-mono">Tamaño</h3>
              <span className="font-display italic text-stone">{selectedSize.servings}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {dessert.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`p-4 border transition-all duration-300 text-left ${
                    selectedSize.id === size.id
                      ? 'bg-ink text-paper border-ink'
                      : 'border-ink/20 hover:border-ink'
                  }`}
                >
                  <div className="font-display text-lg leading-tight">{size.label}</div>
                  <div className="label-mono text-[10px] opacity-60 mt-1">
                    ${Math.round(dessert.basePrice * size.priceMultiplier)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="label-mono">Cantidad</h3>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 border border-ink/20 hover:border-ink transition-all duration-300 font-display text-xl"
                aria-label="Disminuir"
              >
                −
              </button>
              <div className="font-display text-3xl w-12 text-center">{quantity}</div>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="w-12 h-12 border border-ink/20 hover:border-ink transition-all duration-300 font-display text-xl"
                aria-label="Aumentar"
              >
                +
              </button>
            </div>
          </div>

          {/* Special instructions */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="label-mono">Instrucciones especiales</h3>
              <span className="label-mono text-stone">opcional</span>
            </div>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Mensaje en el pastel, alergias, decoración específica…"
              rows={3}
              className="w-full p-4 border border-ink/20 focus:border-ink focus:outline-none bg-transparent text-sm resize-none transition-all duration-300"
              maxLength={200}
            />
            <div className="text-right label-mono text-stone mt-1">
              {specialInstructions.length}/200
            </div>
          </div>

          {/* Total + CTA */}
          <div className="mt-auto pt-6 border-t border-ink/10">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="label-mono text-stone mb-1">Total</div>
                <div className="font-display text-4xl md:text-5xl">${totalPrice}</div>
              </div>
              <div className="text-right">
                <div className="label-mono text-stone mb-1">{quantity} × ${unitPrice}</div>
                <div className="label-mono text-stone">{selectedSize.label}</div>
              </div>
            </div>

            <button onClick={handleConfirm} className="btn-primary w-full">
              Continuar con el pedido
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
