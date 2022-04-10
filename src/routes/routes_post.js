const express = require('express');
const logger = require('./logger')

const router = express.Router();
let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]


router.post('/players', function (req, res) {
 
// LOGIC WILL COME HERE

// Using Map Function. 
 let x = req.body;
players.map(function(e){
  if( x.name == e.name ){
  res.send("Player Already Exists")
}
players.push(x);

res.send(players);

})
})



// Using For Loop
/*
let x = req.body ;
  let playersName = x.name;
for(let i=0;i<players.length;i++){
    if(players[i].name == playersName){
        res.send("Player Already Exists")
    }
}
players.push(x);
res.send(players);*/
module.exports = router;