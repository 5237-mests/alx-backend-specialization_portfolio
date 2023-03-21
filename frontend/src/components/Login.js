import React, { useState, useContext } from 'react';
import {Helmet} from 'react-helmet';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate, Link } from 'react-router-dom';
import '../CSS/Login.css';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState(false);
  const {setEligble, setLogged, setUserid} = useContext(StatesContext)
  const [data, setData] = useState({})
  let navigate = useNavigate()
  const updateData = (e) =>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
  }
  const sendData = async ()=>{
      
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
   <div>
      <Helmet><title>Login Page</title></Helmet>
      <div className='log'>
        <div className=' py-5 ms-auto me-auto'>
          {
            <Form className='formlog' onSubmit={handleSubmit(sendData)}>
                {err && <span className='text-danger'>UserName and or Password is Incorrect</span>}
                <div className='container'>
                    <div className='row'>
                      <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label className='row'>UserName: <Form.Control  type="number" {...register('username', { required: true })} onChange={updateData}/>
      {errors.username && <p className='text-danger'>username is invalid.</p>} </Form.Label>  
                      </Form.Group>
                    </div>

                    <div className='row'>
                      <Form.Group className="mb-3 " controlId="formBasicPassword">
                        <Form.Label className='row'>Password: <Form.Control  type="password" {...register('password', { required: true })} onChange={updateData}/>
      {errors.password && <p className='text-danger'>Password is required.</p>}</Form.Label>
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
  </div>
  )
}

export default Login;
