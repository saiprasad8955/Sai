let addToArray = function (req, res) {
    let x = req.body.name ;
    console.log(x);
    players.map(function(obj){
      if(obj.name == x){
        res.send("Player Already Exists")
      }
    res.send({ name : (req.body.name) , status:true })
})
}
module.exports.addToArray= addToArray;   