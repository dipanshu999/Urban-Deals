import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'
import './Loader/cart.css'

import Mode from './Mode'

export default function Navbar() {
  const {navToggle,setNavToggle,darkMode,setMode,cartProducts,products, setFilteredProducts} = useContext(ProductContext);

  const [value,setValue]=useState('')
  

  const search = (value) => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <nav className={`${darkMode?'bg-[#913df8]':'bg-[#FEDC00]' } h-[60px] tab:h-[70px] w-full sticky top-0 z-30 flex justify-between items-center px-6 mob:px-10 border-b-2 border-black`}>
        
        <Link to={'/'}>
          <div onClick={()=>setNavToggle(false)} className="logo h-11 border border-black rounded-lg overflow-hidden">
            <img src='../Logo.png' className='h-full'></img>
          </div>
        </Link>

        
          

      <div className="seacrh--NavLinks flex items-center gap-1 tab:gap-6">
        <div className="search">
            <input type="text" onChange={(e)=>{search(e.target.value) ;setValue(e.target.value)}} className='border border-black w-24 mob:w-32 mob:h-9 pl-1 rounded-md mob:rounded-xl' value={value} placeholder='🔍Search'/>
        </div>

        <div onClick={()=>setNavToggle(()=>!navToggle)} className='tab:hidden bg-[#a8212a] p-1 mob:p-2 rounded-md' >

         { 
         navToggle
            ?
          <div className="cross hover:cursor-pointer">
            <svg className='h-7 w-7' fill="#ffffff"  version="1.1"    viewBox="0 0 490 490"  stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>
          </div>
            :
          <div className="hamBurger">
            <svg  className='h-8 w-8 hover:cursor-pointer '  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,1)"><path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path></svg>
          </div>    
        }
        </div>  {/*Hambuger menu is hidden till laptop screen*/}   


        <div  className={`  NavLinks  ${navToggle?'absolute':'hidden'}  right-0 mt-[9.2em] tab:m-0  tab:static tab:flex navLinks text-4xl `} >

          <div className={ `list-none ${darkMode?'bg-[#913df8] text-[#FEDC00]' : 'bg-[#FEDC00] text-[#7924DE]'} gap-6 rounded-md p-6 px-12 mob:px-24 items-center flex flex-col tab:m-0 tab:p-0 tab:bg-none tab:flex-row tab:gap-10 font-semibold`}>
            <Mode setMode={setMode} />
            
            <NavLink to={'/cart'} onClick={()=>setNavToggle(false)}> 
              <div className=" cart w-9 pt-2 relative "> 
                <img className="h-full " src="../cart.png" alt="" /> 
                {cartProducts.length>0 ? <span className='absolute  w-6 h-6 top-1 left-5 flex justify-center items-center  text-lg bg-[#ff3232] text-white rounded-full'>{cartProducts.length}</span> :null }          
              </div> 
            </NavLink>
            
            <NavLink onClick={()=>setNavToggle(false)} to={'/about'}>About</NavLink>
          </div>  
        </div>
      </div>

        
      </nav>
    </>
  )
}
