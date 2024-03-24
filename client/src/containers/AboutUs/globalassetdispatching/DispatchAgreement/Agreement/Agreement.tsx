import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

function Agreement() {
  const [errors, setErrors] = useState<{ test1: string; test2: string }>({
    test1: "",
    test2: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("提交成功");
    setErrors({ test1: "", test2: "" });
    console.log(errors);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {/* Create a PDF to send to the admin email after customer fills it out */}
            <div>Agreement</div>
            <form
              method="POST"
              encType="multipart/form-data"
              className="agreement"
              action="/declare backend route/"
              onSubmit={handleSubmit}
            >
              <br />
              Email Address:
              <br />
              <input type="email" name="email" required />
              <br />
              <br />
              This Dispatcher-Carrier Agreement (hereinafter "Agreement' is made
              and entered on <input type="date" name="dob" /> (the "effective
              date") by and between Berhenny Dean Co, a New Jersey limited
              liability Company, and, a Registered Motor Carrier with its
              principal office at <input type="text" name="name" required />
              ("Carrier"): collectively referred to as the "Parties". <br />
              <br />
              WHEREAS, DISPATCHER is an Independent Contractor conducting Load
              Tendering Transitions between Freight Shippers or Freight Holders,
              and Carriers authorized by the Federal Motor Carrier Safety
              Administration ("FMCS") to operate as a Registered Property
              Carriers Pursuant to Licenses issued. DISPATCHER is not a broker
              nor acting as a broker to the CARRIER. <br />
              <br />
              WHEREAS, CARRIER, an independent contractor, is licensed by the
              FMCS to operate as a for-hire motor carrier pursuant bauthority
              issued in Number MC- <input type="text" name="name" required />
              <br />
              <br />
              WHEREAS, the transportation service provided by CARRIER for
              Freight Shippers, whether on regulated, unregulated, or intrastate
              traffic, is intended by the Parties to be contract carriage
              between the CARRIER and Freight Shippers/Holders as defined in 49
              U.S.C. $13102 (4) and §14101 (b) and not between DISPATCHER, and
              the Parties hereto intend that the contractual arrangement be
              continuous in nature until this agreement is, by its terms,
              terminated; and <br />
              <br />
              WHEREAS, both DISPATCHER and CARRIER enter into this Agreement for
              the purpose of providing and receiving specified services under
              specified rates and conditions, DISPATCHER and CARRIER deem it
              essential to their respective interest to establish and maintain
              an Independent Contractor relationship in the execution and
              performance of this agreement; and <br />
              <br />
              DISPATCHER is NOT responsible for the following: billing issues,
              load problems, advances (all advances will have to be handled
              directly between CARRIER and shipper/broker), handling and storage
              of paperwork (all documents will be sent to CARRIER, (at Carrier's
              expense), and DOT compliance issues; <br />
              <br />
              NOW, THEREFORE, for and in consideration of the mutual covenants
              and undertakings herein, and subject to the terms and conditions
              hereinafter set forth, the Parties hereto warrant, covenant, and
              agree as follows: <br />
              <br />
              CARRIER desires to retain DISPATCHER by executing a Limited, Power
              of Attorney to find, negotiate, and procure freight for and
              dispatch CARRIER's equipment at a flat rate of{" "}
              <input type="number" id="quantity" name="quantity" required />% of
              the gross of each load. Additional billing services may be
              procured at a rate of $
              <input type="number" id="quantity" name="quantity" required /> per
              invoice. All DISPATCHER fees must be paid after each load has been
              booked and accepted by the CARRIER. CARRIER must, prior to the
              implementation, of this agreement furnish to DISPATCHER the
              following: <br />
              <br />
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
              {/* ol
          li
          li
          li
        /ol */}
              1. A signed Limited Power of Attorney form (optional) <br />
              <br />
              2. Copy of CARRIER's Motor Carrier Authority <br />
              <br />
              3. This AGREEMENT form is completed dated and signed
              <br />
              <br />
              4. Copy of Insurance Certificates, listing DISPATCHER as a
              certificate holder. **DISPATCHER requires at least $1,000,000
              liability insurance and at least $100;000 cargo coverage.
              **Power-only carriers must also have $40,000 non-owned trailer or
              interchange insurance. <br />
              <br />
              5. A signed W-9 <br />
              <br />
              6. Company Profile Sheet (including a list if three established
              references) <br />
              <br />
              7. Cell phone or contact phone number and name of main company
              contact
              <br />
              <br />
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
              <input type="text" name="name" required />
              <br />
              <label htmlFor="agree">Authorized Signature</label>
              <br />
              <SignatureCanvas
                // style={{border:"black solid", backgroundColor:"white"}}
                // backgroundColor="rgba(5,5,5,5)"
                backgroundColor="gray"
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
              />
              <br />
              <label htmlFor="agree">Printed Name/Title</label>
              <br />
              <SignatureCanvas
                // style={{border:"black solid", backgroundColor:"white"}}
                backgroundColor="gray"
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
              />{" "}
              <br />
              <label htmlFor="agree">Date</label>
              <br />
              <input type="date" name="dob" /> <br />
              <br />
              <br /> <br />
              <label htmlFor="agree">Company (CARRIER)</label>
              <br />
              <input type="text" name="name" required /> <br />
              <label htmlFor="agree">Authorized Signature</label>
              <br />
              <SignatureCanvas
                // style={{border:"black solid", backgroundColor:"white"}}
                backgroundColor="gray"
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
              />{" "}
              <br />
              <label htmlFor="agree">Printed Name/Title</label>
              <br />
              <SignatureCanvas
                // style={{border:"black solid", backgroundColor:"white"}}
                backgroundColor="gray"
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
              />
              <br />
              <label htmlFor="agree">Date</label>
              <br />
              <input type="date" name="dob" /> <br />
              <br />
              <br />
              {/* https://github.com/agilgur5/react-signature-canvas/blob/gh-pages/example/app.js */}
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agreement;
