import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface ErrorResponse {
  message?: string; // Adjust according to your API response structure
}

const TicketsCreated: React.FC = () => {
  const [name2, setName2] = useState("");
  const [subject2, setSubject2] = useState("");
  const [description2, setDescription2] = useState("");
  const [response2, setResponse2] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name2 || !subject2 || !description2) {
      setError("All fields are required.");
      return;
    }

    const userData = {
      name: name2,
      subject: subject2,
      description: description2,
    };
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await axios.post(
        "/api/employee-help/post-ticket",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse2(response.data); // Set response data
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>; // Type assertion

      console.error("Error:", error);
      setError(
        "Failed to submit ticket: " +
          (error.response?.data.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <h1>Create Employee Ticket</h1>
      <br />
      <Form onSubmit={handleSubmit2}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Enter Your Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject2}
            onChange={(e) => setSubject2(e.target.value)}
            placeholder="Subject"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            placeholder="Description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Can We Text You?" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {response2 && (
        <div>
          <h2>Response from API:</h2>
          <pre>{JSON.stringify(response2, null, 2)}</pre>
        </div>
      )}

      <Link to="/Admin">Home</Link>
    </>
  );
};

export default TicketsCreated;
