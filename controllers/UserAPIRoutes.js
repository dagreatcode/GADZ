require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

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
      // console.log("foundU Data", foundUser.email);
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

router.get("/view", (req, res) => {
  db.User.findAll().then((allUsers) => {
    res.send(allUsers);
    console.log(allUsers);
  });
});

router.post("/login2", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  db.User.findOne({ email: email })
    .then((foundUser) => {
      console.log("From Site", data); //Body
      console.log("From Database", foundUser); //Database

      if (foundUser) {
        // TODO: if too many failed attempts to login.
        bcrypt.compare(password, foundUser.password).then((result) => {
          if (!result) {
            return res.status(401).json({ message: "Wrong Password!" });
          } else {
            const token = signToken(foundUser.id);
            res.cookie("token", token);
            res.status(200).json({
              id: foundUser.id,
              // username: foundUser.username,
              email: foundUser.email,
              token: token,
            });
          }
        });
      } else {
        res.status(404).json({ message: "No user with that email address." });
      }
    })
    .catch((error) => {
      console.log(`Error in Login ${error}`);
      res.status(500).json({ message: `Error processing your request.` });
    });
});
//           .compare(data.password, foundUser.password)
//           .then(function (result) {
//             console.log("password:", password);
//             console.log("Found User Password:", foundUser.password);
//             console.log("The password match result: ", result);
//             if (result) {
//               const token = jwt.sign(
//                 { email: foundUser.email },
//                 process.env.SECRET
//               );
//               console.log("Token:", token);
//               res.json({
//                 err: false,
//                 data: token,
//                 message: "Successfully logged in.",
//               });
//             } else {
//               res.status(401).json({
//                 err: true,
//                 data: null,
//                 message: "Failed to sign in with result",
//               });
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//             res.status(401).json({
//               err: true,
//               data: null,
//               message: "Failed to comp pass",
//             });
//           });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         err: true,
//         data: null,
//         message: "Failed to find auth email",
//       });
//     });
// });

router.post("/login3", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  db.User.findOne({ email: email })
    .then((foundUser) => {
      console.log("From Site", data); //Body
      console.log("From Database", foundUser); //Database

      if (foundUser) {
        // TODO: if too many failed attempts to login.
        bcrypt

          .compare(data.password, foundUser.password)
          .then(function (result) {
            console.log("password:", password);
            console.log("Found User Password:", foundUser.password);
            console.log("The password match result: ", result);
            if (result) {
              const token = jwt.sign(
                { email: foundUser.email },
                process.env.SECRET
              );
              console.log("Token:", token);
              res.json({
                err: false,
                data: token,
                message: "Successfully logged in.",
              });
            } else {
              res.status(401).json({
                err: true,
                data: null,
                message: "Failed to sign in with result",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              err: true,
              data: null,
              message: "Failed to comp pass",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: true,
        data: null,
        message: "Failed to find auth email",
      });
    });
});

// router.post("/login", (req, res) => {
//   const data = req.body;
//   const email = data.email;
//   const password = data.password;
//   console.log("Req.Body", req.body);
//   if (!email || !password) {
//     return res.status(422).json({
//       error: true,
//       data: null,
//       message: "Email and Password are required fields!",
//     });
//   } else {
//     // .compare(email, user.password)
//     db.User.findOne({ email: email }).then((user) => {
//       console.log("User Data", user.email);
//       bcrypt.compare(email, user.email);
//       if (!user) {
//         return res.status(401).json({
//           error: true,
//           data: user,
//           message: "User not found.",
//         });
//       }

//       bcrypt.compare(password, user.password).then((result) => {
//         if (!result) {
//           return res.status(401).json({
//             error: true,
//             data: null,
//             message: "Invalid Email or Password.",
//           });
//         }

//         // Create token
//         const token = jwt.sign({ id: user._id }, process.env.SECRET, {
//           expiresIn: "7d",
//         });

//         // Remove password from output
//         user.password = undefined;

//         res.status(200).json({
//           error: false,
//           data: { token: token, user: user },
//           message: null,
//         });
//       });
//     });
//   }
// });

module.exports = router;
