import React, { useContext, useEffect, useState } from 'react'
import Axios from '../Utils/axiosInstance'
import {nanoid} from 'nanoid'
import { ProductContext } from '../Utils/Context'
import 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Create() {

    let { setProducts, products, copyProducts,setCopyProducts }=useContext(ProductContext)    
    console.log({ setProducts, copyProducts, setCopyProducts });
    const navigate = useNavigate()

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    let handleSubmit=(e)=>{
      e.preventDefault();

        if(title.trim().length<4 || description.trim().length<4 || price.trim().length<1 || image.trim().length<4 || category.trim().length<4 )
          {
            alert('All fields must have 4 charachters at least')
          }

       else{
        const product={
          id:nanoid(),title,price,category,image,description
            };
          
            setProducts((prevProducts) => [...prevProducts, product]);
            setCopyProducts((prevCopyProducts) => [...prevCopyProducts, product]);
             
        navigate('/')
        }
        
    }

    useEffect(()=>{
      console.log(products)
    },[products])


  return (
    <>
      <div className="form mob:w-[70%] mx-auto border-2 p-10 mt-8 rounded-2xl shadow-2xl">

        <form action="" className='flex flex-col gap-4'>

            <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title} className='border-2 p-2 border-slate-500 rounded-md'/>

            <input type="url" placeholder='Image URL' onChange={(e)=>setImage(e.target.value)} value={image} className='border-2 p-2 border-slate-500 rounded-md'/>

                <div className="price-desc flex flex-col tab:flex-row justify-between gap-4">
                    <input type="number" placeholder='Price' onChange={(e)=>setPrice(e.target.value)} value={price} className='border-2  p-2 border-slate-500 rounded-md' />
                    <input type="text " placeholder='Category' onChange={(e)=>setCategory(e.target.value)} value={category} className='border-2 p-2 flex-1 border-slate-500 rounded-md' />
                </div>

            <textarea placeholder='Description' onChange={(e)=>setDescription(e.target.value)} value={description} className=' border-2 p-2 h-28 border-slate-500 rounded-md'></textarea>

            <input type="submit" onClick={handleSubmit} className='bg-black hover:cursor-pointer text-white w-24 py-3 rounded-xl font-medium mx-auto text-xl'/>
        </form>

      </div>
    </>
  )
}
