import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";

// User and Load types
interface User {
  first: string;
  last: string;
  handle: string;
}

interface Load {
  id: number;
  description: string;
  company: string;
  userId: string;
}

interface LoadboardData {
  loads: Load[];
}

interface AvailableTableProps {
  drivers?: User[];
}

const AvailableTable: React.FC<AvailableTableProps> = ({ drivers = [] }) => {
  // State hooks
  const [loads, setLoads] = useState<Load[]>([]);
  const [userLoads, setUserLoads] = useState<Load[]>([]);
  const [loadboardData, setLoadboardData] = useState<Load[]>([]);
  const [newLoad, setNewLoad] = useState<Load>({
    id: 0,
    description: "",
    company: "",
    userId: "",
  });
  
  // Extracting the code from URL params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  
  useEffect(() => {
    if (code) {
      // Send the authorization code to the backend API
      fetchLoadboardData(code);
    }
  }, [code]);

  // Fetching loads from the backend
  const fetchLoads = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`);
      setLoads(response.data);

      const userId = localStorage.getItem("userId");
      if (userId) {
        const filteredLoads = response.data.filter((load: Load) => load.userId === userId);
        setUserLoads(filteredLoads);
      }
    } catch (error) {
      console.error("Error fetching loads:", error);
    }
  };

  // Fetch 123Loadboard data after receiving the authorization code
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

  // Handling input changes for new load
  const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
  };

  // Submitting a new load
  const handleSubmitLoad = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    try {
      const requestData = { ...newLoad, userId };
      await axios.post(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`, requestData);
      setNewLoad({ id: 0, description: "", company: "", userId });

      const updatedResponse = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`);
      setLoads(updatedResponse.data);

      const filteredLoads = updatedResponse.data.filter((load: Load) => load.userId === userId);
      setUserLoads(filteredLoads);
    } catch (error) {
      console.error("Error creating load:", error);
    }
  };

  // Redirect to authorization
  const handleAuthorizeNavigation = () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/authorize"
        : "https://gadzconnect.com/authorize";
    window.location.href = baseUrl;
  };

  return (
    <div className={styles.container}>
      <img src={GADZTruck} alt="Truck Animation" className={styles.truckAnimation} />
      <h1 className={styles.header}>Available Table / Load Board</h1>
      <h5 className={styles.subHeader}>
        This is where we can see the Load Board and click on a company to do
        business with or add to cart.
      </h5>
      <Link to="/User" style={{ margin: "20px", textDecoration: "none", color: "#2980b9" }}>
        Home
      </Link>
      <h3>GADZConnect Table</h3>
      <button onClick={fetchLoads} className={styles.button}>
        Fetch My Loads
      </button>
      <Table data={drivers} title="Drivers" isUser={true} />
      <br />
      <hr />
      <Table data={loads} title="All Loads" isUser={false} showCompanyLink={true} />
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
                <Link to={`/UserProfile/${load.userId}`} className={styles.loadLink}>
                  {load.company}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <br />
      <h3>123Loadboard Table</h3>
      <button onClick={handleAuthorizeNavigation} className={styles.button}>
        Authorize
      </button>
      <button onClick={() => fetchLoadboardData(code || "")} className={styles.button}>
        Fetch 123Loadboard Data
      </button>
      <table className={styles.loadTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Load ID</th>
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>Company</th>
          </tr>
        </thead>
        <tbody>
          {loadboardData.map((load) => (
            <tr key={load.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{load.id}</td>
              <td className={styles.tableCell}>{load.description}</td>
              <td className={styles.tableCell}>{load.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
};

interface TableProps {
  data: User[] | Load[];
  title: string;
  isUser: boolean;
  showCompanyLink?: boolean;
}

const Table: React.FC<TableProps> = ({ data, title, isUser, showCompanyLink = false }) => (
  <div>
    <h3>{title}</h3>
    <table className={styles.loadTable}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>Name</th>
          <th className={styles.tableHeader}>Handle</th>
          <th className={styles.tableHeader}>Company</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: User | Load) => {
          if (isUser) {
            const user = item as User;
            return (
              <tr key={user.handle}>
                <td className={styles.tableCell}>{`${user.first} ${user.last}`}</td>
                <td className={styles.tableCell}>{user.handle}</td>
                <td className={styles.tableCell}>N/A</td>
              </tr>
            );
          }
          const load = item as Load;
          return (
            <tr key={load.id}>
              <td className={styles.tableCell}>{load.description}</td>
              <td className={styles.tableCell}>{load.userId}</td>
              <td className={styles.tableCell}>
                {showCompanyLink && (
                  <Link to={`/Company/${load.userId}`} className={styles.loadLink}>
                    {load.company}
                  </Link>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AvailableTable;
