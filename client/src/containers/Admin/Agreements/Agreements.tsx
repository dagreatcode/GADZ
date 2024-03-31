// import { Axios } from "axios";
import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types'

const Agreements = () => {
  //   const url = "/api/agreement/create"
  const [agreement, setAgreement] = React.useState(false);
  const [agreeData, setData] = useState([]);

  useEffect(() => {
    fetch("/api/agreement/view")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data is returned", data);
        //   setAgreement(true);
        setAgreement(true);
        setData(data);
        //   setData(data)
        //   console.log(data[0].date)
      });
    // setAgreement(true);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("agree") === "true") {
      setAgreement(true);
      console.log(true);
    } else {
      setAgreement(false);
      console.log(false);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("agree", "true");
    setAgreement(true);
    console.log("agreed");
  };

  return agreement ? (
    <div className="container">
      <h1>Show Agreements</h1>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Email</th>
            <th>Date Agreed</th>
            <th>Description</th>
            <th>Number MC</th>
            <th>Invoice Rate</th>
          </tr>
        </thead>
        <tbody>
          {agreeData.map((r: any, i: any) => (
            <tr key={i}>
              {/* <td>{r.id}</td> */}
              <td>{r.email}</td>
              <td>{r.date}</td> 
              <td>{r.description}</td>
              <td>{r.numberMC}</td>
              <td>{r.invoiceRate}</td>
              <br />
              {/* <td>{r}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {agreeData.map((agree:any)=>(<p>{agree}</p>))} */}
    </div>
  ) : (
    <>
      <button onClick={(e) => handleSubmit(e)}>Agree Here</button>
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
