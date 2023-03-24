import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { StatesContext } from './StatesContext'
import API from './API';

function NavBar() {
  const {logged,isAdmin,setIsAdmin, isAuthenticated, setLogged, setStarted,setEligble, setIsloading, setIsAuthenticated, exams, setExams, userid} = useContext(StatesContext)
  let navigate = useNavigate();
  const logout = async ()=>{
    
    const resp = await API.get("auth/logout/")
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    console.log(resp.data, "logout data")
      setLogged(false);
      setStarted(false);
      setIsloading(false)
      setEligble(false)
      setIsAdmin(false)
     localStorage.removeItem("logged")
     localStorage.removeItem("started")
     localStorage.removeItem("progress")
     localStorage.removeItem("isLoading")
     localStorage.removeItem("eligble")
     localStorage.removeItem("isAdmin")
     localStorage.removeItem("userid")

      navigate('/');
  }

  const getExams = async () => {
    
   try{
    const resp = await API.get(`api/exam-cand/${userid}`)
    console.log(resp.data, "gt=et data?")
    const avail = resp.data.filter(exam=>!exam.exam_taken)
    console.log(avail, "avails")
   setExams(avail)
   navigate("/avails")
   }
   catch (e) {
    setExams(false)
   } 
    }
    const getProfile =() => {
      navigate("/profile")
    }

  return (
    <Navbar bg="primary" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href="#home">EEP Exam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {logged && exams? 
              
               <Button className='text-light text-decoration-none' onClick={getExams}>
                 Exams
                </Button>
               
              : <></>
             }
          </Nav>
          <Nav>
          {isAdmin && userid && 
                 <>
                 <Link className='btn text-light text-decoration-none' to="/result-all">
                   Results
                   </Link>
                     
                      <Link className='btn text-light text-decoration-none' to="/bulk-insert">
                      Candidates
                    </Link>
                 </>
               }
          </Nav>
          <Nav>
          {isAuthenticated && 
               <Link className='btn text-light text-decoration-none' to="/exam-result">
               My Score
              </Link>
               }
          </Nav>
          <Nav>
            {logged ? <>
              <Button onClick={getProfile}>{userid}</Button>
              <Nav.Link> <Button  onClick={logout}>Logout</Button> </Nav.Link>
            </> : 
                  <Link className='text-light text-decoration-none' to="/login">Login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
