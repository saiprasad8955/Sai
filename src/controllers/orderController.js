const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const UserModel = require("../models/userModel")


const createOrder = async function (req, res) {
    let order = req.body
    let userId = order.userId
    let productId = order.productId


    // ------ Validate the userId
    let user = await UserModel.findById(userId)

    if (!user) {
        return res.send({ message: "Not a valid user id" })
    }


    //------- Validate the productId
    let product = await productModel.findById(productId)
    // console.log(typeof(productId))

    if (!product) {
        return res.send({ message: "Not a valid product id" })
    }


    //--------Adding a new attribute to requests body
    order.date = (new Date().toLocaleDateString())


    if (req.headers.isfreeappuser == 'true') {
        order.isFreeAppUser = true
        order.amount = 0
        let savedData = await orderModel.create(order)
           return  res.send({ msg: savedData })

    }
    else {

        //console.log(user.balance);
        if (user.balance >= product.price) {
            order.amount = product.price

            let new_balance = user.balance - product.price
            order.isFreeAppUser = false
            let user1 = await UserModel.findOneAndUpdate(
                { _id: userId },
                {
                    $set: { balance: new_balance }
                }
            )

            let savedData = await orderModel.create(order)
            res.send({ msg: savedData })
        }
        else {
            res.send({ message: "The user doesn't have enough balance" })
        }
    }

}


module.exports.createOrder = createOrder