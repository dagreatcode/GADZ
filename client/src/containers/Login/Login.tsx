import React from 'react'
import Button from 'react-bootstrap/Button'

const Login = () => {
  return (

    <div className="container" style={{textAlign: "center"}}>
    <div className="row jumbotron">
      <form>
      <div className="display-4" style={{padding: "40px"}}>Login</div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <Button style={{width: "100px", margin: "auto"}}>Connect</Button>
      </form>
      </div>
      <div className="row">
        <form>
        <div className="display-4" style={{padding: "40px"}}>Create Account</div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <Button style={{width: "100px", margin: "auto"}}>Create</Button>
        </form>
      </div>
    </div>
  )
}

export default Login