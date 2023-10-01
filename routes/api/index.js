const router = require("express").Router();
const testRoutes = require("./testRoutes");

router.use("/tests", testRoutes);

module.exports = router;
