const modelProducts = require("../models/products")             


exports.homeget = (req,res,next)=>{        


    let category = req.query.category

    if (category && category !== "all" ) {
        modelProducts.getFilteredProducts(category).then(products=>{          
            res.render("index" , { products : products , isAdmin : req.session.isAdmin } )                   
        })
    } else {
        modelProducts.getProducts().then(products=>{                         
            res.render("index" , { products : products,  isUser : req.session.userId,  invalid : req.flash( "validErrors")[0], isAdmin : req.session.isAdmin } )  
            
        })
    }

    
}
