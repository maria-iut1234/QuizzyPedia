"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateQuiz from "../../components/CreateQuiz";

const CreateQuizPage = () => {
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserId(true);
    } else {
      setUserId(false);
    }
  }, []);

  const handleSaveQuiz = async (quiz) => {
    try {
      console.log("Quiz saved:", quiz);

      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (!res.ok) {
        throw new Error("Error saving quiz");
      }

      toast.success("Quiz saved successfully");
      console.log("Quiz saved successfully");

      // Refresh the page upon successful save
      window.location.reload();
    } catch (error) {
      toast.error("Error saving quiz");
      console.log("Error saving quiz: ", error.message || error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <ToastContainer />
      {userId ? (
        <div className="lg:p-12 md:p-16 sm:p-8 p-4 w-full lg:w-1/2 relative">
          <CreateQuiz onSaveQuiz={handleSaveQuiz} />
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
          <h2 className="text-3xl font-semibold mb-6">Create Quiz</h2>
          <div className="justify-center items-center text-center">
            <h2>You need to be logged in to access the dashboard.</h2>
            <p>Please log in and try again.</p>
            <a
              href="/login"
              className="text-sm text-gray-600 hover:underline hover:text-gray-950"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;
