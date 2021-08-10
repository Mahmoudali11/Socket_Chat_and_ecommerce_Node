
const user = require("../models/users")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
 var rand

var link;

module.exports.login = function (req, res, next) {
    user.findOne({ email: req.body.email }).then(result => {
        if (result != null) {
            bcrypt.compare(req.body.password, result.password).then(resul => {
                if (resul) {
                    //note this is sync or no to promise 
                    let token = jwt.sign({
                        email: result.email,
                        id: result._id,


                    }, process.env.JWT_KEY,
                        {

                            expiresIn: "1h" //which means an one.

                        }
                    )
                    console.log(token)
                    res.status(200).json({ "message": "auth Succeeded", "isvalid": true, token: token })


                }

                else {
                    res.status(401).json({ "message": "email or password in correct!" })
                }
            }).catch(err => {
                res.status(500).json({ message: err.message })

            })


        }
        else {
            res.status(401).json({ "message": "email or password in correct!" })
        }


    }).catch(err => {
        res.status(500).json({ "message": err.message })
    })

}
///////////
module.exports.signUp = async function (req, res, next) {
    console.log(await bcrypt.genSalt(1))
    /////////////
    const u = user({
        _id: rand = mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 1)

    })

    user.findOne({ email: req.body.email }).then(result => {
        if (result == null) {
            //  var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({


                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",



                auth: {
                    user: 'mahmoudselm369@gmail.com',
                    pass: 'A12345678@'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            console.log('created');
            link = 'http://localhost:2000/user/verfy/' + rand + ""
            transporter.sendMail({
                from: 'mahmoudselm369@gmail.com',
                to: req.body.email,
                subject: 'hello world!',
                text: link
            }).then(resu => {
                console.log(resu)
                u.save().then(result => {
                    res.status(200).json({ usercreated: result })

                }).catch(err => {
                    res.status(500).json({ message: err["message"] })
                })
            }).catch(err => {
                res.status(401).json(err.message)
            });  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...





            /////










            //////////////
        }
        else
            res.status(500).json({ "message": "user allready exists" })
    }).catch(err => res.status(500).json(err["message"]))


}
/////////////////
module.exports.deleteUser = function (req, res, next) {
    user.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
}
////////////////////////emai verfication 
module.exports.userV = function (req, res, next) {

    console.log("hi " + req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + "localhost:2000")) {
        console.log("Domain is matched. Information is from Authentic email");

        user.updateOne({ _id: req.params.rand }, { isver: true }).then(result => {
            if (result.nModified > 0) {
                console.log("email is verified");
                res.status(200).json({ message: "cong your email verfied" })
            }
            else if (result.n > 0 && result.nModified == 0) {

                res.status(200).json({ message: "allready confirmed!", "res": result })
            }

            else {
                res.status(401).json({ "message": "please sign up" })

            }
        }).catch(err => {
            res.status(500).json({ "message": "in valid user!" })
        })



    }
    else {
        res.end("Request is from unknown source");
    }
}

