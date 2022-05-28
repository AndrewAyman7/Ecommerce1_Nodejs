const router = require("express").Router();
const protector = require("./routers protector/authorityProtector")

const { model } = require("mongoose");

const homeController = require("../controllers/homeController")   


router.get("/", homeController.homeget) 

module.exports = router                                         
