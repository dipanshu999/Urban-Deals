import React, { useContext, useEffect, useState } from 'react'
import Dropdown from './DropDown'
import Card from './Card'
import { ProductContext } from '../Utils/Context'
import { Link, useLocation } from 'react-router-dom'
import Loader from './Loader/Loader'
import Axios from '../Utils/axiosInstance'


export default function Home() {
  let {products,loading,setLoading}=useContext(ProductContext)

  const [filteredProducts,setFilteredProducts]= useState(products);
  
  const {search}= useLocation()
  const category=decodeURIComponent(search.split('=')[1])
  console.log(category);


  useEffect(()=>{
    if(category && category!=='undefined')
      filterProducts(category)
    if(category=='undefined')
      setFilteredProducts(products)

},[products,category])


  async function  filterProducts(category){

    setLoading(true)

    try{
       if(category && category!=='All section'){
      
      // const {data}=await Axios.get(`/products/category/${category}`)
      setFilteredProducts(products.filter(item=>item.category == category))
      }

    else
      setFilteredProducts(products)
    }catch(err){
    setLoading(false)
    console.log(err)
  }finally{
    setLoading(false)
  }

  }

  useEffect(()=>{
    console.log(filteredProducts)
  },[filteredProducts])

  return (
    <>
    
    { loading? <Loader/>
    :
      <div className='mb-8'>
      

        <div className='flex justify-center mt-10 gap-10 items-center '>
          <Link to={'/create'} className='border-2 border-black px-5 py-2'>Add</Link>
          <Dropdown filterProducts={filterProducts}/>
        </div>

        
        <div className=' card-container gap-12 xsm:w-[92vw] lap:w-[90%] mob:gap-12 lap:gap-16 mx-auto flex flex-wrap  pt-6 justify-center'>
           {
             filteredProducts.map(item=> <Link key={item.id} to={`/product/${item.id}`}><Card item={item} /></Link>)
           }
        </div>
    
    
        
      </div>
        }
    </>
  );
}
