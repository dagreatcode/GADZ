// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import "./Banner.css"; // Assuming you create a separate CSS file for styles

// function Banner() {
//   return (
//     <div className="banner-container">
//       <h1 className="banner-title">Time flies when you are having fun</h1>
//       <lord-icon
//         src="https://cdn.lordicon.com/dsccuiza.json"
//         trigger="hover"
//         delay="2000"
//         style={{ width: "250px", height: "250px" }}
//       ></lord-icon>

//       <h2 className="mission-title">Our Mission</h2>
//       <p className="mission-description">
//         We’re on a mission to empower businesses of all sizes to thrive in
//         today’s fast-paced world. By leveraging cutting-edge technology and
//         innovative solutions, we’re revolutionizing the transportation and
//         logistics industry, one shipment at a time.
//       </p>

//       <Carousel autoPlay infiniteLoop interval={6000} className="carousel">
//         <div>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).webp"
//             alt="Welcome to the Team"
//           />
//           <p className="legend">
//             WELCOME TO THE TEAM! GAD specializes in shipping anything, size,
//             type, and distance. Connecting you with the best operator to
//             transport your loads. Tell us about your business needs and sign up
//             today!!!!
//           </p>
//         </div>
//         <div>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
//             alt="Safety Compliance"
//           />
//           <p className="legend">
//             Safety compliance New Authority load booking Rate Achievements Low
//             Deadhead Broker negotiation *BONUS* First Day SIGN UP FREE LOAD for
//             booking service for new investors ONLY!! Referral program offered
//             for existing partners and clients referring new customers. Program
//             includes 5% off one booked load after each newly referred owner
//             operators and company drivers signed on with GAD, LLC!!
//           </p>
//         </div>
//         <div>
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
//             alt="Global Asset Dispatching"
//           />
//           <p className="legend">
//             GLOBAL ASSET DISPATCHING SERVICE IS AN ORGANIC BUSINESS BUILT WITH
//             INTEGRITY. WE ARE INDEPENDENT CONSULTANTS BUILDING A BUSINESS TO
//             BUSINESS RELATIONSHIP ALL OVER THE COUNTRY. WE ARE DESIGNED TO
//             PROVIDE A SAFE, HEALTHY, AND WEALTHY BALANCE FOR OWNER OPERATORS AND
//             NEW AUTHORITIES. WE FOCUS ON SCALING UP YOUR BUSINESS BY SECURING A
//             PLAN OF HEALTHY FINANCIAL GROWTH AND HELP YOU TO BUILD EXCEPTIONAL
//             PARTNERSHIPS IN THE TRUCKING INDUSTRY.
//           </p>
//         </div>
//       </Carousel>

//       <h2 className="location-title">Our Location</h2>
//       <iframe
//         title="Our Location"
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.519079327509!2d-96.80896185070704!3d32.77849320596261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9917754ecff7%3A0x45437a4fc8e53e1e!2s826%20Commerce%20St%2C%20Dallas%2C%20TX%2075202!5e0!3m2!1sen!2sus!4v1713024559568!5m2!1sen!2sus"
//         width="90%"
//         height="600"
//         style={{ border: "0", margin: "auto", display: "block" }}
//         allowFullScreen
//       />
//     </div>
//   );
// }

// export default Banner;

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner-container">
      <h1 className="banner-title">⏳ Time Flies When You’re Having Fun</h1>

      <div className="banner-icon">
        <lord-icon
          src="https://cdn.lordicon.com/dsccuiza.json"
          trigger="hover"
          delay="2000"
          style={{ width: "200px", height: "200px" }}
        ></lord-icon>
      </div>

      <h2 className="banner-subtitle">Our Mission</h2>
      <p className="banner-description">
        We’re on a mission to empower businesses of all sizes to thrive in
        today’s fast-paced world. By leveraging cutting-edge technology and
        innovative solutions, we’re revolutionizing the transportation and
        logistics industry, one shipment at a time.
      </p>

      <Carousel 
        autoPlay 
        infiniteLoop 
        interval={6000} 
        showThumbs={false} 
        className="banner-carousel"
      >
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).webp"
            alt="Welcome to the Team"
          />
          <p className="legend">
            🚛 Welcome to the team! GAD specializes in shipping anything, size,
            type, and distance. Connecting you with the best operators to
            transport your loads. Tell us about your business needs and sign up
            today!
          </p>
        </div>
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
            alt="Safety Compliance"
          />
          <p className="legend">
            🛡️ Safety compliance, new authority load booking, low deadhead,
            broker negotiation, plus bonuses! First-day sign-up gets a FREE LOAD
            for booking service (new investors only). Referral program: get 5%
            off after each new partner signs on!
          </p>
        </div>
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
            alt="Global Asset Dispatching"
          />
          <p className="legend">
            🌎 Global Asset Dispatching is built with integrity. We provide
            owner operators and new authorities with balance, financial growth,
            and partnerships. Let’s scale your business together.
          </p>
        </div>
      </Carousel>

      <h2 className="banner-subtitle">📍 Our Location</h2>
      <iframe
        title="Our Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.519079327509!2d-96.80896185070704!3d32.77849320596261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9917754ecff7%3A0x45437a4fc8e53e1e!2s826%20Commerce%20St%2C%20Dallas%2C%20TX%2075202!5e0!3m2!1sen!2sus!4v1713024559568!5m2!1sen!2sus"
        width="90%"
        height="500"
        style={{ border: "0", margin: "auto", display: "block", borderRadius: "12px" }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

export default Banner;
