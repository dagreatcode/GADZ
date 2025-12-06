// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Modal, Button, Form } from "react-bootstrap"; // Importing Modal components
// import styles from "./NewsLetters.module.css"; // Importing CSS module
// import axios from "axios";

// // Define a type for a Newsletter object
// interface Newsletter {
//   id: number;
//   subject: string;
//   description: string;
//   authorId: number;
//   archived: string;
//   important: string;
// }

// function NewsLetters() {
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [subject, setSubject] = useState(""); // Subject input state
//   const [description, setDescription] = useState(""); // Description input state
//   const [newsletters, setNewsletters] = useState<Newsletter[]>([]); // Type the state as an array of newsletters

//   // Fetch newsletters from the database
//   useEffect(() => {
//     const fetchNewsletters = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`); // API endpoint to fetch newsletters
//         setNewsletters(response.data); // Set newsletters from the API response
//       } catch (error) {
//         console.error("Error fetching newsletters:", error);
//       }
//     };
//     fetchNewsletters();
//   }, []);

//   const handleModalClose = () => setShowModal(false); // Close the modal
//   const handleModalShow = () => setShowModal(true); // Open the modal

//   const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setSubject(e.target.value); // Handle subject change
//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
//     setDescription(e.target.value); // Handle description change

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Handle form submission (e.g., saving the newsletter)
//     const newsletterData = {
//       subject,
//       description,
//       authorId: 1, // Assuming 1 is the admin's user ID
//     };

//     try {
//       // Call API to create a new newsletter
//       await axios.post(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`, newsletterData);
//       // Close the modal after submission
//       setShowModal(false);
//       // Refresh the newsletter list after creation
//       const response = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`);
//       setNewsletters(response.data);
//     } catch (error) {
//       console.error("Error creating newsletter:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>News Letters</h1>
//       <Link to="/Admin">Home</Link>

//       <div className={styles.modalButton}>
//         <Button variant="primary" onClick={handleModalShow}>
//           Create a New Newsletter
//         </Button>
//       </div>

//       {/* Modal for creating a newsletter */}
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title className={styles.modalTitle}>
//             Create A News Letter
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className={styles.modalContent}>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="subject" className={styles.formGroup}>
//               <Form.Label className={styles.formLabel}>Subject</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter subject"
//                 value={subject}
//                 onChange={handleSubjectChange}
//                 className={styles.formInput}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="description" className={styles.formGroup}>
//               <Form.Label className={styles.formLabel}>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={handleDescriptionChange}
//                 className={styles.formTextArea}
//                 required
//               />
//             </Form.Group>

//             <div className={styles.formActions}>
//               <Button variant="secondary" onClick={handleModalClose}>
//                 Close
//               </Button>
//               <Button variant="primary" type="submit">
//                 Create
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Display the list of newsletters */}
//       <div className={styles.newsletterList}>
//         <h2>Existing Newsletters</h2>
//         <ul className={styles.newsletterItems}>
//           {newsletters.map((newsletter) => (
//             <li key={newsletter.id} className={styles.newsletterItem}>
//               <div>
//                 <strong>Subject:</strong> {newsletter.subject}
//               </div>
//               <div>
//                 <strong>Description:</strong> {newsletter.description}
//               </div>
//               <div>
//                 <strong>Author:</strong> Admin
//               </div>
//               {/* You can also add additional fields like published date, etc. */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default NewsLetters;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import styles from "./NewsLetters.module.css";

interface Newsletter {
  id: number;
  subject: string;
  description: string;
  authorId: number;
  archived?: boolean;
  important?: boolean;
}

const NewsLetters: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [error, setError] = useState(""); // Error messages

  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false); // Loading for form submit

  // Fetch newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`
        );
        setNewsletters(response.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load newsletters.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  // Modal handlers
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    if (!submitting) {
      setShowModal(false);
      setSubject("");
      setDescription("");
    }
  };

  // Form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`,
        { subject, description, authorId: 1 }
      );
      // Refresh newsletter list
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`
      );
      setNewsletters(response.data || []);
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Failed to create newsletter.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Newsletters</h1>
        <Link to="/Admin" className={styles.homeLink}>
          Back Home
        </Link>
      </div>

      <div className={styles.createButtonWrapper}>
        <Button variant="primary" onClick={openModal}>
          Create New Newsletter
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a Newsletter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={closeModal} disabled={submitting}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" /> Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Newsletter List */}
      <div className={styles.listWrapper}>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner animation="border" /> Loading newsletters...
          </div>
        ) : newsletters.length === 0 ? (
          <p>No newsletters found.</p>
        ) : (
          <div className={styles.newsletterGrid}>
            {newsletters.map((n) => (
              <div key={n.id} className={styles.newsletterCard}>
                <h3>{n.subject}</h3>
                <p>{n.description}</p>
                <p>
                  <strong>Author:</strong> Admin
                </p>
                {n.archived && <span className={styles.badgeArchived}>Archived</span>}
                {n.important && <span className={styles.badgeImportant}>Important</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetters;
