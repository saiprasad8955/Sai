module.exports.tokenAuth = function(req,res,next){
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    if (!token) return res.send({ status: false, msg: "token must be present" });
     next()
    console.log(token);
}

module.exports.verifyToken = function(req,res,next){
    let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
    console.log(decodedToken);
  next();
}

