import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Post from './Post'

function Body({userid}) {
    const [qs, setqs] = useState([])
const loadData = async () => {
    const resp = await axios.get(`http://localhost:8000/api/exam-cand/${userid}`)
    console.log(resp.data)
    if(resp.data.user)
    {
        const jobid =resp.data.job
        const questions = await axios.get(`http://localhost:8000/api/questions/${jobid}`)
       setqs(questions.data)
    }
   
}
  return (
    <div>
        
        <Button onClick={loadData}>Load Questions</Button>
       <Post/>
    </div>
  )
}

export default Body