const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.Employee.create(req.body).then((newEmployee) => {
    res.json(newEmployee);
  });
});

router.get("/allEmployee", (req, res) => {
  db.Employee.findAll().then((allEmployees) => {
    res.json(allEmployees);
  });
});

router.get("/viewEmployee", (req, res) => {
  db.Employee.findAll().then((allEmployees) => {
    res.send(allEmployees);
    console.log(allEmployees);
  });
});

router.post("/employeeLogin", (req, res) => {
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
    // .compare(email, Employee.password)
    db.Employee.findOne({ where: { email: email } }).then((foundEmployee) => {
      // console.log("foundU Data", foundEmployee.email);
      if (!foundEmployee) {
        return res.status(401).json({
          error: true,
          data: foundEmployee,
          message: "Employee not found.",
        });
      }

      bcrypt.compare(password, foundEmployee.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            error: true,
            data: null,
            message: "Invalid Email or Password.",
          });
        }

        // Create token
        const token = jwt.sign({ id: foundEmployee._id }, process.env.SECRET, {
          expiresIn: "7d",
        });

        // Remove password from output
        foundEmployee.password = undefined;

        res.status(200).json({
          error: false,
          data: { token: token, employee: foundEmployee },
          message: null,
        });
      });
    });
  }
});

router.post("/employeeSignUp", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  if (!email || !password) {
    res.status(400);
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        db.Employee.create({
          email: req.body.email,
          password: hashedPassword,
        })
          .then((newEmployee) => {
            const token = jwt.sign(
              { email: newEmployee.email },
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
