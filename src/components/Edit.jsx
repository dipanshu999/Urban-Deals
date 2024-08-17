import React, { useContext, useEffect, useState } from 'react'
import Axios from '../Utils/axiosInstance'
import {nanoid} from 'nanoid'
import { ProductContext } from '../Utils/Context'
import 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Edit() {
    const{id}=useParams()

    let { setProducts, products }=useContext(ProductContext)    
    const navigate = useNavigate()

    const[product,setProduct]=useState({
      title:'',
      description:'',
      image:'',
      price:'',
      category:''
    });

    function changeHandler(e){
        console.log(e.target.value)
        setProduct({...product, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
      setProduct(products.filter((item)=>item.id == id)[0])
      console.log(product)
    },[])



    let handleSubmit=(e)=>{
      e.preventDefault();

        if(
            product.title.trim().length<4 || 
            product.description.trim().length<4 || 
            product.price.trim().length<1 ||
            product.image.trim().length<4 ||
            product.category.trim().length<4 
          )
          {
            toast.warn('All fields must have 4 charachters at least');
            return;
          }

       else{
            const pIndex=products.findIndex(item=>item.id==id)
            console.log(product,pIndex);
          
            const copyData=[...products];
            copyData[pIndex]={...products[pIndex],...product};
            setProducts(copyData);
            
            localStorage.setItem('products', JSON.stringify(copyData))
            toast.success('Product edited successfully')
            navigate(-1)
        }
        
    }

  


  return (
    <div className='min-h-screen'>
      <div className="form  mob:w-[70%] mx-auto border-2 p-10 mt-8 rounded-2xl shadow-2xl">

        <form action="" className='flex flex-col gap-4'>

            <input type="text" placeholder='Title' name='title' onChange={changeHandler} value={product&&product.title} className='border-2 p-2 border-slate-500 rounded-md'/>

            <input type="url" placeholder='Image URL' name='image' onChange={changeHandler} value={product&&product.image} className='border-2 p-2 border-slate-500 rounded-md'/>

                <div className="price-desc flex flex-col tab:flex-row justify-between gap-4">
                    <input type="number" name='price'  placeholder='Price' onChange={changeHandler} value={product&&product.price} className='border-2  p-2 border-slate-500 rounded-md' />
                    <input type="text "  name='category' placeholder='Category' onChange={changeHandler} value={product&&product.category} className='border-2 p-2 flex-1 border-slate-500 rounded-md' />
                </div>

            <textarea placeholder='Description' name='description' onChange={changeHandler} value={product&&product.description} className=' border-2 p-2 h-28 border-slate-500 rounded-md'></textarea>

            <input type="submit" onClick={handleSubmit} className='bg-black hover:cursor-pointer border border-white text-white w-24 py-3 rounded-xl font-medium mx-auto text-xl'/>
        </form>

      </div>
    </div>
  )
}