import React from 'react'

export default function ScrapingPopup({setIsLiked}) {
  return (
    <div className='absolute w-[30rem] p-4 h-[15rem] rounded-md border left-1/2 mt-40 z-40 transform -translate-x-1/2 -translate-y-1/2  bg-white'> 
      
      <p className='text-[1.6em] leading-8 font-medium mt-5'>Our <u>Web Scraper</u>  wants to show you more products of this category </p>
      
      <button className='text-lg font-semibold border py-2 px-4 rounded-md mt-9 bg-[#FEDC00]'>Show me</button>
      <button className='text-lg font-semibold border py-2 px-4 rounded-md ml-6 bg-[]' onClick={()=>setIsLiked(false)} >No, thanks</button>

    </div>
  )
}
