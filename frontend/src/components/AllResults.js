import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { StatesContext } from './StatesContext'
import { useContext } from 'react'
import '../CSS/AllResults.css'

function AllResults() {
    const {token} = useContext(StatesContext);
    const [results, setResults] = useState([])
    const [jobs, setJobs] = useState([])
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    useEffect(()=>{
      (async ()=>{
        
        const resp2 = await axios.get("http://localhost:8000/api/jobs/")
        const res = []
        console.log(resp2.data, "resp2")
        for (let data of resp2.data) {
          res.push({"value":data.id, "label": data.jobCode})
        }
        setJobs([{"value": "", "label":"ALL"}, ...res])
      })()
    }, [])

  const getDetail = async (e) =>{
    let url = null;
    if (e.value){
      url = `http://127.0.0.1:8000/api/exam-result-by-jobid/${e.value}`
    } else {
        url = `http://127.0.0.1:8000/api/exam-result/`
    }
    const resp = await axios.get(url)
    console.log(resp.data)
    setResults(resp.data)
  }

  return (
    <div className='container-fluid mt-3 view-result'>
       <div className='row'>
        <div className='col-sm-6 col-lg-4'>
        {jobs && <Select options={jobs} onChange={(e)=>getDetail(e)}/>}
        </div>
       </div>
       <table className='table'>
        <thead>
          <th>Employee Id</th>
          <th>First Name</th>
          <th> Last Name</th>
          <th> Job Code</th>
          <th> Score</th>
        </thead>
         {results && results.map(result => (
        <tr key={result.id}>
          <td>{result.user.username}</td>
          <td>{result.user.first_name}</td>
          <td>{result.user.last_name}</td>
          <td>{result.job.jobCode}</td>
          <td>{Math.round(result.score * 100 / result.total, 2)}%</td>
        </tr>
        ))}
      </table>
    </div>
  )
}

export default AllResults;
