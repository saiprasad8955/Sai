const express = require('express');
const router = express.Router();
const bookModels = require("../models/bookModel1.js");


/// 1. Get All Book Data From User.
router.post("/createBookData", async function (req, res) {
  let data = req.body;
  let savedBookData = await bookModels.create(data);
  res.send({ message: savedBookData });
})



/// 2. Fetch All Data That Has Been Entered By User.
router.get("/getBookData", async function (req, res) {
  let allBookmodels = await bookModels.find();                   //fine
  res.send({ message: allBookmodels });
})



/// 3. Get filtered Book Data Only by Author And Book Name. 
router.get("/getBookDataOnlyAuthorAndName", async function (req, res) {
  let allBookmodels = await bookModels.find().select({ bookName: 1, authorName: 1, _id: 0 });         ///fine
  res.send({ message: allBookmodels });
})




/// 4.takes year as input in post request and gives list of all books published that year
router.get("/getBooksInYear", async function (req, res) {
  let inYear= req.query.year                                                                             //fine
    let allBookmodels= await bookModels.find({year: inYear}).select({_id:0, _v: 0,createdAt:0, updatedAt:0})
    res.send({msg: allBookmodels})
})



/// 5.1  e.g if body had { name: “hi”} then you would fetch the books with this name
/// 5.2  if body had { year: 2020} then you would fetch the books in this year
router.get("/getParticularBooks", async function (req, res) {
    let key= req.query
    let ParticularBooks= await bookModels.find(key).select({_id:0, _v: 0,createdAt:0, updatedAt:0})   // not sure
    res.send({msg: ParticularBooks})
    
})



/// 6. request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 
router.get("/getXINRBooks", async function (req, res) {
  let INRBooks= await bookModels.find({prices: {indianPrice: {$in : [100, 200, 500] } }})
    res.send({ message: INRBooks });                                                                    //not sure
})



// 7 . returns books that are available in stock or have more than 500 pages 
router.get("/getRandomBooks", async function (req, res) {
 let allBookmodels = await bookModels.find({ $or: [{ totalpages: { $gt: 500 } }, { stockAvailable: true }] });
  res.send({ message: allBookmodels });
})                                                           //fine

module.exports = router;