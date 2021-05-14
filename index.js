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



app.listen(4200,()=>{
    console.log("Server Up and Running")
})

//connect to DB
mongoose.connect(
  process.env.DB_Connect,
  { useUnifiedTopology: true, useNewUrlParser: true },
).then(console.log("Connected to DB")).catch((err)=>console.log(err+"Occured"));