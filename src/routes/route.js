const express = require('express');
const router = express.Router();

const allController = require("../controllers/allController")



router.post('/create-newAuthor', allController.createAuthor)

router.post('/create-newPublisher', allController.createNewPublisher)

router.post('/create-newBook', allController.createNewBook)

router.get('/get-allBooks', allController.getallBooks)

router.put('/update-Books/:publisherName', allController.updateBooks)





module.exports = router;