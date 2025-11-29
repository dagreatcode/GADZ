// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   PieChart,
//   Pie,
//   BarChart,
//   Bar,
//   Brush,
//   ReferenceLine,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import axios from "axios";
// import "./Dash.css"; // Make sure to update styles in this file

// const ServerPort =
//   process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const Dash = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId"); // Get user ID from local storage
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(`${ServerPort}/api/user/view/${userId}`);
//         setUserData(res.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     } else {
//       setError("User ID not found in local storage.");
//       setLoading(false);
//     }
//   }, []);

//   const data = [
//     // Your existing data for bar chart
//     { name: "1", uv: 300, pv: 456 },
//     { name: "2", uv: -145, pv: 230 },
//     // ... other data points
//   ];

//   const data2 = [
//     { name: "Group A", value: 400 },
//     { name: "Group B", value: 300 },
//     // ... other data points
//   ];

//   if (loading) {
//     return <div className="loading">Loading user data...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <>
//       <div className="dashboard-header">
//         <h1>Dashboard</h1>
//       </div>

//       <div className="user-info">
//         <h2>User Information</h2>
//         <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Phone Number:</strong> {userData.phoneNumber || "Not provided"}</p>
//         <p><strong>Address:</strong> {userData.address || "Not provided"}</p>
//         <p><strong>Available Status:</strong> {userData.loadStatus}</p>
//         <p><strong>Customer Since:</strong> {new Date(userData.availableFrom).toLocaleDateString()}</p>
//         <p><strong>Type of Owner:</strong> {userData.userType}</p>
//       </div>

//       <div className="chart-container">
//         <h2>Charts</h2>
//         <div className="pie-charts">
//           {Array(4)
//             .fill(null)
//             .map((_, index) => (
//               <div key={index} className="pie-chart-wrapper">
//                 <PieChart width={300} height={300} className="pie-chart">
//                   <Pie
//                     dataKey="value"
//                     startAngle={180}
//                     endAngle={0}
//                     data={data2}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     label
//                   />
//                 </PieChart>
//               </div>
//             ))}
//         </div>

//         <div className="bar-chart-wrapper">
//           <BarChart
//             width={1000}
//             height={400}
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//             className="bar-chart"
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
//             <ReferenceLine y={0} stroke="#000" />
//             <Brush dataKey="name" height={30} stroke="#8884d8" />
//             <Bar dataKey="pv" fill="#8884d8" />
//             <Bar dataKey="uv" fill="#82ca9d" />
//           </BarChart>
//         </div>
//       </div>

//       <Link to="/User" className="home-link">
//         Home
//       </Link>
//     </>
//   );
// };

// export default Dash;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
//   Brush,
// } from "recharts";
// import axios from "axios";
// import "./Dash.css";

// const SERVER_PORT = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// // Colors for pie charts
// const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const Dash = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   // Fetch user data
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       setError("User ID not found in local storage.");
//       setLoading(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(`${SERVER_PORT}/api/user/view/${userId}`);
//         setUserData(res.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <div className="loading">Loading user data...</div>;
//   if (error) return <div className="error">{error}</div>;

//   // Prepare chart data
//   const barData = userData?.loadDetails?.map((load: any, idx: number) => ({
//     name: `Load ${idx + 1}`,
//     weight: load.weight || 0,
//     value: load.value || 0,
//   })) || [{ name: "No Data", weight: 0, value: 0 }];

//   const pieData = [
//     { name: "Available", value: userData.availableFrom ? 1 : 0 },
//     { name: "Unavailable", value: userData.availableFrom ? 0 : 1 },
//   ];

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Dashboard</h1>
//         <p>Welcome back, {userData.firstName}!</p>
//       </header>

