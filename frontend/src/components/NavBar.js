import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import {StatesContext} from './StatesContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';

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
    axios.defaults.headers.common["Authorization"] = ``;
      props.setLogged(false);
      props.setStarted(false);
      navigate('/');
   
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="#home">EEP Exam</Navbar.Brand>
          <Nav className="ms-auto">
           {logged ? <div>
            {/* <Link to="/exam">Home</Link> */}
            <Link className='text-dark' to="/result-all">View Results</Link>
           </div>:<div></div>}
            {logged?<Button  onClick={logout}>Logout</Button>:<Link className='text-light text-decoration-none' to="/login">Login</Link>}
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
