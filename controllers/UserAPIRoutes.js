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

module.exports = router;