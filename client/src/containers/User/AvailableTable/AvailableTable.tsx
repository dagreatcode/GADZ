// import React, { useEffect, useState, useCallback } from "react";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./AvailableTable.module.css";
// import GADZTruck from "./GADZBoat.png";
// import Table from "./Table";

// // Types
// interface Load {
//   id: string;
//   postReference?: string;
//   numberOfLoads: number;
//   originLocation?: any;
//   destinationLocation?: any;
//   equipments?: any[];
//   loadSize?: string;
//   weight?: number;
//   rateCheck?: any;
//   numberOfStops: number;
//   teamDriving?: boolean;
//   pickupDateTimesUtc?: string[];
//   deliveryDateTimeUtc?: string;
//   computedMileage?: number;
//   status: string;
//   age?: number;
//   lastRefreshed?: string;
//   isDateRefreshed?: boolean;
//   poster?: any;
//   metadata?: any;
//   sortEquipCode?: string;
//   privateLoadNote?: string;
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
//     id: "",
//     numberOfLoads: 0,
//     pickupDateTimesUtc: [],
//     equipments: [],
//     status: "",
//     deliveryDateTimeUtc: "",
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

//   // Map API load response to display-ready Load type
//   const mapApiLoadToDisplay = (apiLoad: any): Load => {
//     return {
//       id: apiLoad.id,
//       postReference: apiLoad.postReference,
//       numberOfLoads: apiLoad.numberOfLoads,
//       originLocation: apiLoad.originLocation,
//       destinationLocation: apiLoad.destinationLocation,
//       equipments: apiLoad.equipments,
//       loadSize: apiLoad.loadSize,
//       weight: apiLoad.weight,
//       rateCheck: apiLoad.rateCheck,
//       numberOfStops: apiLoad.numberOfStops,
//       teamDriving: apiLoad.teamDriving,
//       pickupDateTimesUtc: apiLoad.pickupDateTimesUtc,
//       deliveryDateTimeUtc: apiLoad.deliveryDateTimeUtc,
//       computedMileage: apiLoad.computedMileage,
//       status: apiLoad.status,
//       age: apiLoad.age,
//       lastRefreshed: apiLoad.lastRefreshed,
//       isDateRefreshed: apiLoad.isDateRefreshed,
//       poster: apiLoad.poster,
//       metadata: apiLoad.metadata,
//       sortEquipCode: apiLoad.sortEquipCode,
//       privateLoadNote: apiLoad.privateLoadNote || "",
//       description: apiLoad.description || "",
//       company: apiLoad.poster?.company || "",
//       userId: apiLoad.poster?.userId || "",
//     };
//   };

