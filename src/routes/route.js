const express = require('express');

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
        "city": "mumbai",              /* 1)req=> post & get    2) req.body=> post     3) req.query => get */
        "sports": [
            "soccer"
        ],
    },
    
]



router.post('/players', function (req, res) {
  let x = req.body ;
  let playersName = x.name;
for(let i=0;i<players.length;i++){
    if(players[i].name == playersName){
        res.send("Player Already Exists")
    }
}
players.push(x);
res.send(players);

//   players.map(function(obj){
//    if(obj.name == x){
//       res.send("Player Already Exists")
//     }
//   res.send({name : (req.body.name), status : true});
//     });
}),

module.exports = router
