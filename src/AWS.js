const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "AKIAY3L35MCRUJ6WPO6J",
    secretAccessKey: "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",
    region: "ap-south-1"
});


// Function is uploading file to AWS
const uploadFile = async (file) => {
    // Promisify the Function because we can not use await on callBack Function
    return new Promise((resolve, reject) => {

        // Using SIMPLE STORAGE SERVICE
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });

        //create A Object for uploading
        const uploadParams = {
            ACL: "public-read",                     // Access Control List tells us access to which users 
            Bucket: "classroom-training-bucket",    // Folder in which we are uploading our files
            Key: "Sai/" + file.originalname,        // Folder inside a Bucket for storing indistinct datas
            Body: file.buffer                       // Will send file data in body as buffer
        };

        // Upload Body (file) with help of ACL, Bucket, and Key
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                return reject({ "error": err })
            }
            else {
                return resolve(data.Location)
            }
        });

        // If s3 will upload data then it will receive a object as all properties in it including a kry called location in which we got the url where the file is stored.

    })
}


module.exports = { uploadFile }