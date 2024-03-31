const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/create", (req, res) => {
  db.Agreement.create(req.body).then((newAgreement) => {
    res.json(newAgreement);
  });
});

router.get("/view", (req, res) => {
  db.Agreement.findAll().then((allAgreements) => {
    res.send(allAgreements);
    console.log(allAgreements);
  });
});

module.exports = router;
