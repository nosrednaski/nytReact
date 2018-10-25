const router = require("express").Router();
const articleRoutes = require("./articleRoutes");

router.use("/articles", articleRoutes);

module.exports = router;
