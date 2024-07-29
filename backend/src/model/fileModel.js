// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    url: String,
    contentType: String,
    size: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
