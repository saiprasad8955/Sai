const bookModel = require('../models/bookModel')
const mongoose=require('mongoose')
const userModel = require('../models/userModel')
const validator = require("../utils/validation")
let date=new Date()

//-------------------------------------------create Book
const createBook = async (req, res) => {

    try {
        // Extract body 
        const reqBody = req.body;

        // Object Destructing
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt, reviews,isDeleted
        } = reqBody;

        // Check data is coming or not
        if (! validator.isValidRequestBody(reqBody)) {
            return res.status(400).send({ status: false, message: "Please Enter the All Book Details" })
        }

        // Check title is coming or not
        if (! validator.isValid(title)) {
            return res.status(400).send({ status: false, message: 'Title is Required' });
        }

        // Check title is valid or not
        if (! validator.isValidTitle(title)) {
            return res.status(400).send({ status: false, message: 'Please Enter Valid title' });
        }

        // Check duplicate title
        const duplicateTitle = await bookModel.findOne({ title: title })
        if (duplicateTitle) {
            return res.status(400).send({ status: false, message: "Title is Already presents" })
        }

        // Check excerpt is coming or not 
        if (! validator.isValid(excerpt)) {
            return res.status(400).send({ status: false, message: 'Please Enter the Excerpt' });
        }

        // Check excerpt is valid or not
        if (! validator.isValid2(excerpt)) {
            return res.status(400).send({ status: false, message: 'Please enter valid excerpt' });
        }

        // Check userId is coming or not
        if (! validator.isValid(userId)) {
            return res.status(400).send({ status: false, message: 'userId is Required' });
        }

        // Check userId is valid or not
        if (! validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: 'Please enter valid user ID' });
        }

        // Check Duplicate UserId
        const duplicateUserId = await userModel.findOne({ userId: userId });
        if (! duplicateUserId) {
            return res.status(400).send({ status: true, message: "User ID is Not exists in our Database" })
        }

        // Check ISBN is coming or not
        if (! validator.isValid(ISBN)) {
            return res.status(400).send({ status: false, message: 'ISBN is Required' });
        }

        // Check ISBN is valid or not
        let reISBN = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
        if (! reISBN.test(ISBN)){
            return res.status(400).send({ status: false, message: 'Please Enter a Valid ISBN' });
        }

        // Check duplicate ISBN
        const duplicateISBN = await bookModel.findOne({ ISBN: ISBN });
        if (duplicateISBN) {
            return res.status(400).send({ status: true, message: "ISBN is already exist" })
        }
        
        // Check category is coming or not
        if (! validator.isValid(category)) {
            return res.status(400).send({ status: false, message: 'category is Required' });
        }


        // Check category is valid or not
        if ( !validator.isValid2(category)) {
            return res.status(400).send({ status: false, message: 'Please Enter a Valid Category' });
        }

        // Check subcategory is coming or not
        if (! validator.isValid(subcategory)) {
            return res.status(400).send({ status: false, message: 'subcategory is Required' });
        }

        // Check subcategory is valid or not
        if (! validator.check(subcategory)) {
            return res.status(400).send({ status: false, message: 'Enter Valid Subcategory' });
        }

        // Check releasedAt is coming or not
        if (! validator.isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: 'Please Enter Released Date' });
        }

        // Check releasedAt Value should be in given format
        let reAt = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;// YYYY-MM-DD
        if (! reAt.test(releasedAt)) {
            return res.status(400).send({ status: false, message: "Released Date Format Should be in 'YYYY-MM-DD' Format " });
        }

        // Valid street when street is coming
        if(address.street && !validator.isValid2(address.street)){
            return res.status(400).send({status: false , message: 'Enter a valid Street'})
        }

        // Valid city when city is coming
        if(address.city && !validator.isValid2(address.city)){
           return res.status(400).send({status: false , message: 'Enter a valid city name'})
        }

        // Valid pincode when pincode is coming
        if(address.pincode && !validator.isValidPincode(address.pincode)){
            return res.status(400).send({status: false , message: 'Enter a valid city pincode'})
        }

        // Valid reviews when reviews are coming
        if (reviews && (typeof reviews !== 'number')) {
            return res.status(400).send({ status: false, message: "Reviews Must be numbers" })
        }

        // Check if isDeleted true
        if(isDeleted === true){
            return res.status(400).send({ status: false, message: "No Data Should Be Deleted At The Time Of Creation" })
        }

        // After All Successful Validation then Create Book
        const bookDetails = await bookModel.create(reqBody)
        return res.status(201).send({ status: true, message: 'successfully created ', data: { bookDetails } })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
};




