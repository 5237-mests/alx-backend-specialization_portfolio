import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import StatesProvider from './components/StatesContext';
import Home from './components/Home';
import Login from './components/Login';
import ExamQuestions from './components/ExamQuestions';
import ExamResult from './components/ExamResult';
import SignUpPage from './components/SignUpPage';
import ExamRegistration from './components/ExamRegistration';
import AllResults from './components/AllResults';
import AvailableExams from './components/AvailableExams';
import Profile from './components/Profile';
function App() {
  return (
     <StatesProvider>
      <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/exam' element={<ExamQuestions/>}/>
            <Route path='/exam-result' element={<ExamResult/>}/>
            <Route path='/register' element={<SignUpPage/>}/>
            <Route path='/register-exam' element={<ExamRegistration/>}/>
            <Route path='/result-all' element={<AllResults/>}/>
            <Route path='/avails' element={<AvailableExams/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
          <Footer/>
      </Router>
     </StatesProvider>
  );
}
export default App;
