const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String,
    done: Boolean,
});

mongoose.model('Todo', todoSchema);

module.exports = mongoose.model('Todo');
