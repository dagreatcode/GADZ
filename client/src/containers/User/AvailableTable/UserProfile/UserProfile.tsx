// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./UserProfile.module.css";

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const UserProfile = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   interface Load {
//     id: number;
//     loadId: string; // Add loadId property
//     description: string;
//     company: string;
//   }

//   interface Driver {
//     id: number;
//     driverId: string; // Add driverId property
//     name: string;
//     experience: string;
//   }

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const [userRes, loadsRes, driversRes] = await Promise.all([
//           axios.get(`${ServerPort}/api/user/view/${userId}`),
//           axios.get(`${ServerPort}/api/loads/user/${userId}`),
//           axios.get(`${ServerPort}/api/drivers/user/${userId}`),
//         ]);

//         setUserData({
//           ...userRes.data,
//           loads: Array.isArray(loadsRes.data) ? loadsRes.data : [],
//           drivers: Array.isArray(driversRes.data) ? driversRes.data : [],
//         });
//       } catch (error) {
//         console.error("Error fetching user profile data:", error);
//         setError("Failed to load user profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   if (loading) {
//     return <div className={styles.loading}>Loading user profile...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   return (
//     <div className={styles.userProfileContainer}>
//       <h1>User Profile</h1>
//       <div className={styles.contentWrapper}>
//         {/* Loads Section on the Left */}
//         <div className={styles.loadsSection}>
//           <h2>Loads ({userData.loads.length}):</h2>
//           {Array.isArray(userData.loads) && userData.loads.length > 0 ? (
//             userData.loads.map((load: Load) => (
//               <div key={load.id} className={styles.loadItem}>
//                 <h3>{load.description}</h3>
//                 <p>Company: {load.company}</p>
//                 <p>Load ID: {load.id}</p> {/* Display loadId */}
//                 <Link to={`/UserProfile/${userData.userId}`} className={styles.loadLink}>
//                   View Driver Profile
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p>No loads available</p>
//           )}
//         </div>

//         {/* Driver Details Section on the Right */}
//         <div className={styles.profileSection}>
//           <h2>Available Status: {userData.loadStatus}</h2>
//           {userData.qrPNG && (
//             <img
//               src={userData.qrPNG}
//               alt={`${userData.firstName} ${userData.lastName}`}
//               className={styles.profileImage}
//             />
//           )}
//           <h2>
//             Name: {userData.firstName} {userData.lastName}
//           </h2>
//           <h2>
//             Customer Since: {new Date(userData.availableFrom).toLocaleDateString()}
//           </h2>
//           <h2>Type of Owner: {userData.userType}</h2>
//           <h2>
//             All Services Available: {userData.loadReferences ? userData.loadReferences.split(",") : "None"}
//           </h2>
//           <h2>
//             Locations: {userData.location ? userData.location.split(",") : "None"}
//           </h2>
//           <h2>Phone Number: {userData.phoneNumber || "Not provided"}</h2>
//           <h2>Address: {userData.address || "Not provided"}</h2>
//         </div>

//         {/* Drivers Section in the Third Column */}
//         <div className={styles.driversSection}>
//           <h2>Drivers ({userData.drivers.length}):</h2>
//           {Array.isArray(userData.drivers) && userData.drivers.length > 0 ? (
//             userData.drivers.map((driver: Driver) => (
//               <div key={driver.id} className={styles.driverItem}>
//                 <h3>{driver.name}</h3>
//                 <p>Experience: {driver.experience}</p>
//                 <p>Driver ID: {driver.id}</p> {/* Display driverId */}
//               </div>
//             ))
//           ) : (
//             <p>No drivers available</p>
//           )}
//         </div>
//       </div>

//       {/* "Add Business" Button */}
//       <button
//         className={styles.button}
//         onClick={() => console.log("Business added!")}
//       >
//         Add Business
//       </button>

//       {/* Navigation buttons */}
//       <div className={styles.buttonContainer}>
//         <Link to="/AvailableTable" className={styles.button}>
//           Home
//         </Link>
//         <Link to={`/MessageUser/${userId}`} className={styles.button}>
//           Message User
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./UserProfile.module.css";

// const SERVER_PORT = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// interface Load {
//   id: number;
//   loadId: string;
//   description: string;
//   company: string;
// }

// interface Driver {
//   id: number;
//   driverId: string;
//   name: string;
//   experience: string;
// }

// interface UserData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber?: string;
//   address?: string;
//   loadStatus?: string;
//   availableFrom?: string;
//   userType?: string;
//   loadReferences?: string;
//   location?: string;
//   qrPNG?: string;
//   loads: Load[];
//   drivers: Driver[];
// }

// const UserProfile: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!userId) {
//       setError("User ID not provided in URL.");
//       setLoading(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const [userRes, loadsRes, driversRes] = await Promise.all([
//           axios.get(`${SERVER_PORT}/api/user/view/${userId}`),
//           axios.get(`${SERVER_PORT}/api/loads/user/${userId}`),
//           axios.get(`${SERVER_PORT}/api/drivers/user/${userId}`),
//         ]);

//         setUserData({
//           ...userRes.data,
//           loads: Array.isArray(loadsRes.data) ? loadsRes.data : [],
//           drivers: Array.isArray(driversRes.data) ? driversRes.data : [],
//         });
//       } catch (err) {
//         console.error("Error fetching user profile data:", err);
//         setError("Failed to load user profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   if (loading) return <div className={styles.loading}>Loading user profile...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;
//   if (!userData) return <div className={styles.error}>No user data available.</div>;

//   const {
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     address,
//     loadStatus,
//     availableFrom,
//     userType,
//     loadReferences,
//     location,
//     qrPNG,
//     loads,
//     drivers,
//   } = userData;

//   return (
//     <div className={styles.userProfileContainer}>
//       <h1>User Profile</h1>
//       <div className={styles.contentWrapper}>
//         {/* Loads Section */}
//         <div className={styles.loadsSection}>
//           <h2>Loads ({loads.length})</h2>
//           {loads.length > 0 ? (
//             loads.map((load) => (
//               <div key={load.id} className={styles.loadItem}>
//                 <h3>{load.description}</h3>
//                 <p>Company: {load.company}</p>
//                 <p>Load ID: {load.loadId}</p>
//                 <Link to={`/UserProfile/${userId}`} className={styles.loadLink}>
//                   View Load Details
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p>No loads available</p>
//           )}
//         </div>

//         {/* User Profile Section */}
//         <div className={styles.profileSection}>
//           {qrPNG && (
//             <img
//               src={qrPNG}
//               alt={`${firstName} ${lastName}`}
//               className={styles.profileImage}
//             />
//           )}
//           <h2>{firstName} {lastName}</h2>
//           <p><strong>Email:</strong> {email}</p>
//           <p><strong>Phone:</strong> {phoneNumber || "Not provided"}</p>
//           <p><strong>Address:</strong> {address || "Not provided"}</p>
//           <p><strong>Status:</strong> {loadStatus || "N/A"}</p>
//           <p><strong>Customer Since:</strong> {availableFrom ? new Date(availableFrom).toLocaleDateString() : "N/A"}</p>
//           <p><strong>Type of Owner:</strong> {userType || "N/A"}</p>
//           <p><strong>Services:</strong> {loadReferences ? loadReferences.split(",").join(", ") : "None"}</p>
//           <p><strong>Locations:</strong> {location ? location.split(",").join(", ") : "None"}</p>
//         </div>

//         {/* Drivers Section */}
//         <div className={styles.driversSection}>
//           <h2>Drivers ({drivers.length})</h2>
//           {drivers.length > 0 ? (
//             drivers.map((driver) => (
//               <div key={driver.id} className={styles.driverItem}>
//                 <h3>{driver.name}</h3>
//                 <p>Experience: {driver.experience}</p>
//                 <p>Driver ID: {driver.driverId}</p>
//               </div>
//             ))
//           ) : (
//             <p>No drivers available</p>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => console.log("Business added!")}>
//           Add Business
//         </button>
//         <Link to="/AvailableTable" className={styles.button}>Home</Link>
//         <Link to={`/MessageUser/${userId}`} className={styles.button}>Message User</Link>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./UserProfile.module.css";

const SERVER_PORT =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

interface Load {
  id: number;
  loadId: string;
  description: string;
  company: string;
}

interface Driver {
  id: number;
  driverId: string;
  name: string;
  experience: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  loadStatus?: string;
  availableFrom?: string;
  userType?: string;
  experienceLevel?: string;
  preferredLoadType?: string;
  company?: string;
  subscribed?: boolean;
  rating?: number;
  profileImage?: string;
  loadDetails?: Load[];
  drivers?: Driver[];
  loadReferences?: string;
  location?: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, loadsRes, driversRes] = await Promise.all([
          axios.get(`${SERVER_PORT}/api/user/view/${userId}`),
          axios.get(`${SERVER_PORT}/api/loads/user/${userId}`),
          axios.get(`${SERVER_PORT}/api/drivers/user/${userId}`),
        ]);

        setUserData({
          ...userRes.data,
          loadDetails: Array.isArray(loadsRes.data) ? loadsRes.data : [],
          drivers: Array.isArray(driversRes.data) ? driversRes.data : [],
        });
      } catch (err) {
        console.error("Error fetching user profile data:", err);
        setError("Failed to load user profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div className={styles.loading}>Loading user profile...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!userData) return <div className={styles.error}>No user data available.</div>;

  const loads = userData.loadDetails || [];
  const drivers = userData.drivers || [];

  return (
    <div className={styles.userProfileContainer}>
      {/* Profile Header */}
      <div className={styles.profileHeader}>
        {userData.profileImage && (
          <img
            src={userData.profileImage}
            alt={`${userData.firstName} ${userData.lastName}`}
            className={styles.profileImage}
          />
        )}
        <div className={styles.profileName}>
          <h1>{userData.firstName} {userData.lastName}</h1>
          <p>Customer Since: {userData.availableFrom ? new Date(userData.availableFrom).toLocaleDateString() : "N/A"}</p>
          <p>Type of Owner: {userData.userType || "N/A"}</p>
        </div>
      </div>

      {/* User Info */}
      <section className={styles.userInfoSection}>
        <h2>User Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}><strong>Email:</strong> {userData.email}</div>
          <div className={styles.infoCard}><strong>Phone:</strong> {userData.phoneNumber || "Not provided"}</div>
          <div className={styles.infoCard}><strong>Address:</strong> {userData.address || "Not provided"}</div>
          <div className={styles.infoCard}><strong>Status:</strong> {userData.loadStatus || "N/A"}</div>
          <div className={styles.infoCard}><strong>Experience Level:</strong> {userData.experienceLevel || "N/A"}</div>
          <div className={styles.infoCard}><strong>Preferred Load:</strong> {userData.preferredLoadType || "N/A"}</div>
          <div className={styles.infoCard}><strong>Company:</strong> {userData.company || "N/A"}</div>
          <div className={styles.infoCard}><strong>Subscribed:</strong> {userData.subscribed ? "Yes" : "No"}</div>
          <div className={styles.infoCard}><strong>Rating:</strong> {userData.rating || "N/A"}</div>
          <div className={styles.infoCard}><strong>Services:</strong> {userData.loadReferences ? userData.loadReferences.split(",").join(", ") : "None"}</div>
          <div className={styles.infoCard}><strong>Locations:</strong> {userData.location ? userData.location.split(",").join(", ") : "None"}</div>
        </div>
      </section>

      {/* Loads and Drivers Sections */}
      <div className={styles.sectionsWrapper}>
        {/* Loads Section */}
        <div className={styles.loadsSection}>
          <h2>Loads ({loads.length})</h2>
          {loads.length > 0 ? (
            loads.map((load) => (
              <div key={load.id} className={styles.loadItem}>
                <h3>{load.description}</h3>
                <p><strong>Company:</strong> {load.company}</p>
                <p><strong>Load ID:</strong> {load.loadId || load.id}</p>
                <Link to={`/UserProfile/${userId}`} className={styles.loadLink}>
                  View Driver Profile
                </Link>
              </div>
            ))
          ) : (
            <p>No loads available</p>
          )}
        </div>

        {/* Drivers Section */}
        <div className={styles.driversSection}>
          <h2>Drivers ({drivers.length})</h2>
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <div key={driver.id} className={styles.driverItem}>
                <h3>{driver.name}</h3>
                <p><strong>Experience:</strong> {driver.experience}</p>
                <p><strong>Driver ID:</strong> {driver.driverId || driver.id}</p>
                <Link to={`/UserProfile/${driver.driverId}`} className={styles.loadLink}>
                  View Driver Profile
                </Link>
              </div>
            ))
          ) : (
            <p>No drivers available</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
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
