
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("mongoose");

const {
    isValid,
    isValidTitle,
    isValidRequestBody,
    isValidPhone,
    isValidPhoneNumber,
    isValidEmail,
    isValidPassword
  } = require("../utils/validation")


  //User - Registration
const createUser= async function (req, res) {
    
    try {

      const reqBody = req.body

      //Empty body validation
      if (!isValidRequestBody(reqBody)) {
      return res.status(400).send({status: false,msg: "Invalid request, Please provide details"});
      }

  
      //Extracts params from body
      const { title, name, phone, email, password, address } = req.body

      //Params Validation
  
      if (!isValid(title)) {
          return res.status(400).send({ status: false, msg: "Title is required" })
      }

      if (!isValidTitle(title)) {
          return res.status(400).send({ status: false, msg: "Title should be among Mr, Mrs, Miss" })
      }
      
      if (!isValid(name)) {
          return res.status(400).send({ status: false, msg: "Name is required" })
      }

      if (!isValid(phone)) {
          return res.status(400).send({ status: false, msg: "Phone Number is required" })
      }

      if (!isValidPhone(phone)) {
          return res.status(400).send({ status: false, msg: "Please enter valid Phone Number" })
      }

      if (!isValidPhoneNumber(phone)) {
          return res.status(400).send({ status: false, msg: "Please enter numeric characters only" })
      }

      const isPhoneAlreadyUsed = await userModel.findOne({ phone: phone });
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} Phone number is already registered` })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        }
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Please enter Valid Email" })

      const isEmailAlreadyUsed = await userModel.findOne({ email: email }); 
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} Email address is already registered` })
        }

      if (!isValid(password)) {
          return res.status(400).send({ status: false, msg: "Password is required" })
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


  //*User creation
      let userCreated = await userModel.create(reqBody)
      res.status(201).send({status:true ,data: {userCreated}})
  
  } catch (err) {
  res.status(500).send({ msg: "server error", error: err.message });
  }
  }



const userLogin = async function (req, res) {
   try{
    ///////////////////////////extracting data by Destructuring//////////////////////////
    const { email, password } = req.body;
    const dta=req.body;
    /////////////////checking request body is empty or not(validation part)//////////////
    if (Object.keys(dta).length == 0)
        return res.status(400).send({ status: false, msg: "Email and password is required to login" });

    if (!(isValid(email)))
        return res.status(400).send({ status: false, msg: "Email is required to login" });
    if (!isValid(password))
        return res.status(400).send({ status: false, msg: "Password is required to login" });

    /////////////////cheking in DB /////////////////////////////////////////////////
    const chkUser = await userModel.findOne({ email: email, password: password })
    if (!chkUser) {
        return res.status(404).send({ status: false, message: "Email or Password doesn't match" })
    }
    //////////////////////////////////Creation of JSON Web Token/////////////////////
    const token = jwt.sign({
        userId: chkUser._id,
        //batch: "Uranium",
        //exp: Math.floor(Date.now() / 1000) + (60 * 30),
    }, "Uranium-Group-23",{expiresIn:"15min"}
    );
    //////////////////////////Sending created token to client///////////////////
    res.setHeader('x-auth-key',token);
    return res.status(200).send({ status: true, message: 'Success', data:{token} })
} 
catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
}
}

module.exports.userLogin = userLogin
module.exports.createUser = createUser
