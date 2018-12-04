var express = require('express');
var router = express.Router();
var TodoList = require('../models/todolist_model.js').TodoList;

module.exports.readAllToDoList = function (request, response, next) {
    TodoList.find(function (err, docs) {
        if (err) {
            console.log(err);

        } else {
            response.json(docs);
        }

        response.end('');
    });
};

module.exports.readToDoList = function (request, response, next) {
    console.log(request.params.id);
    var id = request.params.id;

    TodoList.findById(id, function (err, doc) {
        if (err) {
            console.log(err);

        } else {
            response.json(doc);
        }

        response.end('');
    });
};

module.exports.createToDoList = function (request, response, next) {
    const todoList = new TodoList(request.body);

    todoList.save(function(err) {
        if (err) {
            console.log(err);

        } else {
            response.json(JSON.stringify(todoList));
        }

        response.end('');
    });
};

module.exports.deleteToDoList = function (request, response, next) {
	  console.log(request.params.id);
 	  var id = request.params.id;

    TodoList.remove({_id : id}, function(err, doc) {
        if (err) {
    		    console.log('deleteToDoList error');

    	  } else {
            console.log('deleteToDoList complete');
            response.json(doc);
        }

        response.end('');
    });
};

