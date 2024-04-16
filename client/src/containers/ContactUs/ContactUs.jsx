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
          Ready to experience the future of logistics management? Sign up for
          GADZ CONNECT today and take your business to new heights. Let’s embark
          on this journey together, and unlock the full potential of your
          logistics operations.
        </p>
        <div style={{ textAlign: "center" }}> </div>
        <br />
        <img src="https://res.cloudinary.com/fashion-commit/image/upload/v1713237084/extras/Dispatcher-2-1984023525_alvokn.png" style={{ width: "100%" }} alt="flyer" />
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
            {/* <div style={{ margin: "20px" }} className="row">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div> */}
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
