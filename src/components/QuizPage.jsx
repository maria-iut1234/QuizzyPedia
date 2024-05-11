import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import ResultPage from "./ResultPage";

const QuizPage = ({ questions }) => {
  const [bgColor, setBgColor] = useState("bg-gray-100");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(questions.length * 30); // Total time for all questions
  const [timerInterval, setTimerInterval] = useState(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false); // To lock the answer selection

  const colors = [
    "bg-theme-black",
    "bg-theme-green",
    "bg-theme-yellow",
    "bg-theme-l-orange",
    "bg-theme-d-orange",
  ];

  const selectRandomHexColor = () => {
    const randomColorHex = colors[Math.floor(Math.random() * colors.length)];
    return randomColorHex;
  };

  useEffect(() => {
    setBgColor(selectRandomHexColor());
  }, []);

  useEffect(() => {
    if (isTimerStarted) {
      // Decrease remaining time every second
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            handleNextQuestion();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Cleanup timer on unmount or when the quiz is completed
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, isQuizCompleted, isTimerStarted]);

  const startTimer = () => {
    setIsTimerStarted(true);
  };

  const handleOptionSelect = (option) => {
    if (isAnswerLocked) return; // If the answer is locked, don't allow selecting options
    setSelectedOption(option);
    setIsOptionSelected(true);
  };

  const handleNextQuestion = () => {
    // Check if an option is selected
    // if (!isOptionSelected) return;

    // Check if the selected option is correct
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question if not at the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setIsOptionSelected(false);
      setRemainingTime(30); // Reset timer for each question
      setIsAnswerChecked(false);
      setIsAnswerLocked(false); // Unlock answer selection for the next question
    } else {
      // If at the last question, mark quiz as completed
      setIsQuizCompleted(true);
    }
  };

  const handleTimeout = () => {
    setIsQuizCompleted(true);
  };

  const checkAnswer = () => {
    setIsAnswerChecked(true);
    setIsAnswerLocked(true); // Lock answer selection after checking
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        fillColor={`${bgColor}`}
      />
      {!isQuizCompleted && !isTimerStarted && (
        <Timer totalTime={remainingTime} onTimeout={handleTimeout} />
      )}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 relative">
        <div className="mt-4 shadow-md rounded-lg text-left">
          <div className={`${bgColor} h-2 rounded-t-lg`}></div>
          <h2 className="text-left text-2xl font-bold mt-4 pt-6 px-12">
            Question {currentQuestionIndex + 1} out of {questions.length}
          </h2>

          <div className="bg-gray-50 shadow-md rounded-lg pb-12 px-12 pt-6 mb-4">
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-2">
                {questions[currentQuestionIndex].question}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${
                        isAnswerChecked &&
                        option === questions[currentQuestionIndex].correctAnswer
                          ? "bg-green-500 text-white"
                          : isAnswerChecked && selectedOption === option
                          ? "bg-red-500 text-white"
                          : selectedOption === option
                          ? "bg-blue-500 text-white"
                          : isOptionSelected && selectedOption === option
                          ? "bg-gray-300 text-gray-700"
                          : "bg-gray-200 text-gray-700"
                      } py-2 px-4 rounded`}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isAnswerChecked} // Disable the button if the answer is checked
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="pt-6">
              {!isQuizCompleted && (
                <div className="flex justify-between">
                  <button
                    className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2`}
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Finish"
                      : "Next"}
                  </button>
                  {isOptionSelected && (
                    <button
                      className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 ml-4`}
                      onClick={checkAnswer}
                      disabled={isAnswerChecked}
                    >
                      Check
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isQuizCompleted && (
        <ResultPage
          quizResult={{ score, totalQuestions: questions.length }}
          bgColor={bgColor}
          id={new URLSearchParams(window.location.search).get("id")}
        />
      )}
    </div>
  );
};

export default QuizPage;
