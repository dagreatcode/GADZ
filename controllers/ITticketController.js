const express = require("express");
const router = express.Router();
const db = require("../models");

// VIEWS ROUTES

router.get("/view", (req, res) => {
  db.ITticket.findAll().then((allITticket) => {
    res.send(allITticket);
    console.log(allITticket);
  });
});

router.get("/ticket", (req, res) => {
  // ALL the Tickets should be displayed
  // DB query
  db.ITticket.findAll().then((allTickets) => {
    res.render("all-tickets", { allTickets: allTickets });
  });
});

router.get("/ticket/new", (req, res) => {
  res.render("new-ticket");
});

router.get("/ticket/:id", (req, res) => {
  db.ITticket.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundTicket) => {
    console.log(foundTicket);
    res.render("single-ticket", {
      name: foundTicket.name,
      price: foundTicket.price,
      id: foundTicket.id,
    });
  });
});

router.get("/ticket/:id/edit", (req, res) => {
  db.ITticket.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundTicket) => {
    console.log(foundTicket);
    res.render("edit-ticket", {
      name: foundTicket.name,
      price: foundTicket.price,
      id: foundTicket.id,
    });
  });
});

// API ROUTES

router.post("/post-ticket", (req, res) => {
  console.log(req.body);
  db.ITticket.create(req.body)
    .then((newTicket) => {
      res.json({
        error: false,
        data: newTicket,
        message: "Successfully created new IT ticket.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to create new ticket.",
      });
    });
});

router.put("/ticket/:id", (req, res) => {
  db.ITticket.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedObject) => {
    console.log(updatedObject);
    res.end();
  });
});

router.delete("/ticket/:id", (req, res) => {
  db.ITticket.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.end();
  });
});

module.exports = router;
