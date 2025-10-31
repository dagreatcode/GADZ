import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./AvailableTable.module.css";
import GADZTruck from "./GADZBoat.png";
import Table from "./Table";

// ---------- Interfaces ----------
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

// ---------- Utility ----------
const getCookie = (name: string): string | null => {
  const v = `; ${document.cookie}`;
  const parts = v.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
};

// Use environment variable or fallback
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// ---------- Main Component ----------
const AvailableTable: React.FC = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [userLoads, setUserLoads] = useState<Load[]>([]);
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [userDrivers, setUserDrivers] = useState<Driver[]>([]);
  const [searchResults, setSearchResults] = useState<Load[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [data, setData] = useState(null);

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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // ---------- Mapping Helper ----------
  const mapApiLoadToDisplay = useCallback((apiLoad: any): Load => ({
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
    status: apiLoad.status || apiLoad.state || "",
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
  }), []);

  // ---------- Fetchers ----------
  const fetchLoads = useCallback(async () => {
    try {
      const resp = await axios.get(`${API_BASE}/api/loads`);
      const data = resp.data || [];
      setLoads(data);
      const userId = localStorage.getItem("userId");
      if (userId) setUserLoads(data.filter((l: Load) => l.userId === userId));
    } catch (err) {
      console.error("Error fetching loads:", err);
    }
  }, []);

  const fetchDrivers = useCallback(async () => {
    try {
      const resp = await axios.get(`${API_BASE}/api/drivers`);
      const data = resp.data || [];
      setDriverList(data);
      const userId = localStorage.getItem("userId");
      if (userId) setUserDrivers(data.filter((d: Driver) => d.userId === userId));
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  }, []);

  // ---------- Init ----------
  useEffect(() => {
    const cookieToken = getCookie("lb_access_token");
    const storedToken = localStorage.getItem("lb_access_token");

    if (cookieToken) setToken(cookieToken);
    else if (storedToken) setToken(storedToken);

    fetchLoads();
    fetchDrivers();
  }, [fetchLoads, fetchDrivers]);

  // ---------- Handlers ----------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = () => {
    const today = new Date().toISOString().split("T")[0];
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0];
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

  // const handle123Search = useCallback(async () => {
  //   setError(null);
  //   setSuccess(false);
  //   const authToken = getCookie("lb_access_token") || token || localStorage.getItem("lb_access_token");
  //   if (!authToken) {
  //     setError("Authorization token missing — please click Authorize/Connect first.");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const resp = await axios.post(`${API_BASE}/api/123Loads/search`, searchFormData, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let apiLoads: any[] = [];
  //     const d = resp.data;
  //     if (Array.isArray(d)) apiLoads = d;
  //     else if (Array.isArray(d.loads)) apiLoads = d.loads;
  //     else if (Array.isArray(d.data)) apiLoads = d.data;
  //     else if (Array.isArray(d.results)) apiLoads = d.results;
  //     else if (Array.isArray(d.payload)) apiLoads = d.payload;
  //     setSearchResults(apiLoads.map(mapApiLoadToDisplay));
  //     setSuccess(true);
  //     setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
  //   } catch (err: any) {
  //     console.error("Error fetching 123Loadboard search results:", err);
  //     setError(err.response?.data?.error || err.message || "Error fetching results");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [searchFormData, token, mapApiLoadToDisplay]);

  const handleAuthorizeNavigation = () => {
    const base = API_BASE || "http://localhost:3001";
    window.location.href = `${base}/api/123Loads/authorize`;
  };

  const handleLoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLoad((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return setError("Please log in to add a load.");
    try {
      await axios.post(`${API_BASE}/api/loads`, { ...newLoad, userId });
      setNewLoad({ description: "", company: "", userId });
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
      await axios.post(`${API_BASE}/api/drivers`, { ...newDriver, userId });
      setNewDriver({ description: "", company: "", userId: "" });
      fetchDrivers();
    } catch (err) {
      console.error("Error creating driver:", err);
      setError("Failed to create driver.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { code, ...searchFormData };

      const response = await axios.post(
        `${API_BASE}/auth/callMeBack`,
        payload,
        { withCredentials: true }
      );

      console.log("Fetched Loads:", response.data);

      // Map API data and set to searchResults (so the <Table> renders it)
      let apiLoads: any[] = [];
      const d = response.data;
      if (Array.isArray(d)) apiLoads = d;
      else if (Array.isArray(d.loads)) apiLoads = d.loads;
      else if (Array.isArray(d.data)) apiLoads = d.data;
      else if (Array.isArray(d.results)) apiLoads = d.results;
      else if (Array.isArray(d.payload)) apiLoads = d.payload;

      if (apiLoads.length > 0) {
        const mappedLoads = apiLoads.map(mapApiLoadToDisplay);
        setSearchResults(mappedLoads);
        setSuccess(true);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
        console.log("Mapped Search Results:", mappedLoads);
      } else {
        console.warn("No loads found in response.");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching loads:", error);
      setError("Error fetching loads. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Render ----------
  return (
    <div className={styles["at-container"]}>
      <header className={styles["at-hero"]}>
        <img src={GADZTruck} alt="Truck" className={styles["at-truck"]} />
        <h1 className={styles["at-title"]}>🚛 GADZConnect Load Board</h1>
        <p className={styles["at-subtitle"]}>Manage drivers, loads, and connect with 123Loadboard</p>
        <Link to="/User" className={styles["at-homeLink"]}>Back to Dashboard</Link>
      </header>

      {/* Drivers */}
      <section className={styles["at-section"]}>
        <h2>👨‍✈️ Drivers</h2>
        {/* <button className="btn btn-primary mb-2" onClick={fetchDrivers}>Fetch Drivers</button> */}
        <Table data={driverList} title="All Drivers" isUser showCompanyLink={false} />
        <Table data={userDrivers} title="Your Drivers" isUser showCompanyLink={false} />
        <form className="mt-3" onSubmit={handleSubmitDriver}>
          <h3>Add New Driver</h3>
          <div className="row g-2">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Driver Description" name="description" value={newDriver.description} onChange={handleDriverInputChange} />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Company" name="company" value={newDriver.company} onChange={handleDriverInputChange} />
            </div>
            <div className="col-md-4">
              <button className="btn btn-success w-100" type="submit">Add Driver</button>
            </div>
          </div>
        </form>
      </section>

      {/* Loads */}
      <section className={styles["at-section"]}>
        <h2>📦 Loads</h2>
        {/* <button className="btn btn-primary mb-2" onClick={fetchLoads}>Fetch Loads</button> */}
        <Table data={loads} title="All Loads" isUser={false} showCompanyLink />
        <Table data={userLoads} title="Your Loads" isUser={false} showCompanyLink />
        <form className="mt-3" onSubmit={handleSubmitLoad}>
          <h3>Add New Load</h3>
          <div className="row g-2">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Description" name="description" value={newLoad.description} onChange={handleLoadInputChange} />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Company" name="company" value={newLoad.company} onChange={handleLoadInputChange} />
            </div>
            <div className="col-md-4">
              <button className="btn btn-success w-100" type="submit">Add Load</button>
            </div>
          </div>
        </form>
      </section>

      {/* 123Loadboard */}
      <section className={styles["at-section"]} ref={resultsRef}>
        <h2>🔍 123Loadboard Search</h2>

        {/* <form className="mb-4" onSubmit={(e) => { e.preventDefault(); handle123Search(); }}> */}
        {React.createElement(
          "div",
          { className: "d-flex gap-2 mb-3" },
          React.createElement(
            "button",
            { type: "button", className: "btn btn-outline-primary", onClick: handleAuthorizeNavigation },
            "Connect / Authorize"
          ),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-outline-secondary", onClick: handleAutoFill },
            "Auto-Fill"
          )
        )}
        {/* </form> */}

        <form onSubmit={handleSubmit} className="load-search-form">
          <div className="row g-3">
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Origin City" name="originCity" value={searchFormData.originCity} onChange={handleInputChange} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Origin State" name="originState" value={searchFormData.originState} onChange={handleInputChange} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Radius" name="radius" value={searchFormData.radius} onChange={handleInputChange} />
            </div>
            <div className="col-md-2">
              <select
                name="equipmentTypes"
                value={searchFormData.equipmentTypes}
                onChange={handleInputChange}
              >
                <option value="">Select Equipment</option>
                <option value="Van">Van</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Reefer">Reefer</option>
              </select>
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Min Weight" name="minWeight" value={searchFormData.minWeight} onChange={handleInputChange} />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Max Mileage" name="maxMileage" value={searchFormData.maxMileage} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-3">
              <input type="date" className="form-control" placeholder="Pickup Date" name="pickupDate" value={searchFormData.pickupDate} onChange={handleInputChange} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Company Rating" name="companyRating" value={searchFormData.companyRating} onChange={handleInputChange} />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" placeholder="Modified Start" name="modifiedStartDate" value={searchFormData.modifiedStartDate} onChange={handleInputChange} />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" placeholder="Modified End" name="modifiedEndDate" value={searchFormData.modifiedEndDate} onChange={handleInputChange} />
            </div>
          </div>
          <div className="d-flex gap-2 mb-3">
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch 123Loadboard Data"}
            </button>
          </div>
        </form>
        {loading && <p>Loading search results...</p>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">✅ Results Loaded</div>}
        <Table data={searchResults} title="Search Results" isUser={false} showCompanyLink />
      </section>
    </div>
  );
};

export default AvailableTable;
