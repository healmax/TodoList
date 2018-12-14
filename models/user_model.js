const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    accessToken: { type: String, required: true },
    facebookId: String,
    gender: String,
    email: String,
});

var User = conn.model('User', UserSchema);

module.exports.User = User;