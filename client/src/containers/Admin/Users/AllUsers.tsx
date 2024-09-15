import React, { useEffect, useState } from 'react'
// import { useParams } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'

const AllUsers = () => {
  const [data, setData] = useState([]);
  // const { id } = useParams();

  const getData = async () => {
    const { data } = await axios.get(`/api/user/view`);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <div>AllUsers</div>

      <h1> I will create a login  with authorization and authentication for Admin's and User's momentarily</h1><br />

      Users API. This is Raw Data coming from the database. This will be used to apply all Users Information to the page for the admin edit user or freeze user or even archive."<br/><br/> 

      {/* {JSON.stringify(data)}<br /><br /> */}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Edit</th>
            <th>Email</th>
            <th>Password</th>
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
              <td><Link to="/AdminUserProfile">Edit  </Link></td>
              <td>{r.email}</td>
              <td>{r.password}</td>
              <td>{r.description}</td>
              {/* <td>{r}</td> */}  
            </tr>
          ))}
        </tbody>
      </table>
     {/* <Link to="/AdminUserProfile">Click to edit single user, change information, approve business to use the site + credit, or archive user.</Link><br/><br/> */}

    <br />
     <Link to="/Admin">Home</Link>
    </>
  )
}

export default AllUsers