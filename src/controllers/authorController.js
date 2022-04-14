const authorModel= require("../models/newAuthor.js")

const createNewAuthor = async function(req,res){

    const data = req.body;
    const authors = await authorModel




}





module.exports.createAuthor= createNewAuthor













// const createAuthor= async function (req, res) {
//     let data= req.body
//     if(data.author_id) {
//         let savedData= await authorModel.create(data)
//         res.send({msg: savedData})
// let response1 = await authorModel.find({name:'Chetan Bhaagat'})
// let response2 = await authorModel.findOne({name:'Chetan Bhaagat'})
//     } else {
//         res.send({msg: 'author_id must be present'})
//     }
// }


// module.exports.createAuthor= createAuthor