//   // Fetch 123Loadboard data
//   const fetchLoadboardData = useCallback(
//     async (authCode: string) => {
//       if (!authCode) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get<LoadboardData>(
//           `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/`,
//           { params: { code: authCode } }
//         );
//         const apiLoads = response.data.loads || [];
//         const mappedLoads = apiLoads.map(mapApiLoadToDisplay);
//         setSearchResults(mappedLoads);
//         setSuccess(true);
//       } catch (err) {
//         console.error("Error fetching 123Loadboard data:", err);
//         setError("Failed to fetch 123Loadboard data.");
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     if (code) {
//       fetchLoadboardData(code);
//     }
//   }, [code, fetchLoadboardData]);

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

//   // Handle search form input
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSearchFormData((prev) => ({ ...prev, [name]: value }));
//   };

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
//         const apiLoads = response.data.loads || [];
//         const mappedLoads = apiLoads.map(mapApiLoadToDisplay);
//         setSearchResults(mappedLoads);
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

//   // Local load and driver form handlers
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
//         id: "",
//         numberOfLoads: 0,
//         pickupDateTimesUtc: [],
//         equipments: [],
//         status: "",
//         deliveryDateTimeUtc: "",
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
//           <button onClick={() => fetchLoadboardData(code || "")} className={styles["at-button"]}>
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
//               {/* <thead>
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
//               </thead> */}
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
//                   <th>Origin</th>
//                   <th>Destination</th>
//                 </tr>
//               </thead>

//               {/* <tbody>
//                 {searchResults.map((load) => (
//                   <tr key={load.id}>
//                     <td>{load.id}</td>
//                     <td>{load.description}</td>
//                     <td>{load.company}</td>
//                     <td>{load.deliveryDateTimeUtc}</td>
//                     <td>{load.numberOfStops}</td>
//                     <td>{load.computedMileage}</td>
//                     <td>{load.numberOfLoads}</td>
//                     <td>{load.pickupDateTimesUtc?.join(", ")}</td>
//                     <td>{load.equipments?.map((e) => e.name || e).join(", ")}</td>
//                     <td>{load.privateLoadNote}</td>
//                     <td>{load.status}</td>
//                   </tr>
//                 ))}
//               </tbody> */}
//               <tbody>
//                 {searchResults.map((load) => (
//                   <tr key={load.id}>
//                     <td>{load.id}</td>
//                     <td>{load.postReference || "N/A"}</td>
//                     <td>{load.poster?.company || "N/A"}</td>
//                     <td>{load.deliveryDateTimeUtc || "N/A"}</td>
//                     <td>{load.numberOfStops}</td>
//                     <td>{load.computedMileage}</td>
//                     <td>{load.numberOfLoads}</td>
//                     <td>
//                       {load.pickupDateTimesUtc
//                         ? load.pickupDateTimesUtc.map((dt: string) => new Date(dt).toLocaleString()).join(", ")
//                         : "N/A"}
//                     </td>
//                     <td>
//                       {load.equipments
//                         ? load.equipments.map((e: any) => e.name || e.code || e).join(", ")
//                         : "N/A"}
//                     </td>
//                     <td>{load.privateLoadNote || ""}</td>
//                     <td>{load.status}</td>
//                     <td>
//                       {load.originLocation
//                         ? `${load.originLocation.city || ""}, ${load.originLocation.state || ""}`
//                         : "N/A"}
//                     </td>
//                     <td>
//                       {load.destinationLocation
//                         ? `${load.destinationLocation.city || ""}, ${load.destinationLocation.state || ""}`
//                         : "N/A"}
//                     </td>
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

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";
import Table from "./Table";

// Types
interface Load {
  id: string;
  postReference?: string;
  numberOfLoads: number;
  originLocation?: any;
  destinationLocation?: any;
  equipments?: any[];
  loadSize?: string;
  weight?: number;
  rateCheck?: any;
  numberOfStops: number;
  teamDriving?: boolean;
  pickupDateTimesUtc?: string[];
  deliveryDateTimeUtc?: string;
  computedMileage?: number;
  status: string;
  age?: number;
  lastRefreshed?: string;
  isDateRefreshed?: boolean;
  poster?: any;
  metadata?: any;
  sortEquipCode?: string;
  privateLoadNote?: string;
  description: string;
  company: string;
  userId: string;
}

interface Driver {
  id?: string;
  description?: string;
  company?: string;
  userId?: string;
}

// Helper to read cookie
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
};

