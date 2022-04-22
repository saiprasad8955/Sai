const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//----------------CREATE USER
const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

//----------------CREATE LOGIN REQUEST
const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  //----------------Validate User
  let user = await userModel.findOne({ emailId: userName, password: password });

  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  //----------------Validate JSON Token
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Uranium",
      organisation: "FunctionUp",
    },
    "functionup-thorium"
  );

  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};

//----------------GET USER
const getUserData = async function (req, res) {
  // token present check via middleware
  //----------------verify the token via middleware

  //user validation
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

//----------------Update Request
const updateUser = async function (req, res) {
  // check token via midddleware
  // verify token
  // validate user
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  //return error if user not present
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;

  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    userData,
    { new: true }
  );
  res.send({ status: true, data: updatedUser });
};

//----------------Delete Request
const deleteUser = async function (req, res) {
  // check token via middleware

  // update attribute
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  user.isDeleted = true;
  await user.save();

  // let updatedUser = await userModel.findOneAndUpdate({ _id : userId }, { isDeleted : true },{ new : true });
  res.send({ status: true, data: user });
};

const messagePost = async function (req, res) {
  let message = req.body.message;

  //----------check token and valid
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) {
    return res.send({ status: false, msg: "token must be present" });
  }

  //----------Authorise the person who is logged in and modifying self data if not then throw a error.
  let decodedToken = jwt.verify(token, "functionup-thorium");
  let userToBModified = req.params.userId;
  let userLoggedIn = decodedToken.userId;

  if (userToBModified !== userLoggedIn) {
    return res.send({
      status: false,
      msg: "User Logged in is Not Allowed to Make Changes",
    });
  }

  //-----------user validation
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.status(400).send({ status: false, msg: "No such user Found" });
  }

  let updatedposts = user.post;
  updatedposts.push(message);

  let updatedDocument = await userModel.findOneAndUpdate(
    { _id: user._id },
    { post: updatedposts },
    { new: true }
  );

  res.status(201).send({ status: true, msg: updatedDocument });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.messagePost = messagePost;
