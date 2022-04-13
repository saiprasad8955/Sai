const { count } = require("console")
const BookModel1= require("../models/bookModel1.js")

const createBook= async function (req, res) {
    let data = req.body;
    let savedBookData = await BookModel1.create(data);
    res.send({ message: savedBookData });
  }

const getBookData= async function (req, res) {
    let allBookmodels = await BookModel1.find();                   //fine
    res.send({ message: allBookmodels });
  }

  const getBookDataOnlyAuthorAndName = async function (req, res) {
    let allBookmodels = await BookModel1.find().select({ bookName: 1, authorName: 1, _id: 0 });         ///fine
    res.send({ message: allBookmodels });
  }

  const getBooksInYear =async function (req, res) {
    let inYear= req.body.year                                                                             //fine
      let allBookmodels= await BookModel1.find({year: inYear})
      res.send({msg: allBookmodels})
  }


 const getParticularBooks = async function (req, res) {
    let key= req.query
    let ParticularBooks= await BookModel1.find(key).select({_id:0, _v: 0,createdAt:0, updatedAt:0})    // fine
    res.send({msg: ParticularBooks})
    
}


const getXINRBooks= async function (req, res) {
    // let INRBooks= await bookModels.find({prices: {indianPrice: {$in : [100, 200, 500] } }})
    let INRBooks= await BookModel1.find({"prices.indianPrice" : {$in:["100INR", "200INR","500INR"]}} )     ///fine
      res.send({ message: INRBooks });                                                                     
  }



  const getRandomBooks =async function (req, res) {
    let allBookmodels = await BookModel1.find({ $or: [{ totalpages: { $gt: 500 } }, { stockAvailable: true }] });
     res.send({ message: allBookmodels });
   }
module.exports.getBookData= getBookData
module.exports.createBook= createBook
module.exports.getBookDataOnlyAuthorAndName= getBookDataOnlyAuthorAndName
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks
