import { useState, useEffect } from 'react';
import { saveOrder } from '../services/firebase';

export default function OrderForm({ item, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryDate: '',
    deliveryAddress: '',
    paymentMethod: 'efectivo',
  });

  const [step, setStep] = useState('form'); // form | loading | success | error
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  // Min date = 2 days from now (48h anticipación)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  const minDateStr = minDate.toISOString().split('T')[0];

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && step === 'form') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, step]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('loading');

    try {
      const order = {
        ...formData,
        item: {
          dessertId: item.dessert.id,
          dessertName: item.dessert.name,
          flavor: item.flavor,
          size: item.size.label,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        },
        status: 'pendiente',
        createdAt: new Date().toISOString(),
      };

      const id = await saveOrder(order);
      setOrderId(id);
      setStep('success');
    } catch (err) {
      console.error('Error al guardar pedido:', err);
      setError(err.message || 'Error al procesar el pedido');
      setStep('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={() => step === 'form' && onClose()} />

      <div className="relative w-full max-w-3xl bg-paper m-0 md:m-6 animate-scale-in max-h-screen overflow-y-auto">
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="label-mono text-stone mb-2">Paso 02 / 02</div>
                <h2 className="font-display text-4xl md:text-5xl leading-tight">
                  Finaliza tu<br />
                  <span className="italic">pedido.</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="label-mono hover:tracking-[0.3em] transition-all duration-300"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Resumen del pedido */}
            <div className="bg-cream p-6 mb-8">
              <div className="label-mono text-stone mb-3">Tu pedido</div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-display text-2xl">{item.dessert.name}</div>
                  <div className="text-sm text-ink/70 mt-1">
                    {item.flavor} · {item.size.label} · ×{item.quantity}
                  </div>
                  {item.specialInstructions && (
                    <div className="text-xs text-ink/60 mt-2 italic">
                      "{item.specialInstructions}"
                    </div>
                  )}
                </div>
                <div className="font-display text-2xl">${item.totalPrice}</div>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nombre completo" name="name" value={formData.name} onChange={handleChange} required />
                <Field label="Teléfono" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              <Field label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Fecha de entrega"
                  name="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  min={minDateStr}
                  required
                />
                <div>
                  <label className="label-mono block mb-2">Método de pago</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full p-4 border border-ink/20 focus:border-ink focus:outline-none bg-transparent text-sm transition-all duration-300"
                  >
                    <option value="efectivo">Efectivo (al recibir)</option>
                    <option value="transferencia">Transferencia bancaria</option>
                    <option value="tarjeta">Tarjeta (próximamente)</option>
                  </select>
                </div>
              </div>

              <Field
                label="Dirección de entrega"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                placeholder="Calle, número, colonia, ciudad"
                required
              />
            </div>

            <p className="label-mono text-stone mt-6">
              * Requiere mínimo 48h de anticipación.
            </p>

            <button type="submit" className="btn-primary w-full mt-8">
              Confirmar pedido — ${item.totalPrice}
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </button>
          </form>
        )}

        {step === 'loading' && (
          <div className="p-16 text-center">
            <div className="font-display italic text-3xl text-stone animate-pulse">
              Procesando tu pedido…
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 md:p-16 text-center">
            <div className="label-mono text-stone mb-6">Confirmación</div>
            <h2 className="font-display text-5xl md:text-6xl mb-6">
              ¡Pedido <span className="italic">recibido</span>!
            </h2>
            <p className="text-base text-ink/70 max-w-md mx-auto mb-8">
              Tu pedido ha sido registrado correctamente. Pronto recibirás un correo con los detalles.
            </p>
            {orderId && (
              <div className="bg-cream p-4 inline-block mb-8">
                <div className="label-mono text-stone mb-1">Folio</div>
                <div className="font-mono text-lg">{orderId.substring(0, 12).toUpperCase()}</div>
              </div>
            )}
            <div>
              <button onClick={onClose} className="btn-primary">
                Volver al catálogo
              </button>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="p-12 md:p-16 text-center">
            <div className="label-mono text-stone mb-6">Error</div>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Algo salió <span className="italic">mal.</span>
            </h2>
            <p className="text-base text-ink/70 max-w-md mx-auto mb-8">
              {error}
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep('form')} className="btn-secondary">
                Reintentar
              </button>
              <button onClick={onClose} className="btn-ghost">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de campo reutilizable
function Field({ label, ...props }) {
  return (
    <div>
      <label className="label-mono block mb-2">{label}</label>
      <input
        {...props}
        className="w-full p-4 border border-ink/20 focus:border-ink focus:outline-none bg-transparent text-sm transition-all duration-300"
      />
    </div>
  );
}
