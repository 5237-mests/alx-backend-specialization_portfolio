import React, { useState, useContext } from 'react';
import {Helmet} from 'react-helmet';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../CSS/Login.css';


function Login() {
  const {setEligble, setLogged, setUserid, setToken} = useContext(StatesContext)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({})
  let [err, setErr] = useState(false);
  let navigate = useNavigate()

  // function which collect or update data from user
  const updateData = (e) =>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
  }

  // function which checks user is eligble for exam?
  const sendData = async ()=>{
      
      try {
       
        axios.defaults.headers.common["Authorization"] = ``;
        const auth = await axios.post("http://127.0.0.1:8000/api/token/", data) //free to get token
        // console.log(auth.data.token)
        if (auth.status === 200)
        {
            setToken(auth.data.token)
            axios.defaults.headers.common["Authorization"] = `Token ${auth.data.token}`;
            // console.log(data.username, "user name")
            const resp = await axios.get(`http://127.0.0.1:8000/api/users/${data.username}/`)
            // console.log(resp, "is user")
            setLogged(true)
            setUserid(resp.data.id)
            // console.log(resp.data.id, "the userid")
            const examTaken = await axios.get(`http://localhost:8000/api/exam-result/${resp.data.id}/`)
            const examCand = await axios.get(`http://localhost:8000/api/exam-cand/${resp.data.id}/`)
            // console.log("examTaken", examTaken)
            // console.log("exam cand", examCand)
            if (examCand.data.user && !examTaken.data.user)
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
        setErr(true)
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
                        <Form.Label className='row'>UserName: 
                          <Form.Control  type="number" {...register('username', { required: true })} onChange={updateData}/>
                          {/* {errors.username && <p className='text-danger'>username is required.</p>}  */}
                        </Form.Label>  
                      </Form.Group>
                    </div>

                    <div className='row'>
                      <Form.Group className="mb-3 " controlId="formBasicPassword">
                        <Form.Label className='row'>Password: 
                          <Form.Control  type="password" {...register('password', { required: true })} onChange={updateData}/>
                          {/* {errors.password && <p className='text-danger'>Password is required.</p>} */}
                        </Form.Label>
                      </Form.Group>
                    </div>

                    <div className='row pb-3'>
                      <Button variant="primary" type="submit" onClick={sendData}>
                        Login
                      </Button>
                    </div>
                    
                    <p className='text-light'> Don't have an account? <Link to='/register'>SignUp</Link></p>
                </div>

            </Form>
          }
        </div>
      </div>
  </div>
  )
}

export default Login;
