const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    gender: String,
    email: String,
});

var User = conn.model('User', UserSchema);

module.exports.User = User;