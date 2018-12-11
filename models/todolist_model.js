const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var TodoListSchema = mongoose.Schema({
    content: { type: String, required: true },
});

var TodoList = conn.model('TodoList', TodoListSchema);

module.exports.TodoList = TodoList;