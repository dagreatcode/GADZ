import React, { useState } from "react";
// import AuthContext from "../../utils/ContextAPI/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const EmployeeLogin = () => {
  // TODO: Fix the state, signin and login is twisted together somehow.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const history = useHistory();
  // const { setJwt } = useContext(AuthContext);
  const navigate = useNavigate();

  const handle2Submit = (e: any) => {
    e.preventDefault();
    // const email  = e.target.email;
    // const password  = e.target.password;
    axios
      // FIXME: After creating an account, it pushes on local but it do not push to the home page/ login in Production
      .post("/api/employee/employeeSignUp", { email, password })
      .then((response) => {
        console.log(response.data);
        // setJwt(response.data.data);
        navigate("/employee");
        // history.push("/");
        // window.location = "/home";
        // this.props.history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const { email, password } = e.target;
    axios
      // TODO: change to /api/login
      .post("/api/employee/employeeLogin", { email, password })
      .then((response) => {
        // setJwt(response.data.data);
        console.log(response.data.data);
        console.log(response.data);
        console.log(response);
        navigate("/employee");
        // history.push("/");
        // window.location = "/home";
        // this.props.history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="row jumbotron">
        <form
          onSubmit={handleSubmit}
          className="p-4 p-md-5 border rounded-3 bg-light"
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <input
                  id="email"
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12">
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <Button
              className="w-10 btn btn-lg btn-primary"
              type="submit"
            //onClick={handleSubmit}
            >
              Connect
            </Button>
          </div>
        </form>
      </div>

      <div className="container">
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 mb-3">Sign Up</h1>
              <p className="col-lg-10 fs-4">
                Ready to experience the future of logistics management? Sign up
                for GADZ CONNECT today and take your business to new heights.
                Let’s embark on this journey together, and unlock the full
                potential of your logistics operations.
              </p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
              <form
                onSubmit={handle2Submit}
                className="p-4 p-md-5 border rounded-3 bg-light"
              >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    data-nlok-ref-guid="45d30697-7fd3-457b-fb20-fd168951d258"
                    control-id="ControlID-1"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div id="norton-idsafe-field-styling-divId"></div>
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    data-nlok-ref-guid="133f212d-f672-4c6f-e332-4bc651dd15a2"
                    control-id="ControlID-2"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div id="norton-idsafe-field-styling-divId"></div>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {/* <div className="checkbox mb-3">
                  <label>
                    <input
                      type="checkbox"
                      value="remember-me"
                      control-id="ControlID-3"
                    />{" "}
                    Remember me
                  </label>
                </div> */}
                <button
                  className="w-100 btn btn-lg btn-primary"
                  type="submit"
                  control-id="ControlID-4"
                >
                  SIGN UP NOW
                </button>
                <hr className="my-4" />
                <small className="text-muted">
                  By clicking Sign up, you agree to the terms of use.
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
