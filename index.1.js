var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var { File } = require('./fileModel');
var mongoUri = 'mongodb://yammat:gazda.321@ds257851.mlab.com:57851/yammat';


var PORT = 7000;
var UPLOAD_PATH = 'client/public/images/uploads/';

/***
 * DB
 */
require('./fileModel.js');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUri, { useNewUrlParser: true });

/***
* STORAGE
*/
//var upload = multer({ dest: '/tmp/'});
var upload = multer({ dest: UPLOAD_PATH }).single('file');
/***
 * SERVER
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * ROUTES
 */
app.post('/file_upload', upload.single('file'), function(req, res) {
   var file = __dirname + '/' + req.file.filename;
   fs.rename(req.file.path, file, function(err) {
     if (err) {
       console.log(err);
       res.send(500);
     } else {
       res.json({
         message: 'File uploaded successfully',
         filename: req.file.filename
       });
     }
   });
 });
// var file = new File({path: `${UPLOAD_PATH}/${req.file.filename}`});
// file.save()
//    .then(doc => res.status(200).send({success: "File upload successfull"}))
//    .catch(error => res.status(500).send({ error }))
// })


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}
app.listen(PORT, () => console.log("[SERVER] port => " + PORT));