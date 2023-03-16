import React, { useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Post from './Post';
import Pagination from './Pagination'
import { Button, Form } from 'react-bootstrap';
import { StatesContext } from './StatesContext';


function PaginatePosts() {

  const {setIsloading, userid,setJob,setPosts,posts,setStarted,currentPage,
  setCurrentPage,postsPerPage,setScore,started,logged,eligble,score} = useContext(StatesContext)
  const fetchPosts = async () => {
    setIsloading(true);
    const resp = await axios.get(`http://localhost:8000/api/exam-cand/${userid}`)
    let joob = resp.data.job
    console.log(joob, "The job")
    setJob(joob)
    if(resp.data.job)
    {
        const res = await axios.get(`http://localhost:8000/api/questions/${joob}`)
      console.log(res.data, "all qw")
    
       setPosts(res.data);
       setIsloading(false);
       setStarted(true)
    }
  }

  const currentPosts = posts.slice(currentPage, currentPage + postsPerPage);
  // paginate
  const paginatePrev = ()=> {
    setCurrentPage(currentPage = currentPage > 0 ? currentPage - postsPerPage : 0)
  }
  const paginateNext = ()=> {
    setCurrentPage(currentPage = currentPage < posts.length -1? currentPage + postsPerPage : posts.length)
  }
const viewResult = async ()=>{
  const examresult = await axios.get(`http://localhost:8000/api/exam-result/${userid}/`)
  setScore({"score":examresult.data.score, "total": examresult.data.total})
}


  return (
     <div className='container'>
      {!eligble?<h2>No Exam Available for This User</h2>:
      <div className='row justify-content-around mt-5'>
      <Button className='col-6 col-md-2 col-lg-2' onClick={fetchPosts}>Start Exam</Button>
     
      </div>
           
      }

        {started && 
            <div className='row justify-content-center mt-5'>
            <h2 className='col-sm-6 col-lg-4'>Exam on Progress!</h2> 
            <hr/>
            <Pagination paginatePrev={paginatePrev} paginateNext={paginateNext}/>
              <hr/>
            <p>{currentPage} of {posts.length - 1}</p>
                <Post/>   
        </div>
        }
      {/* 
      
    {started && logged &&
    <div className='row justify-content-center mt-5'>
        <h2 className='col-sm-6 col-lg-4'>Exam on Progress!</h2> 
         <hr/>
         <Pagination paginatePrev={paginatePrev} paginateNext={paginateNext}/>
        <hr/>
      <p>{currentPage} of {posts.length - 1}</p>
      <Post/>   
        </div>
        }
       {!started && logged && eligble &&
        <div className='row justify-content-around mt-5'>
        <Button className='col-6 col-md-2 col-lg-2' onClick={fetchPosts}>Start Exam</Button>
       
        </div>} */}
{/* 
        {!started && logged  &&
        <div className='row justify-content-around mt-5'>
       
        <Button className='col-6 col-md-2 col-lg-2' onClick={viewResult}>View Result</Button>
        <h2>Your SCore: {score.score}/{score.total}</h2>
        </div>} */}
     </div>
  )
}

export default PaginatePosts