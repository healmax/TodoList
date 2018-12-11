const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var SocialUserSchema = mongoose.Schema({
    socialId: { type: String, required: true },
    name: { type: String, required: true },
    accessToken: { type: String, required: true },
    gender: String,
    email: String,
});

var SocialUser = conn.model('SocialUser', SocialUserSchema);

module.exports.SocialUser = SocialUser;