var express = require('express');
var router = express.Router();
var TodoList = require('../models/todolist_model.js').TodoList;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var todolistDB;

module.exports.readAllToDoList = function (request, response, next) {

	console.log('readAllToDoList');
  	var collection = todolistDB.collection('TodoList');
  	collection.find({}).toArray(function(err, docs) {
    	console.log("Found the following records");
    	response.json(docs);
  	});
};

module.exports.readToDoList = function (request, response, next) {

	console.log('readToDoList');
  	console.log(request.params.id);
  	var id = request.params.id;

  	var collection = todolistDB.collection('TodoList');
  	collection.findOne({ _id : ObjectId(id)}, function(err, docs) {
		console.log("Found the following records");
    	response.json(docs);
  	});
};

module.exports.createToDoList = function (request, response, next) {

	console.log('createToDoList');

	var todolistJson = request.body;

  	var collection = todolistDB.collection('TodoList');
  	collection.insert(todolistJson, function(err, doc) {
  		if (err) {
  			console.log("insert error");
       		
     	} else {
        	console.log("complete");
        	response.json(doc.ops[0]);
      	}

      	response.end();
 //  	});

};

module.exports.deleteToDoList = function (request, response, next) {
	console.log('deleteToDoList');
	console.log(request.params.id);
 	var id = request.params.id;

    var collection = todolistDB.collection('TodoList');
    collection.deleteOne({ _id : ObjectId(id) }, function(err, doc) {
    	if (err) {
    		console.log('deleteToDoList error');
    	} else {
    		console.log('deleteToDoList complete');
    	}

    	response.json(doc);
    });
};

MongoClient.connect("mongodb://localhost:27017/TodoList", { useNewUrlParser: true }, function(err, database) {
  	if (err) throw err;
  	console.log('DB connecnt success');
  	todolistDB = database.db('todolist');
});

