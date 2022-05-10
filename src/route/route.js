const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')



router.post("/register",userController.createUser)

router.post("/login",userController.userLogin)

router.post("/books/:bookId/review",reviewController.addReview)





module.exports =  router ;