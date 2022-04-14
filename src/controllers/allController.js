const authorModel = require("../models/newAuthor.js")
const publisherModel = require("../models/newPublisher")
const bookModel = require("../models/newBook")


const createNewAuthor = async function (req, res) {

    const data = req.body;
    const authors = await authorModel.create(data);
    res.send({ message: authors });
}


const createNewPublisher = async function (req, res) {
    const data = req.body;
    const publisher = await publisherModel.create(data);
    res.send({ message: publisher });
}

const createNewBook = async function (req, res) {
    const data = req.body;
    const book = await bookModel.create(data);
    res.send({ message: book });
}



module.exports.createAuthor = createNewAuthor
module.exports.createNewPublisher = createNewPublisher
module.exports.createNewBook = createNewBook













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