//       {/* User Info */}
//       <section className="user-info">
//         <h2>User Information</h2>
//         <div className="info-grid">
//           <div>
//             <strong>Name:</strong> {userData.firstName} {userData.lastName}
//           </div>
//           <div>
//             <strong>Email:</strong> {userData.email}
//           </div>
//           <div>
//             <strong>Phone:</strong> {userData.phoneNumber || "Not provided"}
//           </div>
//           <div>
//             <strong>Address:</strong> {userData.address || "Not provided"}
//           </div>
//           <div>
//             <strong>Status:</strong> {userData.loadStatus || "N/A"}
//           </div>
//           <div>
//             <strong>Customer Since:</strong>{" "}
//             {userData.availableFrom
//               ? new Date(userData.availableFrom).toLocaleDateString()
//               : "N/A"}
//           </div>
//           <div>
//             <strong>Type of Owner:</strong> {userData.userType || "N/A"}
//           </div>
//           <div>
//             <strong>Experience Level:</strong> {userData.experienceLevel || "N/A"}
//           </div>
//           <div>
//             <strong>Preferred Load:</strong> {userData.preferredLoadType || "N/A"}
//           </div>
//           <div>
//             <strong>Company:</strong> {userData.company || "N/A"}
//           </div>
//           <div>
//             <strong>Subscribed:</strong> {userData.subscribed ? "Yes" : "No"}
//           </div>
//           <div>
//             <strong>Rating:</strong> {userData.rating || "N/A"}
//           </div>
//         </div>
//       </section>

//       {/* Charts */}
//       <section className="chart-container">
//         <h2>Analytics</h2>

//         {/* Pie Chart */}
//         <div className="pie-charts">
//           <PieChart width={250} height={250}>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         {/* Bar Chart */}
//         <div className="bar-chart-wrapper">
//           <BarChart
//             width={900}
//             height={400}
//             data={barData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend verticalAlign="top" />
//             <ReferenceLine y={0} stroke="#000" />
//             <Brush dataKey="name" height={30} stroke="#8884d8" />
//             <Bar dataKey="weight" fill="#8884d8" />
//             <Bar dataKey="value" fill="#82ca9d" />
//           </BarChart>
//         </div>
//       </section>

//       <Link to="/User" className="home-link">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Dash;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
//   Brush,
// } from "recharts";
// import axios from "axios";
// import "./Dash.css";

// const SERVER_PORT = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// // Colors for pie charts
// const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// interface LoadData {
//   weight: number;
//   value: number;
//   rating: number;
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
//   experienceLevel?: string;
//   preferredLoadType?: string;
//   company?: string;
//   subscribed?: boolean;
//   rating?: number;
//   profileImage?: string;
//   loadDetails?: LoadData[];
// }

// const Dash: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       setError("User ID not found in local storage.");
//       setLoading(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get<UserData>(`${SERVER_PORT}/api/user/view/${userId}`);
//         setUserData(res.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <div className="loading">Loading user data...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!userData) return <div className="error">No user data available.</div>;

//   const barData: LoadData[] =
//     userData?.loadDetails?.map((load) => ({
//       weight: load.weight || 0,
//       value: load.value || 0,
//       rating: load.rating || 0,
//     })) || [{ weight: 0, value: 0, rating: 0 }];

//   const pieData = [
//     { name: "Available", value: userData.availableFrom ? 1 : 0 },
//     { name: "Unavailable", value: userData.availableFrom ? 0 : 1 },
//   ];

