import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Product from './components/Product'


export default function App() {
  return (
    <div className=' h-screen w-full max-w-[1400px] ' >
      <Navbar/>

      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/product/:id' element={ <Product/>}/>
      </Routes>
    </div>
  )
}
