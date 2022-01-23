const express = require("express")

router = express.Router();
usersRoute = require("../controllers/wreathsController")

router.get("/", wreathsRoute.wreathsController)

module.exports = router