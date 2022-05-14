const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel = require("../models/reviewModel")


const {
    isValid,
    isValid2,
    isValidRequestBody,
    isValidObjectId

} = require("../utils/validation")


//------------------------------------- CREATE BOOK
const createBook = async (req, res) => {

    try {
        // Extract body 
        const reqBody = req.body;

        // Object Destructing
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt, reviews, isDeleted } = reqBody;

        // Check data is coming or not
        if (!isValidRequestBody(reqBody)) {
            return res.status(400).send({ status: false, message: "Please Enter the All Book Details" })
        }

        // Check title is coming or not
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'Title is Required' });
        }

        // Check duplicate title
        const duplicateTitle = await bookModel.findOne({ title: title })
        if (duplicateTitle) {
            return res.status(400).send({ status: false, message: "Title is Already presents" })
        }

        // Check excerpt is coming or not 
        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: 'Excerpt is Required' });
        }

        // Check excerpt is valid or not
        if (!isValid2(excerpt)) {
            return res.status(400).send({ status: false, message: 'Please enter valid excerpt' });
        }

        // Check userId is coming or not
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: 'userId is Required' });
        }

        // Check userId is valid or not
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: 'Please enter valid user ID' });
        }

        // Check Duplicate UserId
        const duplicateUserId = await userModel.findOne({ userId: userId });
        if (!duplicateUserId) {
            return res.status(400).send({ status: true, message: "User ID is Not exists in our Database" })
        }

        // Check ISBN is coming or not
        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: 'ISBN is Required' });
        }

        // Check ISBN is valid or not
        let reISBN = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
        if (!reISBN.test(ISBN)) {
            return res.status(400).send({ status: false, message: 'Please Enter a Valid ISBN' });
        }

        // Check duplicate ISBN
        const duplicateISBN = await bookModel.findOne({ ISBN: ISBN });
        if (duplicateISBN) {
            return res.status(400).send({ status: true, message: "ISBN is already exist" })
        }

        // Check category is coming or not
        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: 'category is Required' });
        }


        // Check category is valid or not
        if (!isValid2(category)) {
            return res.status(400).send({ status: false, message: 'Please Enter a Valid Category' });
        }

        // Check subcategory is coming or not
        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, message: 'subcategory is Required' });
        }

        // Check subcategory is valid or not
        if (!check(subcategory)) {
            return res.status(400).send({ status: false, message: 'Enter Valid Subcategory' });
        }

        // Check releasedAt is coming or not
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: 'Please Enter Released Date' });
        }

        // Check releasedAt Value should be in given format
        let reAt = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;// YYYY-MM-DD
        if (!reAt.test(releasedAt)) {
            return res.status(400).send({ status: false, message: "Released Date Format Should be in 'YYYY-MM-DD' Format " });
        }


        // Valid reviews when reviews are coming
        if (reviews && (typeof reviews !== 'number')) {
            return res.status(400).send({ status: false, message: "Reviews Must be numbers" })
        }

        // Check if isDeleted true
        if (isDeleted === true) {
            return res.status(400).send({ status: false, message: "No Data Should Be Deleted At The Time Of Creation" })
        }

        // After All Successful Validation then Create Book
        const bookDetails = await bookModel.create(reqBody)
        return res.status(500).send({ status: true, message: 'successfully created ', data: bookDetails })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    };
}

