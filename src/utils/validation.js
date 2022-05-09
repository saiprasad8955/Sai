const mongoose = require("mongoose");


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidTitle = function (title) {
    return ["Mr", "Mrs", "Miss", "Mast"].indexOf(title) !== -1;
};

const isValidPhone = function (phone) { 
    return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(phone) 
}

const isValidPhoneNumber = function (phone) { 
    return /^([+]\d{2}[ ])?\d{10}$/.test(phone) 
         
}

const isValidEmail = function (email) {
     return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}

const isValidPassword = function(password) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };



module.exports = {
    isValid,
    isValidTitle,
    isValidRequestBody,
    isValidPhone,
    isValidPhoneNumber,
    isValidEmail,
    isValidPassword,
    isValidObjectId
  };



