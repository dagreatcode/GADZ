import React, { useState } from "react";
// import PropTypes from 'prop-types'
import Axios from "axios";

const PostForm = () => {
  // const [title, setTitle] = React.useState("");
  // const [description, setDescription] = React.useState("");
  const url = "/api/agreement/create";
  const [data, setData] = useState({
    email: "",
    description: "",
    date: "",
    numberMC: 0,
    invoiceRate: 0
    // company: "",
  });

  // // Submit the form to create a new post
  // function handleSubmit(e, {description}) {
  //   console.log(description)
  //   e.preventDefault();
  //   console.log(`Posting
  //       ${description}`);
  //   // ${title} and
  //   Axios.post("http://localhost:3001/api/agreement/create", {
  //     // title: title,
  //     description: description,
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       alert("Your post has been submitted!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("There was an error submitting your post.");
  //     });
  // }

  function submit(e) {
    e.preventDefault(e);
    // const [email, date] = e.target
    const body = { ...data };
    console.log("data", data.email);
    console.log("My e.target", e.target.email.value)
    Axios.post(url, body
    //   {
    //   email: data.email,
    //   date: data.date,
    //   description: data.description,
    //   numberMC: data.numberMC,
    //   invoiceRate: data.invoiceRate
    //   // company: data.company
    // }
    )
      // .then(() => setData({ ...data, [e.target.name]: e.target.value }))
      .then((res) => {
        // setData({ ...data, [e.target.name]: e.target.value });
        console.log("My Data: ", res);
      })
      .catch((err) => console.log(err));
  }
  function handle(e) {
    // setData({ ...data, [e.target.name]: e.target.value})
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(`data: ${JSON.stringify(data)}`);
    console.log(newData);
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
         Title:<br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/><br /> 
        Description:
        <br />
        <input
          placeholder="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>
        <button>Submit</button>
      </form> */}
      {/* Youtube Video */}
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
        {/* <input
          onChange={(e) => handle(e)}
          id="company"
          value={data.company}
          placeholder="company"
          type="text"
        ></input> */}
        <button>Submit</button>
      </form>
    </>
  );
};

// PostForm.propTypes = {

// }

export default PostForm;
