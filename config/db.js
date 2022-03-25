const mongoose = require('mongoose');
var MONGO = mongoose.connect("mongodb://0.0.0.0:27017/blog")
module.exports.MONGO = MONGO;