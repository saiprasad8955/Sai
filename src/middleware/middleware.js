const jwt =require("jsonwebtoken")
const mongoose=require('mongoose');
const bookModel = require("../models/bookModel");
const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);
  };


const authentication = async function(req,res,next){
    try{

    // take token from client 
    let token = req.headers["x-Api-key"]

    if(!token) { token= req.headers["x-api-key"] }
    
    //If no token is present in the request header return error
    if (!token) return res.status(401).send({ status: false, msg: "Token must be present" });

    //if token is present then decode the token
    let decodedToken = jwt.verify(token,"Uranium-Group-23")
    
    // Check Decoded token is here or not
    if(!decodedToken) return res.status(401).send({ status : false, msg : "Token is Not Present"})

    req.decodedToken = decodedToken 

    req['userId']=decodedToken.userId

    // if Everything is ok then we head towards Api's
    next();

}catch(err)
{
res.status(500).send({ status: false, err : "Token is Invalid" })
}
}


const authorization =async function(req,res,next){
let loggedInUser=req.userId;
let userLoggin;
if(req.params.hasOwnProperty('bookId')){ 
    if(!isValidObjectId(req.params.bookId)) return res.status(400).send({ status: false, msg: "Enter a valid bookId" })

    let bookdata = await bookModel.findById(req.params.bookId); 
     if(!bookdata) {
         return res.status(404).send({ status: false, msg: "Error, Please check Id and try again" });
     }
    userLoggin = bookdata.userId.toString(); 
}

if(req.body.hasOwnProperty('userId')) { 

    if(!isValidObjectId(req.body.userId)) return res.status(400).send({ status: false, msg: "Enter a valid userId" })
    userLoggin = req.body.userId; 
  }
if(loggedInUser!=userLoggin){
 return res.status(403).send({status:false,msg:"Authorization is failed"})
}
console.log("authorization suceess")
next()
}



module.exports={ authentication,authorization}