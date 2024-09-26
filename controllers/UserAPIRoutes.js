require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

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
      console.log(foundUser);
      res.send(foundUser);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    });
});

router.put("/update/:id", async (req, res) => {
  console.log("Updating user...");

  try {
    console.log("Request Body:", req.body);

    const user = await db.User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const [updatedRows] = await db.User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows === 0) {
      console.log("No rows updated");
      return res.status(404).send("User not found");
    }

    console.log(`User with ID ${req.params.id} updated successfully.`);
    res
      .status(200)
      .send({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
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
  const data = req.body;
  const email = data.email;
  const password = data.password;
  console.log("Req.Body", req.body);
  if (!email || !password) {
    return res.status(422).json({
      error: true,
      data: null,
      message: "Email and Password are required fields!",
    });
  } else {
    // .compare(email, user.password)
    db.User.findOne({ where: { email: email } }).then((foundUser) => {
      console.log("foundU Data", foundUser);
      if (!foundUser) {
        return res.status(401).json({
          error: true,
          data: foundUser,
          message: "User not found.",
        });
      }

      bcrypt.compare(password, foundUser.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            error: true,
            data: null,
            message: "Invalid Email or Password.",
          });
        }

        // Create token
        const token = jwt.sign({ id: foundUser._id }, process.env.SECRET, {
          expiresIn: "7d",
        });

        // Remove password from output
        foundUser.password = undefined;

        res.status(200).json({
          error: false,
          data: { token: token, user: foundUser },
          message: null,
        });
      });
    });
  }
});

module.exports = router;
