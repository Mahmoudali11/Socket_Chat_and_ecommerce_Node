const expres=require("express");
const checkAuht=require("../middelware/check_auth")
const messageController=require("../controller/message")
 
const router=expres.Router();


router.get("/:sid",messageController.getMessage);

router.post("/",messageController.sendMessage)
module.exports=router;
