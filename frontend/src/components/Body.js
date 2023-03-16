import axios from 'axios'
import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Post from './Post'
import { StatesContext, StatesProvider } from './StatesContext'
import PaginatePosts from './PaginatePosts'
import Login from './Login'

function Body() {
      const {logged} = useContext(StatesContext)
  return (
    <>
      {!logged && 
      <Login/>}
      {logged &&
      <PaginatePosts/>
      }
    </>
  )
}

export default Body