// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./AvailableTable.module.css";
// import GADZTruck from "./GADZBoat.png";
// import Table from "./Table"; 

// // Types
// interface Load {
//   numberOfLoads: number;
//   pickupDateTimes: number;
//   equipmentInfo: string;
//   privateLoadNote: string;
//   status: string;
//   deliveryDateTimeUtc: number;
//   mileage: number;
//   numberOfStops: number;
//   id: number;
//   description: string;
//   company: string;
//   userId: string;
// }

// interface Driver {
//   description: string;
//   company: string;
//   userId: string;
// }

// interface LoadboardData {
//   loads: Load[];
// }

// const AvailableTable: React.FC = () => {
//   const [loads, setLoads] = useState<Load[]>([]);
//   const [userLoads, setUserLoads] = useState<Load[]>([]);
//   const [loadboardData, setLoadboardData] = useState<Load[]>([]);
//   const [newLoad, setNewLoad] = useState<Load>({
//     id: 0,
//     numberOfLoads: 0,
//     pickupDateTimes: 0,
//     equipmentInfo: "",
//     privateLoadNote: "",
//     status: "",
//     deliveryDateTimeUtc: 0,
//     mileage: 0,
//     numberOfStops: 0,
//     description: "",
//     company: "",
//     userId: "",
//   });
//   const [newDriver, setNewDriver] = useState<Driver>({
//     description: "",
//     company: "",
//     userId: "",
//   });
//   const [driverList, setDriverList] = useState<Driver[]>([]);
//   const [userDrivers, setUserDrivers] = useState<Driver[]>([]);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const code = queryParams.get("code");

//   useEffect(() => {
//     if (code) {
//       fetchLoadboardData(code);
//     }
//   }, [code]);

//   const fetchLoads = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
//       );
//       setLoads(response.data);

//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         const filteredLoads = response.data.filter(
//           (load: Load) => load.userId === userId
//         );
//         setUserLoads(filteredLoads);
//       }
//     } catch (error) {
//       console.error("Error fetching loads:", error);
//     }
//   };

//   const fetchDrivers = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`
//       );
//       setDriverList(response.data);

//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         const filteredDrivers = response.data.filter(
//           (driver: Driver) => driver.userId === userId
//         );
//         setUserDrivers(filteredDrivers);
//       }
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     }
//   };

//   const fetchLoadboardData = async (authCode: string) => {
//     try {
//       const response = await axios.get<LoadboardData>(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/`,
//         { params: { code: authCode } }
//       );
//       setLoadboardData(response.data.loads);
//     } catch (error) {
//       console.error("Error fetching 123Loadboard data:", error);
//     }
//   };

//   const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
//   };

//   const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
//   };

//   const handleSubmitLoad = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.error("User ID not found in local storage");
//       return;
//     }

//     try {
//       const requestData = { ...newLoad, userId };
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`,
//         requestData
//       );
//       setNewLoad({
//         id: 0,
//         numberOfLoads: 0,
//         pickupDateTimes: 0,
//         equipmentInfo: "",
//         privateLoadNote: "",
//         status: "",
//         deliveryDateTimeUtc: 0,
//         mileage: 0,
//         numberOfStops: 0,
//         description: "",
//         company: "",
//         userId,
//       });

//       fetchLoads();
//     } catch (error) {
//       console.error("Error creating load:", error);
//     }
//   };

//   const handleSubmitDriver = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.error("User ID not found in local storage");
//       return;
//     }

//     try {
//       const requestData = { ...newDriver, userId };
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`,
//         requestData
//       );
//       setNewDriver({ description: "", company: "", userId: "" });
//       fetchDrivers();
//     } catch (error) {
//       console.error("Error creating driver:", error);
//     }
//   };

//   const handleAuthorizeNavigation = () => {
//     const baseUrl =
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3001/api/123Loads/authorize"
//         : "https://gadzconnect.com/api/123Loads/authorize";
//     window.location.href = baseUrl;
//   };

//   return (
//     <div className={styles["at-container"]}>
//       <header className={styles["at-hero"]}>
//         <img src={GADZTruck} alt="Truck Animation" className={styles["at-truck"]} />
//         <h1 className={styles["at-title"]}>🚛 GADZConnect Load Board</h1>
//         <p className={styles["at-subtitle"]}>
//           Manage your drivers, loads, and connect with 123Loadboard seamlessly
//         </p>
//         <Link to="/User" className={styles["at-homeLink"]}>
//           Back to Dashboard
//         </Link>
//       </header>

//       {/* Drivers */}
//       <section className={styles["at-section"]}>
//         <h2>👨‍✈️ Drivers</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={fetchDrivers} className={styles["at-button"]}>
//             Fetch Drivers
//           </button>
//         </div>
//         <Table data={driverList} title="All Drivers" isUser={true} />
//         <Table
//           data={userDrivers}
//           title="Your Drivers"
//           isUser={true}
//           showCompanyLink={false}
//         />

//         <form className={styles["at-form"]} onSubmit={handleSubmitDriver}>
//           <h3>Add New Driver</h3>
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="description"
//             placeholder="Driver Description"
//             value={newDriver.description}
//             onChange={handleDriverInputChange}
//             required
//           />
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={newDriver.company}
//             onChange={handleDriverInputChange}
//             required
//           />
//           <button type="submit" className={styles["at-submitButton"]}>
//             ➕ Add Driver
//           </button>
//         </form>
//       </section>

