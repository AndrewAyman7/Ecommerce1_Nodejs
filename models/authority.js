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
  
const User = mongoose.model("user",userSchema);  


var promise = require('promise');


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

//By Async Await
/*exports.createNewUser = async (data) =>{

    try{
        await mongoose.connect(DB_URL);
        let exist = await User.findOne( {email:data.email} );
    
        if(exist == null){
            let hashedPass = await bcrypt.hash(data.password,10);
            await new User({
                username: data.username,
                email:  data.email,
                password: hashedPass
            }).save();
            mongoose.disconnect();
            return;
        }else{
            mongoose.disconnect();
            throw("existttt");
        } 
    }catch(err){
        mongoose.disconnect();
        throw err;
    }


}

*/

exports.login = (email , pass)=>{
    return new promise( (resolve , reject)=>{
        var userIdStore 
        var isAdminStrore
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne( {email : email} )} 
        ).then((user)=>{
            if (!user){
                mongoose.disconnect()
                reject("The email is not exist")
            }
            else{
                userIdStore=user._id; 
                isAdminStrore = user.isAdmin;
                return bcrypt.compare(pass, user.pass)  
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



