const express = require('express');
const router = express.Router();
const controller = require("../controllers/book_author_controllers")




router.post("/createAuthor",controller.createBook)

router.post("/createBook",controller.createBook)

router.get("/getBooksByAuthorId",controller.getBooksByAuthorId)

router.get("/getBookAndUpdate",controller.getBookAndUpdate)


router.get("/findRespAuthors",controller.findRespAuthors)





module.exports = router;