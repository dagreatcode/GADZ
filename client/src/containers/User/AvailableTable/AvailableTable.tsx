import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";
import Table from "./Table"; // Update the path as needed

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
  userId: string;  // Add userId for filtering
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

      // Filter drivers based on current user ID
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

      const updatedResponse = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
      );
      setLoads(updatedResponse.data);
      const filteredLoads = updatedResponse.data.filter(
        (load: Load) => load.userId === userId
      );
      setUserLoads(filteredLoads);
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
      const requestData = {
        description: newDriver.description,
        company: newDriver.company,
        userId,
      };
      await axios.post(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/drivers`,
        requestData
      );
      setNewDriver({
        description: "",
        company: "",
        userId: "",
      });
      fetchDrivers();  // Fetch drivers after adding a new one
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };

  const handleAuthorizeNavigation = () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/authorize"
        : "https://gadzconnect.com/authorize";
    window.location.href = baseUrl;
  };

  return (
    <div className={styles.container}>
      <img
        src={GADZTruck}
        alt="Truck Animation"
        className={styles.truckAnimation}
      />
      <h1 className={styles.header}>Available Table / Load Board</h1>
      <Link to="/User" className={styles.homeLink}>
        Home
      </Link>

      <h3>GADZConnect Table</h3>
      <button
        onClick={fetchLoads}
        className={`${styles.button} ${styles.fetchButton}`}
        aria-label="Fetch my loads"
      >
        Fetch Loads
      </button>

      <button
        onClick={fetchDrivers}
        className={`${styles.button} ${styles.fetchButton}`}
        aria-label="Fetch my drivers"
      >
        Fetch Drivers
      </button>
      <br />
      <br />
      {/* Driver Table */}
      <Table data={driverList} title="All Drivers" isUser={true} />
      <br />
      <br />
      <hr />
      {/* Your Drivers Table */}
      <Table
        data={userDrivers} // Display only the user's drivers
        title="Your Drivers"
        isUser={true} // Set to true because we are displaying user data (drivers)
        showCompanyLink={false} // No company link for drivers
      />
      <br />
      <br />
      <hr />
      {/* Load Table */}
      <Table
        data={loads}
        title="All Loads"
        isUser={false}
        showCompanyLink={true}
      />
      <br />
      <br />
      <h3>Your Loads</h3>
      <table className={styles.loadTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Load ID</th>
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>Company</th>
          </tr>
        </thead>
        <tbody>
          {userLoads.map((load) => (
            <tr key={load.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{load.id}</td>
              <td className={styles.tableCell}>{load.description}</td>
              <td className={styles.tableCell}>
                <Link
                  to={`/UserProfile/${load.userId}`}
                  className={styles.loadLink}
                >
                  {load.company}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <hr />
      {/* New Load Form */}
      <form className={styles.form} onSubmit={handleSubmitLoad}>
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
        {/* Add more fields as needed */}
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
        >
          Create Load
        </button>
      </form>
      <br />
      {/* New Driver Form */}
      <form className={styles.form} onSubmit={handleSubmitDriver}>
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
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
        >
          Create Driver
        </button>
      </form>
    </div>
  );
};

export default AvailableTable;