//       {/* Loads */}
//       <section className={styles["at-section"]}>
//         <h2>📦 Loads</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={fetchLoads} className={styles["at-button"]}>
//             Fetch Loads
//           </button>
//         </div>
//         <Table data={loads} title="All Loads" isUser={false} showCompanyLink />

//         <h3>Your Loads</h3>
//         <table className={styles["at-table"]}>
//           <thead>
//             <tr>
//               <th>Load ID</th>
//               <th>Description</th>
//               <th>Company</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userLoads.map((load) => (
//               <tr key={load.id}>
//                 <td>{load.id}</td>
//                 <td>{load.description}</td>
//                 <td>
//                   <Link to={`/UserProfile/${load.userId}`} className={styles["at-link"]}>
//                     {load.company}
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <form className={styles["at-form"]} onSubmit={handleSubmitLoad}>
//           <h3>Add New Load</h3>
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="description"
//             placeholder="Load Description"
//             value={newLoad.description}
//             onChange={handleLoadInputChange}
//             required
//           />
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={newLoad.company}
//             onChange={handleLoadInputChange}
//             required
//           />
//           <button type="submit" className={styles["at-submitButton"]}>
//             ➕ Add Load
//           </button>
//         </form>
//       </section>

//       {/* 123Loadboard */}
//       <section className={styles["at-section"]}>
//         <h2>🌐 123Loadboard</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={handleAuthorizeNavigation} className={styles["at-buttonAlt"]}>
//             🔑 Authorize
//           </button>
//           <button
//             onClick={() => fetchLoadboardData(code || "")}
//             className={styles["at-button"]}
//           >
//             📥 Fetch 123Loadboard Data
//           </button>
//         </div>
//         <div className={styles["at-tableContainer"]}>
//           <table className={styles["at-table"]}>
//             <thead>
//               <tr>
//                 <th>Load ID</th>
//                 <th>Description</th>
//                 <th>Company</th>
//                 <th>Delivery</th>
//                 <th>Stops</th>
//                 <th>Mileage</th>
//                 <th># Loads</th>
//                 <th>Pickup</th>
//                 <th>Equipment</th>
//                 <th>Note</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loadboardData.map((load) => (
//                 <tr key={load.id}>
//                   <td>{load.id}</td>
//                   <td>{load.description}</td>
//                   <td>{load.company}</td>
//                   <td>{load.deliveryDateTimeUtc}</td>
//                   <td>{load.numberOfStops}</td>
//                   <td>{load.mileage}</td>
//                   <td>{load.numberOfLoads}</td>
//                   <td>{load.pickupDateTimes}</td>
//                   <td>{load.equipmentInfo}</td>
//                   <td>{load.privateLoadNote}</td>
//                   <td>{load.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AvailableTable;

// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./AvailableTable.module.css";
// import GADZTruck from "./GADZBoat.png";
// import Table from "./Table"; 

// // Types
// interface Load {
//   id: number;
//   numberOfLoads: number;
//   pickupDateTimes: number;
//   equipmentInfo: string;
//   privateLoadNote: string;
//   status: string;
//   deliveryDateTimeUtc: number;
//   mileage: number;
//   numberOfStops: number;
//   description: string;
//   company: string;
//   userId: string;
// }

// interface Driver {
//   description: string;
//   company: string;
//   userId: string;
// }

// interface LoadboardData {
//   loads: Load[];
// }

// const AvailableTable: React.FC = () => {
//   const [loads, setLoads] = useState<Load[]>([]);
//   const [userLoads, setUserLoads] = useState<Load[]>([]);
//   const [loadboardData, setLoadboardData] = useState<Load[]>([]);
//   const [newLoad, setNewLoad] = useState<Partial<Load>>({
//     description: "",
//     company: "",
//   });
//   const [newDriver, setNewDriver] = useState<Driver>({
//     description: "",
//     company: "",
//     userId: "",
//   });
//   const [driverList, setDriverList] = useState<Driver[]>([]);
//   const [userDrivers, setUserDrivers] = useState<Driver[]>([]);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const code = queryParams.get("code");

//   useEffect(() => {
//     if (code) {
//       fetchLoadboardData(code);
//     }
//   }, [code]);

//   const fetchLoads = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
//       );
//       setLoads(response.data);

//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         setUserLoads(response.data.filter((load: Load) => load.userId === userId));
//       }
//     } catch (error) {
//       console.error("Error fetching loads:", error);
//     }
//   };

//   const fetchDrivers = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`
//       );
//       setDriverList(response.data);

//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         setUserDrivers(response.data.filter((driver: Driver) => driver.userId === userId));
//       }
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     }
//   };

//   const fetchLoadboardData = async (authCode: string) => {
//     try {
//       const response = await axios.get<LoadboardData>(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/`,
//         { params: { code: authCode } }
//       );
//       setLoadboardData(response.data.loads);
//     } catch (error) {
//       console.error("Error fetching 123Loadboard data:", error);
//     }
//   };

//   // Input Handlers
//   const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
//   };

//   const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
//   };

