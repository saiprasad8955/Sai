const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const mw = require('../middleware/middleware')
const AWS = require("aws-sdk");

// AMAZON AWS S3 Config 
AWS.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
    secretAccessKey: "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",  // secret password
    region: "ap-south-1" 
  });

// Function for uploading file to AWS
const uploadFile = async (file) =>{
    return new Promise (function (resolve,reject){
        let s3 = new AWS.S3({ apiVersion: "2006-03-01"});
        
        let uploadParams = {
            ACL : "public-read",
            Bucket : "classroom-training-bucket",
            Key :"Sai/" + file.originalname,
            Body : file.buffer,
        };

        s3.upload(uploadParams , function (err,data){
            if(err){
                return reject ( { error : err })
            }
            console.log(data);
            return resolve(data.Location);
        });
    });
};

 // API FOR UPLOADINF FILE
 router.post ("/write-file-aws", async function(req,res){

    try{
        let files = req.files;
        if(files && files.length > 0){
            // Upload file to S3 anf get upload link
            let uploadFileUrl = await uploadFile(files[0]);
            res.status(201).send({status: true, msg: "File Uploaded Successfully", data : uploadFileUrl})
        }
        else
        {
            res.status(400).send({status:false, msg:"No File Found"})
        }
    }
    catch(err)
    {
        res.status(500).send({status: false, msg: err.msg})
    }
 }) 
//-----------------------------------User API's

router.post("/register", userController.createUser)
router.post("/login", userController.userLogin)

//-----------------------------------Book API's
// PROTECTED API's

router.post("/books",bookController.createBook)
router.get("/books",bookController.getAllBooks)
router.get("/books/:bookId",mw.authentication,bookController.getBookById)
router.put("/books/:bookId",mw.authentication,mw.authorization,bookController.updateBook)
router.delete("/books/:bookId",mw.authentication,mw.authorization,bookController.deleteBook)

//-----------------------------------Review API's
// PROTECTED API's

router.post("/books/:bookId/review", reviewController.addReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

module.exports =  router ;