//------------------------------------- GET BOOKS 
const getAllBooks = async (req, res) => {

    try {
        // Extract body 
        const reqQuery = req.query;

        // Object Destructing 
        const { userId, category, subcategory } = reqQuery;

        // If no queries Are Provided then fetch all the book data
        if (Object.getOwnPropertyNames(reqQuery).length == 0) {

            // find the bookData by query
            const bookData = await bookModel.find({ isDeleted: false }).sort({ title: 1 }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

            // If Queried Book Not Found then send error   
            if (!bookData) {
                return res.status(404).send({ status: false, message: 'Books Not Found' });
            }

            return res.status(200).send({ status: true, message: 'Books Lists', data: bookData })
        }

        // If userID is coming then valid it 
        if (userId && !validator.isValidObjectId(userId.trim())) {
            return res.status(400).send({ status: false, message: 'Please enter Valid User ID' });
        }

        // If category is coming then valid it 
        if (category && !validator.isValid2(category.trim())) {
            return res.status(400).send({ status: false, message: 'Please Enter a Valid Category' });
        }

        // if second subcategory is coming then concatenate it
        if (subcategory) {
            reqQuery.subcategory = { $all: [].concat(req.query.subcategory) }
        }

        // Set isDeleted false to reqQuery
        let condition = { isDeleted: false }
        let data = Object.assign(reqQuery, condition)

        // If the Queries are coming then Find the Data by Queries
        if (reqQuery) {

            let bookData = await bookModel.find(data)
                .sort({ title: 1 })
                .select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

            // If Queried Book Not Found then send error   
            if (!bookData.length) {
                return res.status(404).send({ status: false, message: 'Books Not Found With these Filters or might be deleted ' });
            }

            // After all Send book in response
            return res.status(200).send({ status: true, message: 'Book Lists', data: bookData })
        }

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }
}

//------------------------------------- GET BOOKS BY ID
const getBookById = async function (req, res) {
    try {
        const bookId = req.params.bookId;

        // Validate the Book ID
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "Enter a valid bookId" })
        }

        let findBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook) {
            return res.status(404).send({ status: false, message: "No data Found,please check the id and try again" })
        }

        let review = await reviewModel.find({ bookId: bookId, isDeleted: false })

        const  { ...data} = findBook;
        data._doc.reviewsData = review;
        
        return res.status(200).send({ status: true, message: "Books list", data: data.toObject() })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "server error", error: err.message });
    }
}

//------------------------------------- UPDATE BOOK BY ID
const updateBook = async function (req, res) {
    try {
        console.log("hi u are on update book")
        const bookId = req.params.bookId;


        const { title, excerpt, ISBN } = req.body;

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, message: 'BookId is Required' });
        }

        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, msg: "Invalid request parameters. Please provide blog details" });
        }

        //----------------validations
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is Required' });
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: 'ISBN is Required' });
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: 'excerpt is Required' });
        }

        const chktitle = await bookModel.findOne({ title: title, isDeleted: false })
        console.log(chktitle);

        if (chktitle) {
            return res.status(400).send({ status: false, message:`${title} title should be unique please try with another option` })
        }

        const chkISBN = await bookModel.findOne({ ISBN: ISBN, isDeleted: false })
        if (chkISBN) {
            return res.status(400).send({ status: false, message: `${ISBN} ISBN should be unique please try with another option` })
        }

        const chkBook = await bookModel.findOneAndUpdate(
            { _id: bookId },
            { $set: { title: title, excerpt: excerpt, ISBN: ISBN }, releasedAt: new Date() },
            { new: true }
        )

        return res.status(201).send({ status: true, message: "Updated", data: chkBook })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "server error", error: err.message });
    }
}

//------------------------------------- DELETE BOOK BY ID
const deleteBook = async function (req, res) {
    try {
        const bookId = req.params.bookId;

        if (!isValid(bookId)) return res.status(400).send({ status: false, msg: "Book Id is Required" })

        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "Enter a valid book Id" })

        const chkBook = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            { $set: { isDeleted: true }, deletedAt: new Date() },
            { new: true }
        )
        if (!chkBook) {
            return res.status(404).send({ status: false, message: "Book not found or already deleted please try with another bookID" })
        }

        return res.status(200).send({ status: true, message: "deleted", data: chkBook })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "server error", error: err.message });
    }

}



module.exports = { createBook, getAllBooks, deleteBook, updateBook, getBookById }