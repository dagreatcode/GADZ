// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";

// const CreateTicket = () => {
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [response, setResponse] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!name || !subject || !description) {
//       setError("All fields are required.");
//       return;
//     }

//     const userData = { name, subject, description };

//     // Send data to the API
//     fetch("/api/it-help/post-ticket", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setResponse(data);
//         setError(null); // Clear any previous error
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setError("There was an error submitting your ticket.");
//       });
//   };

//   useEffect(() => {
//     if (response) {
//       console.log("Response from API:", response);
//     }
//   }, [response]);

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Create IT Ticket</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter Your Name"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicSubject">
//           <Form.Label>Subject</Form.Label>
//           <Form.Control
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="Subject"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicDescription">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Check type="checkbox" label="Can We Text You?" />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>

//       {response && (
//         <Alert variant="success" className="mt-3">
//           <h4>Response from API:</h4>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </Alert>
//       )}

//       {error && (
//         <Alert variant="danger" className="mt-3">
//           {error}
//         </Alert>
//       )}

//       <Link to="/User" className="d-block mt-3">
//         Home
//       </Link>
//     </div>
//   );
// };

// export default CreateTicket;

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !subject || !description) {
      setError("All fields are required.");
      setResponse(null);
      return;
    }

    setLoading(true);
    const userData = { name, subject, description };

    fetch("/api/it-help/post-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setResponse(data);
        setError(null);
        setName("");
        setSubject("");
        setDescription("");
      })
      .catch(() => setError("There was an error submitting your ticket."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (response) console.log("Response from API:", response);
  }, [response]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.header}>Create IT Ticket</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
              style={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
              style={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue..."
              required
              style={styles.textarea}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check type="checkbox" label="Can We Text You?" />
          </Form.Group>

          <Button variant="primary" type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>

        {response && (
          <Alert variant="success" className="mt-4">
            <strong>Ticket submitted successfully!</strong>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        )}

        <Link to="/User" style={styles.homeLink}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #f0f4f8, #d9e2ec)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2rem",
    fontWeight: 600,
    color: "#007BFF",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border 0.3s",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "vertical",
    transition: "border 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    fontWeight: 500,
  },
  homeLink: {
    display: "block",
    textAlign: "center",
    marginTop: "25px",
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default CreateTicket;
