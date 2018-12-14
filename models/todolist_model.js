const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var TodoListSchema = mongoose.Schema({
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    status: { type: Number, required: true, default: 0 },
    // tag: tagId
});

TodoListSchema.methods.getResponseTodoList = function () {
    //这里的this指的是具体document上的this
    this._creator = undefined;
    return this;
}

var TodoList = conn.model('TodoList', TodoListSchema);

module.exports.TodoList = TodoList;