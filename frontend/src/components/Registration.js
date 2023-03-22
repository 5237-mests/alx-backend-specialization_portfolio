import React, { useState, useContext, Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate , Link} from 'react-router-dom';
import { Helmet } from 'react-helmet'
import '../CSS/Registration.css';                                              

function Registration() {
  let [err, setErr] = useState(false);
  const {setEligble, setLogged, setUserid} = useContext(StatesContext)
  const [data, setData] = useState({})
  let navigate = useNavigate()
  const updateData = (e) =>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
  }
  const sendData = async (e)=>{
      e.preventDefault()
      try {
        const resp = await axios.post("http://localhost:8000/api/users/", data)
        if (resp.status === 200)
        {
            console.log(resp.data)
            // navigate("/login")
        } 
      } catch(error) {
        setErr(true)
      }
  }

  return (
   <Fragment>
    <Helmet><title>Registration Page!</title></Helmet>
   <div className='reg'>
    <div className='py-5 ms-auto me-auto'>
      {
        <Form className='forme' onSubmit={sendData}>
            {err && <span className='text-danger'>UserName Already taken or check your Email</span>}
            <div className='container'>
              <div className='row'>
                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>UserName: <Form.Control name="username" type="number" placeholder="User ID" onChange={updateData} /> </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                      <Form.Label>Email: <Form.Control name="email" type="email" placeholder="email@example.com" onChange={updateData} /> </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Current Position: <Form.Control name="curposition" type="text" placeholder="Current Position" onChange={updateData} /> </Form.Label>  
                    </Form.Group>
                  </div>

                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First Name: <Form.Control name="first_name" type="text" placeholder="First Name" onChange={updateData} /> </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Last Name: <Form.Control name="last_name" type="text" placeholder="LastName" onChange={updateData} /> </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Middle Name: <Form.Control name="middlename" type="text" placeholder="Middle Name" onChange={updateData} /> </Form.Label>  
                    </Form.Group>
                  </div>
              </div>

              <div className='row pb-3'>
                <Form.Group className="mb-3 " controlId="formBasicPassword">
                  <Form.Label>Password: <Form.Control name="password" type="password" placeholder="Password" onChange={updateData} /></Form.Label>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Signup
                </Button>
              </div>
              <p>Already have account? <Link to='/login'>Login</Link></p>
            </div>
        </Form>
      }
    </div>
   </div>
  </Fragment>
  )
}

export default Registration;
