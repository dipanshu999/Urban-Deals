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


export default function App() {
  let {darkMode}=useContext(ProductContext)
  return (
    <>
    <div className={`max-w-[1400px] w-full  mx-auto ${darkMode?'bg-[#1a1919]': 'bg-white' } ` } >
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/product/:id' element={ <Product/>}/>
        <Route path='/edit/:id' element={ <Edit/>}/>
        <Route path='/create' element={ <Create/>}/>
        <Route path='/cart' element={ <Cart/>}/>
      </Routes>
    </div>
    </>
  )
}
