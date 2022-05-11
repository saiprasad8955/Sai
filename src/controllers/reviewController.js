
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const {
    isValid,
    isValid2,
    isValidTitle,
    isValidRequestBody,
    isValidPhone,
    isValidPhoneNumber,
    isValidEmail,
    isValidPassword,
    isValidRating,
    check
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

        const isValidBookId = await bookModel.findById({ _id: bookId, isDeleted: false})
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


//PUT /books/:bookId/review/:reviewId

const updateReview = async function (req, res){
    try {

        const reqBody = req.body
        
        if(!isValidRequestBody(reqBody)) {
            return res.status(400).send({status: false,msg: "Invalid request, Please provide details"});
        }

        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId

        const bookData = await bookModel.findOne({ _id: bookId ,isDeleted: false})
        if (!bookData) {
            return res.status(404).send({ status: false, message: "Book does not Exist, Please enter Valid Book ID" })
        }

        const reviewData = await reviewModel.findOne({ _id: reviewId , isDeleted: false})
        if (!reviewData) {
            return res.status(404).send({ status: false, message: "Review does not Exist, Please enter Valid ID" })
        }

        if (reviewData['bookId'] != bookId) {
            return res.status(400).send({ status: false, msg: "Review does not Exist with this BookId" });
        }

        const { review, rating, reviewedBy} = reqBody

        if (review && !isValid2(review)) {
            return res.status(400).send({ status: false, msg: "Please enter Valid Review" })
        }

        if (!isValid(rating)) {
            return res.status(400).send({ status: false, msg: "Rating is Required" });
        }

        if (!isValidRating(rating)) {
            return res.status(400).send({ status: false, msg: "Please Enter Rating between 1-5 Number" });
        }

        if (!isValid(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "Reviewer's name is Required" });
        }


        if (!isValid2(reviewedBy)) {
            return res.status(400).send({ status: false, msg: "Please enter Valid Name" })
        }


        const reviewDetails = await reviewModel.findOneAndUpdate(
            {_id: reviewId}, 
            reqBody, 
            {new: true})

    
        // use spread operator for adding keys
        const{...data} = bookData;

         // adding key reviewsaData;
         data._doc.reviewsData = reviewDetails ;

        return res.status(201).send({status:true, message:"Review Updated Successfully", data: data._doc })

    }
    catch(err){
        return res.status(500).send({ status: false, message: "server error", error: err.message });
    }
}


//DELETE /books/:bookId/review/:reviewId

const deleteReview = async function (req, res) {
    
    try {

        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId

        const bookData = await bookModel.findOne({ _id: bookId ,isDeleted: false})
        if (!bookData) {
            return res.status(404).send({ status: false, message: "Book does not Exist, Please enter Valid Book ID" })
        }

        const reviewData = await reviewModel.findOne({ _id: reviewId , isDeleted: false})
        if (!reviewData) {
            return res.status(404).send({ status: false, message: "Review does not Exist, Please enter Valid ID" })
        }

        if (reviewData['bookId'] != bookId) {
            return res.status(400).send({ status: false, msg: "Review does not Exist with this BookId" });
        }

        const deletedReview = await reviewModel.findOneAndUpdate(
            {_id: reviewId}, 
            {$set: {isDeleted: true, deletedAt: Date }},
            {new: true})

        if(!deletedReview){
            return res.status(404).send({status:false,message:"Review already deleted."})
        }
        return res.status(200).send({status:true, message:"Review Deleted Successfully", data: deletedReview})

    } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
    }

}



module.exports.addReview = addReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview

 