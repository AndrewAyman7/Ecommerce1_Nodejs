const router = require("express").Router();
const protector = require("./routers protector/authorityProtector")

const { model } = require("mongoose");

const homeController = require("../controllers/homeController")   // import (controller page) => the Middleware that i will use


router.get("/", homeController.homeget) //router.get("/" , protector.isUserLogin ,homeController.homeget)->if you want home page appear if only user is login

module.exports = router                                           // Export the homeRoute .. 