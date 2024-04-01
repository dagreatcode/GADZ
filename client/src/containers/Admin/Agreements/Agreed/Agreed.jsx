import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import PropTypes from 'prop-types'

const Agreed = () => {
  const [tour, setTour] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/agreement/agreed/${id}`)
        .then((res) => {
          setTour(res.data)
          console.log(res.data.date)
        })
        .catch((err) => console.log(err));
    } else {
      window.location.replace("/agreements");
    }
  }, [id]);

  console.log("Data is Working", tour);
  return (
    <>
        <h1>An agreement will show here soon. Stay tuned!</h1>
        {/* Create a PDF to send to the admin email after customer fills it out */}
        <div>Agreement</div>
        <br />
        Email Address: {id}
        <br /> 
        <br />
        <br />
        This Dispatcher-Carrier Agreement hereinafter "Agreement' is made and
        entered on {tour.date}(the "effective date") by and between Berhenny Dean Co, a New
        Jersey limited liability Company, and, a Registered Motor Carrier with
        its principal office at
        {"Description"}
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
        {tour.numberMC}
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
        CARRIER's equipment at a flat rate of {tour.freightRate}
        the gross of each load. Additional billing services may be procured at a
        rate of ${tour.invoiceRate}
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
        {/* <br />
        Email Address:
        <br />
        <input type="email" name="email" required />
        <br />
        <select name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br /> 
        <input type="checkbox" id="agree" name="agree" required /><br/>*/}
        <label htmlFor="agree">Company (DISPATCH)</label>
        <br />
        {/* The API methods are mostly just wrappers around signature_pad's API. on() and off() will, in addition, bind/unbind the window resize event handler. 
        getCanvas(), getTrimmedCanvas(), and getSignaturePad() are new. */}
        {/* getTrimmedCanvas(): canvas, creates a copy of the canvas and returns a trimmed version of it, with all whitespace removed.
        getSignaturePad(): SignaturePad, returns the underlying SignaturePad reference. */}
        <br />
        {"Company"}
        <br />
        <label htmlFor="agree">Authorized Signature</label>
        <br />
        {"Sig Image"}
        <br />
        <label htmlFor="agree">Printed Name/Title</label>
        <br />
        {"Sig Image"}
        <br />
        <label htmlFor="agree">Date</label>
        <br />
        {tour.date} <br />
        <br />
        <br /> <br />
        <label htmlFor="agree">Company (CARRIER)</label>
        <br />
        {tour.company}
        <label htmlFor="agree">Authorized Signature</label>
        <br />
        {"Sig Image"}
        <br />
        <label htmlFor="agree">Printed Name/Title</label>
        <br />
        {"Sig Image"}
        <br />
        <label htmlFor="agree">Date</label>
        <br />
        {tour.date} <br />
        <br />
        {/* https://github.com/agilgur5/react-signature-canvas/blob/gh-pages/example/app.js */}
        <br />
        {"Next or GoBack"}
    </>
  );
};

// Agreed.propTypes = {

// }

export default Agreed;
