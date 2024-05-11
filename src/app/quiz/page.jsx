"use client";

import React, { useState, useEffect } from "react";
import QuizPage from "../../components/QuizPage.jsx";

const App = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const idParam = queryParams.get("id");

    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quiz?id=${idParam}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Error");
        }

        const data = await res.json();
        setSelectedQuiz(data.quiz);
      } catch (error) {
        console.log("Error: ", error.message || error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>{selectedQuiz && <QuizPage questions={selectedQuiz.questions} />}</div>
  );
};

export default App;
