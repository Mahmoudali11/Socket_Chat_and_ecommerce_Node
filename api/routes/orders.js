const expres=require("express");
const checkAuht=require("../middelware/check_auth")
const orderController=require("../controller/order")
console.log()
const router=expres.Router();

/**
 * @swagger
 * /orders:
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
router.get("/",checkAuht,orderController.getOrders);

//////////?/////
router.put("/:id",checkAuht,orderController.updateOrder);

 router.delete("/:id",checkAuht,orderController.deleteOrder);

///////////////

//////////////////////////
router.get("/:id",checkAuht,orderController.getOrderById);

router.post("/",checkAuht,orderController.addOrder);
////////////////
module.exports=router
