exports.isUserLogin = (req,res,next) =>{
    if(req.session.userId)
        next()   // if != undefined
    else
        res.redirect("/login")
} 


exports.isUserNotLogin = (req,res,next) =>{
    if(!req.session.userId)       // if he not login , eshtaa wdeeh le saf7a el login
        next()  
    else                          // lw hwa login , ( W katb fe el Url /login , laaa wdeeh elhome )
        res.redirect("/")
}



exports.isUserAdmin = (req,res,next)=>{
    if(req.session.isAdmin)
        next()
    else
        console.log("Not Admin ....")
}