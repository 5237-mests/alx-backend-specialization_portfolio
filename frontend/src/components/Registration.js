import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import {StatesContext} from './StatesContext'
import { useNavigate , Link} from 'react-router-dom';
import { Helmet } from 'react-helmet'
import '../CSS/Registration.css';  
import { useForm } from 'react-hook-form';                                            

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [err, setErr] = useState(false);
  const {setEligble, setLogged, setUserid} = useContext(StatesContext)
  const [data, setData] = useState({})
  let navigate = useNavigate()
  const updateData = (e) =>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
  }
  const sendData = async ()=>{
      // e.preventDefault()
     
        console.log("The dara", data)
        try{
          const resp = await axios.post("http://localhost:8000/api/users/", data)
          console.log("The response is", resp)
          if (resp.status === 201)
          {
              console.log(resp.data)
              setErr(false)
              navigate("/login")
          } 
        }
        catch(e)
        {
          console.log("Error")
          setErr(true)
         
        }
      
  }

  return (
   <div>
    <Helmet><title>Registration Page!</title></Helmet>
   <div className='reg'>
    <div className='py-5 ms-auto me-auto'>
      {

        <Form className='forme' onSubmit={handleSubmit(sendData)}>
            <div className='container'>
              <div className='row'>
                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>UserName: <Form.Control  type="number" {...register('username', { required: true })} onChange={updateData}/>
      {errors.username && <p className='text-danger'>username is required.</p>} </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                      <Form.Label>Email: <Form.Control type="email" placeholder="email@example.com" {...register('email', { required: true })} onChange={updateData}/>
      {errors.email && <p className='text-danger'>Email is required.</p>} </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Current Position: <Form.Control {...register('curposition', { required: true })} onChange={updateData}/>
      {errors.curposition && <p className='text-danger'>Current Position is required.</p>} </Form.Label>  
                    </Form.Group>
                  </div>

                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First Name: <Form.Control {...register('first_name', { required: true })} onChange={updateData}/>
      {errors.last_name && <p className='text-danger'>First name is required.</p>} </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Last Name: <Form.Control {...register('last_name', { required: true })} onChange={updateData}/>
      {errors.last_name && <p className='text-danger'>Last name is required.</p>}  </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Middle Name: <Form.Control  {...register('middlename', { required: true })} onChange={updateData}/>
      {errors.middlename && <p className='text-danger'>Middle name is required.</p>}  </Form.Label>  
                    </Form.Group>
                  </div>
              </div>

              <div className='row pb-3'>
                <Form.Group className="mb-3 " controlId="formBasicPassword">
                  <Form.Label>Password: <Form.Control  type="password" {...register('password', { required: true })} onChange={updateData}/>
      {errors.password && <p className='text-danger'>Password is required.</p>}</Form.Label>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Signup
                </Button>
              </div>
              <p>Already have account? <Link className='text-dark' to='/login'>Login</Link></p>
            </div>
        </Form>
      }
    </div>
   </div>
  </div>
  )
}

export default Registration;
