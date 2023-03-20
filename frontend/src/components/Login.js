import React, { useState, useContext, Fragment } from 'react';
import {Helmet} from 'react-helmet';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate, Link } from 'react-router-dom';
import '../CSS/Login.css';

function Login() {
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
        const resp = await axios.post("http://localhost:8000/login/", data)
        if (resp.status === 200)
        {
            setLogged(true)
            setUserid(resp.data.userid)
            const examTaken = await axios.get(`http://localhost:8000/api/exam-result/${resp.data.userid}/`)
            const examCand = await axios.get(`http://localhost:8000/api/exam-cand/${resp.data.userid}/`)
              
            console.log("examTaken", examTaken)
            console.log("exam cand", examCand)
            if (examCand.data.user && ! examTaken.data.user)
              {
                setEligble(true)
                navigate("/exam")
              }
              else
              {
                setEligble(false)
                navigate("/exam")
              }
        } 
      } catch(error) {
        setErr(error)
      }
  }

  return (
   <Fragment>
      <Helmet><title>Login Page</title></Helmet>
      <div className='log'>
        <div className=' py-5 ms-auto me-auto'>
          {
            <Form className='formlog'>
                {err && <span className='text-danger'>you missed username or password</span>}
                <div className='container'>
                    <div className='row'>
                      <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label className='row'>UserName: <Form.Control name="username" type="number" placeholder="User ID" onChange={updateData} /> </Form.Label>  
                      </Form.Group>
                    </div>

                    <div className='row'>
                      <Form.Group className="mb-3 " controlId="formBasicPassword">
                        <Form.Label className='row'>Password: <Form.Control name="password" type="password" placeholder="Password" onChange={updateData} /></Form.Label>
                      </Form.Group>
                    </div>

                    <div className='row pb-3'>
                      <Button variant="primary" type="submit" onClick={sendData}>
                        Login
                      </Button>
                    </div>
                    
                    <p className='text-light'>Don't have an account? <Link to='/register'>SignUp</Link></p>
                </div>

            </Form>
            
          }
        </div>
      </div>
  </Fragment>
  )
}

export default Login;
