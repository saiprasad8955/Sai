module.exports.mid  = function (req,res,next){
    // console.log(req.headers);
    if(req.headers.isfreeappuser){
        next()
    }else{
        res.send("This Header is Present or not")
    }
   
}


