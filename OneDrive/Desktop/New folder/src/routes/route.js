const express = require('express');
const router = express.Router();

const allController = require("../controllers/allController.js")
  

const mid1 =  (req, res, next) =>{
    const d =new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '')  
    const ip = req.socket.remoteAddress;
    const url = req.url
    console.log( d + " , " + ip + " , " + url );

    let login = true;
    if (login === true) {
        next()
    } else {
        console.log(req.path);
        return res.send("Login is required")
    }

}

router.post('/createBatch', mid1 ,allController.createBatches)

router.post('/createDeveloper', mid1 ,allController.createDevelopers)

router.get('/scholarshipdevelopers', mid1 ,allController.scholarshipdevelopers)

router.get('/developers', mid1 ,allController.developers)








module.exports = router ;