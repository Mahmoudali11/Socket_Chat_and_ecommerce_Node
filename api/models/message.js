const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
_id:mongoose.Types.ObjectId,
sid:{type:String,required:true},
rid:{type:String,required:true}
,
 
message:{type:String}
});
module.exports=mongoose.model("message",orderSchema)