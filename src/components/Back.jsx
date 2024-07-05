import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Back() {
  let navigate=useNavigate()

  return (
    <>
      <div className="btn h-10 w-10 mob:h-16 mob:w-16">
        <button onClick={()=>navigate(-1)} > <img src='../public/back.png' alt="" /> </button>
      </div>
    </>
  )
}
