import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Utils/Context'


export default function Back() {
  let navigate=useNavigate()
  let {darkMode}=useContext(ProductContext);

  return (
    <>
      <div className={`  btn h-12 w-12 mob:h-16 mob:w-16 bg-white rounded-full `}>
        <button onClick={()=>navigate(-1)} className=' rounded-full border border-white' > <img src='/back.png' alt="" /> </button>
      </div>
    </>
  )
}
