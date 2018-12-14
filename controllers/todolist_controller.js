var express = require('express');
var router = express.Router();
var TodoList = require('../models/todolist_model.js').TodoList;
const userController = require('./user_controller.js');

module.exports.readAllToDoList = function (request, response) {
    const token = request.get('accessToken');
    userController.fetchUserByAccessToken(token).then(function (user) {
        console.log('user id : ' + user._id);
        TodoList.find({ _creator: user._id }).then(function (todolists) {
            response.json(todolists);
        }, function (err) {
            console.log(err);
            response.status('403').send('readAllToDoList failure');
        })
    }, function (err) {
        response.status('403').send('checkPermission : db access failure');
    });
};

module.exports.readToDoList = function (request, response) {
    const token = request.get('accessToken');
    var id = request.params.id;

    userController.fetchUserByAccessToken(token).then(function (user) {
        TodoList.find({ _id: id, _creator: user._id }).then(function (todolists) {
            if (todolists.length > 0) {
                response.json(todolists[0]);
                return;
            }
            response.json({});

        }, function (err) {
            console.log(err);
            response.status('403').send('readAllToDoList failure');
        })
    }, function (err) {
        response.status('403').send('checkPermission : db access failure');
    });
};

module.exports.createToDoList = function (request, response) {
    const todoList = new TodoList(request.body);
    const token = request.get('accessToken');

    userController.fetchUserByAccessToken(token).then(function (user) {
        if (!user) {
            response.status('403').send('checkPermission : does not have Permission');
            return;
        }

        todoList._creator = user._id;
        todoList.save().then(function (cTodoList) {
            response.json(todoList.getResponseTodoList());

        }, function (err) {
            console.log(err);
            response.status('403').send('createToDoList failure');
        });

    }, function (err) {
        response.status('403').send('checkPermission : db access failure');
    });
};

module.exports.deleteToDoList = function (request, response) {
    var id = request.params.id;
    const token = request.get('accessToken');

    userController.fetchUserByAccessToken(token).then(function (user) {
        //findOneAndRemove will return item if exist
        TodoList.findOneAndRemove({ _id: id, _creator: user._id }).then(function (item) {
            console.log('healmax ite : ' + item);
            if (!item) {
                response.status(404).json({ success: false, msg: 'Todo List not found' });
                return
            }

            response.json(item);
        }, function (err) {
            console.log(err);
            response.json({ success: false, msg: 'deleteToDoList remove error' });
        });
    }, function (err) {
        response.status('403').send('checkPermission : db access failure');
    });
};

