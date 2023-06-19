import React from 'react'
import Chat from '../components/Chat'
import Navbar from '../components/Navbar'
import UsersInfo from '../components/UsersInfo'

const Home = () => {
  return (
    <div>
    <Navbar/>
    <UsersInfo/>
    <Chat/>
    </div>
  )
}

export default Home
