var express = require('express');
var app = express();
var fs = require("fs");

var mongoose = require('mongoose');
var { File } = require('./fileModel');

var bodyParser = require('body-parser');
var multer = require('multer');

var MONGO_URI = 'mongodb://gazda:gazda.321@ds159387.mlab.com:59387/yammat';
var UPLOAD_PATH = 'client/public/images/uploads';
var PORT = 7000;

/***
 * DB
 */
require('./fileModel.js');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });


/***
 * SERVER
 */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
var upload = multer({dest: UPLOAD_PATH})

app.post('/api/upload', upload.single("file"), function (req, res) {
   var filePath = `${UPLOAD_PATH}/${req.file.originalname}`;
   
   fs.readFile(req.file.path, function (err, data) {
      fs.writeFile(filePath, data, function (err) {
            if (err) {
               res.status(500).send({
                  message: 'error', 
                  filename: req.file.originalname,
                  error: err 
               })
            } else {
               var file = new File({
                  path: `images/uploads/${req.file.originalname}`,
                  fs_path:  `${UPLOAD_PATH}/${req.file.originalname}`
               });
               file.save()
                  .then(doc => {
                     console.log(doc)
                     res.status(200).send({
                        message: 'success', 
                        filename: req.file.originalname, 
                        filelocation: `${UPLOAD_PATH}/${req.file.originalname}`, 
                        path: `images/uploads/${req.file.originalname}`,
                        db: doc
                     })
                  })
                  .catch(error => res.status(500).send({ error })) 
            }
         });
      });
})

var server = app.listen(PORT, function () {
   var port = server
      .address()
      .port

   console.log("[SERVER] => %s", port)
})