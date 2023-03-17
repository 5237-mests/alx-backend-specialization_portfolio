import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate, Redirect,Route  } from 'react-router-dom';

function Login() {
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
      const resp = await axios.post("http://localhost:8000/login/", data)
      
      if (resp.status == 200)
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
  }

  return (
   <div className='container login mt-5 bg-secondary justify-space-around view-result'>
    <div className=' pt-5 ms-auto me-auto'>
      {
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>UserName: <Form.Control name="username" type="number" placeholder="User ID" onChange={updateData} /> </Form.Label>  
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password: <Form.Control name="password" type="password" placeholder="Password" onChange={updateData} /></Form.Label>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={sendData}>
              Login
            </Button>
        </Form>
      }
    </div>
   </div>
  )
}

export default Login