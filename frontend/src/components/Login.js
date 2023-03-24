import React, { useState, useContext } from 'react';
import {Helmet} from 'react-helmet';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../CSS/Login.css';

import API from './API';

function Login() {
  const {setEligble, setLogged, setUserid, setIsAuthenticated, setIsAdmin} = useContext(StatesContext)
  
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
    
   
        // get csrf token -> free 
        // login post request -> csrf 
        // user = authenticate (username, password)
        // login(request, user) -> request.session.session_key
        // axios.defaults.withcredential = true;
        // Next request Session.objects.get(pk=req.session.session_key)
        // is session foun authen 

             const csrf = await API.get("auth/getcsrf/") //free to get csrf
             API.defaults.headers["X-CSRFToken"] = `${csrf.data.csrftoken}`; // for all post req
             const logResp = await API.post("auth/login", data) //try to login user
            if (logResp.status == 200)
            {
              setIsAuthenticated(true)
              localStorage.setItem("isAuthenticated", true); 
              const resp = await API.get(`api/users/${data.username}/`)
              console.log(resp, "is user")
              setLogged(true)
              setUserid(data.username)
              //setEligble(false)
              const superuser = resp.data.is_superuser
              console.log(superuser, "super")
              if (superuser)
              {
                setIsAdmin(true)
                localStorage.setItem("isAdmin", true)

              }
              else {
                setIsAdmin(false)
                localStorage.setItem("isAdmin", false)
              }
              
              //localStorage.setItem("eligble", false)
              localStorage.setItem("logged", true)
              localStorage.setItem("userid", data.username)
              navigate("/")
              // console.log(resp.data.id, "the userid")
               // search exam result by userid

              //  try{
              //   const examCand = await API.get(`api/exam-cand/${resp.data.id}/`) // search exam cand by userid
              //   console.log(examCand.data, "candidate job")

              //   try {
              //     const examTaken = await API.get(`api/exam-result/${resp.data.username}/`)
              //     console.log(examTaken)
              //     console.log('exam taken', examTaken.data)
              //     navigate("/exam-result")
              //   }
              //   catch (e)
              //   {
              //     console.log("Exam not taken")
              //     setEligble(true)
              //     localStorage.setItem("logged", true)
              //     localStorage.setItem("eligble", true)
              //     navigate("/exam")
                  
              //   }

              // }
              // catch (e){
              //   console.log("Not Eligble For exam")
              //   setEligble(false)
              //   localStorage.setItem("eligble", false)
              //   navigate("/")
              // }
             
            
            }
            else{
              setIsAuthenticated(false)
              localStorage.setItem("isAuthenticated", false)
              //localStorage.setItem("eligble", false)
              localStorage.setItem("logged", false)
              setLogged(false)
             // setEligble(false)
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
