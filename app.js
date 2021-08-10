const express = require("express");
const app = express();
const productRouter=require("./api/routes/product")
const orderRouter=require("./api/routes/orders")
const messageRouter=require("./api/routes/message")
const mongoose=require("mongoose")
const cors=require("cors")
require('dotenv').config()
 


 
const morgan=require("morgan");

const userRoute=require("./api/routes/user")
mongoose.connect('mongodb://'+process.env.DB_h+'/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( function (s){
   console.log("connected")
}); 


  
  
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

 const swaggerOptions = {
  swaggerDefinition: {
    info: {
      openapi: '3.0.0',
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:2000"]
    }
  },
 
  // ['.routes/*.js']
  apis: ["./api/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


 

/////////////////
app.use(morgan("dev"))
app.use(express.json())

//
//app.use(cors())
 var corsOptions = {
 origin: '*',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
 app.use(cors())


//  app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
// //  res.header(" Access-Control-Allow-Headers","*")
//    if(req.method==="OPTIONS"){
//     res.header("Access-Control-Allow-Methods",'GET', 'PUT', 'POST','DELETE')
//     res.status(200).json({})
//   }
// next();
//   });
 /////////////////////routes
 app.use("/uploads",express.static('uploads'))
app.use("/products",productRouter)

app.use("/orders",orderRouter)
app.use("/user",userRoute)
app.use("/message",messageRouter)
//this catch any error less 500 status code
app.use(function(req,res,next){
   console.log("1")
    const error=Error("NOT Found!")
    error.status=404
    //res.send(error)
    next(error)
 })
app.use(function (err, req, res, next) {
   console.log("error")
     res.status(err.status||500).json({'message':err.message})
  });
 
//
module.exports = app
