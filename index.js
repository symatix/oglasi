const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
var mongoose = require('mongoose');
var { File } = require('./fileModel');

const MONGO_URI = 'mongodb://gazda:gazda.321@ds159387.mlab.com:59387/yammat';
const PORT = 7000;
var UPLOAD_PATH = 'www/public/images/';

/***
 * DB
 */
require('./fileModel.js');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

/**
 * STORAGE
 */
var storage = multer.diskStorage({
	destination: function(req, file, cb){
			cb(null, UPLOAD_PATH);
	},
	filename: function(req, file, cb){
			cb(null, file.originalname);
	}
});
var upload = multer({ storage: storage }).single('file');

/**
 * SERVER
 */
app.get('/api/files', (req, res) => {
	File.find({}).then(files => {
		res.status(200).send(files);
	}).catch(error => res.status(500).send({ error }))
})

app.post('/api/file', upload, (req, res) => {
	var file = new File({
		path: `images/${req.file.originalname}`,
		fs_path:  `${req.file.destination}${req.file.originalname}`
	});
	file.save()
		.then(doc => {
			res.status(200).send(doc)
		})
		.catch(error => res.status(500).send({ error })) 
});

app.delete('/api/file/:id', (req, res) => {
	File.findByIdAndRemove(req.params.id, function(err, doc) {
		if (err) res.status(500).send({ err })
		fs.unlink(doc.fs_path, (err) => {
			if (err) throw err;
			res.status(200).send(doc)
		 });
		
	})
})

app.listen(PORT, () => console.log(`[SERVER] => ${PORT}`));