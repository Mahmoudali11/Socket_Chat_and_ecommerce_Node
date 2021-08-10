const jwt=require("jsonwebtoken")
require("dotenv").config()
module.exports=function(req,res,next){
    try{
        console.log( process.env.JWT_KEY)
      const token= req.headers.authorization.split(" ")[1]
  console.log(token.email)
   const decode=jwt.verify(token,process.env.JWT_KEY)
   console.log("tk"+decode.email)
   req.userData=decode;
   next()
}
   catch{
       res.status(401).json({"message":"Auth faild!!"})
   }


}