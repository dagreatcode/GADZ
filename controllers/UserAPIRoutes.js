const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/user", (req, res) => {
  db.User.create(req.body).then((newUser) => {
    res.json(newUser);
  });
});

router.get("/api/allUsers", (req, res) => {
    // ALL the Things should be displayed
    // DB query
    db.User.findAll().then((allUsers) => {
      res.json(allUsers);
    });
  });

  router.get("/api/View", (req, res) => {
    db.User.findAll().then((allUsers) => {
      res.send(allUsers);
  //     var adminUser = req.params.apiFun;
	// console.log(adminUser);
      console.log(allUsers);
    });
  });
  // router.get("/api/render", (req, res) => {
  //   // ALL the Things should be displayed
  //   // DB query
  //   db.User.findAll().then((allUsers) => {
  //     res.render("/Home");
  //   });
  // });

module.exports = router;