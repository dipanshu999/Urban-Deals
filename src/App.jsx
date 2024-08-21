import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Product from './components/Product'
import Create from './components/Create'
import Edit from './components/Edit'
import Cart from './components/Cart'
import { ProductContext } from './Utils/Context'
import About from './components/About'


export default function App() {
  let {darkMode,setNavToggle,navToggle}=useContext(ProductContext)
  return (
    <>
      <div  className={`  max-w-[1400px] w-full  mx-auto ${darkMode?'bg-[#161616]': 'bg-white' } ` } >
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Home/>}/>
          <Route path='/product/:id' element={ <Product/>}/>
          <Route path='/edit/:id' element={ <Edit/>}/>
          <Route path='/create' element={ <Create/>}/>
          <Route path='/cart' element={ <Cart/>}/>
          <Route path='/about' element={ <About/>}/>
        </Routes>
      </div>
    </>
  )
}
