const express = require('express')
var multer = require('multer')
const app = express()
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname) + "/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.image + path.extname(file.originalname));
  }
});
const uploads = multer({
  storage: storage,
  limits: { fileSize: 5000000000 }
}).single("Image");

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/:image', function (req, res) {
  console.log(req.body)
  uploads(req, res, function (err) {
    console.log("Request ::=>", req.body);
    console.log(req.body);
    console.log("Request file ::=>", req.files);

    if (!err) {
      return res.status(200).send('Post request successful');
    } else {
      console.log("Error!");
      console.log(err)
      return res.status(500).send('Post request unsuccessful');
    }
  });
})

port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)

