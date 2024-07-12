import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'
import day from './Loader/day-mode.png'
import night from './Loader/night-mode.png'

export default function Navbar() {
  const {navToggle,setNavToggle,darkMode,setMode} = useContext(ProductContext);

  return (
    <>
      <nav className={` ${darkMode?'bg-black':'bg-[#7a5dd8]' } h-[60px] tab:h-[70px] w-full sticky top-0 z-30 flex justify-between items-center px-10 border-b-2 border-black`}>
        
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


        <div className="ToggleBox flex gap-3">      {/*  Mode Toggle button*/}
          <div className=" DAY h-8 w-8 contrast-200 saturate-200  "><img  src= {day} alt="" /></div>
             <label className="inline-flex items-center cursor-pointer border-white  rounded-full">
                 <input type="checkbox" value="" className="sr-only peer" onClick={setMode} />
                 <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
             </label>
          <div className=" NIGHT h-8 w-8  contrast-200 saturate-200"><img src= {night} alt="" /></div>  
       </div>


        <div className="hidden tab:block navLinks text-4xl  ">
          <ul className=' list-none flex gap-10 font-normal text-white'>
            <li>About</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
        </div>

        
      </nav>
    </>
  )
}
