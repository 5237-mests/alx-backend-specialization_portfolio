import React, { useContext, useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { StatesContext } from './StatesContext';

const Post = ({currentPosts}) => {
  const {setEligble,started, totalPosts, posts, isloading, userid, job, setStarted, exres, setExres} = useContext(StatesContext)

  let [data, setData] = useState({});
  console.log('user anwser!!', data)
  let [submitted, setSubmitted] = useState(false)
  const dataRef = useRef(data);
  const submitRef = useRef(submitted)
  submitRef.current = submitted;
  dataRef.current = data;
  let timer = null;
  const handlesubmit = async ()=> {
    try {
      let payload = {
        'userAnswer': JSON.stringify(dataRef.current),
        'user': userid,
        'job': job,
      }
      console.log("payload is", payload)
      const resp = await axios.post("http://localhost:8000/api/exam-result/", payload)
      console.log('submitted exam',resp.data)
      setStarted(false)
      setEligble(false)
      setExres({"finished":true, "result": resp.data.score, "total": resp.data.total})

    } catch(err){
      console.log('error POST')
    }
  
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    submitRef.current = submitted;
    await handlesubmit();
    submitRef.current = submitted;
    clearTimeout(timer);
  }
  const onChange = (e) => {
    const { name, value} = e.target;
    setData({...data, [name]: value});
    dataRef.current = data;
  }
  useEffect(()=>{
timer =   setTimeout(()=>{
        handlesubmit();
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

export default Post;
