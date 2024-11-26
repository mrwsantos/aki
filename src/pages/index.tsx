import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Counter from "../components/Counter";
import back from "@/img/back-final.png";
import balloons from "@/img/balloons.png";
import sheep from "@/img/sheep.gif";
import bluey from "@/img/bluey.gif";
// import rain from "@/img/rain.mp3";

import styles from "../styles/components/Main.module.scss";
import TypewriterAnimation from "@/components/TypewriterAnimation";

const Main = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);

  const sourceRef = useRef<HTMLImageElement | null>(null);
  const targetRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showHappyB, setHappyB] = useState(false);
  const [showCountdown, setShowCountDown] = useState(false);

  const [playRain, setPlayRain] = useState<boolean>(false);
  const [usText, setUsText] = useState<boolean>(true);

  const [step, setStep] = useState(1);

  // **Efeito para habilitar renderização**
  useEffect(() => {
    setShouldRender(true);
  }, []);

  // **Ativar/Desativar zoom com clique**
  const handleClick = () => {
    setIsZoomActive((prev: any) => !prev);
    setOpacity((prev: any) => (prev === 0 ? 1 : 0));
  };

  // **Atualizar deslocamento com movimento do mouse**
  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      !isZoomActive ||
      !sourceRef.current ||
      !targetRef.current ||
      !containerRef.current
    )
      return;

    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };

  const audioRain = useRef<HTMLAudioElement | null>(null);
  const audioMusic = useRef<HTMLAudioElement | null>(null);
  const handlePlayMusic = (ref: any, stopOtherAudio: boolean = false) => {
    if (ref.current) {
      // Stop the other audio if necessary
      if (stopOtherAudio && audioRain.current) {
        audioRain.current.pause();
        audioRain.current.currentTime = 0; // Reset audio to the start
      }

      ref.current.play().then(() => {
        ref.current.volume = 0.35;
        ref.current.loop = true;
      });
    }
  };

  return shouldRender ? (
    <>
      <Head>
        <title>Aki{"'"}s Birthday</title>
        <html lang="en" />
        <meta name="description" content="Aki's Birthday" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&family=Orbitron:wght@400..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Jaro:opsz@6..72&family=Orbitron:wght@400..900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div
        className={`${styles.container}`}
        ref={containerRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        {(step <= 6 || step > 7) && (
          <video
            className={`${styles.snow} ${step > 1 ? styles.snowActive : ""}`}
            autoPlay
            muted
            loop
            src="/snow.mp4"
          ></video>
        )}

        {step === 7 && (
          <video
            className={`${styles.balloons} `}
            autoPlay
            muted
            loop
            src="/balloons.mp4"
          ></video>
        )}
        <audio ref={audioRain} src="/rain.mp3" />
        <audio ref={audioMusic} src="/back-music.mp3" />
        <img
          ref={sourceRef}
          alt="source"
          className={`${styles.sourceImage} ${
            !showHappyB ? styles.sourceImageBlurred : ""
          }`}
          src={back.src}
        />
        <img
          ref={targetRef}
          alt="target"
          className={styles.targetImage}
          src={back.src}
          style={{
            position: "absolute",
            left: `${offset.left}px`,
            top: `${offset.top}px`,
            opacity,
            transition: "opacity 0.3s ease",
            pointerEvents: "none", // Evita interferência do zoom com o mouse
          }}
        />
      </div>

      <div className={`${styles.cat} ${showHappyB ? styles.catActive : ""}`}>
        <img
          src="https://i.pinimg.com/originals/f9/42/5e/f9425ec6e73ca64317310db4a3f3e05c.gif"
          alt=""
        />
      </div>

      {step !== 7 && (
        <div
          className={`${styles.sheep}  ${showHappyB ? styles.sheepActive : ""}`}
        >
          <img src={sheep.src} alt="" />
        </div>
      )}
      <div
        className={`${styles.totoro} ${
          showHappyB ? styles.totoroInactive : ""
        }`}
      >
        <div className={styles.totoroText}>
          <h1>
            <TypewriterAnimation text="Hello Aki-chan!" />
          </h1>
          <h2>
            <TypewriterAnimation
              text="I hope you're having an amazing day, just as amazing as you are."
              delay={2000}
            />
          </h2>
          <h2>
            <TypewriterAnimation
              text="Wanna see something nice?"
              delay={6000}
            />
          </h2>
          <p>
            <TypewriterAnimation
              text=" Click on the button below."
              delay={8500}
            />
          </p>
        </div>
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f847c076-5c6e-4278-9a85-6ca2629a6223/d6jfewv-df8ce176-ba9c-491d-b4b4-8080b46cbe95.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4NDdjMDc2LTVjNmUtNDI3OC05YTg1LTZjYTI2MjlhNjIyM1wvZDZqZmV3di1kZjhjZTE3Ni1iYTljLTQ5MWQtYjRiNC04MDgwYjQ2Y2JlOTUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-bB-oGPgT_0xN27jeCNDjLiUROkcBuQnUJ3S4z5PQm8"
          alt=""
        />

        {!showHappyB && !playRain && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPlayRain(true);
              handlePlayMusic(audioRain);
            }}
            className={styles.surprise}
          >
            Audio On!
          </button>
        )}

        {!showHappyB && playRain && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setHappyB((prev: boolean) => !prev); // Toggle HappyB state
              handlePlayMusic(audioMusic, true); // Stop rain audio and play music
            }}
            className={styles.surprise}
          >
            Surprise me! Let{"'"}s GO.
          </button>
        )}
      </div>
      {showHappyB && step === 1 && (
        <div className={styles.usText}>
          <h1>
            <TypewriterAnimation text="Hello again, Aki-chan!" delay={2000} />
          </h1>
          <br />
          <h2>
            <TypewriterAnimation text="≽^•⩊•^≼" delay={5000} />
          </h2>
        </div>
      )}
      {showHappyB && step === 2 && (
        <div className={styles.usText}>
          <h1>
            <TypewriterAnimation text="That is us." delay={0} />
          </h1>
          <h2>
            <TypewriterAnimation
              text="And this drawing represents a short summary of our first chapter."
              delay={2000}
            />
          </h2>
        </div>
      )}
      {showHappyB && step === 3 && (
        <div className={styles.usText}>
          <h2>
            <TypewriterAnimation
              text="You can zoom in on the background image by clicking on it."
              delay={0}
            />
          </h2>
          <p>
            <TypewriterAnimation
              text="You might discover some hidden gems from our time together."
              delay={3000}
            />
          </p>
        </div>
      )}
      {showHappyB && step === 4 && (
        <div className={styles.usText}>
          <h1>
            <TypewriterAnimation text="But..." delay={0} />
          </h1>
          <h2>
            <TypewriterAnimation text="Today is a special day!" delay={1500} />
          </h2>
          <h2>
            <TypewriterAnimation text="It's your birthday! 🎂🥳" delay={4000} />
          </h2>
        </div>
      )}
      {showHappyB && step === 5 && (
        <div className={styles.usText}>
          <h2>
            <TypewriterAnimation
              text="And I would like to wish you many more years of life 🌱,"
              delay={0}
            />
          </h2>
          <h2>
            <TypewriterAnimation text="health ❤️," delay={4000} />
          </h2>
          <h2>
            <TypewriterAnimation text="and happiness 😁." delay={5500} />
          </h2>
        </div>
      )}
      {showHappyB && step === 6 && (
        <div className={styles.usText}>
          <h2>
            <TypewriterAnimation
              text=" May you continue to be your kind and cheerful self, as the world truly needs your smile. 😃"
              delay={0}
            />
          </h2>
          <h2>
            <TypewriterAnimation text="And kindness. 😊" delay={6000} />
          </h2>
          <p>
            <TypewriterAnimation text="⸜(｡˃ ᵕ ˂ )⸝♡" delay={7500} />
          </p>
        </div>
      )}
      {showHappyB && step === 7 && (
        <div className={`${styles.usText} ${styles.happyBDay}`}>
          <h1>
            <TypewriterAnimation text="Happy Birthday" delay={3000} />
          </h1>
          <h2>
            <TypewriterAnimation text="Aki-chan!" delay={4000} />
          </h2>
        </div>
      )}
      {showHappyB && step === 7 && (
        <div
          className={`${styles.bluey}  ${showHappyB ? styles.blueyActive : ""}`}
        >
          <img src={bluey.src} alt="" />
        </div>
      )}
      {showHappyB && step === 8 && (
        <div className={`${styles.usText} `}>
          <h1>
            <TypewriterAnimation
              text="This is the countdown for our next meeting in person:"
              delay={0}
            />
          </h1>
          {showCountdown && <Counter />}
        </div>
      )}
      {showHappyB && step === 9 && (
        <div className={`${styles.usText} `}>
          <h1>
            <TypewriterAnimation
              text="I am looking forward to see you again, babe. ❤️"
              delay={0}
            />
          </h1>
          <h2>
            <TypewriterAnimation
              text="Thank you for everything!"
              delay={3000}
            />
          </h2>
        </div>
      )}

      <div className={styles.buttonRow}>
        {showHappyB && step > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setStep((prev: number) => prev - 1);
            }}
            className={styles.button}
          >
            {"< "} Back
          </button>
        )}
        {showHappyB && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setStep((prev: number) => prev + 1);

              if (step === 7) {
                setShowCountDown(true);
              }
            }}
            className={styles.button}
            disabled={step >= 10 ? true : false}
          >
            {step === 7 
  ? "Show countdown" 
  : step === 9 
  ? "Finish" 
  : "Next >"}
          </button>
        )}
      </div>
    </>
  ) : null;
};

export default Main;
