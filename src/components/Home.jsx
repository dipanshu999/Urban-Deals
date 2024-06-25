import React, { useContext } from 'react'
import Dropdown from './DropDown'
import Card from './Card'
import { ProductContext } from '../Utils/Context'
import { Link } from 'react-router-dom'
import Loader from './Loader'

export default function Home() {
  let [products,loading]=useContext(ProductContext)
  console.log(products)

  return (
    <>
    
    { loading? <Loader/>
    :
      <>
        <div className='flex justify-center mt-10 gap-10 items-center'>
          <input type="text" placeholder='Search' className='p-2 bg-gray-100 rounded-3xl border  border-black'/>
          <Dropdown/>
        </div>

    

        <div className='card-container  w-[80vw] mx-auto flex flex-wrap gap-16 pt-6 justify-center'>
           {
             products.map(item=> <Link key={item.id} to={`/product/${item.id}`}> <Card item={item} /></Link>)
           }
        </div>
        
      </>
        }
    </>
  );
}
