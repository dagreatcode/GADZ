import React, { useState } from "react";
// import PropTypes from 'prop-types'
import Axios from "axios";

const PostForm = () => {
  const url = "/api/agreement/create";
  const [data, setData] = useState({
    email: "",
    description: "",
    date: "",
    numberMC: 0,
    invoiceRate: 0,
    company: "",
  });

  function submit(e) {
    e.preventDefault(e);
    const body = { ...data };
    console.log("data", data.email);
    console.log("My e.target", e.target.email.value);
    Axios.post(url, body)
      .then((res) => {
        // setData({ ...data, [e.target.name]: e.target.value });
        console.log("My Data: ", res);
      })
      .catch((err) => console.log(err));
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(`data: ${JSON.stringify(data)}`);
    console.log(newData);
  }

  return (
    <>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          id="email"
          value={data.email}
          placeholder="email"
          type="email"
        ></input>
        <input
          onChange={(e) => handle(e)}
          id="date"
          value={data.date}
          placeholder="date"
          type="date"
        ></input>
        <input
          onChange={(e) => handle(e)}
          id="description"
          value={data.description}
          placeholder="description"
          type="text"
        ></input>
        <input
          onChange={(e) => handle(e)}
          id="numberMC"
          value={data.numberMC}
          placeholder="numberMC"
          type="number"
        ></input>
        <input
          onChange={(e) => handle(e)}
          id="invoiceRate"
          value={data.invoiceRate}
          placeholder="invoiceRate"
          type="number"
        ></input>
        <input
          onChange={(e) => handle(e)}
          id="company"
          value={data.company}
          placeholder="company"
          type="text"
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};

// PostForm.propTypes = {
// id: PropTypes.string.isRequired,
// onChange: PropTypes.func.isRequired,
// }

export default PostForm;
