import React, { useState, useEffect } from "react";

const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [time, setTime] = useState({
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timerId);
          return prev;
        } else if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            return {
              hours: prev.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else {
            return {
              hours: prev.hours,
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          }
        } else {
          return {
            ...prev,
            seconds: prev.seconds - 1,
          };
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const isTimeUp =
    time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  return (
    <div className="flex flex-col items-center justify-center">
      {isTimeUp ? (
        <h1 className="text-3xl text-center text-gray-800 font-bold p-4 bg-gray-200 rounded-xl shadow-md">
          Promo Berakhir 🚫
        </h1>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-white shadow-lg rounded-2xl border border-red-300">
          <span className="text-xl md:text-5xl font-extrabold text-red-600 tracking-widest animate-pulse">
            {String(time.hours).padStart(2, "0")}
          </span>
          <span className="text-3xl font-bold text-gray-700">:</span>
          <span className="text-xl md:text-5xl font-extrabold text-red-600 tracking-widest animate-pulse">
            {String(time.minutes).padStart(2, "0")}
          </span>
          <span className="text-3xl font-bold text-gray-700">:</span>
          <span className="text-xl md:text-5xl font-extrabold text-red-600 tracking-widest animate-pulse">
            {String(time.seconds).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
