import React, { useState } from "react";
import axios from "axios";
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";

const SubmitIdea = () => {
    const [title, setTitle] = useState("");
    const [idea, setIdea] = useState("");
    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:5005/api/ideas/", {
                title: title,
                description: idea
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            alert("Idea submitted successfully!");
            navigation("/")
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex">
            <div className="w-1/4 h-screen bg-gray-800 p-4 text-white">
                <button
                    className="bg-blue-500 text-white p-2 rounded mb-4 w-full"
                    onClick={() => navigation("/")}
                >
                    Ideas
                </button>
                <button
                    className="bg-green-500 text-white p-2 rounded w-full"
                    onClick={() => navigation("/logout")}
                >
                    Logout
                </button>
            </div>

            <div className="w-3/4 p-8">
                <Header />
                <div className="p-4">
                    <h2 className="text-xl font-bold">Submit Your Idea</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="About idea..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Describe your idea..."
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Submit Idea
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitIdea;