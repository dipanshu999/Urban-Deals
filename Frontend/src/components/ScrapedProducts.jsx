  import React, { useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import Loader from '../components/Loader/Loader'
  import flipkart from '../components/Loader/flipkart.webp'
  import axios from 'axios'
  const backendUrl = import.meta.env.VITE_API_URL

  export default function ScrapedProducts() {

      const [loading,setLoading]=useState(false); 
      const [ScrapedProducts,setScrapedProducts]=useState([]); 

      const query=useParams();
      const category=query.category
      useEffect(()=>{
          FetchScrapedProducts();
          console.log(category)
        },[])

        async function FetchScrapedProducts(){
          const data = await axios.get(`${backendUrl}/api/hello`)
          .then(res=>console.log(res.data))
          .catch(err=>console.log(err))

          setLoading(true);
          const pro= await axios.get(`${backendUrl}/api/scrape?category=${category}`)
          .then(res=>{console.log(res.data), setScrapedProducts(res.data)})
          .catch(err=>console.log(err))
          .finally(()=>setLoading(false))
        }

    return (
      <div>

        {
          loading ?
           ( 
           <>
              <Loader/>
              <div className='flex items-center justify-center mt-[21rem] gap-2'>
                <div className='font-semibold text-2xl'>Scraping products from ... </div> 
                <div className='w-44 '><img className='' src={flipkart} alt="" /></div>
              </div>
            </>
           )
            :
           ( 

            <>
            <div className="heading">
              <p className='text-center text-3xl mt-14' >Here's your products for <span className='font-bold text-green-500'> {category}</span> category  </p>
            </div>

            <div className=' card-outer-container gap-x-10 gap-y-4 mt-16 flex flex-wrap justify-center'>
            {ScrapedProducts.map((item,index)=>
              <div key={index}  className='card mt-4 flex border rounded-lg shadow-lg p-3 h-[13rem] gap-2 w-[40%] items-center justify-between'>

                <div className=" image h-full w-32 border ">
                 <img className='w-full h-full object-cover' src={item.image} alt="" />
                </div>

                <div className="text-part w-[75%] h-full flex flex-col justify-between ">
                 <p className='text-4xl '>{item.brand}</p>
                 <p className='text-3xl font-bold text-orange-500'>{item.price}</p>
                 <p className='text-base leading-[0.9rem] font-light'>{item.title}</p>
                 <button className='bg-yellow-400 rounded-md w-28 font-medium py-1 px-3  ' ><a target='_blank' href={item.link}>Buy</a></button>
                </div>

              </div>
              
              
             )}
            </div>
            </>
          )

        }
        
      </div>
    )
  }
