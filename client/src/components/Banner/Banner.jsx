import React from "react";
// import Video1 from "./Earth.mp4";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import image1 from "https://placehold.co/600x400"

function Banner() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
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
        {/* <video autoPlay loop muted playsinline>
        <source
          src="https://res.cloudinary.com/fashion-commit/video/upload/v1702063638/Earth_axigrw.mp4"
          type="video/mp4"
        />
        <h1>GLOBAL ASSET DISPATCHING WE FOCUS ON MAXIMIZING YOUR PROFIT </h1>
      </video> */}
        <lord-icon
          src="https://cdn.lordicon.com/dsccuiza.json"
          trigger="hover"
          delay="2000"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
        {/* <video autoPlay muted controls src='./Earth.mp4' /> */}

        <h1 className="jumbotron display-3" style={{ padding: "50px" }}>
          Our Mission
        </h1>
        <p className="fs-1" style={{ padding: "40px" }}>
          We’re on a mission to empower businesses of all sizes to thrive in
          today’s fast-paced world. By leveraging cutting-edge technology and
          innovative solutions, we’re revolutionizing the transportation and
          logistics industry, one shipment at a time.{" "}
        </p>

        <Carousel autoPlay infiniteLoop interval="6000">
          <div>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).webp"
              alt="testingImage"
            />
            <p className="legend">
              WELCOME TO THE TEAM! GAD SPECIAIZES IN SHIPPING ANYTHING, SIZE,
              TYPE AND DISTANCE. CONNECTING YOU WITH THE BEST OPERATOR TO
              TRANSPORT YOUR LOADS. TELL US ABOUT YOUR BUSINESS NEEDS AND SIGN
              UP TODAY!!!!
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
              Deadhead Broker negotiation *BONUS* First Day SIGN UP FREE LOAD
              for booking service for new investors ONLY!! Referral program
              offered for existing partners and clients referring new customers.
              Program includes 5% off one booked load after each newly referred
              owner opertors and company drivers signed on with GAD,LLC!!
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
              PROVIDE A SAFE, HEALTHY AND WEATHLY BALANCE FOR OWNER OPERATORS
              AND NEW AUTHORITES WE FOCUS ON SCALING UP YOUR BUISNESS BY
              SECURING A PLAN OF HEALTHY FINANCIAL GROWTH AND HELP YOU TO BUILD
              EXCEPTIONAL PARTNERSHIPS IN THE TRUCKING INDUSTRY{" "}
            </p>
          </div>
        </Carousel>

        <div className="jumbotron display-3" style={{ padding: "50px" }}>
          Our Location
        </div>
        <iframe
          title="myFrame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.519079327509!2d-96.80896185070704!3d32.77849320596261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9917754ecff7%3A0x45437a4fc8e53e1e!2s826%20Commerce%20St%2C%20Dallas%2C%20TX%2075202!5e0!3m2!1sen!2sus!4v1713024559568!5m2!1sen!2sus"
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
        {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.519079327509!2d-96.80896185070704!3d32.77849320596261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9917754ecff7%3A0x45437a4fc8e53e1e!2s826%20Commerce%20St%2C%20Dallas%2C%20TX%2075202!5e0!3m2!1sen!2sus!4v1713024559568!5m2!1sen!2sus"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe> */}
      </div>
    </>
  );
}

export default Banner;
