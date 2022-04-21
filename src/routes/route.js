
const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController");
const jwt = require("jsonwebtoken");


const tokenAuth = function(req,res,next){
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) return res.send({ status: false, msg: "token must be present" });

    try {
        let decodedToken = jwt.verify(token, "functionup-thorium");
      } 
    catch(err) {
        return res.send({ status: false, msg: "token is invalid" });
      }
    next()
    console.log(token);
}


router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end

router.get("/fetch/:userId",tokenAuth, userController.getUserData)

router.put("/update/:userId",tokenAuth, userController.updateUser)

router.put("/delete/:userId",tokenAuth, userController.deleteUser)


module.exports = router;