import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Post from './Post';
import Pagination from './Pagination'
import { Button, Form } from 'react-bootstrap';


function PaginatePosts({userid, logged, started, setStarted, eligble, setEligble}) {
  
  const [posts, setPosts] = useState([]);
  const [job, setJob] = useState(0)
  const [loading, setLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const[score, setScore] = useState({"score": 0, "total":0})
  
  // console.log(userid, "userid")
  const fetchPosts = async () => {
    setLoading(true);
    const resp = await axios.get(`http://localhost:8000/api/exam-cand/${userid}`)
    let joob = resp.data.job
    console.log(joob, "The job")
    setJob(joob)
    // console.log(resp.data, "the Response")
    if(resp.data.user)
    {
     
        const res = await axios.get(`http://localhost:8000/api/questions/${joob}`)
      // setqs(res.data)
      console.log(res.data, "all qw")
    
       setPosts(res.data);
       setLoading(false);
       setStarted(true)
    }
    // const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
  }
  useEffect(()=>{
   

    // fetchPosts();
  }, []);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPage = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(currentPage, currentPage + postsPerPage);

  // paginate
  const paginatePrev = ()=> {
    setCurrentPage(currentPage = currentPage > 0 ? currentPage - postsPerPage : 0)
  }
  const paginateNext = ()=> {
    setCurrentPage(currentPage = currentPage < posts.length -1? currentPage + postsPerPage : posts.length)
  }
const viewResult = async ()=>{
  console.log("result for", userid)
  const examresult = await axios.get(`http://localhost:8000/api/exam-result/${userid}/`)
  console.log(`You Scored ${examresult.data.score}/${posts.length}`)
  setScore({"score":examresult.data.score, "total": examresult.data.total})
  // setExres({"finished": true, "result": examresult.score, "total": posts.length})
}
  // console.log(posts)
  return (
    <div>
     <div className='container'>
      {(posts.length == 0) &&
      <h2>No Exam Available for This User</h2> }
    {started && logged &&
    <div className='row justify-content-center mt-5'>
        <h2 className='col-sm-6 col-lg-4'>Exam on Progress!</h2> 
         <hr/>
         <Pagination paginatePrev={paginatePrev} paginateNext={paginateNext}/>
        <hr/>
      <p>{currentPage} of {posts.length - 1}</p>
      <Post setEligble={setEligble} started={started} setStarted={setStarted} job={job} totalPosts={posts} posts={currentPosts} loading={loading} currentPage={currentPage} userId={userid}/>   
        </div>
        }
       {!started && logged && eligble &&
        <div className='row justify-content-around mt-5'>
        <Button className='col-6 col-md-2 col-lg-2' onClick={fetchPosts}>Start Exam</Button>
       
        </div>}

        {!started && logged  &&
        <div className='row justify-content-around mt-5'>
       
        <Button className='col-6 col-md-2 col-lg-2' onClick={viewResult}>View Result</Button>
        <h2>Your SCore: {score.score}/{score.total}</h2>
        </div>}
     </div>
     
    
      
    </div>
  )
}

export default PaginatePosts