const router = require("express").Router();

const productController = require("../controllers/productController") // import

router.get("/:id" , productController.productget) 


module.exports = router                                         