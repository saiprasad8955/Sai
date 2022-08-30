const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose')
const { uploadFile } = require('./AWS.js')
const linkModel = require('../model/model.js')

const app = express();
app.use(express.json());
app.use(multer().any());

mongoose.connect("mongodb+srv://Sai0047:rXxgqYKPqwnhcXX7@cluster0.qptsw.mongodb.net/AWS_S3", { useNewUrlParser: true })
    .then(() => { console.log("MongoDB is Successfully Connected") })
    .catch((err) => { console.log(err.message) });

// ===============================FILE UPLOAD
app.post('/uploadFile', async (req, res) => {
    try {

        let files = req.files;

        if (files && files.length > 0) {
            // File upload     
            let fileUpload = await uploadFile(files[0]);
            const DB = await linkModel.create({ Link: fileUpload });
            return res.status(201).json({ data: DB })
        } else return res.status(400).send({ data: "No file to Read!!" })
    } catch (error) {
        return res.status(500).send({ "msg": error })
    }
})


app.listen(3000, () => { console.log("Server is Connected") });