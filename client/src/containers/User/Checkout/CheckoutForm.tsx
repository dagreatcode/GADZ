import React, { useState } from "react";
import axios from "axios";

interface SubscriptionResponse {
  url: string;
}

const CheckoutForm: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubscription = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send a request to create the subscription
      const { data }: { data: SubscriptionResponse } = await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/stripe/create-subscription`,
        { userId }
      );

      // Redirect the user to the session URL from the response
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Subscribe to Our Service</h2>
      <p style={{ color: "#555" }}>
        Enjoy full access to all features with our subscription plan.
      </p>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {success && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          Subscription successful! Welcome aboard!
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={handleSubscription}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
};

export default CheckoutForm;
