import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { StatesContext } from './StatesContext'


function NavBar() {
  const {logged, setLogged, setStarted} = useContext(StatesContext)
  let navigate = useNavigate();
  const logout = async ()=>{
    axios.defaults.headers.common["Authorization"] = ``;
      setLogged(false);
      setStarted(false);
      navigate('/');
  }

  return (
    <Navbar bg="primary" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href="#home">EEP Exam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {logged ? <div>
                <Link className='text-light text-decoration-none' to="/result-all">
                 View Results
                </Link>
              </div> : <div></div>
             }
          </Nav>
          <Nav>
            {logged ? <Nav.Link> <Button  onClick={logout}>Logout</Button> </Nav.Link> : 
                  <Link className='text-light text-decoration-none' to="/login">Login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
