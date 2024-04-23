import { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import axios from "axios";
import Button from "react-bootstrap/Button";

const ContactUs = () => {
  const [clientName, setName] = useState("");
  const [clientMessage, setMessage] = useState("");
  const [clientEmail, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello from react");

    const res = await axios("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        clientName,
        clientMessage,
        clientEmail,
      },
      body: { clientName, clientMessage, clientEmail },
    });
    console.log("res:", res);
    window.location.replace("/");
  };
  return (
    <>
      <div
        className="container"
        style={{ padding: "25px", textAlign: "center", top: "50%" }}
      >
        <h1
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Contact Us
        </h1>
        <h1 className="display-4" style={{ padding: "40px" }}>
          JOIN THE FUTURE OF LOGISTICS
        </h1>
        <p className="fs-3">
          Ready to take your logistics operations to the next level? Join the
          thousands of businesses already benefiting from GADZ CONNECT. Sign up
          today and experience the future of logistics management firsthand!
        </p>
        <div style={{ textAlign: "center" }}> </div>
        <br />
        <br />
        <br />
        <br />
        <img
          src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/Dispatcher-2-1984023525_fxyfzh.webp"
          style={{ width: "100%" }}
          alt="Call Center"
        />
        <form>
          <div className="container">
            <br />
            <br />
            <br />
            <br />
            <h1 className="display-6" style={{ padding: "40px" }}>
              Send us a message for a free consultation
            </h1>
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div className="col-sm-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Name & Number
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="John Doe - 1(444)-444-4444"
                    name="clientName"
                    value={clientName}
                    handleInputChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div className="col-sm-6">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <Input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="name@example.com"
                    name="clientEmail"
                    value={clientEmail}
                    handleInputChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div className="col-sm-8">
                {" "}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea3"
                    className="form-label"
                  >
                    Message
                  </label>
                  <TextArea
                    type="text"
                    className="form-control"
                    id="exampleFormControlTextarea3"
                    rows="3"
                    placeholder="What would you like done?"
                    name="clientMessage"
                    value={clientMessage}
                    handleInputChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              Send Request
            </Button>
            <br />
            <br />
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default ContactUs;
