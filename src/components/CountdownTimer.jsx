import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0 }) => {
    const [time, setTime] = useState({
        hours,
        minutes,
        seconds,
    });

    useEffect(() => {
        const timerId = setInterval(() => {
            if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
                clearInterval(timerId);
            } else if (time.seconds === 0) {
                if (time.minutes === 0) {
                    setTime({
                        hours: time.hours - 1,
                        minutes: 59,
                        seconds: 59,
                    });
                } else {
                    setTime({
                        hours: time.hours,
                        minutes: time.minutes - 1,
                        seconds: 59,
                    });
                }
            } else {
                setTime((prevTime) => ({
                    ...prevTime,
                    seconds: prevTime.seconds - 1,
                }));
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [time]);

    // Check if the countdown is over
    const isTimeUp = time.hours === 0 && time.minutes === 0 && time.seconds === 0;

    return (
        <div>
            {isTimeUp ? (
                <h1 className='text-5xl text-center text-black font-bold p-2'>
                    Promo Berakhir
                </h1>
            ) : (
                <h1 className='text-5xl text-center text-redto font-bold p-2'>
                    {String(time.hours).padStart(2, '0')}:
                    {String(time.minutes).padStart(2, '0')}:
                    {String(time.seconds).padStart(2, '0')}
                </h1>
            )}
        </div>
    );
};

export default CountdownTimer;
