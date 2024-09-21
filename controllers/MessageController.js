const express = require("express");
const router = express.Router();
const db = require("../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

router.post("/cheat", (req, res) => {
  console.log(req.body);
  db.Message.create(req.body)
    .then((newMessage) => {
      res.json(newMessage);
    })
    .catch((error) => {
      console.error("Error creating message:", error);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/cheat", (req, res) => {
  db.Message.findAll()
    .then((messages) => {
      res.json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).send("Internal Server Error2");
    });
});

// router.post("/", async (req, res) => {
//   try {
//     const { content, sender, receiver } = req.body;

//     // Basic validation
//     if (!content || !sender || !receiver) {
//       return res.status(400).send("Bad Request: Missing required fields");
//     }

//     const newMessage = await db.Message.create({ content, sender, receiver });
//     res.json(newMessage);
//   } catch (error) {
//     console.error("Error creating message:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
