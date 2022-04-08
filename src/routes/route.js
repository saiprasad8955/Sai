const express = require('express');

const router = express.Router();
const git = require ("../controllers//randomController");
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
        "city": "mumbai",              /* 1)req=> post & get    2) req.body=> post     3) req.query => get */
        "sports": [
            "soccer"
        ],
    },
]

router.post('/players', function (req, res) {
  let x = req.body.name ;
  players.map(function(obj){
   if(obj.name == x){
      res.send("Player Already Exists")
    }
    // let obj1 = {name:(req.body.name),status: true};
  //   // console.log(obj1);
  // let y = players.push(obj1)
  res.send({name : (req.body.name), status : true});
 });
}),

module.exports = router
