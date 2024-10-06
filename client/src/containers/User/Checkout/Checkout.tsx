import { Link } from "react-router-dom";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const Checkout: React.FC = () => {
  return (
    <div className="container">
      <h1>Checkout</h1>
      <p>
        Subscribe to our platform to gain access to exclusive content, features,
        and support. Choose your plan, enter your payment details, and start
        enjoying the benefits immediately!
      </p>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <Link to="/User" className="home-link">
        Home
      </Link>
      <br />
    </div>
  );
};

export default Checkout;
