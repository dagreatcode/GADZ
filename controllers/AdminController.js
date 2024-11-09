const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  db.Admin.create(req.body).then((newAdmin) => {
    res.json(newAdmin);
  });
});

router.get("/allAdmins", (req, res) => {
  db.Admin.findAll().then((allAdmins) => {
    res.json(allAdmins);
  });
});

router.get("/viewAdmin", (req, res) => {
  db.Admin.findAll().then((allAdmins) => {
    res.send(allAdmins);
    // console.log(allAdmins);
  });
});

router.post("/adminLogin", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  // console.log("Req.Body", req.body);
  if (!email || !password) {
    return res.status(422).json({
      error: true,
      data: null,
      message: "Email and Password are required fields!",
    });
  } else {
    // .compare(email, Admin.password)
    db.Admin.findOne({ where: { email: email } }).then((foundAdmin) => {
      // console.log("foundU Data", foundAdmin.email);
      if (!foundAdmin) {
        return res.status(401).json({
          error: true,
          data: foundAdmin,
          message: "Admin not found.",
        });
      }

      bcrypt.compare(password, foundAdmin.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            error: true,
            data: null,
            message: "Invalid Email or Password.",
          });
        }

        // Create token
        const token = jwt.sign({ id: foundAdmin._id }, process.env.SECRET, {
          expiresIn: "7d",
        });

        // Remove password from output
        foundAdmin.password = undefined;

        res.status(200).json({
          error: false,
          data: { token: token, admin: foundAdmin },
          message: null,
        });
      });
    });
  }
});

router.post("/adminSignUp", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  if (!email || !password) {
    res.status(400);
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        db.Admin.create({
          email: req.body.email,
          password: hashedPassword,
        })
          .then((newAdmin) => {
            const token = jwt.sign(
              { email: newAdmin.email },
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

module.exports = router;
