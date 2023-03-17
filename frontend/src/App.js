import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import axios from 'axios';
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
      <Footer />
     </StatesProvider>
  );
}
export default App;
