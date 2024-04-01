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

router.get("/agreed/:id", (req, res) => {
  db.Agreement.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundAgreement) => {
    console.log(foundAgreement);
    res.send(foundAgreement);
    // res.render("single-thing", {
    //   id: foundThing.id,
    //   // email: foundThing.email,
    //   // date: foundThing.date,
    // });
  });
});

module.exports = router;
