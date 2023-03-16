import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'

function Login({logged, setLogged, setHeaders, setUserid, setEligble}) {
    const [data, setData] = useState({})
   
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
            // console.log("logged in success")
            // console.log(resp)
            setLogged(true)
            setUserid(resp.data.userid)
            // console.log(resp.data.userid)
            setHeaders({"Authorization: Token ": resp.data["X-token"]})

            const reponse = await axios.get(`http://localhost:8000/api/exam-result/${resp.data.userid}/`)
            // console.log("user found", resp.data)
            if  (reponse.data.user)
            {
              // console.log("user found", resp.data)
              setEligble(false)
            }
            else{
              setEligble(true)
            }
        }
    }
  return (
   <>
   {!logged &&
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

    <p>{data.username} - {data.password}</p>
  </Form>}
   </>
  )
}

export default Login