// Get Api For Books

const getAllBooks = async (req, res) => {

    try {
        
        // Extract body 
        const reqQuery = req.query;

        // Object Destructing 
        const { userId, category, subcategory} = reqQuery;

        // If no queries Are Provided then fetch all the book data
        if ( Object.keys(reqQuery).length == 0) {
            const bookData = await bookModel.find({ isDeleted: false}).sort({title: 1}).select({ _id: 1, title: 1, excerpt: 1, subcategory:1, userId: 1, category: 1, releasedAt: 1})
            if(! bookData){ 
                 return res.status(404).send({ status: false, message: 'Books Not Found' });
            }
            return res.status(200).send({ status: true,  message: 'Books Lists', data: { bookData } })
        }

        // If user ID is coming then valid it
        if ( userId && ! validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: 'Please enter Valid User ID' });
        }

        // If category is coming then valid it
        if ( category && ! validator.isValid2(category)) {
            return res.status(400).send({ status: false, message: 'Please Enter a Valid Category' });
        }

        // If subcategory is coming then valid it
        if ( subcategory && ! validator.check(subcategory)) {
            return res.status(400).send({ status: false, message: 'Subcategory is Required' });
        }

       // If the Queries are coming then Find the Data by Queries
        if ( reqQuery ) {
            let bookData = await bookModel.find({
                 isDeleted: false, 
                 $or: [{ userId: userId }, { category: category }, { subcategory: subcategory }]})
                .sort({ title: 1 })
                .select({ _id: 1, title: 1, excerpt: 1, userId: 1,  subcategory:1, category: 1, releasedAt: 1, reviews: 1 })
            if (! bookData) {
                return res.status(404).send({ status: false, message: 'Books Not Found With these Filters' });
            }
            return res.status(200).send({ status: true, message: 'Book Lists', data: { bookData } })
        }

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.msg })
    }

}



///////////////////////////////////get books review API///////////////////

const getBookById = async function (req, res) {
    try {
        const bookId = req.params.bookId;

        let findBook = await bookModel.findById({ _id: bookId,isDeleted:false})
        if (!findBook) {
            return res.status(404).send({ status: false, message: "No data Found,please check the id and try again" })
        }
        let review = await reviewModel.find({ bookId: bookId })
        data1 = {
            findBook,
            "reviewsData": review
        }

        return res.status(200).send({status:true,message:"Books list", data:{data1}})
    }
    catch(err){
        return res.status(500).send({ status: false, message: "server error", error: err.message });
    }
}


//////////////////////////// //////////update API////////////////////////////////


const updateBook=async function(req,res){
    try{
        const bookId = req.params.bookId;
    const {title,excerpt,releasedAt,ISBN}=req.body;

    const chktitle=await bookModel.findOne({title:title,isDeleted:false})
    if (chktitle) {
        return res.status(400).send({ status: false, message: `${title} title should be unique please try with another option` })
    }

    const chkISBN=await bookModel.findOne({ISBN:ISBN,isDeleted:false})
    if (chkISBN) {
        return res.status(400).send({ status: false, message: `${ISBN} ISBN should be unique please try with another option` })
    }

    const chkBook=await bookModel.findByIdAndUpdate(
        {_id:blogId},
        {$set:{title:title,excerpt:excerpt,ISBN:ISBN},releasedAt:date }
        )
  return res.status(201).send({status:true, message:"Updated",data:chkBook})

}
catch(err){
    return res.status(500).send({ status: false, message: "server error", error: err.message });
}
}



//////////////////////////////////////////delete Book//////////////////////////



const deleteBook=async function(req,res){
    try{
        const bookId = req.params.bookId;
        
        const chkBook=await bookModel.findByIdAndUpdate(
            {_id:blogId,isDeleted:false},
            {$set:{isDeleted:false},deletedAt:date }
            )
        if(!chkBook){
            return res.status(404).send({status:false,message:"Book not found or already deleted please try with another bookID"})
        }
        return res.status(200).send({status:true,message})
    }
    catch(err){
        return res.status(500).send({ status: false, message: "server error", error: err.message });
    }

}



module.exports={createBook,getAllBooks,deleteBook,updateBook,getBookById}