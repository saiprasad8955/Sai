const express = require('express');
const router = express.Router();
const bookModels = require("../Book_Model/Book_model.js");



router.post("/createBookData",  async function(req,res){
  let data = req.body;
  let savedBookData = await bookModels.create(data);
  res.send({message : savedBookData});
})

router.get("/getBookData", async function(req,res){
    let allBookmodels = await bookModels.find();
    res.send({message : allBookmodels});
})

module.exports = router;