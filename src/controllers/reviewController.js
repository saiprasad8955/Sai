
const { isValidObjectId } = require("mongoose")
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const {
    isValid,
    isValid2,
    isValidRequestBody,
    isValidRating,
  } = require("../utils/validation")

// POST /books/:bookId/review
const addReview = async function (req, res){
     try {
        const reqBody = req.body
        
        if(!isValidRequestBody(reqBody)) {
            return res.status(400).send({status: false,msg: "Invalid request, Please provide details"});
        }
  
        const bookId = req.params.bookId;;

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Book ID" });
        }

        const bookData = await bookModel.findOne({ _id: bookId, isDeleted: false})
        if (!bookData) {
            return res.status(404).send({ status: false, msg: "Book does not Exist, Please enter Valid Book ID" });
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
 
        reqBody.bookId = bookId;
        const newReview = await reviewModel.create(reqBody)

        const checkReviewCount = await reviewModel.find({bookId: bookId, isDeleted: false}).count()

        const incBookReviewCount = await bookModel.findOneAndUpdate(
            {_id: bookId},
            {$set : {reviews : checkReviewCount, reviewedAt: new Date()}}, 
            {new: true})

         // use spread operator for adding keys
         const{...data} = incBookReviewCount;

         // adding key reviewsaData;
         data._doc.reviewsData =  newReview;
         
         res.status(201).send({status:true ,msg:"Review added Successfully",data: data._doc})
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

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Book ID" });
        }

        if (!isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Review ID" });
        }

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

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Book ID" });
        }

        if (!isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Review ID" });
        }
        
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
            {$set: {isDeleted: true, deletedAt: new Date() }},
            {new: true})

        if(!deletedReview){
            return res.status(404).send({status:false,message:"Review already deleted."})
        }

        const checkReviewCount = await reviewModel.find({bookId: bookId, isDeleted: false}).count()

        const decBookReviewCount = await bookModel.findOneAndUpdate(
            {_id: bookId}, 
            {$set: {reviews: checkReviewCount }},
            {new: true})
        
            const{...data} = decBookReviewCount;
            data._doc.reviewsData =  deletedReview;
        
        return res.status(200).send({status:true, message:"Review Deleted Successfully", data: data._doc})
    } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
    }
}

module.exports.addReview = addReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview

 