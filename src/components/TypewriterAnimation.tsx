import React, { useState, useEffect } from "react";
import styles from "@/styles/components/Typewriter.module.scss";

interface TypingTextProps {
  text: string;
  speed?: number; // Velocidade de digitação em ms
  delay?: number; // Atraso antes de renderizar o componente em ms
}

const TypewriterAnimation = ({
  text,
  speed = 50,
  delay = 0,
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [shouldRender, setShouldRender] = useState(false); // Controla o atraso na renderização

  // Controla o atraso inicial antes de renderizar o componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true); // Permite a renderização após o delay
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Lógica para animação de digitação
  useEffect(() => {
    if (shouldRender && currentIndex < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(typingTimeout);
    } else if (currentIndex === text.length) {
      setShowCursor(false); // Remove o cursor após a digitação
    }
  }, [currentIndex, text, speed, shouldRender]);

  // Reset manual para reiniciar a animação (se necessário)
  const resetAnimation = () => {
    setDisplayText("");
    setCurrentIndex(0);
    setShowCursor(true);
  };

  return shouldRender ? (
    <span>
      {displayText}
      {showCursor && <span className={styles.typeWritterCursor}></span>}
    </span>
  ) : null; // Só renderiza após o delay
};

export default TypewriterAnimation;
