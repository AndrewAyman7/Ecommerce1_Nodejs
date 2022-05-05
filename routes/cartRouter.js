const router = require("express").Router();
const protector = require("./routers protector/authorityProtector");
const check = require("express-validator").check;

bodyParser = require("body-parser");

const bodyParserMW = bodyParser.urlencoded({extended: true});

const cartController = require("../controllers/cartController");

router.post("/" , protector.isUserLogin , bodyParserMW ,
    check("amount").not().isEmpty().withMessage("amount is required").isInt( {min:1} ).withMessage("At Least 1 Item"),
    cartController.postCart
);


router.get("/" , protector.isUserLogin , cartController.getCart);


router.post("/save" , protector.isUserLogin , bodyParserMW ,
    check("amount").not().isEmpty().withMessage("amount is required").isInt( {min:1} ).withMessage("At Least 1 Item"),
    cartController.postSave
); 

router.post("/delete" , protector.isUserLogin , bodyParserMW , cartController.postDelete
); 

module.exports = router;