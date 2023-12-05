import React from "react";
import Video1 from "./Earth.mp4";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import image1 from "https://placehold.co/600x400"

function Banner() {
  return (
    <>
      <h1 className="jumbotron display-3">
        Time fly's when you are having fun
      </h1>
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
        <h1>GLOBAL ASSET DISPATCHING WE FOCUS ON MAXIMIZING YOUR PROFIT </h1>
      </video>
      {/* <video autoPlay muted controls src='./Earth.mp4' /> */}
      {/* <br/>
      <br/>
      <br/>
      <br/>
      <br/> */}

      <h1 className="jumbotron display-3" style={{margin: "50px"}}>Our Services</h1>
      
      <Carousel autoPlay infiniteLoop interval="6000">
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).webp"
            alt="testingImage"
          />
          <p className="legend">
            WELCOME TO THE TEAM! GAD SPECIAIZES IN SHIPPING ANYTHING, SIZE, TYPE
            AND DISTANCE. CONNECTING YOU WITH THE BEST OPERATOR TO TRANSPORT
            YOUR LOADS. TELL US ABOUT YOUR BUSINESS NEEDS AND SIGN UP TODAY!!!!
          </p>
        </div>
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
            alt="testingImage2"
          />
          <p className="legend">
            {" "}
            Safety compliance New Authority load booking Rate Achievements Low
            Deadhead Broker negotiation *BONUS* First Day SIGN UP FREE LOAD for
            booking service for new investors ONLY!! Referral program offered
            for existing partners and clients referring new customers. Program
            includes 5% off one booked load after each newly referred owner
            opertors and company drivers signed on with GAD,LLC!!
          </p>
        </div>
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
            alt="testingImage3"
          />
          <p className="legend">
            {" "}
            GLOBAL ASSEST DISPATCHING SERVICE IS A ORGANIC BUSINESS BUILT WITH
            INTERGRITY . WE ARE INDEPENDANT CONSULTANTS BUILDING A BUSINESS TO
            BUSINESS RELATIONSHIP ALL OVER THE COUNTRY. WE ARE DESIGNED TO
            PROVIDE A SAFE, HEALTHY AND WEATHLY BALANCE FOR OWNER OPERATORS AND
            NEW AUTHORITES WE FOCUS ON SCALING UP YOUR BUISNESS BY SECURING A
            PLAN OF HEALTHY FINANCIAL GROWTH AND HELP YOU TO BUILD EXCEPTIONAL
            PARTNERSHIPS IN THE TRUCKING INDUSTRY{" "}
          </p>
        </div>
      </Carousel>
    </>
  );
}

export default Banner;
