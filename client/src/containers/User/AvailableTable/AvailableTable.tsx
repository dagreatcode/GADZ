import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";
import Table from "./Table"; 

// Types
interface Load {
  numberOfLoads: number;
  pickupDateTimes: number;
  equipmentInfo: string;
  privateLoadNote: string;
  status: string;
  deliveryDateTimeUtc: number;
  mileage: number;
  numberOfStops: number;
  id: number;
  description: string;
  company: string;
  userId: string;
}

interface Driver {
  description: string;
  company: string;
  userId: string;
}

interface LoadboardData {
  loads: Load[];
}

const AvailableTable: React.FC = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [userLoads, setUserLoads] = useState<Load[]>([]);
  const [loadboardData, setLoadboardData] = useState<Load[]>([]);
  const [newLoad, setNewLoad] = useState<Load>({
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
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [userDrivers, setUserDrivers] = useState<Driver[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (code) {
      fetchLoadboardData(code);
    }
  }, [code]);

  const fetchLoads = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
      );
      setLoads(response.data);

      const userId = localStorage.getItem("userId");
      if (userId) {
        const filteredLoads = response.data.filter(
          (load: Load) => load.userId === userId
        );
        setUserLoads(filteredLoads);
      }
    } catch (error) {
      console.error("Error fetching loads:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`
      );
      setDriverList(response.data);

      const userId = localStorage.getItem("userId");
      if (userId) {
        const filteredDrivers = response.data.filter(
          (driver: Driver) => driver.userId === userId
        );
        setUserDrivers(filteredDrivers);
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchLoadboardData = async (authCode: string) => {
    try {
      const response = await axios.get<LoadboardData>(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback/`,
        { params: { code: authCode } }
      );
      setLoadboardData(response.data.loads);
    } catch (error) {
      console.error("Error fetching 123Loadboard data:", error);
    }
  };

  const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
  };

  const handleDriverInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const handleSubmitLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    try {
      const requestData = { ...newLoad, userId };
      await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`,
        requestData
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
    } catch (error) {
      console.error("Error creating load:", error);
    }
  };

  const handleSubmitDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    try {
      const requestData = { ...newDriver, userId };
      await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`,
        requestData
      );
      setNewDriver({ description: "", company: "", userId: "" });
      fetchDrivers();
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };

  const handleAuthorizeNavigation = () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api/123Loads/authorize"
        : "https://gadzconnect.com/api/123Loads/authorize";
    window.location.href = baseUrl;
  };

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <img src={GADZTruck} alt="Truck Animation" className={styles.truck} />
        <h1 className={styles.title}>🚛 GADZConnect Load Board</h1>
        <p className={styles.subtitle}>
          Manage your drivers, loads, and connect with 123Loadboard seamlessly
        </p>
        <Link to="/User" className={styles.homeLink}>
          Back to Dashboard
        </Link>
      </header>

      {/* Driver Controls */}
      <section className={styles.section}>
        <h2>👨‍✈️ Drivers</h2>
        <div className={styles.buttonGroup}>
          <button onClick={fetchDrivers} className={styles.button}>
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

        <form className={styles.form} onSubmit={handleSubmitDriver}>
          <h3>Add New Driver</h3>
          <input
            className={styles.input}
            type="text"
            name="description"
            placeholder="Driver Description"
            value={newDriver.description}
            onChange={handleDriverInputChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="company"
            placeholder="Company"
            value={newDriver.company}
            onChange={handleDriverInputChange}
            required
          />
          <button type="submit" className={styles.submitButton}>
            ➕ Add Driver
          </button>
        </form>
      </section>

      {/* Loads Controls */}
      <section className={styles.section}>
        <h2>📦 Loads</h2>
        <div className={styles.buttonGroup}>
          <button onClick={fetchLoads} className={styles.button}>
            Fetch Loads
          </button>
        </div>
        <Table data={loads} title="All Loads" isUser={false} showCompanyLink />

        <h3>Your Loads</h3>
        <table className={styles.table}>
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
                  <Link to={`/UserProfile/${load.userId}`} className={styles.link}>
                    {load.company}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form className={styles.form} onSubmit={handleSubmitLoad}>
          <h3>Add New Load</h3>
          <input
            className={styles.input}
            type="text"
            name="description"
            placeholder="Load Description"
            value={newLoad.description}
            onChange={handleLoadInputChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="company"
            placeholder="Company"
            value={newLoad.company}
            onChange={handleLoadInputChange}
            required
          />
          <button type="submit" className={styles.submitButton}>
            ➕ Add Load
          </button>
        </form>
      </section>

      {/* 123Loadboard Section */}
      <section className={styles.section}>
        <h2>🌐 123Loadboard</h2>
        <div className={styles.buttonGroup}>
          <button onClick={handleAuthorizeNavigation} className={styles.buttonAlt}>
            🔑 Authorize
          </button>
          <button
            onClick={() => fetchLoadboardData(code || "")}
            className={styles.button}
          >
            📥 Fetch 123Loadboard Data
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Load ID</th>
                <th>Description</th>
                <th>Company</th>
                <th>Delivery</th>
                <th>Stops</th>
                <th>Mileage</th>
                <th># Loads</th>
                <th>Pickup</th>
                <th>Equipment</th>
                <th>Note</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loadboardData.map((load) => (
                <tr key={load.id}>
                  <td>{load.id}</td>
                  <td>{load.description}</td>
                  <td>{load.company}</td>
                  <td>{load.deliveryDateTimeUtc}</td>
                  <td>{load.numberOfStops}</td>
                  <td>{load.mileage}</td>
                  <td>{load.numberOfLoads}</td>
                  <td>{load.pickupDateTimes}</td>
                  <td>{load.equipmentInfo}</td>
                  <td>{load.privateLoadNote}</td>
                  <td>{load.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AvailableTable;
