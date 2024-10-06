import { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import axios from "axios";
import Button from "react-bootstrap/Button";
import './ContactUs.css'; // Import your CSS file

const ContactUs = () => {
  const [clientName, setName] = useState("");
  const [clientMessage, setMessage] = useState("");
  const [clientEmail, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    });
    console.log("res:", res);
    window.location.replace("/");
  };

  return (
    <div className="contact-us-container">
      <h1 className="contact-title">Contact Us</h1>
      <h2 className="subtitle">JOIN THE FUTURE OF LOGISTICS</h2>
      <p className="description">
        Ready to take your logistics operations to the next level? Join the
        thousands of businesses already benefiting from GADZ CONNECT. Sign up
        today and experience the future of logistics management firsthand!
      </p>
      <img
        src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/Dispatcher-2-1984023525_fxyfzh.webp"
        className="image-banner"
        alt="Call Center"
      />
      <form className="contact-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Send us a message for a free consultation</h1>
        <div className="form-group">
          <label htmlFor="clientName">Name & Number</label>
          <Input
            type="text"
            className="form-control"
            id="clientName"
            placeholder="John Doe - 1(444)-444-4444"
            name="clientName"
            value={clientName}
            handleInputChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientEmail">Email address</label>
          <Input
            type="email"
            className="form-control"
            id="clientEmail"
            placeholder="name@example.com"
            name="clientEmail"
            value={clientEmail}
            handleInputChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientMessage">Message</label>
          <TextArea
            className="form-control"
            id="clientMessage"
            rows="3"
            placeholder="What would you like done?"
            name="clientMessage"
            value={clientMessage}
            handleInputChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button type="submit" className="submit-button">Send Request</Button>
      </form>
    </div>
  );
};

export default ContactUs;
