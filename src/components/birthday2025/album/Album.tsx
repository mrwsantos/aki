import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

import img1 from "@/img/b-2025/album/1.png";
import img2 from "@/img/b-2025/album/2.jpg";
import img3 from "@/img/b-2025/album/3.jpg";
import img4 from "@/img/b-2025/album/4.png";
import img5 from "@/img/b-2025/album/5.jpg";
import img6 from "@/img/b-2025/album/6.jpg";
import img7 from "@/img/b-2025/album/7.png";
import img8 from "@/img/b-2025/album/8.jpg";
import img9 from "@/img/b-2025/album/9.jpg";

const images = [img1, img2, img3, img5,   img6, img4,img7, img8, img9];

const Album: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="album" style={{ color: "#fff" }}>
      <div className="picture">
        <img src={images[index].src} alt={`image-${index}`} style={{
            width: '80%'
        }} />
      </div>

      <div className="actions">
        <button onClick={prev}>
          <ChevronLeft />
        </button>

        <button onClick={next}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Album;
