const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const mw = require('../middleware/middleware')



router.post("/register",userController.createUser)

router.post("/login",userController.userLogin)

router.post("/books/:bookId/review", mw.authentication, reviewController.addReview)

router.put("/books/:bookId/review/:reviewId", mw.authentication, reviewController.updateReview)
 
router.delete("/books/:bookId/review/:reviewId", mw.authentication, reviewController.deleteReview)

///////////register user///////////////

router.post("/register",userController.createUser)

///////////////////////Login API///////

router.post("/login",userController.userLogin)

////////////////////////getbooks///////////

router.get("/books/:bookId",)





module.exports =  router ;