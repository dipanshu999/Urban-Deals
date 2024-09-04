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
import ProtectedRoutes from './Utils/ProtectedRoutes'
import Login from './components/Login'
import SignUp from './components/SignUp'

export default function App() {
  let {darkMode}=useContext(ProductContext)
  return (
    <>
      <div  className={`  max-w-[1400px] w-full  mx-auto ${darkMode?'bg-[#0e0e0e]': 'bg-white' } ` } >
        <Navbar/>
        
        <Routes>
          <Route path='/' element={ <Home/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<SignUp/>} />

          <Route element={<ProtectedRoutes/>} >
            <Route path='/product/:id' element={ <Product/>}/>
            <Route path='/edit/:id' element={ <Edit/>}/>
            <Route path='/create' element={ <Create/>}/>
            <Route path='/cart' element={ <Cart/>}/>
            <Route path='/about' element={ <About/>}/>
          </Route>
        </Routes>
      </div>
    </>
  )
}
