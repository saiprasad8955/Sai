const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("mongoose");

//////////////////isValid function for validations on input ///////////////
var isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};
//////////////////////regex for email and mobile///////////////////////////
const isValidPhone = function (value) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(value) }
const isValidEmail = function (value) { return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value) }




///////////////////////////////////////*User - Registration//////////////////////////////
const createUser = async function (req, res) {
    try {

        //*Empty body validation

        const data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false, msg: "Invalid request, Please provide details",
            });
        }

        //*Extracts params from body

        const title = req.body.title;
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const address = req.body.address;



        //*Params Validation

        if (!isValid(title)) return res.status(400).send({ status: false, msg: "Title is required" })
        if (!isValid(name)) return res.status(400).send({ status: false, msg: "Name is required" })

        if (!isValid(phone)) return res.status(400).send({ status: false, msg: "Phone Number is required" })
        if (!isValidPhone(phone)) return res.status(400).send({ status: false, msg: "Please enter valid Phone number" })

        const isPhoneAlreadyUsed = await userModel.findOne({ phone });
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${phone} Phone number is already registered` })
        }

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "Email is required" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Please enter Valid Email" })

        const isEmailAlreadyUsed = await userModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} Email address is already registered` })
        }

        if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is required" })


        //*User creation

        let userCreated = await userModel.create(data)
        res.status(201).send({ status: true, data: userCreated })

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

    if (!isValid(email))
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
        batch: "Uranium",
        exp: Math.floor(Date.now() / 1000) + (60 * 30),
    }, "Uranium-Group-23"
    );
    //////////////////////////Sending created token to client///////////////////
    return res.status(200).send({ status: true, message: 'Success', data:{token} })
} 
catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
}
}

module.exports.userLogin = userLogin
module.exports.createUser = createUser
