import React from "react";

const ProfileUpdate = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="row jumbotron">
        <div className="display-4" style={{ padding: "40px" }}>
          Profile Update
        </div>

        <form style={{ margin: "0 auto"}}>
          <div className="form-row">
            
          </div>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Example file input
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFirstName4"
                placeholder="John"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLastName4"
                placeholder="Doe"
              />
            </div>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Description</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Tell us about what you do."
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select id="inputState" className="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>
          <div className="form-group">
          <label htmlFor="selectAll">Select all that applies</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Looking for loads
              </label>
            </div>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Selling loads
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Looking for drivers
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              I am/have a driver/'s.
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Looking to trade
            </label>
          </div>

          <br/>
          <br/>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Your available status</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>available</option>
              <option>Not Available</option>
              <option>Out for some time</option>
              <option>Message Me</option>
              <option>Ready for Work</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">
              Example multiple select
            </label>
            <select
              multiple
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> */}
          <br/>
          <br/>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Leave us feedback
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              You will not be able to delete you message above.
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
        <br/>
          <br/>
      </div>
    </div>
  );
};

export default ProfileUpdate;
