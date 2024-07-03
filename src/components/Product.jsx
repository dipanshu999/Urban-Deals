import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../Utils/axiosInstance'
import Loader from './Loader/Loader';
import Back from './Back';



export default function Product() {

 
  const {id}= useParams()
  const[product,setProduct]=useState();

  async function getSingleProduct(){

    try{
      const {data}=await axiosInstance.get(`/products/${id}`)
      console.log(data)
      setProduct(data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getSingleProduct()
  },[])

  if (!product) {
    return <Loader/>;
  }

  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + ' ...';
  }
 
  const{title,description,category,image,price}=product;
  const truncatedDescription = truncateText(description, 35);
  const truncatedTitle = truncateText(title, 7);
 
  

  return (
    <div className='flex  flex-col tab:flex-row  items-center tab:px-4 lap:px-10'>
     
      <div className='mt-6' >
        <Back/> 
      </div>
    
      <div className='bg-white  w-[100vw] flex flex-col gap-5 mob:w-[80vw] mob:mt-16 py-12 my-4 tab:w-[80vw] tab:min-h-[70vh] tab:flex-row tab:gap-20 lap:w-[70vw] shadow-2xl rounded-2xl mx-auto mt-10  justify-center items-center  '>

        <div className="pic  h-[12em]  mob:h-[16em] tab:ml-2 " >
          <img src={image} className='h-full object-contain ' alt={category} />
        </div>
                
        <div className="detail  w-[20em] mt-4 xsm:w-[24em] px-4 mob:px-0 mob:w-[30em] tab:w-[35em] tab:items-start flex flex-col gap-5 justify-center   ">

          <div className="title w-full">
            <p className='text-3xl  mob:text-4xl  tab:text-4xl lap:text-5xl font-semibold'>{truncatedTitle}</p>
          </div>

          <div className="category">
            <p className='text-slate-500 text-sm tab:text-md'>{category}</p>
          </div>

          <div className="price">
            <p className='text-orange-600 text-xl xsm:text-3xl'>${price}</p>
          </div>

          <div className="w-[98%] description leading-4  min-h-18  text-blue-950">
            <p className=' text-sm opacity-70'>{truncatedDescription}</p>
          </div>

          <div className="btn flex gap-4">
            <button className='border-2 border-green-400 px-4 xsm:py-1 lap:py-2  rounded-xl '>Edit</button>
            <button className='border-2 border-red-400   px-4 xsm:py-1 lap:py-2  rounded-xl '>Delete</button>
          </div>
        </div>

      </div>
   
    </div>
  )
}
