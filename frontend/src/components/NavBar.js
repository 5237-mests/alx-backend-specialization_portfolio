import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import {StatesContext} from './StatesContext'
import { useContext } from 'react';

import { useNavigate, Redirect,Route  } from 'react-router-dom';


// export function GoHome() {
//   let navigate = useNavigate();
//   const handleClick = e => {
//     e.preventDefault();
    
//   }
//   return <button onClick={handleClick}>Go to Home</button>
// }




function NavBar(props) {
const {logged} = useContext(StatesContext)
let navigate = useNavigate();
  const logout = async ()=>{
    const resp = await axios.post("http://localhost:8000/logout/")
    if (resp.status == 200)
    {
      props.setLogged(false);
      props.setStarted(false);
      navigate('/');
    }
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="#home">EEP Exam</Navbar.Brand>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link> */}
            {logged?<Button onClick={logout}>Logout</Button>:<Nav.Link href="/login">Login</Nav.Link>}
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
