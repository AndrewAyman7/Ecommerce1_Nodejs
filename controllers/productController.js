const modelProducts = require("../models/products")    // Import (DB Page) , to use its function

exports.productget = (req,res,next)=>{

    let id = req.params.id

    modelProducts.getProductById(id).then( (product)=>{
        res.render("productDetails" ,  {product:product , isUser : req.session.userId , invalid : req.flash( "validErrors")[0], isAdmin : req.session.isAdmin })        // new page 
    } )
}