//   // Submissions
//   const handleSubmitLoad = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     if (!userId) return console.error("User ID not found in local storage");

//     try {
//       const requestData = { ...newLoad, userId };
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`,
//         requestData
//       );

//       setNewLoad({ description: "", company: "" });
//       fetchLoads();
//     } catch (error) {
//       console.error("Error creating load:", error);
//     }
//   };

//   const handleSubmitDriver = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     if (!userId) return console.error("User ID not found in local storage");

//     try {
//       const requestData = { ...newDriver, userId };
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`,
//         requestData
//       );

//       setNewDriver({ description: "", company: "", userId: "" });
//       fetchDrivers();
//     } catch (error) {
//       console.error("Error creating driver:", error);
//     }
//   };

//   const handleAuthorizeNavigation = () => {
//     const baseUrl =
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3001/api/123Loads/authorize"
//         : "https://gadzconnect.com/api/123Loads/authorize";
//     window.location.href = baseUrl;
//   };

//   return (
//     <div className={styles["at-container"]}>
//       {/* Hero */}
//       <header className={styles["at-hero"]}>
//         <img src={GADZTruck} alt="Truck Animation" className={styles["at-truck"]} />
//         <h1 className={styles["at-title"]}>🚛 GADZConnect Load Board</h1>
//         <p className={styles["at-subtitle"]}>
//           Manage your drivers, loads, and connect with 123Loadboard seamlessly
//         </p>
//         <Link to="/User" className={styles["at-homeLink"]}>
//           Back to Dashboard
//         </Link>
//       </header>

//       {/* Drivers */}
//       <section className={styles["at-section"]}>
//         <h2>👨‍✈️ Drivers</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={fetchDrivers} className={styles["at-button"]}>
//             Fetch Drivers
//           </button>
//         </div>
//         <Table data={driverList} title="All Drivers" isUser={true} />
//         <Table data={userDrivers} title="Your Drivers" isUser={true} showCompanyLink={false} />

//         <form className={styles["at-form"]} onSubmit={handleSubmitDriver}>
//           <h3>Add New Driver</h3>
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="description"
//             placeholder="Driver Description"
//             value={newDriver.description}
//             onChange={handleDriverInputChange}
//             required
//           />
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={newDriver.company}
//             onChange={handleDriverInputChange}
//             required
//           />
//           <button type="submit" className={styles["at-submitButton"]}>
//             ➕ Add Driver
//           </button>
//         </form>
//       </section>

//       {/* Loads */}
//       <section className={styles["at-section"]}>
//         <h2>📦 Loads</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={fetchLoads} className={styles["at-button"]}>
//             Fetch Loads
//           </button>
//         </div>
//         <Table data={loads} title="All Loads" isUser={false} showCompanyLink />

//         <h3>Your Loads</h3>
//         <table className={styles["at-table"]}>
//           <thead>
//             <tr>
//               <th>Load ID</th>
//               <th>Description</th>
//               <th>Company</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userLoads.map((load) => (
//               <tr key={load.id}>
//                 <td>{load.id}</td>
//                 <td>{load.description}</td>
//                 <td>
//                   <Link to={`/UserProfile/${load.userId}`} className={styles["at-link"]}>
//                     {load.company}
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <form className={styles["at-form"]} onSubmit={handleSubmitLoad}>
//           <h3>Add New Load</h3>
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="description"
//             placeholder="Load Description"
//             value={newLoad.description || ""}
//             onChange={handleLoadInputChange}
//             required
//           />
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={newLoad.company || ""}
//             onChange={handleLoadInputChange}
//             required
//           />
//           <button type="submit" className={styles["at-submitButton"]}>
//             ➕ Add Load
//           </button>
//         </form>
//       </section>

//       {/* 123Loadboard */}
//       <section className={styles["at-section"]}>
//         <h2>🌐 123Loadboard</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={handleAuthorizeNavigation} className={styles["at-buttonAlt"]}>
//             🔑 Authorize
//           </button>
//           <button
//             onClick={() => fetchLoadboardData(code || "")}
//             className={styles["at-button"]}
//           >
//             📥 Fetch 123Loadboard Data
//           </button>
//         </div>
//         <div className={styles["at-tableContainer"]}>
//           <table className={styles["at-table"]}>
//             <thead>
//               <tr>
//                 <th>Load ID</th>
//                 <th>Description</th>
//                 <th>Company</th>
//                 <th>Delivery</th>
//                 <th>Stops</th>
//                 <th>Mileage</th>
//                 <th># Loads</th>
//                 <th>Pickup</th>
//                 <th>Equipment</th>
//                 <th>Note</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loadboardData.map((load) => (
//                 <tr key={load.id}>
//                   <td>{load.id}</td>
//                   <td>{load.description}</td>
//                   <td>{load.company}</td>
//                   <td>{load.deliveryDateTimeUtc}</td>
//                   <td>{load.numberOfStops}</td>
//                   <td>{load.mileage}</td>
//                   <td>{load.numberOfLoads}</td>
//                   <td>{load.pickupDateTimes}</td>
//                   <td>{load.equipmentInfo}</td>
//                   <td>{load.privateLoadNote}</td>
//                   <td>{load.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AvailableTable;

// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./AvailableTable.module.css";
// import GADZTruck from "./GADZBoat.png";
// import Table from "./Table";

