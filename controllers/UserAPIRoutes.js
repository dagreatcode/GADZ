require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const myPort = process.env.SOCKET_IO_SERVER_PORT || "http://localhost:3001"; // Default to a port if not set

router.use(
  cors({
    origin: myPort, // Use the port for the socket server as the origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

router.get("/view", (req, res) => {
  db.User.findAll().then((allUsers) => {
    res.send(allUsers);
    console.log(allUsers);
  });
});

router.get("/view/:id", (req, res) => {
  console.log(`Fetching user with ID: ${req.params.id}`);

  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).send("User not found");
      }
      console.log("Found User", foundUser);
      res.send(foundUser);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    });
});

router.put("/update/:id", async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const user = await db.User.findByPk(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    if (req.body.newPassword) {
      req.body.password = await bcrypt.hash(req.body.newPassword, 10);
    }

    await user.update(req.body); // Update user data
    const updatedUser = await db.User.findByPk(req.params.id);

    // Remove password before sending response
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

router.post("/signUp", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  if (!email || !password) {
    res.status(400);
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        db.User.create({
          email: req.body.email,
          password: hashedPassword,
        })
          .then((newUser) => {
            const token = jwt.sign(
              { email: newUser.email },
              process.env.SECRET
            );
            res.json({
              err: false,
              data: token,
              message: "Successfully signed up.",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to signUp.",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Password?",
        });
      });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Req.Body", req.body);
  if (!email || !password) {
    return res.status(422).json({
      error: true,
      data: null,
      message: "Email and Password are required fields!",
    });
  }

  db.User.findOne({ where: { email } })
    .then((foundUser) => {
      console.log("foundUser Data", foundUser);
      if (!foundUser) {
        return res.status(401).json({
          error: true,
          data: null,
          message: "User not found.",
        });
      }

      return bcrypt.compare(password, foundUser.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            error: true,
            data: null,
            message: "Invalid Email or Password.",
          });
        }

        // Create token
        const token = jwt.sign({ id: foundUser.id }, process.env.SECRET, {
          expiresIn: "7d",
        });

        // Remove password from output
        foundUser.password = undefined;

        res.status(200).json({
          error: false,
          data: { token, user: foundUser }, // Ensure user object is included
          message: null,
        });
      });
    })
    .catch((error) => {
      console.error("Error during login:", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    });
});

router.put("/user/update/:userId", async (req, res) => {
  const { newPassword } = req.body;

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    req.body.password = hashedPassword; // Use the hashed password
  }

  // Proceed with updating the user in the database...
});

module.exports = router;
