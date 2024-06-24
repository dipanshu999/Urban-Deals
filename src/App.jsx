import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'

export default function App() {
  return (
    <div className=' h-screen w-full max-w-[1400px] ' >
      <Navbar/>
      <Home/>
    </div>
  )
}
