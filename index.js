const express = require('express');
const multer = require('multer');
const fs = require('fs');
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const mongoose = require('mongoose');
const { File } = require('./fileModel');
const config = require('./config');

const MONGO_URI = 'mongodb://gazda:gazda.321@ds159387.mlab.com:59387/yammat';
const PORT = 7000;
const UPLOAD_PATH = 'www/public/images/';

/***
 * DB
 */
require('./fileModel.js');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoUri, { useNewUrlParser: true });

/**
 * STORAGE
 */
var storage = multer.diskStorage({
	destination: function(req, file, cb){
			cb(null, config.uploadPath);
	},
	filename: function(req, file, cb){
			cb(null, file.originalname);
	}
});
var upload = multer({ storage: storage }).single('file');


/**
 * SERVER
 */
const server = http.createServer(app);
const io = socketIo(server);
app.io = io;

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
			app.io.emit('update')
		})
		.catch(error => res.status(500).send({ error })) 
});

app.delete('/api/file/:id', (req, res) => {
	File.findByIdAndDelete(req.params.id, function(err, doc) {
		if (err) res.status(500).send({ err })
		fs.unlink(doc.fs_path, (err) => {
			if (err) throw err;
			app.io.emit('update')
		 });
	})
})



server.listen(config.port, () => console.log(`[SERVER] => ${config.port}`));