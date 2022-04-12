const UserBookModel= require("../models/userModel")

const createBook = async function (req, res) {
    let data= req.body
    let savedBookData= await UserBookModel.create(data)
    res.send({msg: savedBookData})
}

const getBookData = async function (req, res) {
    let allBookData = await UserBookModel.find()
    res.send({message : allBookData})
}

module.exports.createBook= createBook ;
module.exports.getBookData= getBookData ;