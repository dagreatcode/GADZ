const express = require("express");
const router = express.Router();
const db = require("../models");

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
    console.log(allAdmins);
  });
});

module.exports = router;
