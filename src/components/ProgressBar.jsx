import React from "react";

const ProgressBar = ({ currentQuestionIndex, totalQuestions, fillColor }) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-md" style={{ position: "absolute", top: 10 }}>
      <div
        className={`h-4 ${fillColor} rounded-md`}
        style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
