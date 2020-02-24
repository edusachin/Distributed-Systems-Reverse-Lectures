const express = require('express')
const app = express();
const router = express.Router();
const multer = require('multer');
const path = require('path');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


const userstorage = multer.diskStorage({
    destination: path.join(__dirname) + '/uploads/',
    filename: (req, file, cb) => {
        cb(null, 'file'+ "_" + Date.now() + path.extname(file.originalname));
    }
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 10000000000000000 },
}).single("image");


app.post("/normal", (req, res) => {
    useruploads(req, res, function (err) {
        if (!err) {
            res.status(200).send("UPLOADED");
        }
        else {
            console.log(err);
            res.status(500).send("FAILED");

        }
    })
});


app.post("/compressed", (req, res) => {
    useruploads(req, res, function (err) {
        if (!err) {
            res.status(200).send("UPLOADED");
        }
        else {
            console.log(err);
            res.status(500).send("FAILED");

        }
    })
});





app.listen(3001, () => {
  console.log('app listening on port 3001!')
});