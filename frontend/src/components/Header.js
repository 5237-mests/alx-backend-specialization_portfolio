import React, { useContext } from 'react'
import NavBar from './NavBar'
import {StatesContext} from './StatesContext'


function Header() {
  let {setLogged, setStarted} = useContext(StatesContext);
  return (
    <div className='position-relative'>
          <NavBar setLogged={setLogged} setStarted={setStarted}/>
    </div>
  )
}

export default Header;
