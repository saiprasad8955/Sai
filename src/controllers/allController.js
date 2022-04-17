const authorModel = require("../models/newAuthor.js")
const publisherModel = require("../models/newPublisher.js")
const bookModel = require("../models/newBook.js")

// 1.  Write a POST api that creates an author from the details in request body.
module.exports.createAuthor = async function (req, res) {

    const data = req.body;
    const authors = await authorModel.create(data);
    res.send({ message: authors });
}

// 2. Write a POST api that creates a publisher from the details in the request body.
module.exports.createNewPublisher = async function (req, res) {
    const data = req.body;
    const publisher = await publisherModel.create(data);
    res.send({ message: publisher });
}

// 3.  Write a POST api that creates a book from the details in the request body. The api takes both the author and publisher from the request body.
module.exports.createNewBook = async function (req, res) {
    const data = req.body;
    if (data.author && data.publisher) {

        let authIdCheck = await authorModel.exists({ _id: data.author })
        let publIdCheck = await publisherModel.exists({ _id: data.publisher })
        
        if (authIdCheck && publIdCheck) {

            if (!await bookModel.exists(data)) {

                let bookCreated = await bookModel.create(data)
                res.send({ msg: bookCreated })
            
            } else res.send({ msg: "Book already exists" })
        }
        else res.send("AuthorId and publisherId both or any one of these are Invalid")
    }
    else res.send( "Author and publisher Must be present" )
}

// 4.get all books
module.exports.getallBooks = async function (req, res) {
    let allBooks = await bookModel.find().populate('author').populate('publisher');
    res.send({ msg: allBooks })
}



// 5. put request
module.exports.updateBooks = async function (req, res) {
    /// 1 . Update ishardCover Value to true
    let a = req.params.publisherName
    let publisherId = await publisherModel.find({ name: a }).select({ _id: 1 })
    let updatePublisher = await bookModel.updateMany({ publisher: publisherId }, { $set: { isHardCover: true } })
   
    // / 2 . Update Book Prices 

    let authorId = await authorModel.find({ rating: { $gt : 3.5 } })
    let updatedBookPrice = await bookModel.updateMany({ author : authorId }, { $inc: { price : 10 } })
    res.send({ msg: updatedBookPrice , updatePublisher})
    
}













