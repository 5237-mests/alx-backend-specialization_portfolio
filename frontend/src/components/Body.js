import React, { useContext } from 'react'
import { StatesContext } from './StatesContext'
import PaginatePosts from './PaginatePosts'
import Login from './Login'

function Body() {
      const {logged} = useContext(StatesContext)
  return (
    <>
      {!logged && <Login/>}
      {logged && <PaginatePosts/>}
    </>
  )
}

export default Body