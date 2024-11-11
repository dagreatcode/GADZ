import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

interface SubscriptionResponse {
  clientSecret: string;
}

const CheckoutForm: React.FC = () => {
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Please enter your card details.");
      setLoading(false);
      return;
    }

    try {
      // Send a request to create the subscription
      const { data }: { data: SubscriptionResponse } = await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/stripe/create-subscription`,
        { userId } // Pass userId as part of the request body
      );

      // Confirm the payment using the client secret from the backend
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
        setSuccess(true);
        alert("Subscription successful! Welcome aboard!");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create subscription");
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
