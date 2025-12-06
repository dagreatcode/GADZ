import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Axios from "axios";
import "./CertifiedAgreement.css"; // Add this CSS for styling

const PostForm = () => {
  const sigPad = useRef({});
  const url = "/api/agreement/need2work";

  const [signature, setSignature] = useState(null);
  const [data, setData] = useState({
    email: "",
    description: "",
    date: "",
    numberMC: 0,
    freightRate: 0,
    invoiceRate: 0,
    company: "",
    print: "",
  });
  const [showSubmit, setShowSubmit] = useState(false);

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const clearSignature = () => sigPad.current.clear();

  const saveSignature = () => {
    const sigData = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
    setSignature(sigData);
    setShowSubmit(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(url, { data, signature });
      window.location.replace("/AboutUs");
    } catch (err) {
      console.error(err);
      alert("Failed to submit agreement.");
    }
  };

  return (
    <div className="agreement-container">
      <h1 className="agreement-title">Dispatcher-Carrier Agreement</h1>

      <form onSubmit={submitForm} className="agreement-form">
        <label>Email Address:</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={handleChange}
          placeholder="email@example.com"
          required
        />

        <p>
          This Dispatcher-Carrier Agreement hereinafter "Agreement" is made and
          entered on{" "}
          <input
            type="date"
            id="date"
            value={data.date}
            onChange={handleChange}
            required
          />{" "}
          (the "effective date") by and between Berhenny Dean Co, a New Jersey
          limited liability Company, and a Registered Motor Carrier with its
          principal office at{" "}
          <input
            type="text"
            id="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Carrier office address"
            required
          />{" "}
          ("Carrier"): collectively referred to as the "Parties".
        </p>

        <p>
          WHEREAS, DISPATCHER is an Independent Contractor conducting Load
          Tendering Transitions between Freight Shippers or Freight Holders, and
          Carriers authorized by the Federal Motor Carrier Safety Administration
          ("FMCS") to operate as a Registered Property Carrier. DISPATCHER is not
          a broker nor acting as a broker to the CARRIER.
        </p>

        <p>
          WHEREAS, CARRIER, an independent contractor, is licensed by the FMCS
          to operate as a for-hire motor carrier pursuant authority issued in
          Number MC-{" "}
          <input
            type="number"
            id="numberMC"
            value={data.numberMC}
            onChange={handleChange}
            placeholder="MC Number"
            required
          />
        </p>

        <p>
          NOW, THEREFORE, CARRIER desires to retain DISPATCHER by executing a
          Limited Power of Attorney to find, negotiate, and procure freight for
          and dispatch CARRIER's equipment at a flat rate of{" "}
          <input
            type="number"
            id="freightRate"
            value={data.freightRate}
            onChange={handleChange}
            placeholder="Freight Rate"
            required
          />{" "}
          per load. Additional billing services may be procured at a rate of $
          <input
            type="number"
            id="invoiceRate"
            value={data.invoiceRate}
            onChange={handleChange}
            placeholder="Invoice Rate"
          />{" "}
          per invoice.
        </p>

        <ol>
          <li>A signed Limited Power of Attorney form (optional)</li>
          <li>Copy of CARRIER's Motor Carrier Authority</li>
          <li>This AGREEMENT form is completed, dated, and signed</li>
          <li>
            Copy of Insurance Certificates listing DISPATCHER as a certificate
            holder (min $1,000,000 liability, $100,000 cargo; power-only carriers
            require $40,000 non-owned trailer coverage)
          </li>
          <li>Signed W-9</li>
          <li>Company Profile Sheet (3 established references)</li>
          <li>Cell phone and contact info of main company representative</li>
        </ol>

        <h2>Dispatch Company (GADZConnect LLC)</h2>
        <p>Authorized Signature: ___________________________</p>
        <p>Printed Name/Title: ___________________________</p>
        <p>Date: <input type="date" name="dispatchDate" /></p>

        <h2>Carrier Company</h2>
        <input
          type="text"
          id="company"
          value={data.company}
          onChange={handleChange}
          placeholder="Carrier Company Name"
          required
        />

        <p>Authorized Signature:</p>
        <SignatureCanvas
          ref={sigPad}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: "signature-canvas" }}
        />
        <div className="signature-buttons">
          <button type="button" onClick={clearSignature}>Clear</button>
          <button type="button" onClick={saveSignature}>Save</button>
        </div>

        <label>Printed Name/Title:</label>
        <input
          type="text"
          id="print"
          value={data.print}
          onChange={handleChange}
          placeholder="Name / Title"
          required
        />

        <label>Date:</label>
        <input
          type="date"
          id="date"
          value={data.date}
          onChange={handleChange}
          required
        />

        {showSubmit && (
          <div className="submit-container">
            <button type="submit">Submit Agreement</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostForm;
