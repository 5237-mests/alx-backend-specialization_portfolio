import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { StatesContext } from './StatesContext';

const Post = ({currentPosts}) => {
  console.log('cr post at posT',currentPosts);
  const {setEligble, totalPosts, posts, isloading, userid, job, setStarted, exres, setExres} = useContext(StatesContext)

  let [data, setData] = useState({});

  
  console.log("Total Posts", totalPosts)

  const onSubmit = async (e) => {
    if (e)
    {
      e.preventDefault();
    }
    let payload = {}
    payload["userAnswer"] = JSON.stringify(data)
    payload["user"] = userid;
    payload["job"] = job;
    
    const resp = await axios.post("http://localhost:8000/api/exam-result/", data=payload)
    console.log(resp.data)
    setStarted(false)
    setEligble(false)
    setExres({"finished":true, "result": resp.data.score, "total": resp.data.total})
  }

  const onChange = (e) => {
    const { name, value} = e.target;
    setData({...data, [name]: value});
  }

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
