import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

interface SubscriptionResponse {
  clientSecret: string;
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false); // Reset success message

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details not entered.");
      return;
    }

    try {
      const { data }: { data: SubscriptionResponse } = await axios.post(
        "/api/create-subscription",
        {
          priceId: "your-price-id", // The price ID for the subscription plan
        }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSuccess(true); // Set success state
        alert("Subscription successful! Welcome aboard!");
      }
    } catch (err) {
      setError("Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
        }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && (
        <div style={{ color: "green" }}>Subscription successful!</div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default CheckoutForm;
