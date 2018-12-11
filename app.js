
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var todolistRout = require('./routes/todolist.js');
var authRoute = require('./routes/auth_route.js');
var authController = require('./controllers/auth_controller.js');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoute);

app.use(authController.checkPermission);;

app.use('/todolist', todolistRout);

app.listen(3000);
