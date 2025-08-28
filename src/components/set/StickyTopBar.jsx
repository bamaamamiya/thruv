import React, { useState, useEffect } from "react";

const CountdownTopBar = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [time, setTime] = useState({ hours, minutes, seconds });
  const [visible, setVisible] = useState(false);

  // Countdown logic
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timerId);
          return prevTime;
        } else if (prevTime.seconds === 0) {
          if (prevTime.minutes === 0) {
            return {
              hours: prevTime.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else {
            return {
              hours: prevTime.hours,
              minutes: prevTime.minutes - 1,
              seconds: 59,
            };
          }
        } else {
          return {
            ...prevTime,
            seconds: prevTime.seconds - 1,
          };
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Show only when #formulir is visible
  useEffect(() => {
    const target = document.getElementById("form");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // muncul kalau minimal 20% form kelihatan
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const isTimeUp = time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  if (!visible) return null;

  return (
<div className="fixed top-0 left-0 w-full z-50">
  <div className="bg-gradient-to-r from-red-600 via-redto to-orange-500 text-white font-bold shadow-lg">
    <div className="flex items-center justify-center py-3 space-x-3">
      {isTimeUp ? (
        <span className="text-base sm:text-lg tracking-wide">
          ⚠ Promo Berakhir
        </span>
      ) : (
        <>
          <span className="text-sm sm:text-lg flex items-center space-x-2">
            <span className="animate-pulse">⏰	</span>
            <span>Promo Berakhir Dalam</span>
          </span>
          <div className="flex space-x-1 sm:space-x-2 text-lg sm:text-2xl font-mono">
            <span className="bg-black/40 rounded-md px-2 py-1">
              {String(time.hours).padStart(2, "0")}
            </span>
            <span>:</span>
            <span className="bg-black/40 rounded-md px-2 py-1">
              {String(time.minutes).padStart(2, "0")}
            </span>
            <span>:</span>
            <span className="bg-black/40 rounded-md px-2 py-1">
              {String(time.seconds).padStart(2, "0")}
            </span>
          </div>
        </>
      )}
    </div>
  </div>
</div>
  );
};

export default CountdownTopBar;
