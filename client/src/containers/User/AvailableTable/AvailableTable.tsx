import React from "react";
import { Link } from "react-router-dom";
// import {createRoot} from "react-dom/client";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const AvailableTable = () => {
  return (
    <>
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      <div>AvailableTable/ Load Board</div>
      <h5>
        This is where we can see the Load Board and click on a company to to
        business with or add to cart.
      </h5>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Drivers</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td><Link to="/UserProfile">UserProfile</Link></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td><Link to="/UserProfile">UserProfile</Link></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td><Link to="/UserProfile">UserProfile</Link></td>
          </tr>
        </tbody>
      </table>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Loads</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td><Link to="/UserProfile">UserProfile</Link></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td><Link to="/UserProfile">UserProfile</Link></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td><Link to="/UserProfile">UserProfile</Link></td>
          </tr>
        </tbody>
      </table>
      </div>
      <Link to="/User">Home</Link><br />
      
      <br />
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
      {/* https://visgl.github.io/react-google-maps/docs/get-started */}
      <APIProvider apiKey={`${process.env.REACT_APP_API_KEY}`} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          zoom={9}
          // center={position}
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          // mapID={}
        />
      </APIProvider>
      </div>
    </>
  );
};

export default AvailableTable;

// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0
// AIzaSyB3euiZnEr7po8d2LT1uO4nZ5hC2w9HgRA