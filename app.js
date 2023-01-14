// Basic 
// Import Express
const express = require('express');

//Import Router 
const router = require('./src/routes/api');

// Create Express Object
const app= new express();

// Import Body-parser
const bodyParser=require('body-parser');

// Security Middleware
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss= require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');

// Database
// Import Mongoose
const mongoose=require('mongoose');

// Implement Security Middleware
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Implement Body-parser
app.use(bodyParser.json());

// Implement Rate-limit
const limiter =rateLimit({windowMs:10*60*1000,max:2000})  //Maximum 2000 http Request from a Client in 10 minutes.
app.use(limiter);

// Connect to Database with Mongoose
let URI="mongodb://localhost:27017/Todo" //"ConnectionString/databaseName" in URI Variable
let OPTION={user:'',pass:'',autoIndex:true}  //There are no Username & Pass. for database, thats why its Null, and for auto Indexing autoIndex:true
//Connection Establish
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connected With database")
    console.log(error);
})

// Implement Routing end-point
app.use("/api/v1",router)

// Implement Undefined router
app.use("*",(req,res)=>{
    res.status(404).json({data:"Address not Found"})
});

//Export App
module.exports=app;
