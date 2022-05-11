const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const mw = require('../middleware/middleware')

///////////////////user/////////////////////////
router.post("/register",userController.createUser)

router.post("/login",userController.userLogin)

////////////books///////////////////////////////

router.post("/books",mw.authentication,mw.authorization,bookController.createBook)

router.get("/books",mw.authentication,bookController.getAllBooks)

router.get("/books/:bookId",mw.authentication,bookController.getBookById)

router.put("/books/:bookId",mw.authentication,mw.authorization,bookController.updateBook)

router.delete("/books/:bookId",mw.authentication,mw.authorization,bookController.deleteBook)

/////////////////////////review /////////////////
router.post("/books/:bookId/review", mw.authentication, reviewController.addReview)

router.put("/books/:bookId/review/:reviewId", mw.authentication, reviewController.updateReview)
 
router.delete("/books/:bookId/review/:reviewId", mw.authentication, reviewController.deleteReview)


module.exports =  router ;