import React, { useContext } from 'react'
import { StatesContext } from './StatesContext'
import PaginatePosts from './PaginatePosts'
import Login from './Login'
import Home from './Home'

function Body() {
      const {logged} = useContext(StatesContext)
  return (
    <>
      <Home/>
      {/* {!logged && <Login/>}
      {logged && <PaginatePosts/>} */}
    </>
  )
}

export default Body