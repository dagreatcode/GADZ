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
      {/* Create a PDF to send to the admin email after customer fills it out */}
      <div>Agreement</div>
      <form
        className="agreement"
        action="/sendAgreement"
        method="post"
        onSubmit={handleSubmit}
      >
        <br />
        This Dispatcher-Carrier Agreement (hereinafter "Agreement' is made and
        entered on <input type="date" name="dob" /> (the "effective date") by
        and between Berhenny Dean Co, a New Jersey limited liability Company,
        and, a Registered Motor Carrier with its principal office at
        ("Carrier"): collectively referred to as the "Parties". WHEREAS,
        DISPATCHER is an Independent Contractor conducting Load Tendering
        Transitions between Freight Shippers or Freight Holders, and Carriers
        authorized by the Federal Motor Carrier Safety Administration ("FMCS")
        to operate as a Registered Property Carriers Pursuant to Licenses
        issued. DISPATCHER is not a broker nor acting as a broker to the
        CARRIER. WHEREAS, CARRIER, an independent contractor, is licensed by the
        FMCS to operate as a for-hire motor carrier pursuant bauthority issued
        in Number MC- <input type="text" name="name" required />
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
        (all documents will be sent to CARRIER, (at Carrier's expense), and DOT
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
        <input type="text" name="name" required />% of the gross of each load.
        Additional billing services may be procured at a rate of $
        <input type="text" name="name" required /> per invoice. All DISPATCHER
        fees must be paid after each load has been booked and accepted by the
        CARRIER. CARRIER must, prior to the implementation, of this agreement
        furnish to DISPATCHER the following: <br />
        <br />
        1. A signed Limited Power of Attorney form (optional) <br />
        <br />
        2. Copy of CARRIER's Motor Carrier Authority <br />
        <br />
        3. This AGREEMENT form is completed dated and signed
        (B1IRtR8Qoy×W1/517042be3a60eb f47041cbb282104SPATCHER as a certificate
        holder. **DISPATCHER requires at least $1,000,000 liability insurance
        and at least $100;000 cargo coverage. **Power-only carriers must also
        have $40,000 non-owned trailer or interchange insurance.
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
        <br /> */}
        <input type="checkbox" id="agree" name="agree" required /><br/>
        <label htmlFor="agree">Please Sign Below</label>
        <br />
        <label htmlFor="agree">Sign</label><br/>
        Please Sign Above:
        <SignatureCanvas
          penColor="green"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Agreement;
