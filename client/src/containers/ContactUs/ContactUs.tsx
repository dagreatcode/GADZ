import React from 'react'
import Button from 'react-bootstrap/Button'

function ContactUs() {
  return (<>
  <div className="container" style={{textAlign: "center"}}>
    <div className="row jumbotron">
    <div className="display-4" style={{padding: "40px"}}>ContactUs</div>
    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
  <textarea className="form-control" placeholder='Enter About your description' id="exampleFormControlTextarea1" rows={3}></textarea>
</div>
       <Button style={{width: "100px", margin: "0 auto"}}>Send</Button>
    </div>
  </div>

    </>
  )
}

export default ContactUs