import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface User {
  first: string;
  last: string;
  handle: string;
}

interface AvailableTableProps {
  drivers?: User[];
  loads?: User[];
}

const googleMapKey = process.env.REACT_APP_API_KEY_MAP;
const goldenGateBridge = { lat: 37.8199, lng: -122.4783 };

const AvailableTable: React.FC<AvailableTableProps> = ({
  drivers = [],
  loads = [],
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false); // State to track if the map has loaded

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
            fetchDirections(location, goldenGateBridge); // Fetch directions only if map is loaded
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
    if (!googleMapKey) return;

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
    setMapLoaded(true); // Set the map loaded state to true
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ height: "300px", overflowY: "scroll", padding: "20px" }}>
        <h1 style={{ color: "#2c3e50" }}>Available Table / Load Board</h1>
        <h5>
          This is where we can see the Load Board and click on a company to do
          business with or add to cart.
        </h5>
        <Table data={drivers} title="Drivers" />
        <Table data={loads} title="Loads" />
      </div>
      <Link
        to="/User"
        style={{ margin: "20px", textDecoration: "none", color: "#2980b9" }}
      >
        Home
      </Link>

      <div
        className="container"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {googleMapKey ? (
          <LoadScript googleMapsApiKey={googleMapKey} onLoad={handleLoad}>
            <GoogleMap
              zoom={10}
              mapContainerStyle={{
                width: "100vw",
                height: "100vh",
              }}
              center={currentLocation || goldenGateBridge}
              options={{
                gestureHandling: "greedy",
                disableDefaultUI: true,
              }}
            >
              {currentLocation && (
                <Marker position={currentLocation} title="Your Location" />
              )}
              <Marker position={goldenGateBridge} title="Golden Gate Bridge" />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        ) : (
          <div style={{ color: "red" }}>Map API key is missing.</div>
        )}
      </div>
    </div>
  );
};

const Table: React.FC<{ data: User[]; title: string }> = ({ data, title }) => (
  <table className="table" style={{ marginTop: "20px" }}>
    <thead className="thead-dark">
      <tr>
        <th scope="col">{title}</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
        <th scope="col">Profile</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.first}</td>
          <td>{item.last}</td>
          <td>{item.handle}</td>
          <td>
            <Link to="/UserProfile">UserProfile</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AvailableTable;
