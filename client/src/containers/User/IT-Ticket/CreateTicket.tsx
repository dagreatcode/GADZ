import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const CreateTicket = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !subject || !description) {
      setError("All fields are required.");
      return;
    }

    const userData = { name, subject, description };

    // Send data to the API
    fetch("/api/it-help/post-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data);
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("There was an error submitting your ticket.");
      });
  };

  useEffect(() => {
    if (response) {
      console.log("Response from API:", response);
    }
  }, [response]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create IT Ticket</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Can We Text You?" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {response && (
        <Alert variant="success" className="mt-3">
          <h4>Response from API:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <Link to="/User" className="d-block mt-3">
        Home
      </Link>
    </div>
  );
};

export default CreateTicket;
