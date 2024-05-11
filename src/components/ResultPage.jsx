import React from "react";

const ResultPage = ({ quizResult, bgColor, id }) => {
  const totalQuestions = quizResult.totalQuestions;
  const correctAnswers = quizResult.score;

  const handleRetryQuiz = () => {
    window.location.href = `/quiz?id=${id}`; // Reload the page to restart the quiz
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard"; // Redirect to dashboard
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80">
      <div className="bg-white p-12 rounded-md shadow-lg text-center">
        <h1 className="text-3xl font-semibold mb-6">Quiz Result</h1>
        <div className="mb-8">
          <p className="text-xl">Total Questions: {totalQuestions}</p>
          <p className="text-xl">Correct Answers: {correctAnswers}</p>
          <p className="text-xl">
            Score: {((correctAnswers / totalQuestions) * 100).toFixed(2)}%
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRetryQuiz}
            className={`${bgColor} hover:bg-gray-950 text-white font-bold py-3 px-6 rounded mr-4`}
          >
            Retry Quiz
          </button>
          <button
            onClick={handleGoToDashboard}
            className={`${bgColor} hover:bg-gray-950 text-white font-bold py-3 px-6 rounded`}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
