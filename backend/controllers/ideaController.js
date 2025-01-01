const Idea = require('../models/Idea');
const Vote = require('../models/Vote');

const createIdea = async (req, res) => {
    const { title, description } = req.body;
    try {
        const idea = new Idea({ title, description, createdBy: req.user._id });
        await idea.save();
        res.status(201).json(idea);
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating idea.' });
    }
};

const voteIdea = async (req, res) => {
    const { ideaId } = req.params;
    try {
        const existingVote = await Vote.findOne({ idea: ideaId, employee: req.user._id });
        if (existingVote) return res.status(400).json({ message: 'You have already voted for this idea.' });

        const vote = new Vote({ idea: ideaId, employee: req.user._id });
        await vote.save();

        const updatedIdea = await Idea.findByIdAndUpdate(ideaId, { $inc: { votes: 1 } }, { new: true });
        res.status(200).json(updatedIdea);
    } catch (error) {
        res.status(500).json({ message: 'Error voting for idea.' });
    }
};

const getSortedIdeas = async (req, res) => {
    try {
        const ideas = await Idea.find().sort({ votes: -1 });
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sorted ideas.' });
    }
};

module.exports = { createIdea, voteIdea, getSortedIdeas };
