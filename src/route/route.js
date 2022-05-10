const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')

///////////register user///////////////

router.post("/register",userController.createUser)

///////////////////////Login API///////

router.post("/login",userController.userLogin)

////////////////////////getbooks///////////

router.get("/books/:bookId",)





module.exports =  router ;