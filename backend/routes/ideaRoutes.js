const express = require('express');
const router = express.Router();
const { createIdea, voteIdea, getSortedIdeas } = require('../controllers/ideaController');

router.post('/', createIdea);
router.post('/:ideaId/vote', voteIdea);
router.get('/sorted', getSortedIdeas);

module.exports = router;
