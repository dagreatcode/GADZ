import React from "react";
import { Link } from "react-router-dom";
// import {createRoot} from "react-dom/client";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const AvailableTable = () => {
  return (
    <>
      <div>AvailableTable/ Load Board</div>
      <h5>
        This is where we can see the Load Board and click on a company to to
        business with or add to cart.
      </h5>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <Link to="/User">Home</Link><br />
      <Link to="/UserProfile">UserProfile</Link>
      <br />
      {/* https://visgl.github.io/react-google-maps/docs/get-started */}
      <APIProvider apiKey={`${process.env.REACT_APP_API_KEY}`} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </APIProvider>
    </>
  );
};

export default AvailableTable;

// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0
// AIzaSyB3euiZnEr7po8d2LT1uO4nZ5hC2w9HgRA