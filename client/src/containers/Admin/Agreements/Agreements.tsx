// import { Axios } from "axios";
import React, { useEffect } from "react";
// import PropTypes from 'prop-types'

const Agreements = () => {
//   const url = "/api/agreement/create"
  const [agreement, setAgreement] = React.useState(false);

  useEffect(()=>{
    fetch("/api/agreement/view").then(res => res.json()).then((data) => {
      console.log('Data is returned', data);
      setAgreement(data);
      console.log(data)
    })
    // setAgreement(true);
  }, [])

//   useEffect(() => {
//     if (localStorage.getItem("agree") === "true") {
//       setAgreement(true);
//       console.log(true)
//     } else {
//       setAgreement(false);
//       console.log(false)
//     }
//   }, []);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     localStorage.setItem("agree", "true");
//     setAgreement(true);
//     console.log("agreed")
//   };

  return agreement ? (
    <div className="container">
     
      Show Agreements

    </div>
  ) : (
    <> 
      {/* <button onClick={(e) => handleSubmit(e)} >Agree Here</button> */}
      No Agreements to show
    </>
  );
};

export default Agreements;

/*
Agreements.propTypes = {
    text: PropTypes.string
};
*/
