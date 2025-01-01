import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import VoteButton from '../components/VoteBtn';
import Header from '../components/Header'

const LandingPage = () => {
    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchIdeas = async () => {
            try {
                const response = await axios.get('http://localhost:5005/api/ideas/sorted', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIdeas(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIdeas();
    }, []);

    const handleLogout = () => {
        navigate('/logout');
    };

    const handleSubmitIdea = () => {
        navigate('/submit-idea');
    };

    return (
        <div className="flex">
            <div className="w-1/4 bg-gray-800 p-4 text-white">
                <button
                    className="bg-blue-500 text-white p-2 rounded mb-4 w-full"
                    onClick={handleSubmitIdea}
                >
                    Submit Idea
                </button>
                <button
                    className="bg-green-500 text-white p-2 rounded w-full"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="w-3/4 p-8">
                <Header />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <div className="col-span-3 text-center">Loading ideas...</div>
                    ) : (
                        ideas.map((idea) => (
                            <div
                                key={idea._id}
                                className="bg-white shadow-md rounded-lg p-4 flex flex-col"
                            >
                                <h2 className="font-bold text-xl">{idea.title}</h2>
                                <p className="text-gray-700 mt-2 mb-4">{idea.description}</p>

                                <VoteButton
                                    ideaId={idea._id}
                                    initialVotes={idea.votes}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
