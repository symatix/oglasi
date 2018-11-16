const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const fileModel = new Schema({
	path: String,
	fs_path: String
}, { collection: 'files' });

const File = mongoose.model('files', fileModel);

module.exports = { File };