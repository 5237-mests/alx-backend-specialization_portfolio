import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';


function NavBar(props) {

  const logout = async ()=>{
    const resp = await axios.post("http://localhost:8000/logout/")
    if (resp.status == 200)
    {
      props.setLogged(false);
      props.setStarted(false);
    }
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
