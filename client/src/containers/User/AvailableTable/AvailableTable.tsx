import React, { useEffect, useState } from "react";
import {
  Link,
  // useNavigate
} from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";

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

interface AvailableTableProps {
  drivers?: User[];
}

const AvailableTable: React.FC<AvailableTableProps> = ({ drivers = [] }) => {
  // const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loads, setLoads] = useState<Load[]>([]);
  const [userLoads, setUserLoads] = useState<Load[]>([]);
  const [newLoad, setNewLoad] = useState<Load>({
    id: 0,
    description: "",
    company: "",
    userId: "",
  });
  const [loadboardData, setLoadboardData] = useState<Load[]>([]);

  useEffect(() => {
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

    fetchLoads();
  }, []);


  const fetchLoadboardData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/auth/callback`);
      setLoadboardData(response.data);
    } catch (error) {
      console.error("Error fetching 123Loadboard data:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          if (mapLoaded) {
            fetchDirections(location, { lat: 37.8199, lng: -122.4783 });
          }
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [mapLoaded]);

  const fetchDirections = async (
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions: ", result);
        }
      }
    );
  };

  const handleLoad = () => {
    setMapLoaded(true);
  };

  const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLoad({ ...newLoad, [e.target.name]: e.target.value });
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
      setNewLoad({ id: 0, description: "", company: "", userId });

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

  // const handleAuthorizeNavigation = () => {
  //   window.location.href = 'https://www.example.com/authorize'; // Replace with your external URL
  // };

  const handleAuthorizeNavigation = () => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/authorize" // Localhost URL (adjust port if needed)
        : "https://gadzconnect.com/authorize"; // Production URL

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
      <h5 className={styles.subHeader}>
        This is where we can see the Load Board and click on a company to do
        business with or add to cart.
      </h5>
      <Link
        to="/User"
        style={{ margin: "20px", textDecoration: "none", color: "#2980b9" }}
      >
        Home
      </Link>
      <h3>GADZConnect Table</h3>
      <Table data={drivers} title="Drivers" isUser={true} />
      <br />
      <hr />
      <Table
        data={loads}
        title="All Loads"
        isUser={false}
        showCompanyLink={true}
      />{" "}
      {/* Pass prop to show company links */}
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
      <button onClick={fetchLoadboardData} className={styles.button}>
        Fetch Loadboard Data
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
      <div className={styles.mapContainer}>
        {process.env.REACT_APP_API_KEY_MAP ? (
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_API_KEY_MAP}
            onLoad={handleLoad}
          >
            <GoogleMap
              zoom={10}
              mapContainerStyle={{ width: "100vw", height: "100vh" }}
              center={currentLocation || { lat: 37.8199, lng: -122.4783 }}
              options={{ gestureHandling: "greedy", disableDefaultUI: true }}
            >
              {currentLocation && (
                <Marker position={currentLocation} title="Your Location" />
              )}
              <Marker
                position={{ lat: 37.8199, lng: -122.4783 }}
                title="Golden Gate Bridge"
              />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        ) : (
          <p>Google Map API key not set.</p>
        )}
      </div>
    </div>
  );
};

const Table: React.FC<{
  data: User[] | Load[];
  title: string;
  isUser: boolean;
  showCompanyLink?: boolean; // Add prop for showing company link
}> = ({ data, title, isUser, showCompanyLink }) => {
  return (
    <div>
      <h2>{title}</h2>
      <table className={styles.loadTable}>
        <thead>
          <tr>
            {isUser ? (
              <>
                <th className={styles.tableHeader}>First</th>
                <th className={styles.tableHeader}>Last</th>
                <th className={styles.tableHeader}>Handle</th>
              </>
            ) : (
              <>
                <th className={styles.tableHeader}>ID</th>
                <th className={styles.tableHeader}>Description</th>
                <th className={styles.tableHeader}>Company</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            isUser ? (
              <tr key={(item as User).handle}>
                <td className={styles.tableCell}>{(item as User).first}</td>
                <td className={styles.tableCell}>{(item as User).last}</td>
                <td className={styles.tableCell}>{(item as User).handle}</td>
              </tr>
            ) : (
              <tr key={(item as Load).id}>
                <td className={styles.tableCell}>{(item as Load).id}</td>
                <td className={styles.tableCell}>
                  {(item as Load).description}
                </td>
                <td className={styles.tableCell}>
                  {/* Conditionally render the link if showCompanyLink is true */}
                  {showCompanyLink ? (
                    <Link
                      to={`/UserProfile/${(item as Load).userId}`}
                      className={styles.loadLink}
                    >
                      {(item as Load).company}
                    </Link>
                  ) : (
                    (item as Load).company
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableTable;
