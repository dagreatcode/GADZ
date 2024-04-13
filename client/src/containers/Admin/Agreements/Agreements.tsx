// import { Axios } from "axios";
import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types'
// import axios from "axios";

const Agreements = () => {
  //   const url = "/api/agreement/create"
  const [agreement, setAgreement] = React.useState(false);
  const [agreeData, setData] = useState([]);

  useEffect(() => {
    // Fix code to work in production
    let letsClean = async () =>
      await fetch("/api/agreement/view")
        .then((res) => res.json())
        .then((data) => {
          // console.log("Data is returned", data);
          //   setAgreement(true);
          setAgreement(true);
          setData(data);
          //   setData(data)
          //   console.log(data[0].date)
        })
        .catch((err) => err);
    // Fix code to work in production
    return () => {
      letsClean();
    };
    // setAgreement(true);
  }, [setData, setAgreement]);

  useEffect(() => {
    const letsClean = () => {
      if (localStorage.getItem("agree") === "true") {
        setAgreement(true);
        // console.log(true);
      } else {
        setAgreement(false);
        // console.log(false);
      }
    };
    return () => letsClean();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("agree", "true");
    setAgreement(true);
    console.log("agreed");
  };

  const handleID = (e: any) => {
    e.preventDefault();
    console.log("Do Something");
    const id = e.target.value;
    // console.log(id)
    // axios.get(`/api/agreement/agreed/:${id}`)
    // fetch(`/api/agreement/agreed/${id}`)
    window.location.href = `/agreed/${id}`;
    // window.location.href=`http://localhost:3000/agreed/${id}`;
  };

  return agreement ? (
    <div className="container">
      <h1>Show Agreements</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {/* <th>ID</th> */}
            <th>Email</th>
            <th>Date Agreed</th>
            <th>Description</th>
            <th>Number MC</th>
            <th>Freight Rate</th>
            <th>Invoice Rate</th>
            <th>Company</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {agreeData.map((r: any, i: any) => (
            <tr key={i}>
              <td>
                {" "}
                <input onClick={handleID} type="submit" value={`${r.id}`} />
              </td>
              {/* <td>{r.id}</td> */}
              <td>{r.email}</td>
              <td>{r.date}</td>
              <td>{r.description}</td>
              <td>{r.numberMC}</td>
              <td>{r.freightRate}</td>
              <td>{r.invoiceRate}</td>
              <td>{r.company}</td>
              <td>{r.signature}</td>
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
