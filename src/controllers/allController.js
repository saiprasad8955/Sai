const authorModel = require("../models/newAuthor.js")
const publisherModel = require("../models/newPublisher")
const bookModel = require("../models/newBook")

// 1.  Write a POST api that creates an author from the details in request body.
const createNewAuthor = async function (req, res) {

    const data = req.body;
    const authors = await authorModel.create(data);
    res.send({ message: authors });
}

// 2. Write a POST api that creates a publisher from the details in the request body.
const createNewPublisher = async function (req, res) {
    const data = req.body;
    const publisher = await publisherModel.create(data);
    res.send({ message: publisher });
}

// 3.  Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body.
const createNewBook = async function (req, res) {
    const data = req.body;
    const book = await bookModel.create(data);
    res.send({ message: book })
}



// 4.get all boks
const getallNewBook = async function (req, res) {
   // let al1lBooks = await bookModel.find()//.populate("Authorpop").populate("NewPublisherpop");
    let allBooks = await bookModel.find();
    console.log(allBooks)
    res.send({msg :allBooks})
}



module.exports.createAuthor = createNewAuthor;
module.exports.createNewPublisher = createNewPublisher;
module.exports.createNewBook = createNewBook;
module.exports.getallNewBook = getallNewBook;













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
