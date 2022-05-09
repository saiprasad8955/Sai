
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("mongoose");


var isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};




























const userLogin = async function (req, res) {
    ///////////////////////////extracting data by Destructuring//////////////////////////
    const { email, password } = req.body;
    /////////////////checking request body is empty or not(validation part)//////////////
    if (Object.keys(res.body).length == 0)
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
    return res.status(200).send({ status: true, message: 'Success', data: token })
}

module.exports.userLogin=userLogin