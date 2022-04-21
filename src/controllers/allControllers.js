const req = require("express/lib/request")
const userModel= require("../models/userModel.js")
const productModel = require("../models/productModel.js");
const orderModel = require("../models/orderModel.js");

module.exports.createUser = async function (req, res) {
    let data = req.body;
       let Users = await userModel.create(data);
    res.send({ msg: Users });
}



module.exports.createProduct = async function (req, res) {
    
    let order= req.body
    let productId = order.productId
    let userId = order.userId



    // ------ Validate the userId
    let user = await userModel.findById(userId) 
   
    if(!user) {
        return res.send({message: "Not a valid user id"})
    }


    //------- Validate the productId
    let product= await productModel.findById(productId) 

    if(!product) {
        return res.send({message: "Not a valid product id"})
    }


    //--------Adding a new attribute to requests body
    order.date = (new Date().toLocaleDateString())
    
    
    if( req.headers.isfreeappuser == 'true') {
        order.isFreeAppUser = true
        order.amount = 0 
    }
    else {
        
        //console.log(user.balance);
        if(user.balance >= product.price) {
            order.amount = product.price
        
            let new_balance = user.balance - product.price
            order.isFreeAppUser = false
            let user1 = await userModel.findOneAndUpdate(
                {_id : userId},
                {
                    $set: { balance : new_balance}
                }
            )

            let savedData= await orderModel.create(order)
            res.send({msg: savedData})
        }
        else{
            res.send( { message : "The user doesn't have enough balance"})
        }
    }
}




