import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';

import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import PaginatePosts from './components/PaginatePosts';
import StatesProvider from './components/StatesContext';
import Body from './components/Body';

function App() {
  const [data, setData] = useState([])
    
  const getData = async ()=>{
    const resp = await axios.get("http://localhost:8000/api/users/")
    setData(resp.data)
  }
  return (
     <StatesProvider>
      <Header />
            <Body/>
     </StatesProvider>
  );
}
export default App;


  {/* <NavBar setLogged={setLogged} setStarted={setStarted}/> */}
     {/* <StatesProvider>
       <Login/>
     </StatesProvider> */}
      {/* {logged && <Main logged={logged} headers={headers}/>} */}
      {/* <Button onClick={()=>alert("Hello")}>get Data</Button> */}
      {/* <PaginatePosts eligble={eligble} setEligble={setEligble} userid={userid} logged={logged} started={started} setStarted={setStarted}/> */}
      {/* {logged && <Body userid={userid}/>} */}
      {/* <Footer/> */}