const express = require("express");
const router = express.Router();
const db = require("../models");
// const cors = require("cors");

// const app = express();

// // Allow all domains (use cautiously in production)
// app.use(cors());

// Get all newsletters
// router.get("/pay", async (req, res) => {
//   try {
//     const newsletters = await db.Newsletter.find(); // Assuming you're using a model named "Newsletter"
//     res.json(newsletters);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching newsletters." });
//   }
// });

router.get("/pay", (req, res) => {
  db.NewsLetter.findAll().then((allLetters) => {
    res.json(allLetters);
  });
});

// Create a new newsletter
// router.post("/pay", async (req, res) => {
//   try {
//     // const { subject, description } = req.body;
//     const newNewsletter = new db.Newsletter(req.body);
//     await newNewsletter.save();
//     res.status(201).json(newNewsletter);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating newsletter." });
//   }
// });

// router.post("/pay2", (req, res) => {
//   console.log(req.body);
//   db.Newsletter.create(req.body)
//     .then((newLetter) => {
//       res.json({
//         error: false,
//         data: newLetter,
//         message: "Successfully created a new News Letter.",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: true,
//         data: null,
//         message: "Unable to create new ticket.",
//       });
//     });
// });

router.post("/pay", (req, res) => {
  db.NewsLetter.create(req.body).then((newLetter) => {
    res.json(newAdmin);
  });
});

// Update a newsletter
router.put("/:id", async (req, res) => {
  try {
    const { subject, description } = req.body;
    const updatedNewsletter = await db.Newsletter.findByIdAndUpdate(
      req.params.id,
      { subject, description },
      { new: true }
    );
    res.json(updatedNewsletter);
  } catch (error) {
    res.status(500).json({ message: "Error updating newsletter." });
  }
});

// Delete a newsletter
router.delete("/:id", async (req, res) => {
  try {
    await db.Newsletter.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting newsletter." });
  }
});

module.exports = router;
