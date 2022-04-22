const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");

const tokenAuth = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) {
      return res.send({ status: false, msg: "token must be present" });
    }
    let decodedToken = jwt.verify(token, "functionup-thorium");
    let userToBModified = req.params.userId;
    let userLoggedIn = decodedToken.userId;

    if (userToBModified !== userLoggedIn) {
      return res.send({
        status: false,
        msg: "User Logged in is Not Allowed to Make Changes",
      });
    }
    next();
  } catch (err) {
    return res.send({ status: false, msg: "token is invalid" });
  }
  // console.log(token);
};

router.post("/users", userController.createUser);

router.post("/login", userController.loginUser);

//The userId is sent by front end

router.get("/fetch/:userId", tokenAuth, userController.getUserData);

router.put("/update/:userId", tokenAuth, userController.updateUser);

router.put("/delete/:userId", tokenAuth, userController.deleteUser);

router.post("/users/:userId/posts", tokenAuth, userController.messagePost);

module.exports = router;
