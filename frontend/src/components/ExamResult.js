import React, { useContext, useEffect, useState } from 'react'
import {StatesContext} from './StatesContext'

function ExamResult() {
    const {score}  =useContext(StatesContext);
    const [pass, setPass] = useState(false);

   useEffect(()=>{
      function checkpass(){
         if (score.score / score.total >= 0.5) {
            setPass(true);
         }
      }
      checkpass();
   }, []);

  return (
    <div className='container-fluid bcg'>
       
        {
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
                }

    </div>
  )
}

export default ExamResult;