// // Types
// interface Load {
//   numberOfLoads: number;
//   pickupDateTimes: number;
//   equipmentInfo: string;
//   privateLoadNote: string;
//   status: string;
//   deliveryDateTimeUtc: number;
//   mileage: number;
//   numberOfStops: number;
//   id: number;
//   description: string;
//   company: string;
//   userId: string;
// }

// interface Driver {
//   description: string;
//   company: string;
//   userId: string;
// }

// interface LoadboardData {
//   loads: Load[];
// }

// const AvailableTable: React.FC = () => {
//   const [loads, setLoads] = useState<Load[]>([]);
//   const [userLoads, setUserLoads] = useState<Load[]>([]);
//   // const [loadboardData, setLoadboardData] = useState<Load[]>([]);
//   const [searchFormData, setSearchFormData] = useState({
//     originCity: "",
//     originState: "",
//     radius: "",
//     destinationType: "",
//     equipmentTypes: "",
//     minWeight: "",
//     maxMileage: "",
//     pickupDate: "",
//     companyRating: "",
//     modifiedStartDate: "",
//     modifiedEndDate: "",
//   });
//   const [searchResults, setSearchResults] = useState<Load[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [newLoad, setNewLoad] = useState<Load>({
//     id: 0,
//     numberOfLoads: 0,
//     pickupDateTimes: 0,
//     equipmentInfo: "",
//     privateLoadNote: "",
//     status: "",
//     deliveryDateTimeUtc: 0,
//     mileage: 0,
//     numberOfStops: 0,
//     description: "",
//     company: "",
//     userId: "",
//   });

//   const [newDriver, setNewDriver] = useState<Driver>({
//     description: "",
//     company: "",
//     userId: "",
//   });

//   const [driverList, setDriverList] = useState<Driver[]>([]);
//   const [userDrivers, setUserDrivers] = useState<Driver[]>([]);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const code = queryParams.get("code");

//   useEffect(() => {
//     if (code) {
//       fetchLoadboardData(code);
//     }
//   }, [code]);

//   // Fetch local loads
//   const fetchLoads = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
//       );
//       setLoads(response.data);

//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         setUserLoads(response.data.filter((l: Load) => l.userId === userId));
//       }
//     } catch (err) {
//       console.error("Error fetching loads:", err);
//     }
//   };

//   // Fetch drivers
//   const fetchDrivers = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`
//       );
//       setDriverList(response.data);

//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         setUserDrivers(response.data.filter((d: Driver) => d.userId === userId));
//       }
//     } catch (err) {
//       console.error("Error fetching drivers:", err);
//     }
//   };

//   // Fetch 123Loadboard data
//   const fetchLoadboardData = async (authCode: string) => {
//     try {
//       const response = await axios.get<LoadboardData>(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/`,
//         { params: { code: authCode } }
//       );
//       setSearchResults(response.data.loads); // now `response` is used
//       // setLoadboardData(response.data.loads);
//     } catch (err) {
//       console.error("Error fetching 123Loadboard data:", err);
//     }
//   };

//   // Handle search form input
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSearchFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Autofill sample data
//   const handleAutoFill = () => {
//     setSearchFormData({
//       originCity: "Chicago",
//       originState: "IL",
//       radius: "100",
//       destinationType: "Terminal",
//       equipmentTypes: "Flatbed",
//       minWeight: "1000",
//       maxMileage: "500",
//       pickupDate: "2024-11-15",
//       companyRating: "A",
//       modifiedStartDate: "2024-11-01",
//       modifiedEndDate: "2024-11-30",
//     });
//   };

//   // Submit 123Loadboard search
//   const handle123Search = async () => {
//     if (!code) {
//       setError("Authorization code is missing. Please authorize first.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/load-search?code=${code}`,
//         searchFormData,
//         {
//           headers: {
//             "123LB-Correlation-Id": "123GADZ",
//             "Content-Type": "application/json",
//             "123LB-Api-Version": "1.3",
//             "User-Agent": process.env.USER_AGENT || "gadzconnect_dev",
//             "123LB-AID":
//               process.env.LOADBOARD_AID ||
//               "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
//             Authorization: `Bearer ${code}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setSearchResults(response.data.loads || []);
//         setSuccess(true);
//       } else {
//         setError("Failed to fetch 123Loadboard search results");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error fetching 123Loadboard search results");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle local load form inputs
//   const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
//   };

//   const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
//   };

