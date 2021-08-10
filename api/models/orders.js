const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
_id:mongoose.Types.ObjectId,
uid:{type:String,ref:"user",required:true}
,
product:{type:mongoose.Types.ObjectId,ref:"prod"},
quantity:{type:Number,default:1}
});
module.exports=mongoose.model("order",orderSchema)