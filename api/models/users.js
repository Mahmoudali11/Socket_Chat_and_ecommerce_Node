



const mongoose=require("mongoose")
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema=mongoose.Schema({

    _id:mongoose.Types.ObjectId,
    name:String,
    email:{type:String,required:true,unique:true,match:re},
    password:{type:String ,required:true},
    isver:{type:Boolean, default:false}
    


})
  module.exports=mongoose.model("user",userSchema)