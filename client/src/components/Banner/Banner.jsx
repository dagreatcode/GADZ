import React from "react";
import Video1 from "./Earth.mp4";

function Banner() {
  return (
    <>
      {/* <iframe 
        style={{border:"1", margin:"50px"}}
        width={1222} height={887}
        src="https://www.youtube.com/embed/ErOMbspikNg" 
        title="4K 3D Earth Globe Spinning" 
        // frameBorder="0" 
        allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full" 
        allowFullScreen
      ></iframe> */}
      <video autoPlay loop muted>
        <source src={Video1} type="video/mp4" />
      </video>
      {/* <video autoPlay muted controls src='./Earth.mp4' /> */}
    </>
  );
}

export default Banner;
