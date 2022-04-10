const express = require('express');
const logger = require('./logger')

const router = express.Router();

//1.Create an API for GET /movies that returns a list of movies. Define an array of movies in your code and return the value in response.

router.get('/movies', function (req, res) {
    let movies = ['rang de basnasti', 'the shining', 'lord of the rings', 'bartman begins'];
    res.send(movies);
});


//2.Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api
//movies/2
//2.1Handle a scenario in problem 2 where if the index is greater than the valid maximum value a message is returned that tells the user to use a valid index in an error message.


router.get("/movies/:abcd", function (req, res) {
  let movies = [
    "rang de basnasti",
    "the shining",
    "lord of the rings",
    "bartman begins",
  ];
  let x = req.params.abcd;
  console.log(x);

  if (x > movies.length || x < 0) {
    return res.status(404).send("!!!Invalid Index. Please Enter the Correct Index");
  } else {
      ///Using Map Function

    movies.map(function(e,i/*,array*/){
        if( i == x ){
            return res.send(e);
        }
    })

    // Using for loop
    
    // for (i = 0; i < movies.length; i++) {
    //   if (i == x) {
    //     return res.send(movies[i]);
    //   }
    // }
  }
});

//// 3.Write another api called GET /films. Instead of an array of strings define an array of movie objects this time. Each movie object should have values - id, name. An example of movies array is and Return the entire array in this api’s response

router.get("/movies1",function(req,res){
 res.status(200).send(x);
   })


/////4.Write api GET /films/:filmId where filmId is the value received in request path params. Use this value to return a movie object with this id. In case there is no such movie present in the array, return a suitable message in the response body. Example for a request GET /films/3 should return the movie object 
// {
//     “id”: 3,
//     “name”: “Rang de Basanti”
//    }
//    Similarly for a request GET /films/9 the response can be something like - ‘No movie exists with this id’


router.get("/movies2/:movieindex",function(req,res){
    let movies = [ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }];
      
 let x = req.params.movieindex;
 // from map function(4.1)
 movies.map(function (y) {
   if (y.id == x) {
     return res.send(y);
   }
 });



//from for loop(4.2)
//  for(i=0;i<movies.length;i++){
//      if( x > movies.length ) {
//          return res.send("No Such Movie Exists on this Index");
//      }else if( x == i ){
//          return res.send(movies[i]);
//      }
//  }
})

module.exports = router;
// adding this comment for no reason