import React from "react";
import b23 from "@/img/b-23.png";
import lamp from "@/img/lamp.png";
import { relative } from "path";

const birthday23 = () => {
  const [light, setLight] = React.useState(false);

  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `${
          light ? "linear-gradient(to bottom, #dfc9b0, #ce9667)" : "#000000"
        }`,

        display: "flex",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <div
        className="lamp"
        style={{
          position: "absolute",
          top: "-30px",
          left: "calc(50% -  100px)",
          transform: "translateX(-0%)",
          opacity: light ? 1 : 0,
        }}
      >
        <img
          src={lamp.src}
          alt=""
          style={{
            width: "200px",
            height: "300px",
          }}
        />
      </div>

      <img
        src={b23.src}
        alt=""
        className=""
        style={{
          width: "100vw",
          height: "auto",
          margin: "auto",
          display: light ? "block" : "none",
        }}
      />

      <button
        onClick={() => setLight((prev) => !prev)}
        className="interruptor"
        style={{
          width: 40,
          height: 60,
          backgroundColor: "#dfc9b0",
          borderRadius: 5,
          border: "none",
          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,

          position: "fixed",
          top: "50%",
          right: "30px",
        }}
      >
        <span
          style={{
            width: 5,
            height: 15,
            backgroundColor: "#00000050",
            display: "block",
          }}
        ></span>
      </button>
    </div>
  );
};

export default birthday23;
