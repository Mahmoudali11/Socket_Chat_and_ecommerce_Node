
 const message=require("../models/message")
const mongoose = require("mongoose");


 module.exports.getMessage= function(req,res,next){

    
message.find( {
        sid:req.params.sid
    }
          ).then(result=>{
              console.log("success")
               res.status(200).json(result)
          }).catch(err=>{
              console.log("faild")
             res.status(500).json({message:err.message})
          })
}

//////////
module.exports.sendMessage=function(req,res,next){
  
    console.log("waiting...")
     const m=new message({
         _id:mongoose.Types.ObjectId(),
         sid:req.body.sid,
         rid:req.body.rid,
         message:req.body.message
     });
     
     m.save().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json(err)
    })
         
     
    
         
        }