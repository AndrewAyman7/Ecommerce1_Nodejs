const express = require("express")
const path = require("path")

const session = require("express-session")
const sessionStoreDB = require("connect-mongodb-session")(session)

const flash = require("connect-flash")

const homeRoute = require("./routes/homeRoute");
const productRoute = require("./routes/productRoute");
const authorityRoute = require("./routes/authorityRoute");
const cartRoute = require("./routes/cartRouter");


const app = express()

app.use( express.static(path.join(__dirname,"assets" )) ) 
app.use( express.static(path.join(__dirname,"images" )) )  


//----------- Sessions -----------
const STORE = new sessionStoreDB({      // Will Make the collection
    uri: "mongodb://localhost:27017/online-shop",
    collection: "sessions"
})

app.use(session({
    secret: "that is my secret, ana andrew ylaaaaa",
    saveUninitialized: false,
    store : STORE
})) 

app.use(flash())


app.set("view engine","ejs")
app.set("views","views")


app.use("/", homeRoute)
app.use("/product", productRoute)  
app.use("/", authorityRoute)
app.use("/admin", authorityRoute)  

app.use("/cart", cartRoute) 

app.listen(3000, (err)=>{
    console.log(err)
    console.log("Server Listen on port 3000")
})
