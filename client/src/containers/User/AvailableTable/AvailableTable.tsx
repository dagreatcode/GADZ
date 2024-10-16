import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";
import styles from "./AvailableTable.module.css"; // Import CSS module

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
            fetchDirections(location, { lat: 37.8199, lng: -122.4783 }); // Golden Gate Bridge
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

      // Fetch updated loads after adding a new load
      const updatedResponse = await axios.get(
        `${process.env.REACT_APP_SOCKET_IO_CLIENT_PORT}/api/loads`
      );
      setLoads(updatedResponse.data);

      // Update user's loads after adding a new load
      const filteredLoads = updatedResponse.data.filter(
        (load: Load) => load.userId === userId
      );
      setUserLoads(filteredLoads);
    } catch (error) {
      console.error("Error creating load:", error);
    }
  };

  return (
    <div className={styles.container}>
      <img
        src="https://example.com/truck.png"
        alt="Truck Animation"
        className={styles.truckAnimation}
      />
      <h1 className={styles.header}>Available Table / Load Board</h1>
      <h5 className={styles.subHeader}>
        This is where we can see the Load Board and click on a company to do
        business with or add to cart.
      </h5>
      <Table data={drivers} title="Drivers" isUser={true} />
      <Table data={loads} title="All Loads" isUser={false} />
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
              <td className={styles.tableCell}>{load.company}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        to="/User"
        style={{ margin: "20px", textDecoration: "none", color: "#2980b9" }}
      >
        Home
      </Link>

      <Link
        to="/UserProfile"
        style={{
          margin: "20px",
          textDecoration: "none",
          color: "#2980b9",
        }}
      >
        Profile
      </Link>

      <div className={styles.mapContainer}>
        {process.env.REACT_APP_API_KEY_MAP ? (
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_API_KEY_MAP}
            onLoad={handleLoad}
          >
            <GoogleMap
              zoom={10}
              mapContainerStyle={{ width: "100vw", height: "100vh" }}
              center={currentLocation || { lat: 37.8199, lng: -122.4783 }} // Default to Golden Gate Bridge
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
          <div className={styles.mapError}>Map API key is missing.</div>
        )}
      </div>
    </div>
  );
};

const Table: React.FC<{
  data: User[] | Load[];
  title: string;
  isUser: boolean;
}> = ({ data, title, isUser }) => (
  <table className={styles.loadTable}>
    <thead>
      <tr>
        <th className={styles.tableHeader}>{title}</th>
        {isUser ? (
          <>
            <th className={styles.tableHeader}>First</th>
            <th className={styles.tableHeader}>Last</th>
            <th className={styles.tableHeader}>Handle</th>
          </>
        ) : (
          <>
            {/* <th className={styles.tableHeader}>Load ID</th> */}
            <th className={styles.tableHeader}>Description</th>
            <th className={styles.tableHeader}>Company</th>
          </>
        )}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className={styles.tableRow}>
          {isUser ? (
            <>
              <td className={styles.tableCell}>{(item as User).handle}</td>
              <td className={styles.tableCell}>{(item as User).first}</td>
              <td className={styles.tableCell}>{(item as User).last}</td>
            </>
          ) : (
            <>
              <td className={styles.tableCell}>{(item as Load).id}</td>
              <td className={styles.tableCell}>{(item as Load).description}</td>
              <td className={styles.tableCell}>{(item as Load).company}</td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default AvailableTable;
