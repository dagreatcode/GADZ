import React from "react";
import Video1 from "./Earth.mp4";

function Banner() {
  return (
    <>
      <video autoPlay={true} muted={true} loop={true} style={{width: "100%"}} >
        <source src={Video1} />
        <h1>GLOBAL ASSET  DISPATCHING  
WE FOCUS ON MAXIMIZING YOUR PROFIT </h1>
      </video>
      <h1>Time fly's when you are having fun</h1>
    </>
  );
}

export default Banner;
