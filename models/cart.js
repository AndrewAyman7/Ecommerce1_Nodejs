const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/online-shop"

const cartScheme = mongoose.Schema( {
    name : String,
    price : Number,
    amount : Number,
    productId : String,
    timeStamp : Number,
    userId : String
} )

const cartItem = mongoose.model("cart",cartScheme)


var promise = require('promise');  


exports.addNewItem = (itemData) =>{
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then( ()=>{
            let item = new cartItem(itemData)
            return item.save()
        } ).then( ()=>{
            mongoose.disconnect()
            resolve()
        } ).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    } )
}


exports.getItemById = (id) =>{
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then( ()=>{
            return cartItem.find( {userId : id} , {} , { sort : {timeStamp:1} }  )  
        } ).then( (items)=>{
            mongoose.disconnect()
            resolve(items)
        } ).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    } )
}


exports.editItem = (cartId , newData) =>{            
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then( ()=>{
            return cartItem.updateOne( {_id: cartId} , newData )
        } ).then( ()=>{
            mongoose.disconnect()
            resolve()
        } ).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    } )
}



exports.deleteItem = (cartId) =>{           
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then( ()=>{
            return cartItem.deleteOne( {_id : cartId} )
        } ).then( ()=>{
            mongoose.disconnect()
            resolve()
        } ).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    } )
}
