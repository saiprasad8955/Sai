const bookModel = require('../models/bookModel')
const mongoose=require('mongoose')
const userModel = require('../models/userModel')
let date=new Date()

////////////////////function for cheking valid objectId or not////////////////////
const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);
};

///////////////////////////////////create Book///////////////////////////////////
const createBook = async function (req, res) {
    try {
        const { title, excerpt, userId, ISBN, category, subcategory } = req.body;
        chkUserID = await userModel.findById({ _id: userId })
        if (!chkUserID) {
            return res.status(404).send({ status: false, message: "UserId does not exist in our DataBase Please correct it" })
        }
        createdBook = await bookModel.create(req.body)
        return res.status(201).send({ status: true, message: "Created", data: createdBook })

    }
    catch (err) {
        res.status(500).send({ status: false, message: "server error", error: err.message });
    }
}


///////////////////////////////////get books review API///////////////////

const getBook = async function (req, res) {
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