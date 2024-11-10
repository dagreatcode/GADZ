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
  });
  const [driverList, setDriverList] = useState<Driver[]>([]);

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
      });
      fetchDrivers();
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
        Fetch My Loads
      </button>

      <button
        onClick={fetchDrivers}
        className={`${styles.button} ${styles.fetchButton}`}
        aria-label="Fetch my drivers"
      >
        Fetch Drivers
      </button>

      {/* Driver Table */}
      <Table data={driverList} title="Drivers" isUser={true} />
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

      <h3>Your Drivers</h3>
      <Table
        data={driverList} // Pass the list of drivers
        title="Drivers"
        isUser={true} // Set to true because we are displaying user data (drivers in this case)
        showCompanyLink={false} // You don't need to link to the company for drivers
      />

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
        <button className={styles.button} type="submit">
          Add Load
        </button>
      </form>

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
        <button className={styles.button} type="submit">
          Add Driver
        </button>
      </form>

      <h3>123Loadboard Table</h3>
      <button
        onClick={handleAuthorizeNavigation}
        className={`${styles.button} ${styles.authorizeButton}`}
        aria-label="Authorize with 123Loadboard"
      >
        Authorize
      </button>
      <button
        onClick={() => fetchLoadboardData(code || "")}
        className={`${styles.button} ${styles.fetchButton}`}
        aria-label="Fetch 123Loadboard data"
      >
        Fetch 123Loadboard Data
      </button>
      <table className={styles.loadboardTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Load ID</th>
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>Company</th>
            <th className={styles.tableHeader}>Delivery Date Time Utc</th>
            <th className={styles.tableHeader}>Number Of Stops</th>
            <th className={styles.tableHeader}>Mileage</th>
            <th className={styles.tableHeader}>Number Of Loads</th>
            <th className={styles.tableHeader}>Pickup Date Times</th>
            <th className={styles.tableHeader}>Equipment Info</th>
            <th className={styles.tableHeader}>Private LoadNote</th>
            <th className={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {loadboardData.map((load) => (
            <tr key={load.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{load.id}</td>
              <td className={styles.tableCell}>{load.description}</td>
              <td className={styles.tableCell}>{load.company}</td>
              <td className={styles.tableCell}>{load.deliveryDateTimeUtc}</td>
              <td className={styles.tableCell}>{load.numberOfStops}</td>
              <td className={styles.tableCell}>{load.mileage}</td>
              <td className={styles.tableCell}>{load.numberOfLoads}</td>
              <td className={styles.tableCell}>{load.pickupDateTimes}</td>
              <td className={styles.tableCell}>{load.equipmentInfo}</td>
              <td className={styles.tableCell}>{load.privateLoadNote}</td>
              <td className={styles.tableCell}>{load.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableTable;
