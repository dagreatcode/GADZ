const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const db = require("../models");
const stripe = new Stripe(`${process.env.STRIPE_API}`, {
  apiVersion: "2022-11-15",
});

const quantity = 25;
// Route to create subscription
router.post("/create-subscription", async (req, res) => {
  try {
    console.log("Hit 1st");

    // Get userId from request body
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.SOCKET_IO_SERVER_PORT}/Checkout`,
      cancel_url: `${process.env.SOCKET_IO_SERVER_PORT}/Canceled`,
      line_items: [
        {
          price: `${process.env.STRIPE_PRICE}`,
          quantity: quantity,
        },
      ],
      mode: "subscription",
    });

    console.log("Session created with ID: ", session.id);
    console.log(session);
    // Update user's subscription session ID
    const [updatedRows] = await db.User.update(
      { sessionId: session.id, subscribed: true },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: "User not found or not updated" });
    }

    console.log("User subscription session ID updated successfully");

    // Send back the session URL to the client
    res.json({ url: session.url });
  } catch (e) {
    console.error("Error creating subscription:", e.message);
    res.status(500).json({ error: e.message });
  }

  // const { priceId } = req.body;
  // if (!priceId) {
  //   return res.status(400).json({ error: "Price ID is required" });
  // }

  // try {
  //   console.log("Try to Create");
  //   // Create a customer (typically get email from frontend or logged-in user)
  //   const customer = await stripe.customers.create({
  //     email: "customer@example.com", // Replace with actual customer email
  //   });

  //   // Create subscription
  //   const subscription = await stripe.subscriptions.create({
  //     customer: customer.id,
  //     items: [{ price: priceId }],
  //     payment_behavior: "default_incomplete",
  //     expand: ["latest_invoice.payment_intent"],
  //   });

  //   // Send the clientSecret to frontend
  //   const clientSecret =
  //     subscription.latest_invoice.payment_intent.client_secret;
  //   res.status(200).json({ clientSecret });
  // } catch (error) {
  //   console.error("Error creating subscription:", error);
  //   res.status(400).json({ error: { message: error.message } });
  // }
});

module.exports = router;
