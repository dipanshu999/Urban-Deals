import React from 'react'
import Dropdown from './DropDown'

export default function Home() {
  return (
    <>
        <div className='flex justify-center mt-10 gap-10 items-center'>
          <input type="text" placeholder='Search' className='p-2 bg-gray-100 rounded-3xl border  border-black'/>
          <Dropdown/>
        </div>

        <div className='card-container border w-[80vw] mx-auto flex flex-wrap gap-12 pt-6 justify-center'>

          <div className="card h-[16em] w-[12em] border border-gray-400 rounded-xl"> 
            <div className='h-[70%] p-2'>
              <img src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg" className='h-full  m-auto bg-contain' />
            </div>
          </div>
          
        </div>
    </>
  )
}
