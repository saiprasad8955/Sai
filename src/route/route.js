const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')



router.post("/register",userController.createUser)

router.post("/login",userController.userLogin)

router.post("/books/:bookId/review",reviewController.addReview)

router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
 
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)

///////////register user///////////////

router.post("/register",userController.createUser)

///////////////////////Login API///////

router.post("/login",userController.userLogin)

////////////////////////getbooks by id///////////

router.get("/books/:bookId",bookController.getBookById)

////////////////////.//////update book/////////////////////

router.put("/books/:bookId",bookController.updateBook)

//////////////////////////////Delete book//////////////////////

router.delete("/books/:bookId",bookController.deleteBook)

module.exports =  router ;