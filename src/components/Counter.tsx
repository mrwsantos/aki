import React, { useEffect, useState } from "react";
import styles from "./../styles/components/Counter.module.scss";

type CounterProps = {
  dateInput: string;
};

const Counter = ({ dateInput }: CounterProps) => {
  const [eventDate, setEventDate] = useState('');

  useEffect(()=>{
    setEventDate(dateInput)
  },[])

  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Valores padrão
    }

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

      if (
        calculatedTime.days === 0 &&
        calculatedTime.hours === 0 &&
        calculatedTime.minutes === 0 &&
        calculatedTime.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!timeLeft || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)) {
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
              {timeLeft.minutes.toString().padStart(2, "0")}
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
