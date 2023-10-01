const router = require("express").Router();
const testsController = require("../../controllers/testController");

// Matches with "/api/tests"
router
  .route("/")
  .get(testsController.findAll)
  .post(testsController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(testsController.findOne)
  .put(testsController.update)
  .delete(testsController.delete);

module.exports = router;
