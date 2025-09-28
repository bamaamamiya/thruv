import React, { useState, useEffect } from "react";

const ViewersCounter = () => {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const randomViewers = Math.floor(Math.random() * 41) + 10;
    setViewers(randomViewers);

    const interval = setInterval(() => {
      const newRandom = Math.floor(Math.random() * 41) + 10;
      setViewers(newRandom);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-xl shadow-md">
      <span className="text-lg font-semibold">
        🔥 {viewers} orang
      </span>
      <span className="text-sm font-medium">
        lagi intip produk ini sekarang!
      </span>
    </div>
  );
};

export default ViewersCounter;
