import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserProfile.module.css";

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  interface Load {
    id: number;
    loadId: string; // Add loadId property
    description: string;
    company: string;
  }

  interface Driver {
    id: number;
    driverId: string; // Add driverId property
    name: string;
    experience: string;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, loadsRes, driversRes] = await Promise.all([
          axios.get(`${ServerPort}/api/user/view/${userId}`),
          axios.get(`${ServerPort}/api/loads/user/${userId}`),
          axios.get(`${ServerPort}/api/drivers/user/${userId}`),
        ]);

        setUserData({
          ...userRes.data,
          loads: Array.isArray(loadsRes.data) ? loadsRes.data : [],
          drivers: Array.isArray(driversRes.data) ? driversRes.data : [],
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
    <div className={styles.userProfileContainer}>
      <h1>User Profile</h1>
      <div className={styles.contentWrapper}>
        {/* Loads Section on the Left */}
        <div className={styles.loadsSection}>
          <h2>Loads ({userData.loads.length}):</h2>
          {Array.isArray(userData.loads) && userData.loads.length > 0 ? (
            userData.loads.map((load: Load) => (
              <div key={load.id} className={styles.loadItem}>
                <h3>{load.description}</h3>
                <p>Company: {load.company}</p>
                <p>Load ID: {load.id}</p> {/* Display loadId */}
                <Link to={`/UserProfile/${userData.userId}`} className={styles.loadLink}>
                  View Driver Profile
                </Link>
              </div>
            ))
          ) : (
            <p>No loads available</p>
          )}
        </div>

        {/* Driver Details Section on the Right */}
        <div className={styles.profileSection}>
          <h2>Available Status: {userData.loadStatus}</h2>
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
        </div>

        {/* Drivers Section in the Third Column */}
        <div className={styles.driversSection}>
          <h2>Drivers ({userData.drivers.length}):</h2>
          {Array.isArray(userData.drivers) && userData.drivers.length > 0 ? (
            userData.drivers.map((driver: Driver) => (
              <div key={driver.id} className={styles.driverItem}>
                <h3>{driver.name}</h3>
                <p>Experience: {driver.experience}</p>
                <p>Driver ID: {driver.id}</p> {/* Display driverId */}
              </div>
            ))
          ) : (
            <p>No drivers available</p>
          )}
        </div>
      </div>

      {/* "Add Business" Button */}
      <button
        className={styles.button}
        onClick={() => console.log("Business added!")}
      >
        Add Business
      </button>

      {/* Navigation buttons */}
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
