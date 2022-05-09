
const userModel = require("../models/userModel")
const jwt=require




























const userLogin=async function(req,res){
    const{email,password}=req.body;
    const chkUser=await userModel.findOne({email:email,password:password})
    if(!chkUser){
        return res.status(404).send({status: false, message: "Email or Password doesn't match"})
    }
    const token= 
}