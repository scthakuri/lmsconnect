const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    votes: { type: Number, default: 0 },
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
