const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/create", (req, res) => {
  db.User.create(req.body).then((newUser) => {
    res.json(newUser);
  });
});

router.get("/view", (req, res) => {
  db.User.findAll().then((allUsers) => {
    res.send(allUsers);
    console.log(allUsers);
  });
});

module.exports = router;
