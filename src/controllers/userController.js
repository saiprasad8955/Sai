const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//----------------CREATE USER
const createUser = async function (req, res) {
  try {
    let data = req.body;

    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      res.status(200).send({ msg: savedData });
    } else {
      res.status(400).send({ msg: "Bad Request" });
    }
  } catch (err) {
    // console.log("This is the error :", err.message);
    return res.status(500).send({ status: false, err: err.message });
  }
};

//----------------CREATE LOGIN REQUEST
const loginUser = async function (req, res) {
  try {
    let data = req.body;
    let userName = data.emailId;
    let password = data.password;
    if (userName !== "" && password !== "") {
      let re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (re.test(userName)) {
        let user = await userModel.findOne({
          emailId: userName,
          password: password,
        });

        if (!user)
          res.status(400).send({ msg: "Invalid username or the password" });

        let token = jwt.sign(
          {
            userId: user._id.toString(),
            batch: "Uranium",
            organisation: "FunctionUp",
          },
          "functionup-thorium"
        );
        res.setHeader("x-auth-token", token);
        res.status(201).send({ status: true, data: token });
      } else res.status(401).send({ msg: "UserName is not a valid email" });
    } else res.status(400).send({ msg: "Bad Request" });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

//----------------GET USER
const getUserData = async function (req, res) {
  // token present check via middleware
  //----------------verify the token via middleware

  //user validation
  try {
    let userId = req.params.userId;

    let userDetails = await userModel.findById(userId);
    if (!userDetails || userDetails.isDeleted)
      return res.status(404).send({ msg: "No such user exists" });

    res.status(200).send({ userDetail: userDetails });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};
//----------------Update Request
const updateUser = async function (req, res) {
  // check token via midddleware
  // verify token
  // validate user
  try {
    let userId = req.params.userId;

    let user = await userModel.findById(userId);

    if (!user || user.isDeleted) {
      return res.status(404).send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.status(200).send({ status: true, data: updatedUser });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

//----------------Delete Request
const deleteUser = async function (req, res) {
  // check token via middleware

  // update attribute
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if (!user || user.isDeleted) {
      return res.status(404).send("No such user exists");
    }

    //let userData = req.body;
    //let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
    // res.send({ status: true, data: updatedUser });

    user.isDeleted = true;
    await user.save();
    res.status(205).send({ data: user });
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

const messagePost = async function (req, res) {
  let message = req.body.message;
  try {
    //----------check token and valid
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    if (!token) {
      return res.send({ status: false, msg: "token must be present" });
    }

    //----------Authorise the person who is logged in and modifying self data if not then throw a error.

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
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.messagePost = messagePost;