const AvailableTable: React.FC = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [userLoads, setUserLoads] = useState<Load[]>([]);
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [userDrivers, setUserDrivers] = useState<Driver[]>([]);
  const [searchResults, setSearchResults] = useState<Load[]>([]);
  const [searchFormData, setSearchFormData] = useState({
    originCity: "",
    originState: "",
    radius: "",
    destinationType: "Anywhere",
    equipmentTypes: "",
    minWeight: "",
    maxMileage: "",
    pickupDate: "",
    companyRating: "",
    modifiedStartDate: "",
    modifiedEndDate: "",
  });
  const [newLoad, setNewLoad] = useState<Partial<Load>>({
    id: "",
    numberOfLoads: 0,
    pickupDateTimesUtc: [],
    equipments: [],
    status: "",
    deliveryDateTimeUtc: "",
    numberOfStops: 0,
    description: "",
    company: "",
    userId: "",
  });
  const [newDriver, setNewDriver] = useState<Partial<Driver>>({
    description: "",
    company: "",
    userId: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Map API response to Load type
  const mapApiLoadToDisplay = (apiLoad: any): Load => ({
    id: apiLoad.id || apiLoad.loadId || `${Math.random()}`,
    postReference: apiLoad.postReference,
    numberOfLoads: apiLoad.numberOfLoads || 1,
    originLocation: apiLoad.originLocation || apiLoad.origin,
    destinationLocation: apiLoad.destinationLocation || apiLoad.destination,
    equipments: apiLoad.equipments || apiLoad.equipmentTypes || [],
    loadSize: apiLoad.loadSize,
    weight: apiLoad.weight,
    rateCheck: apiLoad.rateCheck,
    numberOfStops: apiLoad.numberOfStops || 0,
    teamDriving: apiLoad.teamDriving,
    pickupDateTimesUtc: apiLoad.pickupDateTimesUtc || apiLoad.pickupDates || [],
    deliveryDateTimeUtc: apiLoad.deliveryDateTimeUtc,
    computedMileage: apiLoad.computedMileage,
    status: apiLoad.status || apiLoad.state,
    age: apiLoad.age,
    lastRefreshed: apiLoad.lastRefreshed,
    isDateRefreshed: apiLoad.isDateRefreshed,
    poster: apiLoad.poster,
    metadata: apiLoad.metadata,
    sortEquipCode: apiLoad.sortEquipCode,
    privateLoadNote: apiLoad.privateLoadNote || apiLoad.note || "",
    description: apiLoad.description || apiLoad.postReference || "",
    company: apiLoad.poster?.company || apiLoad.companyName || "",
    userId: apiLoad.poster?.userId || apiLoad.userId || "",
  });

  // Fetch local loads
  const fetchLoads = useCallback(async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/api/loads`);
      const data = resp.data || [];
      setLoads(data);
      const userId = localStorage.getItem("userId");
      if (userId) setUserLoads(data.filter((l: Load) => l.userId === userId));
    } catch (err) {
      console.error("Error fetching loads:", err);
    }
  }, []);

  // Fetch drivers
  const fetchDrivers = useCallback(async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/api/drivers`);
      const data = resp.data || [];
      setDriverList(data);
      const userId = localStorage.getItem("userId");
      if (userId) setUserDrivers(data.filter((d: Driver) => d.userId === userId));
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  }, []);

  // Load token and data on mount
  useEffect(() => {
    const cookieToken = getCookie("lb_access_token");
    if (cookieToken) {
      setToken(cookieToken);
      localStorage.setItem("lb_access_token", cookieToken);
    } else {
      const stored = localStorage.getItem("lb_access_token");
      if (stored) setToken(stored);
    }
    fetchLoads();
    fetchDrivers();
  }, [fetchLoads, fetchDrivers]);

  // // Auto-refresh token every 14 minutes
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const currentToken = getCookie("lb_access_token") || localStorage.getItem("lb_access_token");
  //     if (!currentToken) return;

  //     try {
  //       const resp = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/refresh-token`, {
  //         headers: { Authorization: `Bearer ${currentToken}` },
  //       });

  //       const newToken = resp.data?.access_token;
  //       if (newToken) {
  //         document.cookie = `lb_access_token=${newToken}; path=/; secure; samesite=lax`;
  //         localStorage.setItem("lb_access_token", newToken);
  //         setToken(newToken);
  //         console.log("123Loadboard token refreshed automatically.");
  //       }
  //     } catch (err) {
  //       console.error("Auto token refresh failed:", err);
  //       setError("Automatic token refresh failed. Please reconnect.");
  //     }
  //   }, 14 * 60 * 1000); // 14 minutes

  //   return () => clearInterval(interval);
  // }, []);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = () => {
    const today = new Date().toISOString().split("T")[0];
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0];
    setSearchFormData({
      originCity: "Chicago",
      originState: "IL",
      radius: "100",
      destinationType: "Anywhere",
      equipmentTypes: "Flatbed",
      minWeight: "1000",
      maxMileage: "500",
      pickupDate: today,
      companyRating: "A",
      modifiedStartDate: lastMonth,
      modifiedEndDate: today,
    });
  };

  // 123Loadboard search
  const handle123Search = useCallback(async () => {
    setError(null);
    setSuccess(false);
    const authToken = getCookie("lb_access_token") || token || localStorage.getItem("lb_access_token");
    if (!authToken) {
      setError("Authorization token missing — please click Authorize/Connect first.");
      return;
    }
    setLoading(true);
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/api/load-search`,
        searchFormData,
        { headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" } }
      );

      let apiLoads: any[] = [];
      if (resp.data) {
        if (Array.isArray(resp.data)) apiLoads = resp.data;
        else if (Array.isArray(resp.data.loads)) apiLoads = resp.data.loads;
        else if (Array.isArray(resp.data.data)) apiLoads = resp.data.data;
        else if (Array.isArray(resp.data.results)) apiLoads = resp.data.results;
        else if (Array.isArray(resp.data.payload)) apiLoads = resp.data.payload;
      }

      setSearchResults(apiLoads.map(mapApiLoadToDisplay));
      setSuccess(true);

      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
    } catch (err: any) {
      console.error("Error fetching 123Loadboard search results:", err);
      const msg =
        (err.response && err.response.data && (err.response.data.error || err.response.data.message)) ||
        err.message ||
        "Error fetching results";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }, [searchFormData, token]);

  // Local load and driver handlers
  const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLoad((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return setError("Please log in to add a load.");
    try {
      await axios.post(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/api/loads`, { ...newLoad, userId });
      setNewLoad({ id: "", numberOfLoads: 0, pickupDateTimesUtc: [], equipments: [], status: "", deliveryDateTimeUtc: "", numberOfStops: 0, description: "", company: "", userId });
      fetchLoads();
    } catch (err) {
      console.error("Error creating load:", err);
      setError("Failed to create load.");
    }
  };

  const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDriver((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return setError("Please log in to add a driver.");
    try {
      await axios.post(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/api/drivers`, { ...newDriver, userId });
      setNewDriver({ description: "", company: "", userId: "" });
      fetchDrivers();
    } catch (err) {
      console.error("Error creating driver:", err);
      setError("Failed to create driver.");
    }
  };

  // Authorize / Connect
  const handleAuthorizeNavigation = () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001"}/authorize`
        : `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || ""}/authorize`;
    window.location.href = baseUrl;
  };

  // Store auth code if present
  useEffect(() => {
    if (code) {
      try {
        localStorage.setItem("lb_auth_code", code);
      } catch { }
    }
  }, [code]);

  return (
    <div className={styles["at-container"]}>
      {/* Header */}
      <header className={styles["at-hero"]}>
        <img src={GADZTruck} alt="Truck Animation" className={styles["at-truck"]} />
        <h1 className={styles["at-title"]}>🚛 GADZConnect Load Board</h1>
        <p className={styles["at-subtitle"]}>Manage drivers, loads, and connect with 123Loadboard</p>
        <Link to="/User" className={styles["at-homeLink"]}>Back to Dashboard</Link>
      </header>

      {/* Drivers Section */}
      <section className={styles["at-section"]}>
        <h2>👨‍✈️ Drivers</h2>
        <div style={{ marginBottom: 10 }}>
          <button className={styles["at-button"]} onClick={fetchDrivers}>Fetch Drivers</button>
        </div>
        <Table data={driverList} title="All Drivers" isUser />
        <Table data={userDrivers} title="Your Drivers" isUser showCompanyLink={false} />
        <form className={styles["at-form"]} onSubmit={handleSubmitDriver}>
          <h3>Add New Driver</h3>
          <input className={styles["at-input"]} type="text" name="description" placeholder="Driver Description" value={newDriver.description || ""} onChange={handleDriverInputChange} required />
          <input className={styles["at-input"]} type="text" name="company" placeholder="Company" value={newDriver.company || ""} onChange={handleDriverInputChange} required />
          <button type="submit" className={styles["at-submitButton"]}>➕ Add Driver</button>
        </form>
      </section>

      {/* Loads Section */}
      <section className={styles["at-section"]}>
        <h2>📦 Loads</h2>
        <div style={{ marginBottom: 10 }}>
          <button className={styles["at-button"]} onClick={fetchLoads}>Fetch Loads</button>
        </div>
        <Table data={loads} title="All Loads" isUser={false} showCompanyLink />
        <h3>Your Loads</h3>
        <div className={styles["at-scrollableTableContainer"]}>
          <div className={styles["at-scrollableTableWrapper"]} style={{ maxHeight: 300 }}>
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
                      <Link to={`/UserProfile/${load.userId}`} className={styles["at-link"]}>{load.company}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form className={styles["at-form"]} onSubmit={handleSubmitLoad}>
          <h3>Add New Load</h3>
          <input className={styles["at-input"]} type="text" name="description" placeholder="Load Description" value={newLoad.description || ""} onChange={handleLoadInputChange} required />
          <input className={styles["at-input"]} type="text" name="company" placeholder="Company" value={newLoad.company || ""} onChange={handleLoadInputChange} required />
          <button type="submit" className={styles["at-submitButton"]}>➕ Add Load</button>
        </form>
      </section>

      {/* 123Loadboard Section */}
      <section className={styles["at-section"]}>
        <h2>🌐 123Loadboard</h2>
        <div style={{ marginBottom: 12 }}>
          <button className={styles["at-buttonAlt"]} onClick={handleAuthorizeNavigation}>🔑 Authorize / Connect</button>
          <span style={{ marginLeft: 12, color: token ? "green" : "#777" }}>{token ? "Connected" : "Not connected"}</span>
        </div>

        <form className={styles["at-form"]} onSubmit={(e) => e.preventDefault()}>
          <h3>Search Loads</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.keys(searchFormData).map((key) => (
              <input
                key={key}
                className={styles["at-input"]}
                name={key}
                placeholder={key}
                type={key.includes("Date") ? "date" : "text"}
                value={searchFormData[key as keyof typeof searchFormData]}
                onChange={handleInputChange}
              />
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <button type="button" className={styles["at-buttonAlt"]} onClick={handleAutoFill}>Autofill Sample Data</button>
            <button type="button" className={styles["at-button"]} onClick={handle123Search} style={{ marginLeft: 8 }}>
              {loading ? "Searching..." : "Search 123Loadboard"}
            </button>
          </div>
          {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
          {success && <p style={{ color: "green", marginTop: 8 }}>Search complete!</p>}
        </form>

        {/* Search Results */}
        <div ref={resultsRef} style={{ marginTop: 20 }}>
          <Table data={searchResults} title="Search Results" isUser={false} showCompanyLink />
        </div>
      </section>
    </div>
  );
};

export default AvailableTable;