//   const handleSubmitLoad = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`,
//         { ...newLoad, userId }
//       );
//       setNewLoad({
//         id: 0,
//         numberOfLoads: 0,
//         pickupDateTimes: 0,
//         equipmentInfo: "",
//         privateLoadNote: "",
//         status: "",
//         deliveryDateTimeUtc: 0,
//         mileage: 0,
//         numberOfStops: 0,
//         description: "",
//         company: "",
//         userId,
//       });
//       fetchLoads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmitDriver = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");
//     if (!userId) return;
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`,
//         { ...newDriver, userId }
//       );
//       setNewDriver({ description: "", company: "", userId: "" });
//       fetchDrivers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAuthorizeNavigation = () => {
//     const baseUrl =
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3001/api/123Loads/authorize"
//         : "https://gadzconnect.com/api/123Loads/authorize";
//     window.location.href = baseUrl;
//   };

//   return (
//     <div className={styles["at-container"]}>
//       <header className={styles["at-hero"]}>
//         <img src={GADZTruck} alt="Truck Animation" className={styles["at-truck"]} />
//         <h1 className={styles["at-title"]}>🚛 GADZConnect Load Board</h1>
//         <p className={styles["at-subtitle"]}>
//           Manage your drivers, loads, and connect with 123Loadboard seamlessly
//         </p>
//         <Link to="/User" className={styles["at-homeLink"]}>
//           Back to Dashboard
//         </Link>
//       </header>

//       {/* Drivers */}
//       <section className={styles["at-section"]}>
//         <h2>👨‍✈️ Drivers</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={fetchDrivers} className={styles["at-button"]}>
//             Fetch Drivers
//           </button>
//         </div>
//         <Table data={driverList} title="All Drivers" isUser={true} />
//         <Table
//           data={userDrivers}
//           title="Your Drivers"
//           isUser={true}
//           showCompanyLink={false}
//         />

//         <form className={styles["at-form"]} onSubmit={handleSubmitDriver}>
//           <h3>Add New Driver</h3>
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="description"
//             placeholder="Driver Description"
//             value={newDriver.description}
//             onChange={handleDriverInputChange}
//             required
//           />
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={newDriver.company}
//             onChange={handleDriverInputChange}
//             required
//           />
//           <button type="submit" className={styles["at-submitButton"]}>
//             ➕ Add Driver
//           </button>
//         </form>
//       </section>

//       {/* Loads */}
//       <section className={styles["at-section"]}>
//         <h2>📦 Loads</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={fetchLoads} className={styles["at-button"]}>
//             Fetch Loads
//           </button>
//         </div>
//         <Table data={loads} title="All Loads" isUser={false} showCompanyLink />

//         <h3>Your Loads</h3>
//         <table className={styles["at-table"]}>
//           <thead>
//             <tr>
//               <th>Load ID</th>
//               <th>Description</th>
//               <th>Company</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userLoads.map((load) => (
//               <tr key={load.id}>
//                 <td>{load.id}</td>
//                 <td>{load.description}</td>
//                 <td>
//                   <Link to={`/UserProfile/${load.userId}`} className={styles["at-link"]}>
//                     {load.company}
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <form className={styles["at-form"]} onSubmit={handleSubmitLoad}>
//           <h3>Add New Load</h3>
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="description"
//             placeholder="Load Description"
//             value={newLoad.description}
//             onChange={handleLoadInputChange}
//             required
//           />
//           <input
//             className={styles["at-input"]}
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={newLoad.company}
//             onChange={handleLoadInputChange}
//             required
//           />
//           <button type="submit" className={styles["at-submitButton"]}>
//             ➕ Add Load
//           </button>
//         </form>
//       </section>

//       {/* 123Loadboard */}
//       <section className={styles["at-section"]}>
//         <h2>🌐 123Loadboard</h2>
//         <div className={styles["at-buttonGroup"]}>
//           <button onClick={handleAuthorizeNavigation} className={styles["at-buttonAlt"]}>
//             🔑 Authorize
//           </button>
//           <button
//             onClick={() => fetchLoadboardData(code || "")}
//             className={styles["at-button"]}
//           >
//             📥 Fetch 123Loadboard Data
//           </button>
//         </div>

//         {/* 123 Search Form */}
//         <form className={styles["at-form"]} onSubmit={(e) => e.preventDefault()}>
//           <h3>Search Loads</h3>
//           <div className="flex flex-wrap gap-2">
//             {Object.keys(searchFormData).map((key) => (
//               <input
//                 key={key}
//                 className={styles["at-input"]}
//                 type={key.includes("Date") ? "date" : "text"}
//                 name={key}
//                 placeholder={key}
//                 value={searchFormData[key as keyof typeof searchFormData]}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </div>
//           <div className="flex gap-3">
//             <button type="button" className={styles["at-buttonAlt"]} onClick={handleAutoFill}>
//               Autofill Sample Data
//             </button>
//             <button type="button" className={styles["at-button"]} onClick={handle123Search}>
//               {loading ? "Searching..." : "123 Search"}
//             </button>
//           </div>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {success && <p style={{ color: "green" }}>Search completed!</p>}
//         </form>

//         {/* Search Results Table */}
//         {searchResults.length > 0 && (
//           <div className={styles["at-tableContainer"]}>
//             <h3>Search Results</h3>
//             <table className={styles["at-table"]}>
//               <thead>
//                 <tr>
//                   <th>Load ID</th>
//                   <th>Description</th>
//                   <th>Company</th>
//                   <th>Delivery</th>
//                   <th>Stops</th>
//                   <th>Mileage</th>
//                   <th># Loads</th>
//                   <th>Pickup</th>
//                   <th>Equipment</th>
//                   <th>Note</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {searchResults.map((load) => (
//                   <tr key={load.id}>
//                     <td>{load.id}</td>
//                     <td>{load.description}</td>
//                     <td>{load.company}</td>
//                     <td>{load.deliveryDateTimeUtc}</td>
//                     <td>{load.numberOfStops}</td>
//                     <td>{load.mileage}</td>
//                     <td>{load.numberOfLoads}</td>
//                     <td>{load.pickupDateTimes}</td>
//                     <td>{load.equipmentInfo}</td>
//                     <td>{load.privateLoadNote}</td>
//                     <td>{load.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default AvailableTable;

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";
import Table from "./Table";

/**
 * NOTE:
 * - This component expects the backend endpoints you're already using:
 *   - `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
 *   - `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`
 *   - `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/` (GET with ?code=)
 *   - `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/load-search?code=...` (POST)
 *
 * - The 123Loadboard response (example you pasted) is an object with `loads: [...]`.
 *   Each load object is nested (originLocation, destinationLocation, equipments, pickupDateTimesUtc, poster, etc.).
 *   This component maps those fields into a simpler shape for rendering.
 */

