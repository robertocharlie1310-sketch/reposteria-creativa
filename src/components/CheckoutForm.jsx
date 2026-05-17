import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ totalPrice, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  const cardStyle = {
    style: {
      base: {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#1a1a1a',
        '::placeholder': { color: '#999' },
      },
      invalid: { color: '#e53e3e' },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setCardError('');

    const cardElement = elements.getElement(CardElement);

    // Modo sandbox: creamos un PaymentMethod sin cobrar realmente
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      onError(error.message);
      return;
    }

    // Pago simulado exitoso en sandbox
    console.log('✅ PaymentMethod creado (sandbox):', paymentMethod.id);
    setProcessing(false);
    onSuccess(paymentMethod.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="label-mono block mb-2">Datos de tarjeta</label>
        <div className="p-4 border border-ink/20 focus-within:border-ink transition-all duration-300">
          <CardElement options={cardStyle} />
        </div>
        {cardError && (
          <p className="text-red-500 text-xs mt-2 label-mono">{cardError}</p>
        )}
        <p className="label-mono text-stone text-xs mt-2">
          🔒 Modo sandbox — usa la tarjeta de prueba: 4242 4242 4242 4242
        </p>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Procesando…' : `Pagar $${totalPrice}`}
        {!processing && (
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        )}
      </button>
    </form>
  );
}