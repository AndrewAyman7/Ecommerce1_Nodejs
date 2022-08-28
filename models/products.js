const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/online-shop"

const productSchema = mongoose.Schema( {
    name : String,
    price : Number,
    description : String,
    category : String,
    image : String
} )
  
const product = mongoose.model("product",productSchema); 

var promise = require('promise');

exports.getProducts = ()=>{                         
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then(()=>{ return product.find({}) }).then(products =>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>{reject(err)})
    } )
}

exports.getProducts = async()=>{
    await mongoose.connect(DB_URL);
    let result = await products.find({});
    mongoose.disconnect();
    return result;
}


exports.getFilteredProducts = (category)=>{                        
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then(()=>{ return product.find({category:category}) }).then(products =>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>{reject(err)})
    } )
}



exports.getProductById = (id)=>{                         
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then(()=>{ return product.findById(id) }).then(products =>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>{reject(err)})
    } )
}




exports.addNewProduct = (productData)=>{                 
    return new promise( (resolve,reject) => {

        mongoose.connect(DB_URL).then(()=>{
            let newProduct = new product(productData);
            return newProduct.save();     //  =insert 
        }).then(products => {
            mongoose.disconnect();
            resolve(products);
        }).catch(err=> {
            mongoose.disconnect();
            reject(err)
        })

    } )
}
