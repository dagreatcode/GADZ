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
   

      <h1 className="jumbotron display-3" style={{padding: "100px"}}>Our Services</h1>
      
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

      <div>Maps</div>
      <iframe
        title="myFrame"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
        // frameBorder="0"
        width="90%"
        height="600"
        style={{
          padding: "0",
          border: "0",
          margin: "auto",
          allowFullScreen: "",
          ariaHidden: "false",
          tabIndex: "0",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      />
    </>
  );
}

export default Banner;
