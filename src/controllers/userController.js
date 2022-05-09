
const userModel = require("../models/userModel")

const {
    isValid,
    isValidTitle,
    isValidRequestBody,
    isValidPhone,
    isValidPhoneNumber,
    isValidEmail,
    isValidPassword
  } = require("../utils/validation")



//*User - Registration
const createUser= async function (req, res) {
    try{
  
  //*Empty body validation
      const reqBody = req.body

      if(!isValidRequestBody(reqBody))
      return res.status(400).send({status: false,msg: "Invalid request, Please provide details"});

  
  //*Extracts params from body
      const { title, name, phone, email, password, address } = req.body


  //*Params Validation
  
      if (!isValid(title)) return res.status(400).send({ status: false, msg: "Title is required" })
      if (!isValidTitle(title)) return res.status(400).send({ status: false, msg: "Title should be among Mr, Mrs, Miss" })
      
      if (!isValid(name)) return res.status(400).send({ status: false, msg: "Name is required" })

      if (!isValid(phone)) return res.status(400).send({ status: false, msg: "Phone Number is required" })
      if (!isValidPhone(phone)) return res.status(400).send({ status: false, msg: "Please enter valid Phone Number" })
      if (!isValidPhoneNumber(phone)) return res.status(400).send({ status: false, msg: "Please enter numeric characters only" })
      //if (!isValidPhone(phone) && !isValidPhoneNumber(phone)) return res.status(400).send({ status: false, msg: "Please enter valid Phone Number" })
      
      const isPhoneAlreadyUsed = await userModel.findOne({ phone: phone });
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} Phone number is already registered` })
        }

      if (!isValid(email)) return res.status(400).send({ status: false, msg: "Email is required" })
      if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Please enter Valid Email" })

      const isEmailAlreadyUsed = await userModel.findOne({ email: email }); 
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} Email address is already registered` })
        }

      if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is required" })
      if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: "Password should be 8-15 character long and must contain atleast one Digit, one Special symbol ,one Uppercase and lowercase character."})


  //*User creation
  
      let userCreated = await userModel.create(reqBody)
      res.status(201).send({status:true ,data: userCreated})
  
  } catch (err) {
  res.status(500).send({ msg: "server error", error: err.message });
  }
  }


  module.exports.createUser = createUser