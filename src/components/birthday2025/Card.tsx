import React, { useRef } from "react";

import page1 from "@/img/b-2025/1.png";
import page2 from "@/img/b-2025/2.png";

const Card: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    const card = cardRef.current;
    if (!card) return;

    card.classList.toggle("hovered"); // adiciona/remove no clique
  };

  return (
    <div className="card25" ref={cardRef} onClick={handleClick}>
      <div className="back">
        <div className="imgset">
          <img
            width="100%"
            src={page2.src}
            style={{ transform: "rotateY(-180deg)" }}
            alt="back card"
          />
        </div>
      </div>

      <div className="front" style={{position: 'relative'}}>
        <div className="imgset">
          <img width="100%" src={page1.src} alt="front card" />
        </div>

        <p className="click" style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 21,
          zIndex: 999,
          color: '#461422c4',
          textTransform: 'uppercase',
          fontStyle: 'normal',
        }}>Click to open</p>
      </div>
    </div>
  );
};

export default Card;
