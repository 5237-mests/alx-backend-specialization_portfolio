import React, { useEffect, useState } from 'react'
import { StatesContext } from './StatesContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import API from './API'
import { Link } from 'react-router-dom'


function AvailableExams() {
        const {exams, setJob, setUserid, setEligble} = useContext(StatesContext)
        console.log("exams", exams)
        const nav =  useNavigate()

        const startExam = async (exam)=>{
                setJob(exam.job.id);
                setUserid(exam.user.username)
                setEligble(true)
                localStorage.setItem("eligble", true)
            nav("/exam")
        }

  return (
    <div>
    <h1>Available Exams</h1>
        <ol>
            {exams.map(exam=>!exam.exam_taken?(
                <li key={exam.id}>{exam.job.name} - {} <button className='btn btn-link' onClick={()=>startExam(exam)} >Start</button></li>
            ):<></>)}
        </ol>
    </div>
  )
}

export default AvailableExams