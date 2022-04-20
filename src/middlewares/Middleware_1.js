

module.exports.mid1= function ( req, res, next) {
 if(req.headers.isFreeAppUser){
     next()
 }else{
     res.send("FreeAppUser Must be Present")
 }
    
}
