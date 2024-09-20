const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const stripe = Stripe("your-secret-key-here");

router.use(bodyParser.json());

router.post("/api/create-subscription", async (req, res) => {
  const { priceId } = req.body;

  try {
    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      email: "customer@example.com", // Get customer email from frontend
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    // Send clientSecret to the frontend to confirm the payment
    res.json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
});

module.exports = router;
