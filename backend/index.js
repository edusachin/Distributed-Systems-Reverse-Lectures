const express = require('express')
const app = express();
const router = express.Router();
const multer = require('multer');
const path = require('path');
const compression = require('compression')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use((compression()))


const userstorage = multer.diskStorage({
    destination: path.join(__dirname) + '/uploads/',
    filename: (req, file, cb) => {
        cb(null, 'file'+ "_" + Date.now() + path.extname(file.originalname));
    }
});

const useruploads = multer({
    storage: userstorage,
    limits: { fileSize: 100000000000 },
}).single("image");

//1048576
app.post("/normal", (req, res) => {
console.log('received');
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');

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