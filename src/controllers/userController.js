const req = require("express/lib/request")
const UserModel= require("../models/userModel")



const createUser= async function (req, res) {
    let data= req.body
    data.isFreeAppUser = req.headers.isfreeappuser
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData