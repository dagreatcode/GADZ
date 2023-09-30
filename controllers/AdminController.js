const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.Admin.create(req.body).then((newAdmin) => {
    res.json(newAdmin);
  });
});

router.get("/allAdmins", (req, res) => {
  // ALL the Things should be displayed
  // DB query
  db.Admin.findAll().then((allAdmins) => {
    res.json(allAdmins);
  });
});

router.get("/viewAdmin", (req, res) => {
  db.Admin.findAll().then((allAdmins) => {
    res.send(allAdmins);
    //     var adminAdmin = req.params.apiFun;
    // console.log(adminAdmin);
    console.log(allAdmins);
  });
});
// router.get("/api/render", (req, res) => {
//   // ALL the Things should be displayed
//   // DB query
//   db.Admin.findAll().then((allAdmins) => {
//     res.render("/Home");
//   });
// });

module.exports = router;

// // const express = require("express");
// import router from "express.Router()";
// import db from "../models";

// export const AdminController = () => {
//   router.post("/", (req, res) => {
//     db.Admin.create(req.body).then((newAdmin) => {
//       res.json(newAdmin);
//     });
//   });

//   router.get("/allAdmins", (req, res) => {
//     db.Admin.findAll().then((allAdmins) => {
//       res.json(allAdmins);
//     });
//   });

//   router.get("/viewAdmin", (req, res) => {
//     db.Admin.findAll().then((allAdmins) => {
//       res.send(allAdmins);
//       console.log(allAdmins);
//     });
//   });
// };
