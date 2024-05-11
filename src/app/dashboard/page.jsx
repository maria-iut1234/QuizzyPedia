"use client";

import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuizzes, setCurrentQuizzes] = useState([]);
  const [prevQuizzes, setPrevQuizzes] = useState([]);
  const [nextQuizzes, setNextQuizzes] = useState([]);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);
  const [bgColor, setBgColor] = useState("bg-gray-100");
  const quizzesPerPage = 4;
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserId(true);
    } else {
      setUserId(false);
    }
  }, []);

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

  const fetchQuizzes = async (pageNumber) => {
    try {
      const res = await fetch(
        `/api/dashboard?pageNumber=${pageNumber}&quizzesPerPage=${quizzesPerPage}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch quizzes");
      }

      const data = await res.json();
      setCurrentQuizzes(data.quizzes);
      setTotalPages(Math.ceil(data.totalQuizzes / quizzesPerPage));

      if (pageNumber > 1) {
        const res1 = await fetch(
          `/api/dashboard?pageNumber=${
            pageNumber - 1
          }&quizzesPerPage=${quizzesPerPage}`
        );

        if (!res1.ok) {
          throw new Error("Failed to fetch quizzes");
        }

        const data1 = await res1.json();
        if (data1) {
          setPrevQuizzes(data1.quizzes);
          setPrevPage(pageNumber - 1);
        }
      } else {
        setPrevQuizzes([]);
        setPrevPage(0);
      }

      if (pageNumber < totalPages) {
        const res2 = await fetch(
          `/api/dashboard?pageNumber=${
            pageNumber + 1
          }&quizzesPerPage=${quizzesPerPage}`
        );

        if (!res2.ok) {
          throw new Error("Failed to fetch quizzes");
        }

        const data2 = await res2.json();
        if (data2) {
          setNextQuizzes(data2.quizzes);
          setNextPage(pageNumber + 1);
        }
      } else {
        setNextQuizzes([]);
        setNextPage(pageNumber + 1);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleQuizClick = (id) => {
    window.location.href = `/quiz?id=${id}`;
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageButtonClick(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageButtonClick(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const onPageButtonClick = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (pageNumber !== nextPage && pageNumber !== prevPage) {
      fetchQuizzes(pageNumber);
    } else if (pageNumber === nextPage) {
      setCurrentQuizzes(nextQuizzes);
      setNextPage(pageNumber + 1);
      setPrevPage(pageNumber - 1);
    } else if (pageNumber === prevPage) {
      setCurrentQuizzes(prevQuizzes);
      setNextPage(pageNumber + 1);
      setPrevPage(pageNumber - 1);
    }
  };

  const handleCreateQuiz = () => {
    window.location.href = "/create";
  };

  useEffect(() => {
    fetchQuizzes(currentPage);
  }, []);

  useEffect(() => {
    fetchQuizzes(currentPage);
  }, [currentPage]);

  if (!userId) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
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
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      <div className="mb-8 flex">
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Logout
        </button>
        <button
          onClick={handleCreateQuiz}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Quiz
        </button>
      </div>
      <div className="lg:p-12 md:p-16 sm:p-8 p-4 w-full lg:w-1/2 bg-gray-100 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          {currentQuizzes.map((quiz) => (
            <button
              key={quiz._id}
              onClick={() => handleQuizClick(quiz._id)}
              className={`${bgColor} hover:bg-gray-950 text-white font-bold py-2 px-4 rounded`}
            >
              {quiz.name}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handlePreviousPage}
            className={`mx-2 py-2 px-4 bg-gray-300 rounded ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-2 py-2 px-4 bg-gray-300 rounded ${
                currentPage === pageNumber ? "bg-gray-500 text-white" : ""
              }`}
              onClick={() => onPageButtonClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`mx-2 py-2 px-4 bg-gray-300 rounded ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
