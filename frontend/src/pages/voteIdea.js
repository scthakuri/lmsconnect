import React from "react";

const VoteIdea = ({ idea }) => {
  const handleVote = async () => {
    try {
      // Make API call to vote on the idea
      console.log("Voted for idea:", idea);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-bold">{idea.title}</h3>
      <p>{idea.description}</p>
      <button
        onClick={handleVote}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Vote
      </button>
    </div>
  );
};

export default VoteIdea;