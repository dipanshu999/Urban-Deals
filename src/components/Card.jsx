import React from 'react'

export default function Card({item}) {
    const {image,title}=item;
  return (
    <>
        <div className="card h-[16em] w-[12em] border border-gray-400 rounded-xl overflow-hidden"> 
            <div className='h-[70%] p-2'>
              <img src={image} className='h-full  m-auto bg-contain' />
            </div>

            <div className="card-footer bg-slate-600 h-[30%] ">
                <p className='text-white'>{title}</p>
            </div>
        </div> 
    </>
  )
}
