const express = require('express');
const logger = require('./logger')

const router = express.Router();

// router.get('/user-profile/:abcd', function(req, res) {
//     console.log(req)
//     console.log(req.params.abcd)
//     res.send('dummy response')
// })

// router.get('/test-me', function (req, res) {
//     console.log('------------------')
//     console.log(req)
//     console.log('------------------')
//     console.log('These are the request query parameters: ', req.query)
//     res.send('My first ever api!')
// });

router.get('/movies', function (req, res) { 
  let movies = [ "Batman","Spider Man","Lord of Rings","Eternals","RRR" ];
    res.send(movies)
});

router.get('/movies/:indexNumber', function (req, res) { 
  let movies = ["Batman","Spider Man","Lord of Rings","Eternals","RRR" ];
  
  let index = req.params.indexNumber
  
  console.log(index);
  if(index < 0 || index >= movies.length)  {
       res.status(404).send("invalid index")
  }
  else{
      for(let i = 0 ; i < movies.length ; i++){

          if(i == index){
               res.send(movies[index]);
          }
      }
    
  }   
});

router.get('/films', function (req, res) { 
  //let movies = [ "Batman","Spider Man","Lord of Rings","Eternals","RRR" ];
  let movies = [ {
      'id': 1,
      'name': 'The Shining'
     }, 
     {
      'id': 2,
      'name': 'Incendies'
     }, {
      'id': 3,
      'name': 'Rang de Basanti'
     }, {
      'id': 4,
      'name': 'Finding Nemo'
      
     }]
     
  res.send(movies)
});


router.get('/films/:filmId', function (req, res) { 
  //let movies = ["Batman","Spider Man","Lord of Rings","Eternals","RRR"];
  
  let filmId = req.params.filmId
  
  let movies = [ {
      'id': 1,
      'name': 'The Shining'
     }, 
     {
      'id': 2,
      'name': 'Incendies'
     }, {
      'id': 3,
      'name': 'Rang de Basanti'
     }, {
      'id': 4,
      'name': 'Finding Nemo'
      
     }]

     movies.map(function(obj) {
         if(obj.id == filmId){
             return res.send(obj);
         }
     })
     
  res.status(404).send('No movie exists with this id')
});





module.exports = router;
// adding this comment for no reason