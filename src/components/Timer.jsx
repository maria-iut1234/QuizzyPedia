import React, { useState, useEffect } from "react";

const Timer = ({ totalTime, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          onTimeout(); // Call onTimeout function when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalTime, onTimeout]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div
      className="text-center text-3xl font-bold"
      style={{ position: "absolute", top: 60 }}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
