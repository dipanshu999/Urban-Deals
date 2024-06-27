import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Utils/axiosInstance'



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
    return <div>Loading...</div>;
  }

  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }
 
  const{title,description,category,image,price}=product;
  const truncatedDescription = truncateText(description, 35);
  const truncatedTitle = truncateText(description, 7);
 
  return (
    <>
      <div className='product-container flex gap-10 justify-center items-center w-[70vw] min-h-[70vh] shadow-2xl rounded-xl mx-auto mt-10 '>
        
        <div className="pic h-[20em] w-[17em] " >
          <img src={image} className='h-full object-contain ' alt="" />
        </div>

        <div className="description w-[35em] h-[20em] flex flex-col gap-4 justify-center ">
          <div className="title">
            <p className='text-5xl font-semibold'>{truncatedTitle}</p>
          </div>

          <div className="category">
            <p className='text-slate-500'>{category}</p>
          </div>

          <div className="price">
            <p className='text-orange-600 text-xl'>${price}</p>
          </div>

          <div className="detail w-[90%] min-h-20  text-blue-950">
            <p className='text-sm '>{truncatedDescription}</p>
          </div>

          <div className="btn flex gap-4">
            <button className='border-2 border-green-300 px-4 py-2  rounded-xl '>Edit</button>
            <button className='border-2 border-red-300 px-4 py-2  rounded-xl '>Delete</button>
          </div>
        </div>

      </div>
    </>
  )
}
