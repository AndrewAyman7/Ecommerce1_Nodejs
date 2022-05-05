const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const DB_URL = "mongodb://localhost:27017/online-shop"

const userSchema = mongoose.Schema( {
    username : String,
    email : String,
    pass : String,
    isAdmin : {
        type: Boolean,
        default: false
    }
} )
  
const User = mongoose.model("user",userSchema);  // Will Make a cllection called "users"


var promise = require('promise');

//------------------ 1- Signup --------------------//

exports.createNewUser = (name , email , password )=>{

        return new promise( (resolve,reject) => {
            mongoose.connect(DB_URL).then(()=>{
                return User.findOne( {email:email} )
            }).then(user =>{
                if(user){
                    mongoose.disconnect()
                    reject("email is used")}
                else {
                    return bcrypt.hash(password,10)
                }
            }).then(encryptedPass=>{
                let user = new User({
                    username: name,
                    email: email,
                    pass: encryptedPass
                }) 
                return user.save()
            }).then( ()=>{
                mongoose.disconnect()
                resolve()
            })
        } ).catch( (err)=>{
            mongoose.disconnect()
            reject(err)
        })

}

//------------------ 2- Login --------------------//

exports.login = (email , pass)=>{
    return new promise( (resolve , reject)=>{
        var userIdStore 
        var isAdminStrore
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne( {email : email} )} // User -> The Collection
        ).then((user)=>{
            if (!user){
                mongoose.disconnect()
                reject("The email is not exist")
            }
            else{
                userIdStore=user._id; // To use it outside this scope
                isAdminStrore = user.isAdmin;
                return bcrypt.compare(pass, user.pass)  // compare -> Return a Promise (true/false) , i will call it same
            }
        }).then((same)=>{
            if (!same){
                mongoose.disconnect()
                reject("The Password is incorrect")
            }
            else{
                mongoose.disconnect()
                resolve({
                    id : userIdStore,
                    isAdmin : isAdminStrore
                })
            }
        })
    } )
}


//------------------ 3- Add new Product --------------------//

