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

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
// import axios from "axios";
// import styles from "./NewsLetters.module.css";

// interface Newsletter {
//   id: number;
//   subject: string;
//   description: string;
//   authorId: number;
//   archived: boolean;
//   important: boolean;
// }

// const NewsLetters: React.FC = () => {
//   const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch newsletters
//   const fetchNewsletters = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`
//       );
//       setNewsletters(response.data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load newsletters.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNewsletters();
//   }, []);

//   // Modal handlers
//   const openModal = () => setShowModal(true);
//   const closeModal = () => {
//     if (!submitting) {
//       setShowModal(false);
//       setSubject("");
//       setDescription("");
//     }
//   };

//   // Create newsletter
//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`,
//         { subject, description, authorId: 1 }
//       );
//       await fetchNewsletters();
//       closeModal();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to create newsletter.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Archive/unarchive newsletter
//   const toggleArchive = async (id: number, current: boolean) => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/archive/${id}`,
//         { archived: !current }
//       );
//       setNewsletters((prev) =>
//         prev.map((n) =>
//           n.id === id ? { ...n, archived: !current } : n
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update newsletter.");
//     }
//   };

//   // Delete newsletter
//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this newsletter?")) return;
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay/${id}`
//       );
//       setNewsletters((prev) => prev.filter((n) => n.id !== id));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete newsletter.");
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.header}>
//         <h1>Newsletters</h1>
//         <Link to="/Admin" className={styles.homeLink}>
//           Back Home
//         </Link>
//       </div>

//       <div className={styles.createButtonWrapper}>
//         <Button variant="primary" onClick={openModal}>
//           Create New Newsletter
//         </Button>
//       </div>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* Loading */}
//       {loading ? (
//         <div className={styles.spinner}>
//           <Spinner animation="border" /> Loading newsletters...
//         </div>
//       ) : (
//         <div className={styles.newsletterGrid}>
//           {newsletters.length === 0 ? (
//             <p>No newsletters found.</p>
//           ) : (
//             newsletters.map((n) => (
//               <div key={n.id} className={styles.newsletterCard}>
//                 <h3>{n.subject}</h3>
//                 <p>{n.description}</p>
//                 <p><strong>Author:</strong> Admin</p>
//                 <div className={styles.cardActions}>
//                   <Button
//                     variant={n.archived ? "success" : "warning"}
//                     size="sm"
//                     onClick={() => toggleArchive(n.id, n.archived)}
//                   >
//                     {n.archived ? "Unarchive" : "Archive"}
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(n.id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//                 {n.archived && <span className={styles.badgeArchived}>Archived</span>}
//                 {n.important && <span className={styles.badgeImportant}>Important</span>}
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Modal */}
//       <Modal show={showModal} onHide={closeModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create a Newsletter</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="subject">
//               <Form.Label>Subject</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group controlId="description" className="mt-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <div className="mt-4 d-flex justify-content-end gap-2">
//               <Button variant="secondary" onClick={closeModal} disabled={submitting}>
//                 Close
//               </Button>
//               <Button variant="primary" type="submit" disabled={submitting}>
//                 {submitting ? (
//                   <>
//                     <Spinner animation="border" size="sm" /> Creating...
//                   </>
//                 ) : (
//                   "Create"
//                 )}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default NewsLetters;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
// import axios from "axios";
// import styles from "./NewsLetters.module.css";

// interface Newsletter {
//   id: number;
//   subject: string;
//   description: string;
//   authorId: number;
//   archived: boolean;
//   important: boolean;
// }

// const NewsLetters: React.FC = () => {
//   const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   // Fetch all newsletters
//   const fetchNewsletters = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`
//       );
//       setNewsletters(response.data);
//     } catch (err) {
//       console.error("Error fetching newsletters:", err);
//       setError("Failed to load newsletters.");
//     }
//   };

