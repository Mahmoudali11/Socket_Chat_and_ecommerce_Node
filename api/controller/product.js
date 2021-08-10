const Product = require("../models/products.js");
const mongoose = require("mongoose")

module.exports.getProducts = function (req, res, next) {
/////this line like return no code after that excecuted
    Product.find(function (err, docs) {

        if (!err) {
            console.log("ds" + docs)
            res.status(200).json({
                "products":docs
                            })

        }
        else {
            console.log(err.message)
        }


    })

}
/////////////
module.exports.addProduct =
    function (req, res, next) {
        console.log("opss!" + req.file.size)
        const product = new Product({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            pimg: "http://localhost:2000/uploads/" + req.file.originalname



        }

        );


        product.save().then(result => {

            res.status(200).json({

                message: "hi from get method on ",
                productcreated: result

            })
        }).catch(err => {
            console.log("sorry")
            res.status(500).json({ "opss!": err })
        }
        );


    }
//////////////getProduct By Id


module.exports.getProductById = function (req, res, next) {
    Product.findById(req.params.id, function (err, doc) {

        if (!err)
            if (doc) {


                res.status(200).json({ "doc": doc })
            }
            else {
                res.status(404).json({ "not found": null })

            }
        else {
            res.status(500).json({ "in valid id": err.message })

        }

    })

}
////////////// deleteProduct
module.exports.deleteProduct=async function(req,res) {
       
    Product.deleteOne({_id:req.params.id}).then(function(result){

console.log("1@")

     res.status(200).json({deleting:result})
    }).catch(function(err){
        res.status(500).json({errr:err.message})

    })
    console.log("2#")

     }
     //////////////updateProduct
     module.exports.updateProduct=function (req,res,netx){


        Product.updateOne({_id:req.params.id},{
            name:req.body.name,
            price:req.body.price
        }).then(result=>{
            if(result.n<1){
                res.status(501).json({"message":"product not found!"})
            }
         res.status(200).json({"message":result.nModified>0?"product updated successfuly":" allready updated"})


        }).catch(err=>{
            res.status(500).json(err)
        })
     }