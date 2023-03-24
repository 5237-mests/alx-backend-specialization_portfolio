import React, { useContext, useEffect, useState } from 'react'
import {StatesContext} from './StatesContext'
import API from './API';
import '../CSS/AllResults.css'
import Login from './Login';

function ExamResult() {
    const {score, userid}  =useContext(StatesContext);
    const [pass, setPass] = useState(false);
    const [results, setResults] = useState([])

   useEffect(()=>{
      (
         async ()=>{
            
               try{
                const examresult = await API.get(`api/exam-result/${userid}/`)
               //  setScore({"score":examresult.data.score, "total": examresult.data.total})
               //  navigate("/exam-result")
               setResults(examresult.data)
               }
               catch(e)
               {
                  setResults([])
               }
             
         }
      )()
      function checkpass(){
         if (score.score / score.total >= 0.5) {
            setPass(true);
         }
      }
      checkpass();
   }, []);
   if (!userid)
   {
       return (
           <Login/>
       )
   }
  return (
    <div className='container-fluid bcg'>


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
       
        {/* {
        score.score && score.total?
            <div className='container'>
                     <div className='row justify-content-center mt-1 view-result'>
                        <div className='text-center justify-content-center '>
                             <h2>Your Score</h2>
                             <h3>You scored {score.score * 100 / score.total}%</h3>
                             <h2 className='  font-weight-bold text-success m-3 mb-1'>{score.score}/{score.total}</h2>
                              <div className='row justify-content-center'>
                              <hr className='border border-secondary col-1 align-center mt-1 mb-1'/>
                              </div>
                              <div className='row justify-content-center'>
                              <hr className='border border-secondary col-1 align-center'/>
                              </div>
                             {pass && <h2>You well done! Have a good day!</h2>}
                        </div>
                     </div>
                     </div>:
                      <div className='container'>
                      <div className='row justify-content-center view-result'>
                         <div className='text-center'>
                              <h2 className='text-warning font-weight-bold'>No Data Available</h2>
                         </div>
                      </div>
                      </div>
                } */}

    </div>
  )
}

export default ExamResult;
