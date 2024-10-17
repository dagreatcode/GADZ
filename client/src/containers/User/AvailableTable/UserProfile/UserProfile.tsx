import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserProfile.module.css"; // Create a separate CSS file for styles

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/user/view/${userId}`
        );
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className={styles.loading}>Loading user profile...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.userProfile}>
      <h1>User Profile</h1>
      <div className={styles.profileSection}>
        <h2>Available Status: {userData.loadStatus}</h2>
        <h2>Images:</h2>
        {userData.qrPNG && (
          <img
            src={userData.qrPNG}
            alt={`${userData.firstName} ${userData.lastName}`}
            className={styles.profileImage}
          />
        )}
        <h2>
          Name: {userData.firstName} {userData.lastName}
        </h2>
        <h2>
          Customer Since:{" "}
          {new Date(userData.availableFrom).toLocaleDateString()}
        </h2>
        <h2>Type of Owner: {userData.userType}</h2>
        <h2>
          All Services Available:{" "}
          {userData.loadReferences
            ? userData.loadReferences.split(",")
            : "None"}
        </h2>
        <h2>
          Locations: {userData.location ? userData.location.split(",") : "None"}
        </h2>
        <h2>Phone Number: {userData.phoneNumber || "Not provided"}</h2>
        <h2>Address: {userData.address || "Not provided"}</h2>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          /* Function to save business */
        }}
      >
        Add Business
      </button>
      <div className={styles.buttonContainer}>
        <Link to="/AvailableTable" className={styles.button}>
          Home
        </Link>
        <Link to={`/MessageUser`} className={styles.button}>
        {/* <Link to={`/MessageUser/${userId}`} className={styles.button}> */}
          Message User
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
