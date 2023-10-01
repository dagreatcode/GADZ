const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    db.User.findAll()
      //   .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOne: function (req, res) {
    db.User.findByPk(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(404).json(err));
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then((dbModel) => res.status(201).json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    const id = req.params.id;
    db.User.update(req.body, {
      where: { id: id },
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
        });
      });
  },
  delete: function (req, res) {
    const id = req.params.id;
    db.User.destroy({
      where: { id: id },
    })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
