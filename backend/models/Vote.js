const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    idea: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
