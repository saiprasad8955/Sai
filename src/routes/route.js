const express = require('express');
const router = express.Router();
const controller = require("../controllers/book_author_controllers.js")

router.post("/createUser", controller.createNewAuthors  )

router.post("/createBook", controller.createNewBook  )

router.get("/allBooks", controller.allBooks)

router.get("/updateBookPrice", controller.updateBookPrice)

router.get("/authorNames", controller.authorNames)



module.exports = router;