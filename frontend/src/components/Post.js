import React, { useContext, useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { StatesContext } from './StatesContext';

const Post = ({currentPosts}) => {
  const {setEligble, totalPosts, posts, isloading, userid, job, setStarted, exres, setExres} = useContext(StatesContext)

  let [data, setData] = useState({});
  console.log('user anwser!!', data)

  let payload = {
    'userAnswer': JSON.stringify(data),
    'user': userid,
    'job': job,
  }

  const handlesubmit = async ()=> {
    try {
      const resp = await axios.post("http://localhost:8000/api/exam-result/", payload)
      console.log('submitted exam',resp.data)
      setStarted(false)
      setEligble(false)
      setExres({"finished":true, "result": resp.data.score, "total": resp.data.total})

    } catch(err){
      console.log('error POST', err.toString())
    }
  
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await handlesubmit();
  }
  


  const onChange = (e) => {
    const { name, value} = e.target;
    setData({...data, [name]: value});
  }

  // // if time over it submit the form to db
  setTimeout(()=>{
    handlesubmit();
  }, 3*9000);

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
