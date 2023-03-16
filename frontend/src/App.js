import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import PaginatePosts from './components/PaginatePosts';

function App() {
  const [eligble, setEligble] = useState(true)
  const [started, setStarted] = useState(false)
  const [logged, setLogged] = useState(false)
  const [data, setData] = useState([])
  const [userid, setUserid] = useState(-1)
  const [headers, setHeaders] = useState({
})
  const getData = async ()=>{
    console.log(headers, "sent hasder")
    const resp = await axios.get("http://localhost:8000/api/users/", {headers})
    setData(resp.data)
    // alert(resp.data)
  }
  return (
    <div >
      <NavBar setLogged={setLogged} setStarted={setStarted}/>
      <Login setEligble={setEligble} logged={logged} setLogged={setLogged} setHeaders={setHeaders} setUserid={setUserid}/>
      {/* {logged && <Main logged={logged} headers={headers}/>} */}
      {/* <Button onClick={()=>alert("Hello")}>get Data</Button> */}
      <PaginatePosts eligble={eligble} setEligble={setEligble} userid={userid} logged={logged} started={started} setStarted={setStarted}/>
      {/* {logged && <Body userid={userid}/>} */}
      <Footer/>

    </div>
  );
}

export default App;
