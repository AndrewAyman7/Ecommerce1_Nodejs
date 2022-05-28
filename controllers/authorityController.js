const authorityModel = require("../models/authority")

const productModel = require("../models/products")

const validationRes = require("express-validator").validationResult



exports.getSignup = (req,res,next)=>{
    res.render("signup" , {invalidRegister : req.flash("invalidRegister") , isUser : req.session.userId , isAdmin : false} )
}

exports.postSignup = (req,res,next)=>{
    if (validationRes(req).isEmpty()) {  
    authorityModel.createNewUser(req.body.username, req.body.email, req.body.pass).then(()=>res.redirect("/login")).catch((err)=>res.redirect("/signup") )
    }

    else{
        req.flash("invalidRegister", validationRes(req).array())
        res.redirect("/signup") 
    }
}



exports.getLogin = (req,res,next)=>{
    res.render("login" , { logError : req.flash("loginError")[0], isUser : req.session.userId, isAdmin : false }) 
} 

exports.postLogin = (req,res,next)=>{
    authorityModel.login(req.body.email, req.body.pass)    
    .then((result)=>{                                         
        req.session.userId = result.id
        req.session.isAdmin = result.isAdmin
        res.redirect("/")                                 
    }).catch(err=>{
        req.flash("loginError" , err)   //1- Save the error in flash
        res.redirect("/login") 
    })
}

exports.logout = (req,res,next)=>{
    req.session.destroy( ()=>{res.redirect("/")} ) 
}





exports.getAddProduct = (req,res,next) =>{
    res.render("addProduct" , {
        invalidProduct : req.flash("validationErrors"),
        isUser : true,
        isAdmin : true
    })
} 



exports.postAddProduct = (req, res, next) => {
    if (validationRes(req).isEmpty()) {
        req.body.image = req.file.filename;
        productModel
            .addNewProduct(req.body)
            .then(() => {
                req.flash("added", true);
                res.redirect("/admin/addProduct");
            })
            .catch(err => {
                res.redirect("/error");
            });
    } else {
        req.flash("validationErrors", validationRes(req).array());
        res.redirect("/admin/addProduct");
    }
};
