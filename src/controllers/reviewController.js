
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const {
    isValid,
    isValidTitle,
    isValidRequestBody,
    isValidPhone,
    isValidPhoneNumber,
    isValidEmail,
    isValidPassword
  } = require("../utils/validation")



// POST /books/:bookId/review
const addReview = async function (req, res){
    try {
        const reqBody = req.body
  
        if(!isValidRequestBody(reqBody))
        return res.status(400).send({status: false,msg: "Invalid request, Please provide details"});
  
        let bookId = req.body.bookId;
        if (!isValid(bookId)) return res.status(400).send({ status: false, msg: "Book ID is Required" });

        let isValidBookId = await bookModel.findById({bookId: bookId , isDeleted: false});
        if (!isValidBookId) return response.status(404).send({ status: false, msg: "Book does not Exist, Please enter Valid Book ID" });

        const { review, rating, reviewedBy} = req.body

        if (!isValid(rating)) return res.status(400).send({ status: false, msg: "Rating is Required" });

        if (!isValid(reviewedBy)) return res.status(400).send({ status: false, msg: "Reviewer's name is Required" });


        /////////Remaining
        const addedReview = await reviewModel.findOneAndUpdate(reqBody)
        res.status(201).send({status:true ,msg:"Review added Successfully",data: addedReview})
    
    } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
    }
}

module.exports.addReview = addReview

 
// POST /books/:bookId/review
// Add a review for the book in reviews collection.
// Check if the bookId exists and is not deleted before adding the review. Send an error response with appropirate status code like this if the book does not exist
// Get review details like review, rating, reviewer's name in request body.
// Update the related book document by increasing its review count
// Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like this