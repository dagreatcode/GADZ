// LoadSearchModal.tsx

import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import styles from "./LoadSearchModal.module.css"; // Create a CSS module specific to this modal

Modal.setAppElement("#root"); // Set the root element for accessibility

// Define interface for form data and props
interface LoadSearchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoadSearchModal: React.FC<LoadSearchModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [formData, setFormData] = useState({
    originCity: "",
    originState: "",
    radius: "",
    destinationType: "",
    equipmentTypes: "",
    minWeight: "",
    maxMileage: "",
    pickupDate: "",
    companyRating: "",
    modifiedStartDate: "",
    modifiedEndDate: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sample data for auto-filling
  const sampleData = {
    originCity: "Chicago",
    originState: "IL",
    radius: "100",
    destinationType: "Terminal",
    equipmentTypes: "Flatbed",
    minWeight: "1000",
    maxMileage: "500",
    pickupDate: "2024-11-15",
    companyRating: "A",
    modifiedStartDate: "2024-11-01",
    modifiedEndDate: "2024-11-30",
    
  };

  // Autofill the form with sample data
  const handleAutoFill = () => {
    setFormData(sampleData);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Fetch loadboard data based on form data
  const fetch123LoadboardDataInForm = async (authCode: string) => {
    try {
      const response = await axios.post(
        `/api/load-search?code=${authCode}`,
        formData,
        {
          headers: {
            "123LB-Correlation-Id": "123GADZ",
            "Content-Type": "application/json",
            "123LB-Api-Version": "1.3",
            "User-Agent": `${process.env.USER_AGENT}`,
            "123LB-AID": "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
            Authorization: `Bearer ${authCode}`,
          },
        }
      );

      if (response.status === 200) {
        setResponseData(response.data); // Set API response data
        setSuccess(true); // Show success
        setError(null); // Clear errors
        onRequestClose(); // Close modal on success
      } else {
        setError("Failed to fetch load data");
        setSuccess(false);
      }
    } catch (error) {
      setError("An error occurred while fetching load data");
      setSuccess(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authCode = new URLSearchParams(window.location.search).get("code");
    fetch123LoadboardDataInForm(authCode || "");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <h2>Fill Out Load Search Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="originCity"
          placeholder="Origin City"
          value={formData.originCity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="originState"
          placeholder="Origin State"
          value={formData.originState}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="radius"
          placeholder="Radius"
          value={formData.radius}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="destinationType"
          placeholder="Destination Type"
          value={formData.destinationType}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="equipmentTypes"
          placeholder="Equipment Types"
          value={formData.equipmentTypes}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="minWeight"
          placeholder="Min Weight"
          value={formData.minWeight}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="maxMileage"
          placeholder="Max Mileage"
          value={formData.maxMileage}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="pickupDate"
          placeholder="Pickup Date"
          value={formData.pickupDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="companyRating"
          placeholder="Company Rating"
          value={formData.companyRating}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="modifiedStartDate"
          placeholder="Modified Start Date"
          value={formData.modifiedStartDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="modifiedEndDate"
          placeholder="Modified End Date"
          value={formData.modifiedEndDate}
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={handleAutoFill}
          className={styles.autoFillButton}
        >
          Autofill Sample Data
        </button>
        <button type="submit" className={styles.submitButton}>
          Fetch 123Loadboard Data
        </button>
      </form>
      <button onClick={onRequestClose} className={styles.closeButton}>
        Close
      </button>

      {/* Display success message or error message */}
      <div className={styles.responseContainer}>
        {success && (
          <p className={styles.success}>Data fetched successfully!</p>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {responseData && (
          <pre className={styles.responseData}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        )}
      </div>
    </Modal>
  );
};

export default LoadSearchModal;
