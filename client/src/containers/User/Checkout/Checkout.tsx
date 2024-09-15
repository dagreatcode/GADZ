import React from 'react'
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <>
      <h1>Checkout</h1>
      <p>This will show the user Subscription and when is the next due date. Coming Soon...</p>
      <p>This will also show the customers you have in your cart. This is a feature. We may stick to Sub Based</p>
      <Link to="/User">Home</Link><br />
    </>
  )
}

export default Checkout