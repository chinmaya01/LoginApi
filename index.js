const express= require('express')
const mongoose = require("mongoose");
const dotenv= require('dotenv')

dotenv.config()


const app= express()


// Import Routes
 const AuthRoutes=require('./routes/auth')
 const PrivateRoute=require('./routes/postRoute')


  app.use(express.json());
//Middleware
 app.use('/api/user',AuthRoutes)
 app.use('/api/posts',PrivateRoute)



app.listen(process.env.PORT|| 3000,()=>{
    console.log("Server Up and Running")
})

//connect to DB
mongoose.connect(
  "mongodb+srv://ganji:1234@cluster0.tzdn2.mongodb.net/test?retryWrites=true&w=majority"
  { useUnifiedTopology: true, useNewUrlParser: true },
).then(console.log("Connected to DB")).catch((err)=>console.log(err+"Occured"));