import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className=' bg-white-100 h-[70px] w-full backdrop-blur-sm sticky top-0  z-30  flex justify-between items-center px-10 border-b border-black'>
        
        <Link to={'/'}>
          <div className="logo ">
            <p className='text-4xl'>Logo</p>
          </div>
        </Link>

        <div className="navLinks text-4xl  ">
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
