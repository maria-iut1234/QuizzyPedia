"use client";

import React, { useState, useEffect } from "react";

const CreateQuiz = ({ onSaveQuiz }) => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [isQuestionAdded, setIsQuestionAdded] = useState(false); // State to track if a question has been added
  const [bgColor, setBgColor] = useState("bg-gray-100");

  const colors = [
    "bg-theme-black",
    "bg-theme-yellow",
    "bg-theme-l-orange",
    "bg-theme-d-orange",
  ];

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({
      question: newQuestion,
      options: options.filter((option) => option !== ""),
      correctAnswer: correctOption,
    });
    setQuestions(newQuestions);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
    setIsQuestionAdded(true); // Set to true after adding a question
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveQuiz = () => {
    const quiz = {
      name: quizName,
      questions: questions,
    };
    onSaveQuiz(quiz);

    // Clear form fields after saving quiz
    setQuizName("");
    setQuestions([]);
    console.log(quiz);
  };

  const selectRandomHexColor = () => {
    const randomColorHex = colors[Math.floor(Math.random() * colors.length)];
    return randomColorHex;
  };

  useEffect(() => {
    setBgColor(selectRandomHexColor());
  }, []);

  return (
    <div className="mt-16">
      <div className={`${bgColor} h-2 rounded-t-lg`}></div>
      <div className="pt-100 bg-gray-50 shadow-md rounded-lg pb-12 px-12 mb-4">
        <h2 className="pt-10 text-3xl font-semibold mb-4">Create Quiz</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Quiz Name
          </label>
          <input
            type="text"
            className={`border border-gray-400 p-2 rounded w-full ${
              isQuestionAdded ? "bg-gray-200" : ""
            }`}
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            readOnly={isQuestionAdded}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Question
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 rounded w-full"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Option {index + 1}
            </label>
            <input
              type="text"
              className="border border-gray-400 p-2 rounded w-full"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Correct Option
          </label>
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full"
          >
            <option value="">Select Correct Option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-10">
          <button
            onClick={handleAddQuestion}
            className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-6 rounded`}
          >
            Add Question
          </button>
          <button
            onClick={handleSaveQuiz}
            className="bg-theme-green hover:bg-gray-950 text-white font-bold py-2 px-6 rounded"
          >
            Save Quiz
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Current Questions</h3>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <strong>{question.question}</strong>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p>Correct Answer: {question.correctAnswer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateQuiz;
