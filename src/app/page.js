"use client";

import React from "react";

function Home() {
  const handleStartQuiz = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to QuizzyPedia
        </h1>
        <p className="text-lg text-gray-600 mb-8">Where learning meets fun!</p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out animate-pulse"
          onClick={handleStartQuiz}
        >
          Start Today!
        </button>
      </div>
    </div>
  );
}

export default Home;
