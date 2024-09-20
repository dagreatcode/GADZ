import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

interface SubscriptionResponse {
  clientSecret: string;
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      return;
    }

    // Retrieve the card details from the CardElement
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card details not entered.');
      return;
    }

    try {
      // Make a request to your backend to create the subscription
      const { data }: { data: SubscriptionResponse } = await axios.post(
        '/api/create-subscription', 
        { priceId: 'your-price-id' } // The price ID for the subscription plan
      );

      // Confirm the payment with the clientSecret from the subscription response
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        alert('Subscription successful!');
      }
    } catch (err) {
      setError('Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default CheckoutForm;