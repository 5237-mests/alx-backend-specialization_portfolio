import React, { useContext } from 'react'
import NavBar from './NavBar'
import {StatesContext} from './StatesContext'


function Header() {
  let {setLogged, setStarted} = useContext(StatesContext);
  return (
    <div className='mt-1'>
          <NavBar setLogged={setLogged} setStarted={setStarted}/>
    </div>
  )
}

export default Header;
