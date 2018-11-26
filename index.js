const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const mongoose = require('mongoose');
const { File } = require('./fileModel');
const config = require('./config');


/***
 * LOGGER
 */
let logger = {};
const infoStream = fs.createWriteStream(path.join(__dirname, 'logs/info.txt'));
const errorStream = fs.createWriteStream(path.join(__dirname, 'logs/error.txt'));
logger.info = function (msg) {
	var message = new Date().toISOString() + " : " + msg + "\n";
	infoStream.write(message);
};
logger.error = function (msg) {
	var message = new Date().toISOString() + " : " + msg + "\n";
	errorStream.write(message);
};


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
			cb(null, `${Date.now()}-${file.originalname}`);
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
		logger.info(`files fetched from db`)
		res.status(200).send(files);
	}).catch(error => {
		logger.error(`error fetching data: ${JSON.stringify(error, null, 2)}`)
		res.status(500).send({ error })
	})
})

app.post('/api/file', upload, (req, res) => {
	var file = new File({
		path: `/images/${req.file.filename}`,
		fs_path: `${__dirname}/${req.file.destination}${req.file.filename}`
	});
	file.save()
		.then(doc => {
			logger.info(`data saved: ${JSON.stringify(doc, null, 2)}`)
			app.io.emit('update')
		})
		.catch(error => {
			logger.error(`error saving data: ${JSON.stringify(error, null, 2)}`)
			res.status(500).send({ error })
		}) 
});

app.delete('/api/file/:id', (req, res) => {
	File.findByIdAndDelete(req.params.id, function(error, doc) {
		if (error) {
			logger.error(`error deleting data from DB: ${JSON.stringify(error, null, 2)}`);
			res.status(500).send({ err })
		}
		fs.unlink(doc.fs_path, (err) => {
			if (err) return logger.error(`error deleting file from FS: ${JSON.stringify(err, null, 2)}`);
			logger.info(`data deleted from DB and FS: ${JSON.stringify(doc, null, 2)}`)
			app.io.emit('update')
		 });
	})
})

if (process.env.NODE_ENV === 'production') {
	console.log("[SERVER] => production mode detected")
	let root = path.join(__dirname, '..', 'oglasi/www/public');
	app.use(express.static(root));
	app.use(function(req, res, next) {
	if (req.method === 'GET' && req.accepts('html') && !req.is('json') && 
		!req.path.includes('.')) {
				res.sendFile('index.html', { root });
		} else next();
	});
 }

server.listen(config.port, () => {
	const msg = `[SERVER] => ${config.port}`;
	logger.info(msg);
	console.log(msg);
});