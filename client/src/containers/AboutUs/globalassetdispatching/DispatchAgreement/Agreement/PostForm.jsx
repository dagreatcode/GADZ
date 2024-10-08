import React, { useState, useRef } from "react";
// import PropTypes from 'prop-types'
import SignatureCanvas from "react-signature-canvas";
import Axios from "axios";

const PostForm = () => {
  let sigPad = useRef({});
  const url = "/api/agreement/need2work";
  const [signature, setSign] = useState();
  const [data, setData] = useState({
    email: "",
    description: "",
    date: "",
    numberMC: 0,
    invoiceRate: 0,
    company: "",
    signature: "",
  });
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);

  const clear = (e) => {
    sigPad.current.clear();
  };
  const save = (e) => {
    setSign(sigPad.current.getTrimmedCanvas().toDataURL("image/png"));
    // data["numberMC"]=Number
    // console.log("signature", signature);
  };

  // Test
  // const obj = [data, sigPad, { signature }];
  // const obj = [{data}, {signature}]
  // console.log(obj);

  function submit(e) {
    e.preventDefault(e);
    const body = { data, signature };
    // console.log("data", data.email);
    // console.log("My e.target", e.target.email.value);
    // console.log(sigPad);
    // console.log(signature);
    Axios.post(url, body)
      .then((res) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // console.log("My Data from Res: ", res);
        window.location.replace("/AboutUs");
      })
      .catch((err) => console.log(err));
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    // console.log(`data from handle: ${JSON.stringify(data)}`);
    // console.log(newData);
  }

  return (
    <>
      {/* FIXME */}
      {/* redirect to home page or the next agreement */}
      <form
        method="POST"
        action="/api/agreement/need2work"
        encType="multipart/form-data"
        onSubmit={(e) => submit(e)}
      >
        {/* Create a PDF to send to the admin email after customer fills it out */}
        <div>Agreement</div>
        <br />
        Email Address:
        <br />
        <input
          onChange={(e) => handle(e)}
          id="email"
          value={data.email}
          placeholder="email"
          type="email"
        ></input>{" "}
        <br />
        <br />
        This Dispatcher-Carrier Agreement hereinafter "Agreement' is made and
        entered on{" "}
        <input
          onChange={(e) => handle(e)}
          id="date"
          value={data.date}
          placeholder="date"
          type="date"
        ></input>
        (the "effective date") by and between Berhenny Dean Co, a New Jersey
        limited liability Company, and, a Registered Motor Carrier with its
        principal office at
        <input
          onChange={(e) => handle(e)}
          id="description"
          value={data.description}
          placeholder="description"
          type="text"
        ></input>{" "}
        ("Carrier"): collectively referred to as the "Parties". <br />
        <br />
        WHEREAS, DISPATCHER is an Independent Contractor conducting Load
        Tendering Transitions between Freight Shippers or Freight Holders, and
        Carriers authorized by the Federal Motor Carrier Safety Administration
        ("FMCS") to operate as a Registered Property Carriers Pursuant to
        Licenses issued. DISPATCHER is not a broker nor acting as a broker to
        the CARRIER. <br />
        <br />
        WHEREAS, CARRIER, an independent contractor, is licensed by the FMCS to
        operate as a for-hire motor carrier pursuant authority issued in Number
        MC-
        <input
          onChange={(e) => handle(e)}
          id="numberMC"
          value={data.numberMC}
          placeholder="numberMC"
          type="number"
        ></input>{" "}
        <br />
        <br />
        WHEREAS, the transportation service provided by CARRIER for Freight
        Shippers, whether on regulated, unregulated, or intrastate traffic, is
        intended by the Parties to be contract carriage between the CARRIER and
        Freight Shippers/Holders as defined in 49 U.S.C. $13102 (4) and §14101
        (b) and not between DISPATCHER, and the Parties hereto intend that the
        contractual arrangement be continuous in nature until this agreement is,
        by its terms, terminated; and <br />
        <br />
        WHEREAS, both DISPATCHER and CARRIER enter into this Agreement for the
        purpose of providing and receiving specified services under specified
        rates and conditions, DISPATCHER and CARRIER deem it essential to their
        respective interest to establish and maintain an Independent Contractor
        relationship in the execution and performance of this agreement; and{" "}
        <br />
        <br />
        DISPATCHER is NOT responsible for the following: billing issues, load
        problems, advances (all advances will have to be handled directly
        between CARRIER and shipper/broker), handling and storage of paperwork
        all documents will be sent to CARRIER, (at Carrier's expense), and DOT
        compliance issues; <br />
        <br />
        NOW, THEREFORE, for and in consideration of the mutual covenants and
        undertakings herein, and subject to the terms and conditions hereinafter
        set forth, the Parties hereto warrant, covenant, and agree as follows:{" "}
        <br />
        <br />
        CARRIER desires to retain DISPATCHER by executing a Limited, Power of
        Attorney to find, negotiate, and procure freight for and dispatch
        CARRIER's equipment at a flat rate of{" "}
        <input
          onChange={(e) => handle(e)}
          id="freightRate"
          value={data.freightRate}
          placeholder="freightRate"
          type="number"
        ></input>{" "}
        the gross of each load. Additional billing services may be procured at a
        rate of $
        <input
          onChange={(e) => handle(e)}
          id="invoiceRate"
          value={data.invoiceRate}
          placeholder="invoiceRate"
          type="number"
        ></input>{" "}
        invoice. All DISPATCHER fees must be paid after each load has been
        booked and accepted by the CARRIER. CARRIER must, prior to the
        implementation, of this agreement furnish to DISPATCHER the following:{" "}
        <br />
        <br />
        <ol>
          <li>A signed Limited Power of Attorney form (optional)</li>
          <li>Copy of CARRIER's Motor Carrier Authority</li>
          <li>This AGREEMENT form is completed dated and signed</li>
          <li>
            Copy of Insurance Certificates, listing DISPATCHER as a certificate
            holder. **DISPATCHER requires at least $1,000,000 liability
            insurance and at least $100;000 cargo coverage. **Power-only
            carriers must also have $40,000 non-owned trailer or interchange
            insurance.
          </li>
          <li>A signed W-9 </li>
          <li>
            Company Profile Sheet (including a list if three established
            references)
          </li>
          <li>
            Cell phone or contact phone number and name of main company contact
          </li>
        </ol>
        <br />
        <br />
        <br />
        <label htmlFor="agree">Company (DISPATCH)</label>
        <br />
        {/* The API methods are mostly just wrappers around signature_pad's API. on() and off() will, in addition, bind/unbind the window resize event handler. 
        getCanvas(), getTrimmedCanvas(), and getSignaturePad() are new. */}
        {/* getTrimmedCanvas(): canvas, creates a copy of the canvas and returns a trimmed version of it, with all whitespace removed.
        getSignaturePad(): SignaturePad, returns the underlying SignaturePad reference. */}
        <br />
        <h1>GADZConnect LLC.</h1>
        <br />
        <label htmlFor="agree">Authorized Signature</label>
        <br />
        ___________________________
        <br />
        <br />
        <label htmlFor="agree">Printed Name/Title</label>
        <br />
        ___________________________
        <br />
        <br />
        <label htmlFor="agree">Date</label>
        <br />
        <input type="date" name="dob" /> <br />
        <br />
        <br /> <br />
        <label htmlFor="agree">Company (CARRIER)</label>
        <br />
        <input
          onChange={(e) => handle(e)}
          id="company"
          value={data.company}
          placeholder="company"
          type="text"
        ></input>{" "}
        <br />
        <br />
        <label htmlFor="agree">Authorized Signature</label>
        <br />
        <SignatureCanvas
          // style={{border:"black solid", backgroundColor:"white"}}
          ref={sigPad}
          name="signature"
          type="file"
          backgroundColor="gray"
          penColor="black"
          value={signature}
          id="signature"
          canvasProps={{
            width: 500,
            height: 200,
            className: "signature",
          }}
        />{" "}
        <br />
        <label htmlFor="agree">Printed Name/Title</label>
        <br />
        <input
          onChange={(e) => handle(e)}
          id="print"
          value={data.print}
          placeholder="print"
          type="text"
        ></input>{" "}
        <br />
        <label htmlFor="agree">Date</label>
        <br />
        <input
          onChange={(e) => handle(e)}
          id="date"
          value={data.date}
          placeholder="date"
          type="date"
        ></input>{" "}
        <br />
        <br />
        {/* https://github.com/agilgur5/react-signature-canvas/blob/gh-pages/example/app.js */}
        <br />
        {/* Please Hide this until the customer click save below. */}
        {/* <input hidden={false} type="submit" value="Submit" />{" "} */}
        {"Please Click Save to save signature Before Submitting this form"}
        {/* The Test */}
        <div>
          {/* <input type="submit" value="Save Signature" onClick={onClick} /> */}
          {showResults ? (
            <button hidden={false} type="submit" value="Submit">
              Submit
            </button>
          ) : null}
        </div>
      </form>
      {/* Fix the value if there is a problem */}
      <button value={sigPad} onClick={clear}>
        Clear
      </button>
      <div onClick={save}>
        <input type="submit" value="Save" onClick={onClick} />
      </div>
    </>
  );
};

// PostForm.propTypes = {
// id: PropTypes.string.isRequired,
// onChange: PropTypes.func.isRequired,
// }

export default PostForm;
