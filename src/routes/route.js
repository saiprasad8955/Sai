const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController.js")
const productController = require('../controllers/productController.js')
const orderController = require('../controllers/orderController.js')

const middleware = require('../middlewares/commonMiddlewares.js')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post('/create-a-product', productController.createProduct)
router.post('/create-a-user', middleware.check_isFreeAppUser, UserController.createUser)
router.post('/create-a-order', middleware.check_isFreeAppUser, orderController.createOrder)


module.exports = router;