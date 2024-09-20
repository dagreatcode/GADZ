import { Link } from "react-router-dom";
import React from // , { useState }
"react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  Elements,
  // CardElement,
  // useStripe,
  // useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const Checkout: React.FC = () => {
  return (
    <>
      <div className="container">
        <h1>Checkout</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        <Link to="/User">Home</Link>
        <br />
      </div>
    </>
  );
};

export default Checkout;

// Initialize Stripe
