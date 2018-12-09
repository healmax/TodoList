var express = require('express');
var router = express.Router();
var TodoList = require('../models/todolist_model.js').TodoList;

module.exports.readAllToDoList = function (request, response) {
    TodoList.find().then(function (todolists) {
        response.json(todolists);
    }, function (err) {
        console.log(err);
        response.status('403').send('readAllToDoList failure');
    });
};

module.exports.readToDoList = function (request, response) {
    console.log(request.params.id);
    var id = request.params.id;

    TodoList.findById(id).then(function (todoList) {
        response.json(todoList);
    }, function (err) {
        console.log(err);
        response.status('403').send('readToDoList failure');
    });
};

module.exports.createToDoList = function (request, response) {
    const todoList = new TodoList(request.body);

    todoList.save().then(function (todoList) {
        response.json(todoList);
    }, function (err) {
        console.log(err);
        response.status('403').send('createToDoList failure');
    });
};

module.exports.deleteToDoList = function (request, response) {
    console.log(request.params.id);
    var id = request.params.id;

    TodoList.remove({ _id: id }).then(function (todolist) {
        response.json(todolist);
    }, function (err) {
        console.log(err);
        response.status('403').send('deleteToDoList failure');
    });
};

