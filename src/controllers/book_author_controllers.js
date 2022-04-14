const authorModel = require("../models/author_model.js")
const bookModel = require("../models/book_model.js")


const createNewAuthors = async function(req,res){
    const Author = req.body;
    if(Author.author_id){
        const saveData = await authorModel.create(Author)           //post
        res.send( { message : saveData } );
    }else{
        res.send({message : "author_id Must be Present"})
    }
    }



const createNewBook = async function(req,res){
    const book = req.body;                                           //post
    const savedbook = await bookModel.create(book)
    res.send( { message : savedbook } );
}



const allBooks = async function(req,res){
    const authorDetail = await authorModel.find({author_name : "Chetan Bhagat"})
    const id = authorDetail[0].author_id;
    const booksName = await bookModel.find( { author_id : id } ).select( { name : 1 , _id:0} )
    res.send( { message : booksName } );
}



const updateBookPrice = async function(req,res){
    const bookdetail = await bookModel.find( { name :"Two states"} )
    const id1 = bookdetail[0].author_id
    const authors = await authorModel.find( {author_id : id1} ).select( { author_name : 1 , _id:0} )

    const bookname = bookdetail[0].name
    const Updatedprice = await bookModel.findOneAndUpdate({name : bookname},{ price : 100},{ new : true}).select( { price : 1 , _id:0} )

    res.send( { author : authors , Updatedprice } )
    }



const authorNames = async function(req,res){
    const booksid = await bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1 , _id:0}) 
    const id2 = booksid.map( x => x.author_id )

    let  finalauthors = [];
    for(let i = 0 ; i < id2.length ;i++ ) {
       let y = id2[ i ]
       const author = await authorModel.find( { author_id : y } ).select( { author_name : 1 , _id:0} )
       finalauthors.push( author )
    }
    authorN = finalauthors.flat();
    res.send( { message : authorN } )

}   



module.exports.createNewAuthors =createNewAuthors;
module.exports.createNewBook =createNewBook;
module.exports.allBooks =allBooks;
module.exports.updateBookPrice =updateBookPrice;
module.exports.authorNames = authorNames;
