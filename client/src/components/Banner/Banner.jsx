import React from "react";
import Video1 from "./Earth.mp4";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
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

      {/* <Carousel autoPlay infiniteLoop interval="8000">
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
      </Carousel> */}

      <h1>Our Services</h1>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>WE CAN SHIP ANYTHING</h5>
              <p>
                WELCOME TO THE TEAM! GAD SPECIAIZES IN SHIPPING ANYTHING, SIZE,
                TYPE AND DISTANCE. CONNECTING YOU WITH THE BEST OPERATOR TO
                TRANSPORT YOUR LOADS. TELL US ABOUT YOUR BUSINESS NEEDS AND SIGN
                UP TODAY!!!!
              </p>
            </div>
          </div>
          <div className="carousel-item">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).webp"
            className="d-block w-100"
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>LET US HELP YOU WITH YOUR BARRIERS!</h5>
            <p>
              WE FOCUS ON MAXIMIZING YOUR EXPERIENCE BY PROVIDING YOU
              SIGNIFICANT CUSTOMER SERVICE, SAFETY GUIDES FOR TRANPORTING ACROSS
              COUNTY, TRANSPARENCY, 24 HOUR ROAD CHECK SUPPORT AND ADVANCED
              LEADERS AVAILBLE TO PROVIDE EFFECTIVE COMMUNICATION BACKOFFICE
              ADMINISTRATION SUPPORT AND DOCUMENT SERVICES!
            </p>
          </div>
        </div>
          <div className="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Road Freight Driver Care </h5>
              <p>
                Safety compliance New Authority load booking Rate Achievements
                Low Deadhead Broker negotiation *BONUS* First Day SIGN UP FREE
                LOAD for booking service for new investors ONLY!! Referral
                program offered for existing partners and clients referring new
                customers. Program includes 5% off one booked load after each
                newly referred owner opertors and company drivers signed on with
                GAD,LLC!!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5> WHO IS GAD?</h5>
              <p>
                GLOBAL ASSEST DISPATCHING SERVICE IS A ORGANIC BUSINESS BUILT
                WITH INTERGRITY . WE ARE INDEPENDANT CONSULTANTS BUILDING A
                BUSINESS TO BUSINESS RELATIONSHIP ALL OVER THE COUNTRY. WE ARE
                DESIGNED TO PROVIDE A SAFE, HEALTHY AND WEATHLY BALANCE FOR
                OWNER OPERATORS AND NEW AUTHORITES WE FOCUS ON SCALING UP YOUR
                BUISNESS BY SECURING A PLAN OF HEALTHY FINANCIAL GROWTH AND HELP
                YOU TO BUILD EXCEPTIONAL PARTNERSHIPS IN THE TRUCKING INDUSTRY{" "}
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Banner;
