import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'

export default function Navbar() {
  const contextValues = useContext(ProductContext);
  const navToggle = contextValues[5];
  const setNavToggle = contextValues[4];
  

  return (
    <>
      <nav className=' bg-white-100 h-[60px] tab:h-[70px] w-full backdrop-blur-sm sticky top-0  z-30  flex justify-between items-center px-10 border-b border-black'>
        
        <Link to={'/'}>
          <div className="logo ">
            <p className='text-4xl'>Logo</p>
          </div>
        </Link>

        <div onClick={()=>setNavToggle(()=>!navToggle)} className='tab:hidden bg-black' >
         { 
         navToggle
            ?
          <div className="cross hover:cursor-pointer">
            <svg className='h-6 w-6' fill="#ffffff"  version="1.1"    viewBox="0 0 490 490"  stroke="#ffffff"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>
          </div>
            :
          <div className="hamBurger">
            <svg  className='h-8 w-8 hover:cursor-pointer '  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,1)"><path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path></svg>
          </div>    
        }
        </div>

        <div className="hidden tab:block navLinks text-4xl  ">
          <ul className=' list-none flex gap-10 font-light'>
            <li>About</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
        </div>

        
      </nav>
    </>
  )
}
