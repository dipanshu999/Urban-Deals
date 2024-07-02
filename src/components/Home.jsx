import React, { useContext } from 'react'
import Dropdown from './DropDown'
import Card from './Card'
import { ProductContext } from '../Utils/Context'
import { Link, useLocation } from 'react-router-dom'
import Loader from './Loader/Loader'


export default function Home() {
  let [products,loading]=useContext(ProductContext)
  const cat= useLocation()
 
  return (
    <>
    
    { loading? <Loader/>
    :
      <>
      <div className=''>

        <div className='flex justify-center mt-10 gap-10 items-center '>
          <input type="text" placeholder='Search' className='p-2 bg-gray-100 rounded-3xl border  border-black'/>
          <Dropdown products={products}/>
        </div>

        
        <div className=' card-container gap-12 xsm:w-[92vw] lap:w-[90%] mob:gap-12 lap:gap-16 mx-auto flex flex-wrap  pt-6 justify-center'>
           {
             products.map(item=> <Link key={item.id} to={`/product/${item.id}`}> <Card item={item} /></Link>)
            }
        </div>
    
    </div>
        
      </>
        }
    </>
  );
}
