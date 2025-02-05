import React, { useState, useEffect } from "react";
import styles from "../styles/components/Main.module.scss";

import collage1 from "@/img/collage-1.jpg";
import collage2 from "@/img/collage-2.jpg";

const NihonMeeting = () => {
  return (
    <div className={styles.nihon}>
      <img className={styles.one} src={collage1.src} alt="" />
      <img className={styles.two} src={collage2.src} alt="" />
      <Counter dateInput="2025-02-17T18:40:00.000Z" />
    </div>
  );
};

type CounterProps = {
  dateInput: string;
};

const Counter = ({ dateInput }: CounterProps) => {
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    setEventDate(dateInput);
  }, []);

  const calculateTimeLeft = () => {
    const difference = +new Date(eventDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 / 60)) % 60),
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

  if (
    !timeLeft ||
    (timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0)
  ) {
    return <div className={styles.wrapper}>Evento concluído!</div>;
  }

  const splitDigits = (num: number) => {
    return num
      .toString()
      .padStart(2, "0")
      .split("")
      .map((digit, index) => <span key={index}>{digit}</span>);
  };

  return (
    <div className={styles.wrapperCounter}>
      <h1>Next meeting in:</h1>
      <div className={styles.sheet}>
        <div className={styles.days}>
          <div className={styles.figures}>{splitDigits(timeLeft.days)}</div>
          <span className={styles.title}>
            {timeLeft.days !== 1 ? "Days" : "Day"}
          </span>
        </div>
        <div className={styles.comma}>:</div>
        <div className={styles.hours}>
          <div className={styles.figures}>{splitDigits(timeLeft.hours)}</div>
          <span className={styles.title}>
            {timeLeft.hours !== 1 ? "Hours" : "Hour"}
          </span>
        </div>
        <div className={styles.comma}>:</div>
        <div className={styles.minutes}>
          <div className={styles.figures}>{splitDigits(timeLeft.minutes)}</div>
          <span className={styles.title}>
            {timeLeft.minutes !== 1 ? "Minutes" : "Minute"}
          </span>
        </div>
        <div className={styles.comma}>:</div>
        <div className={styles.seconds}>
          <div className={styles.figures}>{splitDigits(timeLeft.seconds)}</div>
          <span className={styles.title}>
            {timeLeft.seconds !== 1 ? "Seconds" : "Second"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NihonMeeting;
