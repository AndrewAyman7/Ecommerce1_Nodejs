const authorityModel = require("../models/authority")

const productModel = require("../models/products")

const validationRes = require("express-validator").validationResult


//------------ Register --------------//
exports.getSignup = (req,res,next)=>{
    res.render("signup" , {invalidRegister : req.flash("invalidRegister") , isUser : req.session.userId , isAdmin : false} ) // saved in flash session (server)
}

exports.postSignup = (req,res,next)=>{
    if (validationRes(req).isEmpty()) {  // if there is no invalid input
    authorityModel.createNewUser(req.body.username, req.body.email, req.body.pass).then(()=>res.redirect("/login")).catch((err)=>res.redirect("/signup") )
    }

    else{
        req.flash("invalidRegister", validationRes(req).array())
        res.redirect("/signup") // = get("/signup") ..
    }
}


//------------ Login --------------//
exports.getLogin = (req,res,next)=>{
    res.render("login" , { logError : req.flash("loginError")[0], isUser : req.session.userId, isAdmin : false }) // Pass the error to ejs file , to print it
} 

exports.postLogin = (req,res,next)=>{
    authorityModel.login(req.body.email, req.body.pass)    // kda ana 3mlt call lel fun, and passed the parameters\
    .then((result)=>{                                          // id ?!!  -> yessss, because login fun returns user id (resolve)
        req.session.userId = result.id
        req.session.isAdmin = result.isAdmin
        res.redirect("/")                                  // go to Home page
    }).catch(err=>{
        req.flash("loginError" , err)   //1- Save the error in flash
        res.redirect("/login") 
    })
}

exports.logout = (req,res,next)=>{
    req.session.destroy( ()=>{res.redirect("/")} ) 
}






//---------------------------- Admin ----------------------------//

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