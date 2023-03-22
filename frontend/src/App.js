import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import axios from 'axios';
import StatesProvider from './components/StatesContext';
import Body from './components/Body';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import PaginatePosts from './components/PaginatePosts';
import ExamResult from './components/ExamResult';
import Registration from './components/Registration';
import ExamRegistration from './components/ExamRegistration';
import AllResults from './components/AllResults';

function App() {
  // const [data, setData] = useState([])
  // const getData = async ()=>{
  //   const resp = await axios.get("http://localhost:8000/api/users/")
  //   setData(resp.data)
  // }
  return (
     <StatesProvider>
      <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Body/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/exam' element={<PaginatePosts/>}/>
            <Route path='/exam-result' element={<ExamResult/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/register-exam' element={<ExamRegistration/>}/>
            <Route path='/result-all' element={<AllResults/>}/>

            
          </Routes>
          <Footer/>
      </Router>
     </StatesProvider>
  );
}
export default App;
