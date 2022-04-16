const mongoose = require('mongoose');
require('dotenv').config()
var mongodbUrl = process.env.MONGO_URL;
// var MONGO = mongoose.connect("mongodb://0.0.0.0:27017/blog")
var MONGO = mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
module.exports.MONGO = MONGO;