const modelProducts = require("../models/products")             // Import (DB Page) , to use its functions


exports.homeget = (req,res,next)=>{         // Export 


    let category = req.query.category

    if (category && category !== "all" ) {
        modelProducts.getFilteredProducts(category).then(products=>{          // use the fun  
            res.render("index" , { products : products , isAdmin : req.session.isAdmin } )                    // Pass the data to index.ejs 
        })
    } else {
        modelProducts.getProducts().then(products=>{                          // use the fun  
            res.render("index" , { products : products,  isUser : req.session.userId,  invalid : req.flash( "validErrors")[0], isAdmin : req.session.isAdmin } )  // Pass the data to index.ejs 
            
        })
    }

    
}
