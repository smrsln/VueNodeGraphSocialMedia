const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true//createdAt ve updatedAt alanlarını ekledi 
});

module.exports = mongoose.model('Todo', TodoSchema);