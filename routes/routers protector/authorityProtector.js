exports.isUserLogin = (req,res,next) =>{
    if(req.session.userId)
        next()   // if != undefined
    else
        res.redirect("/login")
} 


exports.isUserNotLogin = (req,res,next) =>{
    if(!req.session.userId)       // if he not login 
        next()  
    else                          
        res.redirect("/")
}



exports.isUserAdmin = (req,res,next)=>{
    if(req.session.isAdmin)
        next()
    else
        console.log("Not Admin ....")
}
