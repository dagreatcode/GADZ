import React from "react";
import Video1 from "./Earth.mp4";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import image1 from "https://placehold.co/600x400"

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

      <Carousel autoPlay infiniteLoop interval="8000">
        <div>
          <img src="https://placehold.co/600x300" alt="testingImage" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="https://placehold.co/600x300" alt="testingImage2" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="https://placehold.co/600x300" alt="testingImage3" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </>
  );
}

export default Banner;
