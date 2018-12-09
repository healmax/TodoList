
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var todolistRout = require('./routes/todolist.js');
var authRoute = require('./routes/auth_route.js');


var app = express();


passport.use(new FacebookTokenStrategy({
    clientID: 1927302487348085,
    clientSecret: "a96f44284e5f46556207bc676ba7ac50"
}, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (error, user) {
        return done(error, user);
    });
}
));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/todolist', todolistRout);
app.use('/auth', authRoute);

app.listen(3000);
