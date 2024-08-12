import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'

import Mode from './Mode'

export default function Navbar() {
  const {navToggle,setNavToggle,darkMode,setMode} = useContext(ProductContext);

  return (
    <>
      <nav className={` ${darkMode?'bg-[#7924DE]':'bg-[#FEDC00]' }  h-[60px] tab:h-[70px] w-full sticky top-0 z-30 flex justify-between items-center px-10 border-b-2 border-black`}>
        
        <Link to={'/'}>
          <div className="logo ">
            <p className='text-4xl'>Logo</p>
          </div>
        </Link>

        <div onClick={()=>setNavToggle(()=>!navToggle)} className='tab:hidden bg-[#a8212a] p-2 rounded-md' >
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
        </div>


        <div className={` ${navToggle?'absolute':'hidden'} right-0 mt-[9.2em] tab:m-0  tab:static tab:block navLinks text-4xl `} >
          <div className={ `list-none ${darkMode?'bg-[#7924DE] text-[#FEDC00]' : 'bg-[#FEDC00] text-[#7924DE]'} gap-6 rounded-md p-6 px-12 mob:px-24 items-center flex flex-col tab:m-0 tab:p-0 tab:bg-none tab:flex-row tab:gap-10 font-semibold`}>
            <Mode setMode={setMode} />
            <NavLink to={'/'}> <div className=" w-12 "> <img className="h-full" src="../shopping-bag.png" alt="" /> </div> </NavLink>
            <NavLink to={'/cart'}>Cart</NavLink>
            <NavLink to={'/'}>Blogs</NavLink>
          </div>
        </div>

        
      </nav>
    </>
  )
}