//   // Find top-rated load for highlight
//   const topLoadIndex = barData.reduce((maxIdx: number, currentLoad: LoadData, idx: number, arr: LoadData[]) =>
//     currentLoad.rating > arr[maxIdx].rating ? idx : maxIdx
//   , 0);

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         {userData.profileImage && (
//           <img src={userData.profileImage} alt="Profile" className="profile-img" />
//         )}
//         <h1>Dashboard</h1>
//         <p>Welcome back, {userData.firstName}!</p>
//       </header>

//       <section className="user-info">
//         <h2>User Information</h2>
//         <div className="info-grid">
//           <div className="info-card">
//             <strong>Name:</strong> {userData.firstName} {userData.lastName}
//           </div>
//           <div className="info-card">
//             <strong>Email:</strong> {userData.email}
//           </div>
//           <div className="info-card">
//             <strong>Phone:</strong> {userData.phoneNumber || "Not provided"}
//           </div>
//           <div className="info-card">
//             <strong>Address:</strong> {userData.address || "Not provided"}
//           </div>
//           <div className="info-card">
//             <strong>Status:</strong> {userData.loadStatus || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Customer Since:</strong>{" "}
//             {userData.availableFrom ? new Date(userData.availableFrom).toLocaleDateString() : "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Type of Owner:</strong> {userData.userType || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Experience Level:</strong> {userData.experienceLevel || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Preferred Load:</strong> {userData.preferredLoadType || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Company:</strong> {userData.company || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Subscribed:</strong> {userData.subscribed ? "Yes" : "No"}
//           </div>
//           <div className="info-card">
//             <strong>Rating:</strong> {userData.rating || "N/A"}
//           </div>
//         </div>
//       </section>

//       <section className="chart-container">
//         <h2>Analytics</h2>

//         <div className="pie-charts">
//           <PieChart width={250} height={250}>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {pieData.map((slice, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div className="bar-chart-wrapper">
//           <BarChart
//             width={900}
//             height={400}
//             data={barData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend verticalAlign="top" />
//             <ReferenceLine y={0} stroke="#000" />
//             <Brush dataKey="name" height={30} stroke="#8884d8" />
//             <Bar
//               dataKey="weight"
//               fill="#8884d8"
//               name="Weight"
//               maxBarSize={50}
//               isAnimationActive
//               label={{ position: "top" }}
//             >
//               {barData.map((_, idx) =>
//                 idx === topLoadIndex ? <Cell key={`cell-${idx}`} fill="#FF8042" /> : null
//               )}
//             </Bar>
//             <Bar
//               dataKey="value"
//               fill="#82ca9d"
//               name="Value"
//               maxBarSize={50}
//               isAnimationActive
//               label={{ position: "top" }}
//             />
//           </BarChart>
//         </div>
//       </section>

//       <Link to="/User" className="home-link">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Dash;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
//   Brush,
// } from "recharts";
// import axios from "axios";
// import "./Dash.css";

// const SERVER_PORT = process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

// const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// interface LoadData {
//   weight: number;
//   value: number;
//   rating: number;
//   name?: string; // optional name for display on chart
// }

// interface UserData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber?: string;
//   address?: string;
//   qrCode?: string;
//   qrCodeId?: string;
//   qrData?: string;
//   qrPNG?: string;
//   loadStatus?: string;
//   availableFrom?: string;
//   userType?: string;
//   experienceLevel?: string;
//   preferredLoadType?: string;
//   company?: string;
//   subscribed?: boolean;
//   rating?: number;
//   profileImage?: string;
//   loadDetails?: LoadData[];
// }

// const Dash: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       setError("User ID not found in local storage.");
//       setLoading(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get<UserData>(`${SERVER_PORT}/api/user/view/${userId}`);
//         setUserData(res.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <div className="loading">Loading user data...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (!userData) return <div className="error">No user data available.</div>;

//   // ✅ TypeScript knows userData is not null here
//   const {
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     address,
//     qrCode,
//     qrCodeId,
//     qrData,
//     qrPNG,
//     loadStatus,
//     availableFrom,
//     userType,
//     experienceLevel,
//     preferredLoadType,
//     company,
//     subscribed,
//     rating,
//     profileImage,
//     loadDetails,
//   } = userData;

//   const barData: LoadData[] =
//     loadDetails?.map((load, idx) => ({
//       ...load,
//       name: `Load ${idx + 1}`, // optional for x-axis
//     })) || [{ weight: 0, value: 0, rating: 0, name: "N/A" }];

//   const pieData = [
//     { name: "Available", value: availableFrom ? 1 : 0 },
//     { name: "Unavailable", value: availableFrom ? 0 : 1 },
//   ];

//   const topLoadIndex = barData.reduce(
//     (maxIdx: number, currentLoad: LoadData, idx: number, arr: LoadData[]) =>
//       currentLoad.rating > arr[maxIdx].rating ? idx : maxIdx,
//     0
//   );

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         {profileImage && <img src={profileImage} alt="Profile" className="profile-img" />}
//         <h1>Dashboard</h1>
//         <p>Welcome back, {firstName}!</p>
//       </header>

//       <section className="user-info">
//         <h2>User Information</h2>
//         <div className="info-grid">
//           <div className="info-card">
//             <strong>Name:</strong> {firstName} {lastName}
//           </div>
//           <div className="info-card">
//             <strong>Email:</strong> {email}
//           </div>
//           <div className="info-card">
//             <strong>Phone:</strong> {phoneNumber || "Not provided"}
//           </div>
//           <div className="info-card">
//             <strong>Address:</strong> {address || "Not provided"}
//           </div>
//           <div className="info-card">
//             <strong>QR Code:</strong> {qrCode || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>QR Code ID:</strong> {qrCodeId || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>QR Data:</strong> {qrData || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>QR PNG:</strong> {qrPNG || "N/A"}
//           </div>
//           {/* QR Code Card */}
//           <div className="card" style={{ padding: "20px", textAlign: "center" }}>
//             <h3>Your QR Code</h3>

//             {qrPNG ? (
//               <img
//                 src={qrPNG}
//                 alt="QR Code"
//                 style={{
//                   width: "200px",
//                   height: "200px",
//                   objectFit: "contain",
//                   marginTop: "15px",
//                   borderRadius: "12px",
//                   border: "1px solid #eee",
//                   padding: "10px",
//                   background: "#fff",
//                 }}
//               />
//             ) : (
//               <p style={{ marginTop: "10px", color: "#888" }}>No QR code available</p>
//             )}
//           </div>

//           <div className="info-card">
//             <strong>Status:</strong> {loadStatus || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Customer Since:</strong> {availableFrom ? new Date(availableFrom).toLocaleDateString() : "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Type of Owner:</strong> {userType || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Experience Level:</strong> {experienceLevel || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Preferred Load:</strong> {preferredLoadType || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Company:</strong> {company || "N/A"}
//           </div>
//           <div className="info-card">
//             <strong>Subscribed:</strong> {subscribed ? "Yes" : "No"}
//           </div>
//           <div className="info-card">
//             <strong>Rating:</strong> {rating || "N/A"}
//           </div>
//         </div>
//       </section>

//       <section className="chart-container">
//         <h2>Analytics</h2>

//         <div className="pie-charts">
//           <PieChart width={250} height={250}>
//             <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
//               {pieData.map((slice, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div className="bar-chart-wrapper">
//           <BarChart width={900} height={400} data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend verticalAlign="top" />
//             <ReferenceLine y={0} stroke="#000" />
//             <Brush dataKey="name" height={30} stroke="#8884d8" />
//             <Bar dataKey="weight" fill="#8884d8" name="Weight" maxBarSize={50} label={{ position: "top" }}>
//               {barData.map((_, idx) =>
//                 idx === topLoadIndex ? <Cell key={`cell-${idx}`} fill="#FF8042" /> : null
//               )}
//             </Bar>
//             <Bar dataKey="value" fill="#82ca9d" name="Value" maxBarSize={50} label={{ position: "top" }} />
//           </BarChart>
//         </div>
//       </section>

//       <Link to="/User" className="home-link">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Dash;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
} from "recharts";
import axios from "axios";
import "./Dash.css";

const SERVER_PORT =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface LoadData {
  weight: number;
  value: number;
  rating: number;
  name?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  qrCode?: string;
  qrCodeId?: string;
  qrData?: string;
  qrPNG?: string;
  loadStatus?: string;
  availableFrom?: string;
  userType?: string;
  experienceLevel?: string;
  preferredLoadType?: string;
  company?: string;
  subscribed?: boolean;
  rating?: number;
  profileImage?: string;
  loadDetails?: LoadData[];
}

const Dash: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found in local storage.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get<UserData>(
          `${SERVER_PORT}/api/user/view/${userId}`
        );
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Loading user data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div className="error">No user data available.</div>;

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    qrCode,
    qrCodeId,
    qrData,
    qrPNG,
    loadStatus,
    availableFrom,
    userType,
    experienceLevel,
    preferredLoadType,
    company,
    subscribed,
    rating,
    profileImage,
    loadDetails,
  } = userData;

  const barData: LoadData[] =
    loadDetails?.map((load, idx) => ({
      ...load,
      name: `Load ${idx + 1}`,
    })) || [{ weight: 0, value: 0, rating: 0, name: "N/A" }];

  const pieData = [
    { name: "Available", value: availableFrom ? 1 : 0 },
    { name: "Unavailable", value: availableFrom ? 0 : 1 },
  ];

  const topLoadIndex = barData.reduce(
    (maxIdx: number, currentLoad: LoadData, idx: number, arr: LoadData[]) =>
      currentLoad.rating > arr[maxIdx].rating ? idx : maxIdx,
    0
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        {profileImage && (
          <img src={profileImage} alt="Profile" className="profile-img" />
        )}
        <h1>Dashboard</h1>
        <p>Welcome back, {firstName}!</p>
      </header>

      {/* USER INFO */}
      <section className="user-info">
        <h2>User Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <strong>Name:</strong> {firstName} {lastName}
          </div>
          <div className="info-card">
            <strong>Email:</strong> {email}
          </div>
          <div className="info-card">
            <strong>Phone:</strong> {phoneNumber || "Not provided"}
          </div>
          <div className="info-card">
            <strong>Address:</strong> {address || "Not provided"}
          </div>
          <div className="info-card">
            <strong>QR Code:</strong> {qrCode || "N/A"}
          </div>
          <div className="info-card">
            <strong>QR Code ID:</strong> {qrCodeId || "N/A"}
          </div>
          <div className="info-card">
            <strong>QR Data:</strong> {qrData || "N/A"}
          </div>
          <div className="info-card">
            <strong>QR PNG:</strong> {qrPNG || "N/A"}
          </div>
          <div className="info-card">
            <strong>Status:</strong> {loadStatus || "N/A"}
          </div>
          <div className="info-card">
            <strong>Customer Since:</strong>{" "}
            {availableFrom
              ? new Date(availableFrom).toLocaleDateString()
              : "N/A"}
          </div>
          <div className="info-card">
            <strong>Type of Owner:</strong> {userType || "N/A"}
          </div>
          <div className="info-card">
            <strong>Experience Level:</strong> {experienceLevel || "N/A"}
          </div>
          <div className="info-card">
            <strong>Preferred Load:</strong> {preferredLoadType || "N/A"}
          </div>
          <div className="info-card">
            <strong>Company:</strong> {company || "N/A"}
          </div>
          <div className="info-card">
            <strong>Subscribed:</strong> {subscribed ? "Yes" : "No"}
          </div>
          <div className="info-card">
            <strong>Rating:</strong> {rating || "N/A"}
          </div>
        </div>
      </section>

      {/* ✅ QR PNG DISPLAY SECTION */}
      <section className="qr-section">
        <h2>Your QR Code</h2>
        <div className="qr-card">
          {qrPNG ? (
            <img
              src={qrPNG}
              alt="User QR Code"
              className="qr-image"
            />
          ) : (
            <p>No QR Image Available</p>
          )}
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="chart-container">
        <h2>Analytics</h2>

        <div className="pie-charts">
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((slice, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bar-chart-wrapper">
          <BarChart
            width={900}
            height={400}
            data={barData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            <Bar
              dataKey="weight"
              fill="#8884d8"
              name="Weight"
              maxBarSize={50}
              label={{ position: "top" }}
            >
              {barData.map((_, idx) =>
                idx === topLoadIndex ? (
                  <Cell key={`cell-${idx}`} fill="#FF8042" />
                ) : null
              )}
            </Bar>
            <Bar
              dataKey="value"
              fill="#82ca9d"
              name="Value"
              maxBarSize={50}
              label={{ position: "top" }}
            />
          </BarChart>
        </div>
      </section>

      <Link to="/User" className="home-link">
        Back to Home
      </Link>
    </div>
  );
};

export default Dash;
