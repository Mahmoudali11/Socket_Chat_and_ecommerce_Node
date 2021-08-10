const expres=require("express");
const cors=require("cors");
const Product=require("../models/products.js");
const mongoose=require("mongoose")
const multer=require("multer")
const checkAuth=require("../middelware/check_auth")
const productController=require("../controller/product")

var storag = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      console.log(file.size)
      cb(null, file.originalname)
    }
  })
  
const uploader=multer({storage:storag,fileFilter:function (req,file,cby){
console.log(file.size)
if((file.mimetype=='image/png'|| file.mimetype=='image/jpeg'||file.mimetype=='video/mp4'))

cby(null,true)
else{
  console.log("what gose wrong?"+file.size)
  cby(Error("not defiend image select png one "),false)
}

},limits:{fileSize:7555431100}})
const router=expres.Router();
//const mongoose=require("mongoose");
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

  
router.get("/",cors(corsOptions),productController.getProducts);
 
/**
 * @swagger
 * /products:
 *   get:
 *     parameters:
 *     - in: header
 *       name: authorization
 *       type: string 
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         
 *         
 *       
 *         
 *         
 */



///
/**
* @openapi
*  /products:
*  post:
*      summary: Creates a new user.
*      consumes:
*        - multipart/form-data
*      parameters:
*         - in: formData
*           name: pimg
*           type: file
*         - in: formData
*           name: name
*           type: String
*         - in: formData
*           name: price
*           type: String
*         - in: header
*           name: authorization
*           type: String   
*      responses:
*        201:
*          description: Created 
*/
router.post("/",checkAuth,uploader.single('pimg'),productController.addProduct
);

///////////////

/////

////
router.get("/:id",checkAuth,productController.getProductById);

//////////////////////////
    router.put("/:id",checkAuth,productController.updateProduct);                      
  
   router.delete("/:id",checkAuth,productController.deleteProduct)
   router.get("/message/user",function(req,res,next){
    console.log("socket!")
      res.json("socket created")
    })
////////////////


module.exports=router
