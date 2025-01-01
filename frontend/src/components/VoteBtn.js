import { useState } from 'react';
import axios from 'axios';

const VoteButton = ({ ideaId, initialVotes, onVote }) => {
    const [votes, setVotes] = useState(initialVotes);
    const [isVoting, setIsVoting] = useState(false);
    const [isVoted, setIsVotes] = useState(false);

    const handleVote = async () => {
        if (isVoting) return;

        setIsVoting(true);

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5005/api/ideas/${ideaId}/vote`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setVotes(votes + 1);
            if (onVote) onVote();
        } catch (error) {
            console.error('Voting failed', error);
        } finally {
            setIsVoting(false);
            setIsVotes(true);
        }
    };

    return (
        <div className="mt-auto flex justify-between items-center">
            <button className={`bg-blue-500 text-white py-2 px-4 rounded ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleVote}
                disabled={isVoting || isVoted}
            >
                {isVoting ? 'Voting...' : 'Vote'}
            </button>
            <span className="text-gray-500">{votes} Votes</span>
        </div>
    )
};

export default VoteButton;
