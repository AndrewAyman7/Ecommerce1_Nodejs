const modelCart = require("../models/cart")
const validationRes = require("express-validator").validationResult


// Take the data from the (Form) method post
exports.postCart = (req,res,next)=>{
    if (validationRes(req).isEmpty()){
        modelCart.addNewItem({ 
            name : req.body.name,
            price : req.body.price,
            amount : req.body.amount,
            productId : req.body.id,
            userId : req.session.userId,
            timeStamp : Date.now()   

        }).then( ()=> { res.redirect("/cart") } ).catch( (err)=> {console.log(err)} ) 
    }

    else {
        req.flash( "validErrors" , validationRes(req).array() );
        res.redirect(req.body.redirectTo)  
    }
} 



exports.getCart = (req,res,next)=>{
    modelCart.getItemById(req.session.userId).then(items => {
        res.render("cart" , { items : items,  isUser: true, isAdmin: req.session.isAdmin }) 

    }).catch(err => console.log(err))
}  



exports.postSave = (req,res,next)=>{
    if (validationRes(req).isEmpty()){
        modelCart.editItem( req.body.cartId, { amount:req.body.amount , timeStamp:Date.now() } ).then(
            ()=> { res.redirect("/cart") } ).catch( (err)=> {console.log(err)} ) 
    }

    else {
        req.flash( "validErrors" , validationRes(req).array() );
        res.redirect("/cart")  
    }
} 




exports.postDelete = (req,res,next)=>{
    modelCart.deleteItem(req.body.cartId).then(()=> { res.redirect("/cart") } ).catch( (err)=> {console.log(err)} ) 
} 



