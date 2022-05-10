
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
  
        if(!isValidRequestBody(reqBody)) {
            return res.status(400).send({status: false,msg: "Invalid request, Please provide details"});
        }
  
        const bookId = req.params.bookId;;

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "Book ID is Required" });
        }

        const isValidBookId = await bookModel.findById(bookId).select({});
        if (!isValidBookId) {
            return response.status(404).send({ status: false, msg: "Book does not Exist, Please enter Valid Book ID" });
        }

        const { review, rating, reviewedBy, reviewedAt} = req.body

        if (!isValid(rating)) {
            return res.status(400).send({ status: false, msg: "Rating is Required" });
        }

        if (!isValid(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "Reviewer's name is Required" });
        }


        const addedReview = await reviewModel.create(reqBody)
        res.status(201).send({status:true ,msg:"Review added Successfully",data: addedReview})
    
    } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
    }
}

module.exports.addReview = addReview

 
