import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
// import './PostComponent.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { StatesContext, StatesProvider } from './StatesContext';

const Post = () => {
  const {setEligble, totalPosts, posts, isloading, userid, job, setStarted} = useContext(StatesContext)
  let [data, setData] = useState({});
  const [exres, setExres] = useState({"finshed":false, "result": 0, "total": 0})
  console.log("Total Posts", totalPosts)
  const onSubmit = async (e) => {
    e.preventDefault();
    let payload = {}
    payload["userAnswer"] = JSON.stringify(data)
    payload["user"] = userid;
    payload["job"] = job;
    // payload["total"] = posts.length
    
    console.log( payload)
    const resp = await axios.post("http://localhost:8000/api/exam-result/", data=payload)
   
    setStarted(false)
    setEligble(false)
    // console.log("The Response", resp.data)
    // let navgate = useNavigate()
    // navgate["/home"]
  }

  const onChange = (e) => {
    const { name, value} = e.target;

    setData({...data, [name]: value});
  }

  // console.log(data);
  // console.log(totalPosts);

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
     {posts.map((post) => (
       <div>
         <h4>{ posts.indexOf(post)}. {post.text} </h4>
         <Form.Group className='choice'>
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