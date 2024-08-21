import React, { useContext } from 'react'
import { ProductContext } from '../Utils/Context';

export default function Card({item}) {
    let {darkMode}=useContext(ProductContext)
    const {image,title,price,rating}=item;
    function truncateText(text, wordLimit) {
      const words=text.split(' ');
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(' ') ;
    }
    const truncatedTitle = truncateText(title, 5);

    const rate = rating?.rate || 'N/A';

  return (
    <>
        <div className={`${darkMode &&  'border border-white shadow-white shadow-md'} bg-white card h-[14em] w-[9.2em] shadow-lg xsm:h-[14em] xsm:w-[9.78em] mob:h-[14em] mob:w-[10.5em] lap:h-[16em] lap:w-[12em] border border-gray-300 shadows rounded-xl overflow-hidden`}> 
            <div className='h-[70%] p-2'>
              <img src={image} className='h-full  m-auto object-contain' />
            </div>

            <div className="card-footer bg-[#FEDC00] pl-1 h-[30%] flex flex-col justify-between gap-1 ">
                <div className=' h-[60%] flex items-center overflow-y-hidden '>
                <p className='text-[#7924DE] text-[1em] font-medium leading-4'>{truncatedTitle}</p>
            </div>

                <div className='flex justify-between items-center pr-2'>
                  <p className='text-xl font-bold'>${price}</p>
                  <p className='bg-white rounded-md mb-[0.15rem]'>⭐{rate}</p>
                </div>
            </div>
        </div> 
    </>
  )
}
