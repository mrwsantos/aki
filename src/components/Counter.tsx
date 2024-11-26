import React, { useContext, useEffect, useState } from "react";
import styles from "./../styles/components/Counter.module.scss";

const Counter = () => {
  const [eventDate, setEventDate] = useState("2024-12-29T06:45:00.000Z");

  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    if (difference <= 0) return {};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const calculatedTime = calculateTimeLeft();
      setTimeLeft(calculatedTime);

      if (Object.keys(calculatedTime).length === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!timeLeft || Object.keys(timeLeft).length === 0) {
    return <div className={styles.wrapper}>Evento concluído!</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sheet}>
        <div className={styles.days}>
          <div className={styles.daysLeft}>
            <div>
              {timeLeft.days.toString().padStart(2, "0")}{" "}
              {timeLeft.days > 1 ? "Days" : "Day"}
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.sheet}>
            <div className={styles.hours}>
              {timeLeft.hours.toString().padStart(2, "0")}
              {"h "}
              {timeLeft.minutes}
              {"m "}
              {timeLeft.seconds.toString().padStart(2, "0")}
              {"s "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
