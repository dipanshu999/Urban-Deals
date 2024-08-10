import React from 'react'

export default function Card({item}) {
    const {image,title}=item;
    function truncateText(text, wordLimit) {
      const words=text.split(' ');
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(' ') + ' ...';
    }
    const truncatedTitle = truncateText(title, 6);

  return (
    <>
        <div className="bg-white card h-[14em] w-[9.2em] shadow-lg xsm:h-[14em] xsm:w-[9.78em] mob:h-[14em] mob:w-[10.5em] lap:h-[16em] lap:w-[12em] border border-gray-300 shadows rounded-xl overflow-hidden"> 
            <div className='h-[70%] p-2'>
              <img src={image} className='h-full  m-auto object-contain' />
            </div>

            <div className="card-footer bg-[#FEDC00] text-xl font-medium h-[30%] flex justify-center items-center p-2">
                <p className='text-[#7924DE] text-[0.7em] mob:text-[1em] leading-5'>{truncatedTitle}</p>
            </div>
        </div> 
    </>
  )
}
