const express = require("express");
const router = express.Router();
const db = require("../models");

// POST: Create a new message
router.post("/cheat", (req, res) => {
  const { sender, receiver, content } = req.body;

  // Basic validation
  if (!sender || !receiver || !content) {
    return res
      .status(400)
      .json({ success: false, error: "Bad Request: Missing required fields" });
  }

  console.log(req.body);
  db.Message.create(req.body)
    .then((newMessage) => {
      res.status(201).json({ success: true, message: newMessage }); // Return 201 for created resource
    })
    .catch((error) => {
      console.error("Error creating message:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" }); // Return error response
    });
});

// GET: Retrieve all messages
router.get("/cheat", (req, res) => {
  db.Message.findAll()
    .then((messages) => {
      res.status(200).json(messages); // Return 200 for successful retrieval
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).send("Internal Server Error");
    });
});

// POST: Create a new message (alternative endpoint)
router.post("/", async (req, res) => {
  const { content, sender, receiver } = req.body;

  // Basic validation
  if (!content || !sender || !receiver) {
    return res.status(400).send("Bad Request: Missing required fields");
  }

  try {
    const newMessage = await db.Message.create({ content, sender, receiver });
    res.status(201).json(newMessage); // Return 201 for created resource
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
