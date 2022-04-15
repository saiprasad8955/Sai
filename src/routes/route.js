const express = require('express');
const router = express.Router();
// const controller = require("../controllers/book_author_controllers.js")
// const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
// const BookController= require("../controllers/bookController")
// const authorController = require('../controllers/allController')
const allController = require("../controllers/allController")

// router.post("/createUser", controller.createNewAuthors  )

// router.post("/createBook", controller.createNewBook  )

// router.get("/allBooks", controller.allBooks)

// router.get("/updateBookPrice", controller.updateBookPrice)

// router.get("/authorNames", controller.authorNames)

// router.post('/create-author', authorController.createAuthor)

router.post('/create-newAuthor', allController.createAuthor)

router.post('/create-newPublisher', allController.createNewPublisher)

router.post('/create-newBook', allController.createNewBook)

router.get('/getallNewBook', allController.getallNewBook)





module.exports = router;