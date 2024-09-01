import React from 'react'
import day from './Loader/day-mode.png'
import night from './Loader/night-mode.png'


export default function Mode({setMode}) {
  return (
    <>
       <div className="ToggleBox flex gap-3 items-center bg-slate-800 p-1 py-1 rounded-xl ">      {/*  Mode Toggle button*/}
          <div className=" DAY h-7 w-7 contrast-200 saturate-200  "><img  src= {day} alt="" /></div>
             <label className="inline-flex items-center cursor-pointer border-white  rounded-full">
                 <input type="checkbox" value="" className="sr-only peer" onClick={setMode} />
                 <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
             </label>
          <div className=" NIGHT h-7 w-7  contrast-200 saturate-200"><img src= {night} alt="" /></div>  
       </div>
    </>
  )
}
