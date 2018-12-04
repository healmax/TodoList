
var express = require('express');
var bodyParser = require('body-parser');
var todolistRout = require('./routes/todolist.js');


var app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use('/todolist', todolistRout);

app.listen(3000);
