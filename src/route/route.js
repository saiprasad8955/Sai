const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')

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