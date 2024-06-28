import React from 'react'

export default function Card({item}) {
    const {image,title}=item;
  return (
    <>
        <div className="card h-[12em] w-[8em] xsm:h-[14em] xsm:w-[9.78em] mob:h-[16em] mob:w-[12em] border border-gray-400 rounded-xl overflow-hidden"> 
            <div className='h-[70%] p-2'>
              <img src={image} className='h-full  m-auto bg-contain' />
            </div>

            <div className="card-footer bg-slate-600 h-[30%] flex justify-center items-center p-1">
                <p className='text-white text-[0.7em] mob:text-[1em] leading-4'>{title}</p>
            </div>
        </div> 
    </>
  )
}
