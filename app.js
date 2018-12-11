
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var todolistRout = require('./routes/todolist.js');
var authRoute = require('./routes/auth_route.js');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function (request, response, next) {
//     var token = request.get('accessToken');
//     console.log(token);
//     next();
// });

app.use('/todolist', todolistRout);
app.use('/auth', authRoute);

app.listen(3000);