/* -------------------------
   TypeScript interfaces
   ------------------------- */

// The shape we keep for displaying a 123Loadboard load
interface DisplayLoad {
  id: string;
  postReference?: string;
  description?: string; // fallback/commodity etc
  company?: string; // poster.name
  originCity?: string;
  originState?: string;
  originZip?: string;
  destinationCity?: string;
  destinationState?: string;
  destinationZip?: string;
  pickupDates?: string[]; // pickupDateTimesUtc array
  firstPickup?: string; // derived (first pickup date) human-friendly
  delivery?: string; // deliveryDateTimeUtc
  equipments?: string; // comma list
  weight?: number | null;
  computedMileage?: number | null;
  numberOfStops?: number;
  numberOfLoads?: number;
  status?: string;
  commodity?: string | null;
  raw?: any; // keep raw object for debugging if needed
}

// Local "Load" type kept for your local loads table & forms (minimal)
interface LocalLoad {
  id: number;
  numberOfLoads: number;
  pickupDateTimes: number | string;
  equipmentInfo: string;
  privateLoadNote: string;
  status: string;
  deliveryDateTimeUtc: number | string;
  mileage: number;
  numberOfStops: number;
  description: string;
  company: string;
  userId: string;
}

// Driver type (local)
interface Driver {
  description: string;
  company: string;
  userId: string;
}

/* -------------------------
   Component
   ------------------------- */

