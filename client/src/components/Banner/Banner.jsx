import React from "react";
import Video1 from "./Earth.mp4";

function Banner() {
  return (
    <>
      <h1>Time fly's when you are having fun</h1>
      <video autoPlay={true} type="video/mp4"  muted={true} loop={true} style={{ width: "100%" }}>
        <source src={Video1} />
        <h1>GLOBAL ASSET DISPATCHING WE FOCUS ON MAXIMIZING YOUR PROFIT </h1>
      </video>
    </>
  );
}

export default Banner;
