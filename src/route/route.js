const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const mw = require('../middleware/middleware')

//-----------------------------------User API's

router.post("/register",userController.createUser)
router.post("/login",userController.userLogin)

//-----------------------------------Book API's
// PROTECTED API's

router.post("/books",mw.authentication,bookController.createBook)
router.get("/books",mw.authentication,bookController.getAllBooks)
router.get("/get/:bookId",mw.authentication,bookController.getBookById)
router.put("/books/:bookId",console.log("hi u are on update book"),mw.authentication,mw.authorization,bookController.updateBook)
router.delete("/books/:bookId",mw.authentication,mw.authorization,bookController.deleteBook)

//-----------------------------------Review API's
// PROTECTED API's

router.post("/books/:bookId/review", mw.authentication, reviewController.addReview)
router.put("/books/:bookId/review/:reviewId", mw.authentication, reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", mw.authentication, reviewController.deleteReview)


module.exports =  router ;