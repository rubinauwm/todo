var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
    task: {type: String, required: true},
    todoAuthor: {type: Schema.Types.ObjectId, required: true, ref:'User'},
    dueDate: {type: Date, default: Date.now},
    priority: {type: String, required: true},
    completed: {type: Boolean, required: true },
    likes: {type: Number, default: 0},
    reTodo: {type: Boolean, default: false}

});

module.exports = Mongoose.model('Todo', TodoSchema);