//   useEffect(() => {
//     fetchNewsletters();
//   }, []);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setSubject("");
//     setDescription("");
//     setError("");
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay`,
//         { subject, description, authorId: 1 }
//       );
//       setShowModal(false); // Close modal immediately
//       setSubject("");
//       setDescription("");
//       await fetchNewsletters(); // Refresh newsletter list
//     } catch (err) {
//       console.error(err);
//       setError("Failed to create newsletter. Check console for details.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleArchiveToggle = async (id: number, archived: boolean) => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/archive/${id}`,
//         { archived: !archived }
//       );
//       setNewsletters((prev) =>
//         prev.map((n) =>
//           n.id === id ? { ...n, archived: !archived } : n
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update archive status.");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this newsletter?")) return;
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/newsletter/pay/${id}`
//       );
//       setNewsletters((prev) => prev.filter((n) => n.id !== id));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete newsletter.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Newsletters</h1>
//         <Link to="/Admin" className={styles.homeLink}>
//           Back to Admin
//         </Link>
//       </div>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <div className={styles.modalButton}>
//         <Button variant="primary" onClick={() => setShowModal(true)}>
//           Create New Newsletter
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleModalClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Newsletter</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group className="mb-3" controlId="subject">
//               <Form.Label>Subject</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-end gap-2">
//               <Button
//                 variant="secondary"
//                 onClick={handleModalClose}
//                 disabled={submitting}
//               >
//                 Close
//               </Button>
//               <Button variant="primary" type="submit" disabled={submitting}>
//                 {submitting ? <Spinner animation="border" size="sm" /> : "Create"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Newsletter List */}
//       <div className={styles.newsletterList}>
//         {newsletters.length === 0 ? (
//           <p>No newsletters found.</p>
//         ) : (
//           <table className={styles.newsletterTable}>
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Description</th>
//                 <th>Author</th>
//                 <th>Archived</th>
//                 <th>Important</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {newsletters.map((n) => (
//                 <tr key={n.id}>
//                   <td>{n.subject}</td>
//                   <td>{n.description}</td>
//                   <td>Admin</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant={n.archived ? "warning" : "success"}
//                       onClick={() => handleArchiveToggle(n.id, n.archived)}
//                     >
//                       {n.archived ? "Archived" : "Active"}
//                     </Button>
//                   </td>
//                   <td>{n.important ? "Yes" : "No"}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant="danger"
//                       onClick={() => handleDelete(n.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsLetters;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import styles from "./NewsLetters.module.css";

interface Newsletter {
  id: number;
  subject: string;
  description: string;
  authorId: number;
  archived: boolean;
  important: boolean;
}

function NewsLetters() {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  // Fetch newsletters
  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/newsletter/pay`);
      setNewsletters(response.data);
    } catch (err) {
      console.error("Error fetching newsletters:", err);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await axios.post(`${API_URL}/api/newsletter/pay`, {
        subject,
        description,
        authorId: 1, // Admin
      });
      setShowModal(false);
      setSubject("");
      setDescription("");
      await fetchNewsletters();
    } catch (err) {
      console.error(err);
      setError("Failed to create newsletter. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleArchive = async (id: number, current: boolean) => {
    try {
      await axios.put(`${API_URL}/api/newsletter/archive/${id}`, {
        archived: !current,
      });
      setNewsletters((prev) =>
        prev.map((n) => (n.id === id ? { ...n, archived: !current } : n))
      );
    } catch (err) {
      console.error("Error toggling archive:", err);
    }
  };

  const deleteNewsletter = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this newsletter?")) return;
    try {
      await axios.delete(`${API_URL}/api/newsletter/delete/${id}`);
      setNewsletters((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error deleting newsletter:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Newsletters Admin Panel</h1>
      <Link to="/Admin" className={styles.homeLink}>
        Back Home
      </Link>

      <div className={styles.modalButton}>
        <Button variant="primary" onClick={handleModalShow}>
          Create a New Newsletter
        </Button>
      </div>

      {/* Create Newsletter Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a Newsletter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className={styles.error}>{error}</div>}
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

            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleModalClose} className="me-2">
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? <Spinner animation="border" size="sm" /> : "Create"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Existing Newsletters */}
      <div className={styles.newsletterList}>
        <h2>Existing Newsletters</h2>
        {newsletters.length === 0 ? (
          <p>No newsletters found.</p>
        ) : (
          <ul className={styles.newsletterItems}>
            {newsletters.map((newsletter) => (
              <li key={newsletter.id} className={styles.newsletterItem}>
                <div>
                  <strong>Subject:</strong> {newsletter.subject}
                </div>
                <div>
                  <strong>Description:</strong> {newsletter.description}
                </div>
                <div>
                  <strong>Author:</strong> Admin
                </div>
                <div className={styles.actions}>
                  <Button
                    variant={newsletter.archived ? "success" : "warning"}
                    size="sm"
                    onClick={() => toggleArchive(newsletter.id, newsletter.archived)}
                  >
                    {newsletter.archived ? "Unarchive" : "Archive"}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => deleteNewsletter(newsletter.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NewsLetters;
