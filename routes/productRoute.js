const router = require("express").Router();

const productController = require("../controllers/productController")

router.get("/:id" , productController.productget) 


module.exports = router                                         
