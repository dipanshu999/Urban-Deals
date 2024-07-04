import React from 'react'

export default function Create() {

    let handleSubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <>
      <div className="form mob:w-[70%] mx-auto border-2 p-10 mt-8 rounded-2xl shadow-2xl">

        <form action="" className='flex flex-col gap-4'>
            <input type="text" placeholder='Title' className='border-2 p-2 border-black rounded-md'/>
            <input type="text" placeholder='Image URL' className='border-2 p-2 border-black rounded-md'/>
                <div className="price-desc flex flex-col tab:flex-row justify-between gap-4">
                    <input type="number " placeholder='Price' className='border-2  p-2 border-black rounded-md' />
                    <input type="text " placeholder='Category' className='border-2 p-2 flex-1 border-black rounded-md' />
                </div>
            <textarea placeholder='Description' className=' border-2 p-2 h-28 border-black rounded-md'></textarea>

            <input type="submit" onClick={handleSubmit} className='bg-black hover:cursor-pointer text-white w-24 py-3 rounded-xl font-medium mx-auto text-xl'/>
        </form>

      </div>
    </>
  )
}
