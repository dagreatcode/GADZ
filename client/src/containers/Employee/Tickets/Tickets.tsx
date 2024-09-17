import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const TicketsCreated = () => {
  const [data, setData] = useState([]);
  // const { id } = useParams();

  const getData = async () => {
    const { data } = await axios.get(`/api/employee-help/view`);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>All Tickets to the Employees</div>

      <h1> View All Tickets Created for User Issues</h1>

      {/* {JSON.stringify(data)}<br /><br /> */}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>View Ticket</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r: any, id: any) => (
            <tr key={id}>
              <td>
                {" "}
                {/* <input onClick={handleID} type="submit" value={`${r.id}`} /> */}
              </td>
              <td>
                <Link to="/AdminUserProfile">View </Link>
              </td>
              <td>{r.name ? r.name : "No Name"}</td>
              <td>{r.subject ? r.subject : "No Subject"}</td>
              <td>{r.description ? r.description : "No Information"}</td>
              {/* <td>{r}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/Admin">Home</Link>
    </>
  );
};

export default TicketsCreated;
