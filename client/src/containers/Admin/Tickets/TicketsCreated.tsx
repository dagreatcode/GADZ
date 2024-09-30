import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const TicketsCreated = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  // const { id } = useParams();

  const getData = async () => {
    const { data } = await axios.get(`/api/it-help/view`);
    setData(data);
  };

  const getData2 = async () => {
    const { data } = await axios.get(`/api/employee-help/view`);
    setData2(data);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData2();
  }, []);

  return (
    <>
      <div>All Tickets</div>

      <h1> View All Tickets Created for IT Issues</h1>

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
    {data2.map((r: any, id: any) => (
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
      <Link to="/Admin">Home</Link>
    </>
  );
};

export default TicketsCreated;
