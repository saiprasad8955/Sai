const req = require("express/lib/request")
const userModel= require("../models/userModel.js")
const productModel = require("../models/productModel.js")


module.exports.createProduct = async function (req, res) {
    let data = req.body;
    let Users = await productModel.create(data);
    res.send({ msg: Users });
}



module.exports.createUser = async function (req, res) {
    let data = req.body;
    // if(req.headers.isFreeAppUser){
    //     next()
    // }else{
    //     res.send("FreeAppUser Header Request Must be Present")
    // }
    let Users = await userModel.create(data);
    res.send({ msg: Users });
}



module.exports.createOrder = async function (req, res) {
    let data = req.body;
    //isfree  header validation
    // user validation  exists
    let a = await userModel.find({ _id: 1 })
    let b = await productModel.find({ _id: 1 })

    if (data.userId == a) {

        if (data.productId == b) {

            let order = await orderModel.create(data);
            res.send({ msg: order });

        }
        else {
            res.send("ProductID is Not Valid")
        }
    }
    else {
        res.send("UserId is not valid")
    }

}

// If the isFreeAppUser header is true then the balance of the user is not deducted and the amount in order is set to 0 as well the attribute in order isFreeAppUser is set to true.
    if(isfreeheader==true){
//balance deduct 
    }else{
//set balance to zero
    }
   

   // If this header has a false value then the product’s price is checked. This value is deducted from the user’s balance and the order amount is set to the product’s price as well as the attrbiute isFreeAppUser is set to false in order document.
         



   //Update the logic in middleware to set the isFreeAppUser attribute in req. Use this attribute in the route handler for setting the isFreeAppUser attributes of User and Order collection.













































// const createAUser = function(req, res) {
//     let requestBody = req.body
//     let headers  = req.headers
    
//     //Printing all the headers before modification - addition of a new header called 'month'
//     console.log('Request headers are before: ', headers)

//     //Accessing a request header called 'batch'
//     let batchHeader = headers["batch"] // headers.batch 
    
//     ///Accessing a request header called 'content-type'
//     let contentHeader = headers['content-type'] // headers.content-type

//     console.log('Content Type hedser is: ',contentHeader)
//     console.log('Batch header is: ', batchHeader)

//     //Adding a new requets header
//     req.headers["month"] = 'April' //req.headers.month = 'April' or req.headers["month"] = 'April'


//     //Printing the headers after modification - addition of a new header called 'month'
//     console.log('Request headers are after: ', headers)


//     console.log('Request property called current-day', req['current-day'])
    
//     //Adding a response header
//     res.header('year', '2022')

//     res.send('Just create a user')
// }

// module.exports.createAUser = createAUser
// module.exports.basicCode = basicCode

















// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

// module.exports.createUser= createUser
// module.exports.getUsersData= getUsersData
// module.exports.basicCode= basicCode