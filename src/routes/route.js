const express = require('express');
const router = express.Router();
const bookModels = require("../models/bookModel1.js");
const bookcontroller = require ("../controllers/bookController.js")


/// 1. Get All Book Data From User.
router.post("/createBookData", bookcontroller.createBook)

/// 2. Fetch All Data That Has Been Entered By User.
router.get("/getBookData", bookcontroller.getBookData)

/// 3. Get filtered Book Data Only by Author And Book Name. 
router.get("/getBookDataOnlyAuthorAndName",bookcontroller.getBookDataOnlyAuthorAndName )

/// 4.takes year as input in post request and gives list of all books published that year
router.post("/getBooksInYear",bookcontroller.getBooksInYear )

/// 5.1  e.g if body had { name: “hi”} then you would fetch the books with this name
/// 5.2  if body had { year: 2020} then you would fetch the books in this year
router.get("/getParticularBooks", bookcontroller.getParticularBooks)

/// 6. request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 
router.get("/getXINRBooks",bookcontroller.getXINRBooks )

// 7 . returns books that are available in stock or have more than 500 pages 
router.get("/getRandomBooks",bookcontroller.getRandomBooks )                                                           //fine

module.exports = router;