const AvailableTable: React.FC = () => {
  // Local loads & drivers (unchanged)
  const [loads, setLoads] = useState<LocalLoad[]>([]);
  const [userLoads, setUserLoads] = useState<LocalLoad[]>([]);
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [userDrivers, setUserDrivers] = useState<Driver[]>([]);

  // Search form (keeps your existing fields)
  const [searchFormData, setSearchFormData] = useState({
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

  // Results from 123Loadboard mapped to DisplayLoad
  const [searchResults, setSearchResults] = useState<DisplayLoad[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for adding local loads/drivers (kept same)
  const [newLoad, setNewLoad] = useState<LocalLoad>({
    id: 0,
    numberOfLoads: 0,
    pickupDateTimes: 0,
    equipmentInfo: "",
    privateLoadNote: "",
    status: "",
    deliveryDateTimeUtc: 0,
    mileage: 0,
    numberOfStops: 0,
    description: "",
    company: "",
    userId: "",
  });

  const [newDriver, setNewDriver] = useState<Driver>({
    description: "",
    company: "",
    userId: "",
  });

  // OAuth code from query string (if present)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (code) {
      fetchLoadboardData(code);
    }
  }, [code]);

  /* -------------------------
     Helpers
     ------------------------- */

  // Safely format a date string (returns original string if invalid)
  const formatDateSafe = (d: any) => {
    if (!d) return "";
    try {
      const parsed = new Date(d);
      if (isNaN(parsed.getTime())) return String(d);
      return parsed.toLocaleString();
    } catch {
      return String(d);
    }
  };

  // Map a single raw 123Loadboard load object into DisplayLoad
  const mapApiLoadToDisplay = (raw: any): DisplayLoad => {
    const origin = raw.originLocation || raw.origin || {};
    const dest = raw.destinationLocation || raw.destination || {};
    const poster = raw.poster || {};
    const equipments = raw.equipments || raw.equipment || [];

    // pickup times array (they used pickupDateTimesUtc)
    const pickupArr: string[] =
      raw.pickupDateTimesUtc?.map((p: any) => p) ||
      raw.pickupDates ||
      raw.pickupDateTimes ||
      [];

    const firstPickup = pickupArr && pickupArr.length > 0 ? pickupArr[0] : "";

    const equipmentList =
      Array.isArray(equipments) && equipments.length > 0
        ? equipments.map((e: any) => e.code || e.type || e.name || e).join(", ")
        : "";

    return {
      id: raw.id || raw.loadId || raw.postReference || "",
      postReference: raw.postReference,
      description: raw.commodity || raw.description || raw.postReference || "",
      company: poster?.name || poster?.companyName || poster?.company || "",
      originCity: origin.city || origin.name || "",
      originState: origin.state || origin.region || "",
      originZip: origin.zipCode || origin.zip || "",
      destinationCity: dest.city || dest.name || "",
      destinationState: dest.state || dest.region || dest.states?.[0] || "",
      destinationZip: dest.zipCode || dest.zip || "",
      pickupDates: pickupArr,
      firstPickup: firstPickup ? formatDateSafe(firstPickup) : "",
      delivery: formatDateSafe(raw.deliveryDateTimeUtc || raw.deliveryDateTime),
      equipments: equipmentList,
      weight: raw.weight ?? raw.actualWeight ?? null,
      computedMileage: raw.computedMileage ?? raw.mileage ?? null,
      numberOfStops: raw.numberOfStops ?? 0,
      numberOfLoads: raw.numberOfLoads ?? 1,
      status: raw.status ?? "Unknown",
      commodity: raw.commodity ?? null,
      raw,
    };
  };

  /* -------------------------
     API calls (local & loadboard)
     ------------------------- */

  // Fetch local loads
  const fetchLoads = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
      );
      const data = resp.data || [];
      setLoads(data);
      const userId = localStorage.getItem("userId");
      if (userId) {
        setUserLoads(data.filter((l: any) => l.userId === userId));
      }
    } catch (err) {
      console.error("Error fetching loads:", err);
      setError("Failed to fetch local loads");
    }
  };

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`
      );
      const data = resp.data || [];
      setDriverList(data);
      const userId = localStorage.getItem("userId");
      if (userId) {
        setUserDrivers(data.filter((d: any) => d.userId === userId));
      }
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setError("Failed to fetch drivers");
    }
  };

  // Fetch 123Loadboard data via backend callback route (expects backend to call 123Loadboard using code param)
  const fetchLoadboardData = async (authCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/`,
        {
          params: { code: authCode },
        }
      );
      // resp.data should be { loads: [...], refreshedLoads: [...], metadata: {...} }
      const apiLoads = resp.data?.loads || [];
      const mapped = apiLoads.map((l: any) => mapApiLoadToDisplay(l));
      setSearchResults(mapped);
    } catch (err) {
      console.error("Error fetching 123Loadboard data:", err);
      setError("Failed to fetch 123Loadboard data (see console)");
    } finally {
      setLoading(false);
    }
  };

  // Trigger a search through your backend (POST) using searchFormData and the code param
  const handle123Search = async () => {
    if (!code) {
      setError("Authorization code is missing. Please authorize first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/load-search?code=${code}`,
        // We send a request body that your backend should transform / forward to 123Loadboard.
        // For now send searchFormData — backend should build the full schema when calling 123Loadboard.
        searchFormData,
        {
          headers: {
            "123LB-Correlation-Id": "123GADZ",
            "Content-Type": "application/json",
            "123LB-Api-Version": "1.3",
            "User-Agent": process.env.USER_AGENT || "gadzconnect_dev",
            "123LB-AID":
              process.env.LOADBOARD_AID ||
              "Ba76be66d-dc2e-4045-87a3-adec3ae60eaf",
            Authorization: `Bearer ${code}`,
          },
        }
      );

      const apiLoads = resp.data?.loads || [];
      const mapped = apiLoads.map((l: any) => mapApiLoadToDisplay(l));
      setSearchResults(mapped);
      setSuccess(true);
    } catch (err) {
      console.error("Error during 123Search:", err);
      setError("Error fetching 123Loadboard search results");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     Forms handlers for local data (unchanged)
     ------------------------- */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoad({ ...newLoad, [e.target.name]: e.target.value } as any);
  };

  const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value } as any);
  };

  const handleSubmitLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`,
        { ...newLoad, userId }
      );
      setNewLoad({
        id: 0,
        numberOfLoads: 0,
        pickupDateTimes: 0,
        equipmentInfo: "",
        privateLoadNote: "",
        status: "",
        deliveryDateTimeUtc: 0,
        mileage: 0,
        numberOfStops: 0,
        description: "",
        company: "",
        userId,
      });
      fetchLoads();
    } catch (err) {
      console.error(err);
      setError("Failed to add new load");
    }
  };

  const handleSubmitDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`,
        { ...newDriver, userId }
      );
      setNewDriver({ description: "", company: "", userId: "" });
      fetchDrivers();
    } catch (err) {
      console.error(err);
      setError("Failed to add new driver");
    }
  };

  const handleAuthorizeNavigation = () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api/123Loads/authorize"
        : "https://gadzconnect.com/api/123Loads/authorize";
    window.location.href = baseUrl;
  };

  /* -------------------------
     Render
     ------------------------- */

  return (
    <div className={styles["at-container"]}>
      <header className={styles["at-hero"]}>
        <img src={GADZTruck} alt="Truck Animation" className={styles["at-truck"]} />
        <h1 className={styles["at-title"]}>🚛 GADZConnect Load Board</h1>
        <p className={styles["at-subtitle"]}>
          Manage your drivers, loads, and connect with 123Loadboard seamlessly
        </p>
        <Link to="/User" className={styles["at-homeLink"]}>
          Back to Dashboard
        </Link>
      </header>

      {/* Drivers */}
      <section className={styles["at-section"]}>
        <h2>👨‍✈️ Drivers</h2>
        <div className={styles["at-buttonGroup"]}>
          <button onClick={fetchDrivers} className={styles["at-button"]}>
            Fetch Drivers
          </button>
        </div>
        <Table data={driverList} title="All Drivers" isUser={true} />
        <Table
          data={userDrivers}
          title="Your Drivers"
          isUser={true}
          showCompanyLink={false}
        />

        <form className={styles["at-form"]} onSubmit={handleSubmitDriver}>
          <h3>Add New Driver</h3>
          <input
            className={styles["at-input"]}
            type="text"
            name="description"
            placeholder="Driver Description"
            value={newDriver.description}
            onChange={handleDriverInputChange}
            required
          />
          <input
            className={styles["at-input"]}
            type="text"
            name="company"
            placeholder="Company"
            value={newDriver.company}
            onChange={handleDriverInputChange}
            required
          />
          <button type="submit" className={styles["at-submitButton"]}>
            ➕ Add Driver
          </button>
        </form>
      </section>

      {/* Local Loads */}
      <section className={styles["at-section"]}>
        <h2>📦 Loads</h2>
        <div className={styles["at-buttonGroup"]}>
          <button onClick={fetchLoads} className={styles["at-button"]}>
            Fetch Loads
          </button>
        </div>
        <Table data={loads} title="All Loads" isUser={false} showCompanyLink />

        <h3>Your Loads</h3>
        <div className={styles["at-tableContainer"]}>
          <table className={styles["at-table"]}>
            <thead>
              <tr>
                <th>Load ID</th>
                <th>Description</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {userLoads.map((load) => (
                <tr key={load.id}>
                  <td>{load.id}</td>
                  <td>{load.description}</td>
                  <td>
                    <Link to={`/UserProfile/${load.userId}`} className={styles["at-link"]}>
                      {load.company}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form className={styles["at-form"]} onSubmit={handleSubmitLoad}>
          <h3>Add New Load</h3>
          <input
            className={styles["at-input"]}
            type="text"
            name="description"
            placeholder="Load Description"
            value={newLoad.description}
            onChange={handleLoadInputChange}
            required
          />
          <input
            className={styles["at-input"]}
            type="text"
            name="company"
            placeholder="Company"
            value={newLoad.company}
            onChange={handleLoadInputChange}
            required
          />
          <button type="submit" className={styles["at-submitButton"]}>
            ➕ Add Load
          </button>
        </form>
      </section>

      {/* 123Loadboard */}
      <section className={styles["at-section"]}>
        <h2>🌐 123Loadboard</h2>

        <div className={styles["at-buttonGroup"]}>
          <button onClick={handleAuthorizeNavigation} className={styles["at-buttonAlt"]}>
            🔑 Authorize
          </button>
          <button
            onClick={() => fetchLoadboardData(code || "")}
            className={styles["at-button"]}
          >
            📥 Fetch 123Loadboard Data
          </button>
        </div>

        {/* 123 Search Form */}
        <form className={styles["at-form"]} onSubmit={(e) => e.preventDefault()}>
          <h3>Search Loads</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(searchFormData).map((key) => (
              <input
                key={key}
                className={styles["at-input"]}
                type={key.toLowerCase().includes("date") ? "date" : "text"}
                name={key}
                placeholder={key}
                value={(searchFormData as any)[key as keyof typeof searchFormData]}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button type="button" className={styles["at-buttonAlt"]} onClick={() =>
              setSearchFormData({
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
              })
            }>
              Autofill Sample Data
            </button>

            <button type="button" className={styles["at-button"]} onClick={handle123Search}>
              {loading ? "Searching..." : "123 Search"}
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>Search completed!</p>}
        </form>

        {/* Search Results Table */}
        {searchResults.length > 0 && (
          <div className={styles["at-tableContainer"]}>
            <h3>Search Results</h3>
            <table className={styles["at-table"]}>
              <thead>
                <tr>
                  <th>Post Ref</th>
                  <th>Description / Commodity</th>
                  <th>Company</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Pickup (first)</th>
                  <th>Delivery</th>
                  <th>Weight</th>
                  <th>Mileage</th>
                  <th>Equipment</th>
                  <th>Stops</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((load) => (
                  <tr key={load.id}>
                    <td>{load.postReference || load.id}</td>
                    <td>{load.description}</td>
                    <td>{load.company}</td>
                    <td>
                      {load.originCity}
                      {load.originState ? `, ${load.originState}` : ""}
                      {load.originZip ? ` (${load.originZip})` : ""}
                    </td>
                    <td>
                      {load.destinationCity}
                      {load.destinationState ? `, ${load.destinationState}` : ""}
                      {load.destinationZip ? ` (${load.destinationZip})` : ""}
                    </td>
                    <td>{load.firstPickup}</td>
                    <td>{load.delivery}</td>
                    <td>{load.weight ?? "—"}</td>
                    <td>{load.computedMileage ?? "—"}</td>
                    <td>{load.equipments}</td>
                    <td>{load.numberOfStops ?? 0}</td>
                    <td>{load.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Helpful debugging: raw JSON of first load (uncomment to show) */}
            {/* <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
              {JSON.stringify(searchResults[0]?.raw, null, 2)}
            </pre> */}
          </div>
        )}

        {!loading && searchResults.length === 0 && (
          <p style={{ marginTop: 12 }}>
            No search results yet. Click <strong>Authorize</strong> then{" "}
            <strong>Fetch 123Loadboard Data</strong> or run a <strong>123 Search</strong>.
          </p>
        )}
      </section>
    </div>
  );
};

export default AvailableTable;
