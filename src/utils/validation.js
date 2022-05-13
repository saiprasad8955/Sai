

const mongoose = require("mongoose");


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValid2 = function (value) {
    const dv = /[a-zA-Z]/;
    if (typeof value !== 'string') return false;
    if (dv.test(value) === false) return false;
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


const isValidEmail = function (email) {
     return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}

const isValidPassword = function(password) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };


const isValidPincode = function(value) {
    const dv = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/; 
    if(typeof value !== 'string') return false
    if(dv.test(value)=== false) return false
    return true
 }
const isValidRating = function(rating) {
    if(rating >= 1 && rating<=5) return true;
    return false
}

module.exports = {
    isValid,
    isValidTitle,
    isValidRequestBody,
    isValidPhone,
    isValidEmail,
    isValidPassword,
    isValidObjectId,
    isValid2,
    isValidPincode,
    isValidRating
  };



