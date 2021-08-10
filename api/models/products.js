 const mongoose=require("mongoose")

const productSchema=mongoose.Schema({

    _id:mongoose.Types.ObjectId,
    name:String,
    price:{type:Number,required:true},
    pimg:{type:String ,required:true}
    


})
  module.exports=mongoose.model("prod",productSchema)