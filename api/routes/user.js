const express=require("express")
const router=express.Router()

require("dotenv").config()
const userController=require("../controller/user")

router.post("/signup",userController.signUp)
////////////////deleting
router.delete("/:id",userController.deleteUser)
////////////
   
 
 
 
////////////////////////////
/**
* @openapi
*  /user/login:
*  post:
*      summary: Creates a new user.
*      consumes:
*        - application/json
*      parameters:
*        - in: body
*          name: user
*          description: The user to create.
*          schema:
*            type: object
*            properties:
*              email:
*                type: string
*              password:
*                    type: string
*              
*      responses:
*        201:
*          description: Created 
*/
 router.post("/login",userController.login)
 router.get("/verfy/:rand",userController.userV)



module.exports=router