import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateTicket = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState(null);
  const [name2, setName2] = useState("");
  const [subject2, setSubject2] = useState("");
  const [description2, setDescription2] = useState("");
  const [response2, setResponse2] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = { name, subject, description };

    // Send data to the API
    fetch("/api/it-help/post-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (response) {
      console.log("Response from API:", response);
    }
  }, [response]);

  const handleSubmit2 = (e: any) => {
    e.preventDefault();
    const userData = { name, subject, description };

    // Send data to the API
    fetch("/api/employee-help/post-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => setResponse2(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (response2) {
      console.log("Response from API:", response2);
    }
  }, [response2]);

  return (
    <>
      <div className="container">
        <h1>Create IT Ticket</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
            <Form.Text className="text-muted">Please leave a Name.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
            <Form.Text className="text-muted">
              Please leave a subject.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <Form.Text className="text-muted">
              Please leave a Description.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Can We Text You?" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {response && (
          <div>
            <h2>Response from API:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

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
            <Form.Text className="text-muted">Please leave a Name.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject2}
              onChange={(e) => setSubject2(e.target.value)}
              placeholder="Subject"
            />
            <Form.Text className="text-muted">
              Please leave a subject.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              placeholder="Description"
            />
            <Form.Text className="text-muted">
              Please leave a Description.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Can We Text You?" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {response2 && (
          <div>
            <h2>Response from API:</h2>
            <pre>{JSON.stringify(response2, null, 2)}</pre>
          </div>
        )}
        <Link to="/User">Home</Link>
        <br />
      </div>
    </>
  );
};

export default CreateTicket;
