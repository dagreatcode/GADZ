import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserProfile.module.css"; // Import your CSS styles

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  interface Load {
    id: number; // or string, depending on your database schema
    description: string;
    company: string;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, loadsRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/user/view/${userId}`),
          axios.get(`http://localhost:3001/api/loads/user/${userId}`), // Ensure this hits the new route
        ]);

        setUserData({
          ...userRes.data,
          loads: Array.isArray(loadsRes.data) ? loadsRes.data : [], // Make sure loads is an array
        });
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        setError("Failed to load user profile data.");
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
          Customer Since: {new Date(userData.availableFrom).toLocaleDateString()}
        </h2>
        <h2>Type of Owner: {userData.userType}</h2>
        <h2>
          All Services Available: {userData.loadReferences ? userData.loadReferences.split(",") : "None"}
        </h2>
        <h2>
          Locations: {userData.location ? userData.location.split(",") : "None"}
        </h2>
        <h2>Phone Number: {userData.phoneNumber || "Not provided"}</h2>
        <h2>Address: {userData.address || "Not provided"}</h2>
        <h2>
          Loads ({userData.loads.length}): {Array.isArray(userData.loads) && userData.loads.length > 0 ? (
            userData.loads.map((load: Load) => (
              <div key={load.id} className={styles.loadItem}>
                <h3>{load.description}</h3>
                <p>Company: {load.company}</p>
              </div>
            ))
          ) : "None"}
        </h2>
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
        <Link to={`/MessageUser/${userId}`} className={styles.button}>
          Message User
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
