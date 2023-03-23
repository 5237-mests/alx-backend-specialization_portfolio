import React, { useContext, useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { StatesContext } from './StatesContext';
import { useNavigate } from 'react-router-dom';

const ExamQuestions = ({currentPosts}) => {
  const {setEligble, posts, isloading, userid, job, setStarted, exres, setExres} = useContext(StatesContext)
  const nav = useNavigate()
  let [data, setData] = useState({});
  const dataRef = useRef(data);
  const submitRef = useRef(null)
  submitRef.current = false;
  dataRef.current = data;
  
  const handlesubmit = async ()=> {
    try {
      let payload = {
        'userAnswer': JSON.stringify(dataRef.current),
        'user': userid,
        'job': job,
      }
      const resp = await axios.post("http://localhost:8000/api/exam-result/", payload)
      setStarted(false)
      setEligble(false)
      setExres({"finished":true, "result": resp.data.score, "total": resp.data.total})
      submitRef.current = true
      nav("/exam-result")
    } catch(err){
      submitRef.current = true;
    }
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handlesubmit();
      submitRef.current = true;
    }
    catch (e) {
        submitRef.current = true;
    }
  }

  const onChange = (e) => {
    const { name, value} = e.target;
    setData({...data, [name]: value});
    dataRef.current = data;
  }

  // after given time is over submit exam automaitaclly 
  useEffect(()=>{
    setTimeout(async()=>{
            if (submitRef.current)
            {
              console.log("Already submitted")
            }
            else {
            await handlesubmit();
            }
        }, 10000);
  }, [])

  if (isloading) {
    return <h2>Loading...</h2>
  }
  return (
   <>
    {exres.finshed && 
    <h3>Your Scored: {exres.result}/{exres.total}</h3>
    }

    {!exres.finshed &&  
    <Form onSubmit={onSubmit}>
      {currentPosts.map((post) => (
        <div>
          <h4>{ posts.indexOf(post)}. {post.text} tt</h4>
          <div className='mx-4'>
              <Form.Group>
                <Form.Check
                  type='radio' 
                  label={`A. ${post.cha}`} 
                  onChange={onChange} 
                  name={`question_${post.id}`} 
                  value={post.cha} 
                />

                <Form.Check
                  type='radio' 
                  label={`B. ${post.chb}`} 
                  onChange={onChange} 
                  name={`question_${post.id}`} 
                  value={post.chb} 
                />

                <Form.Check
                  type='radio' 
                  label={`C. ${post.chc}`} 
                  onChange={onChange} 
                  name={`question_${post.id}`} 
                  value={post.chc} 
                />

                <Form.Check
                  type='radio' 
                  label={`D. ${post.chd}`} 
                  onChange={onChange} 
                  name={`question_${post.id}`} 
                  value={post.chd}
                />
              </Form.Group>
          </div>
        </div>
      ))}
      <div className='row justify-content-center mt-5'>
      <Button className='col-2 col-md-1' type='submit'>Submit</Button>
      </div>
    </Form>
    }
   </>
  )
}

export default ExamQuestions;
