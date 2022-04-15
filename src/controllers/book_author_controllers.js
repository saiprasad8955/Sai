const bookModel = require("../model/bookModel.js")
const authorModel = require("../model/authorModel.js");
const { parseTwoDigitYear } = require("moment");


module.exports.createAuthor = async function (req, res) {
    const data = req.body;
    if (author_id) {
        const authors = await authorModel.create(data);
        res.send({ message: authors })
    } else {
        res.send("Please Enter The Author Id First!!!. Otherwise The Entry Will Not Be Created")
    }
}



module.exports.createBook = async function (req, res) {
    const data = req.body;
    if (author_id) {
        const authors = await bookModel.create(data);
        res.send({ message: authors })
    }
    else {
        res.send("Please Enter The Author Id First!!!. Otherwise The Entry Will Not Be Created")
    }
}


module.exports.getBooksByAuthorId = async function (req, res) {
    const authorDetails = await authorModel.find({ author_name: "Chetan Bhagat" });
    const id1 = authorDetails[0].author_id;
    const bookDetails = await bookModel.find({ author_id: id1 }).select({ name: 1, _id: 0 })
    res.send({ message: bookDetails })
}


module.exports.getBookAndUpdate = async function (req, res) {
    const book = await bookModel.findOneAndUpdate({ name: "Two states" }, { price: 100 }, { new: true });
    const authorId2 = book.author_id
    const authorDetails = await authorModel.find({ author_id: authorId2 }).select({ author_name: 1, _id: 0 })
    res.send({ message: authorDetails })
}



module.exports.findRespAuthors = async function (req, res) {
    const books = await bookModel.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1, _id: 0 })
    const id1 = books[0].author_id;

    const y = books.map(x => x.author_id); //[1,1,1,1,2]
    const result = [];
    console.log(y);
    for (let i = 0; i < y.length; i++) {
        let x = y[i]
        // console.log(x)
        const authors = await authorModel.find({ author_id: x }).select({ author_name: 1, _id: 0 })
        result.push(authors);
    }
    const authors1=result.flat()   // to avoid array in arrays flat does the arrays to one array
    res.send(authors1)
}
