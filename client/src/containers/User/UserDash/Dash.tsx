import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import "./Dash.css"; // Make sure to update styles in this file

const ServerPort =
  process.env.REACT_APP_SOCKET_IO_CLIENT_PORT || "http://localhost:3001";

const Dash = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${ServerPort}/api/user/view/${userId}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setError("User ID not found in local storage.");
      setLoading(false);
    }
  }, []);

  const data = [
    // Your existing data for bar chart
    { name: "1", uv: 300, pv: 456 },
    { name: "2", uv: -145, pv: 230 },
    // ... other data points
  ];

  const data2 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    // ... other data points
  ];

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phoneNumber || "Not provided"}</p>
        <p><strong>Address:</strong> {userData.address || "Not provided"}</p>
        <p><strong>Available Status:</strong> {userData.loadStatus}</p>
        <p><strong>Customer Since:</strong> {new Date(userData.availableFrom).toLocaleDateString()}</p>
        <p><strong>Type of Owner:</strong> {userData.userType}</p>
      </div>

      <div className="chart-container">
        <h2>Charts</h2>
        <div className="pie-charts">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="pie-chart-wrapper">
                <PieChart width={300} height={300} className="pie-chart">
                  <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data2}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                </PieChart>
              </div>
            ))}
        </div>

        <div className="bar-chart-wrapper">
          <BarChart
            width={1000}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            className="bar-chart"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      <Link to="/User" className="home-link">
        Home
      </Link>
    </>
  );
};

export default Dash;
