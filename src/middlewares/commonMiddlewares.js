const check_isFreeAppUser = function ( req, res, next) {

    let isFreeAppUser = req.headers.isfreeappuser
    if(!isFreeAppUser){
        return res.send( {status :false, message: 'The request is missing a mandatory header'} )
    }
   
     req.isFreeAppUser = req.headers.isfreeappuser
    next()
}

module.exports.check_isFreeAppUser = check_isFreeAppUser