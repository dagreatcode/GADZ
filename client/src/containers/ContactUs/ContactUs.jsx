import { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import axios from "axios";
import Button from "react-bootstrap/Button";
import './ContactUs.css';

const ContactUs = () => {
  const [clientName, setName] = useState("");
  const [clientMessage, setMessage] = useState("");
  const [clientEmail, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { clientName, clientMessage, clientEmail },
      });
      console.log("res:", res);
      alert("Your message has been sent!");
      setName(""); setEmail(""); setMessage("");
      window.location.replace("/");
    } catch (err) {
      console.error(err);
      alert("Failed to send message, please try again.");
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <h2 className="subtitle">Join the Future of Logistics</h2>
        <p className="description">
          Ready to take your logistics operations to the next level? Join the
          thousands of businesses already benefiting from GADZ CONNECT.
          Sign up today and experience the future of logistics management!
        </p>
      </div>

      <img
        src="https://res.cloudinary.com/fashion-commit/image/upload/v1713670835/GADZ/Dispatcher-2-1984023525_fxyfzh.webp"
        className="image-banner"
        alt="Call Center"
      />

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Send us a message for a free consultation</h3>

        <div className="form-group floating-label">
          <Input
            type="text"
            id="clientName"
            value={clientName}
            handleInputChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="clientName">Name & Number</label>
        </div>

        <div className="form-group floating-label">
          <Input
            type="email"
            id="clientEmail"
            value={clientEmail}
            handleInputChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="clientEmail">Email Address</label>
        </div>

        <div className="form-group floating-label">
          <TextArea
            id="clientMessage"
            rows="4"
            value={clientMessage}
            handleInputChange={(e) => setMessage(e.target.value)}
            required
          />
          <label htmlFor="clientMessage">Message</label>
        </div>

        <Button type="submit" className="submit-button">Send Request</Button>
      </form>
    </div>
  );
};

export default ContactUs;
