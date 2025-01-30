  import React, { useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import Loader from '../components/Loader/Loader'
  import flipkart from '../components/Loader/flipkart.webp'
  import axios from 'axios'
  const backendUrl = import.meta.env.VITE_API_URL

  export default function ScrapedProducts() {

      const [loading,setLoading]=useState(false); 
      const [ScrapedProducts,setScrapedProducts]=useState([1,58,7,8]); 

      const query=useParams();
      const category=query.category
      useEffect(()=>{
          FetchScrapedProducts();
          console.log(category)
        },[])

        async function FetchScrapedProducts(){
          // const data = await axios.get(`${backendUrl}/api/hello`)
          // .then(res=>console.log(res.data))
          // .catch(err=>console.log(err))

          // setLoading(true);
          // const pro= await axios.get(`${backendUrl}/api/scrape?category=${category}`)
          // .then(res=>{console.log(res.data), setScrapedProducts(res.data)})
          // .catch(err=>console.log(err))
          // .finally(()=>setLoading(false))
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
              <p className='text-center text-2xl tab:text-3xl tab:mt-14 mt-6' >Here's your products for <span className='font-bold text-green-500'> {category}</span> category  </p>
            </div>

            <div className=' border card-outer-container lap:gap-x-10 tab:gap-x-6 gap-y-4 tab:mt-16 mt-4  flex flex-wrap justify-center'>
            {ScrapedProducts.map((item,index)=>
              <div key={index} className='card mt-4 flex border rounded-lg shadow-lg p-3 h-[13.3rem] xsm:h-[13rem] mob:h-[14rem] tab:h-[12rem] lap:h-[13rem] gap-2 w-[98%] mob:w-[75%] tab:w-[48%] lap:w-[45%] items-center justify-between'>

                <div className=" image h-full w-32 border overflow-hidden rounded-xl">
                 <img className='w-full h-full object-cover '  alt="" />
                </div>

                <div className="text-part w-[75%] h-full flex flex-col justify-between ">
                 <p className=' text-4xl mob:text-4xl tab:text-[2rem] lap:text-4xl '>Lorem, ipsum.</p>
                 <p className=' text-3xl mob:text-2xl tab:text-2xl lap:text-3xl font-bold text-orange-500'>$453</p>
                 <p className=' text-sm xsm:text-base mob:text-lg tab:text-sm leading-[0.9rem] xsm:leading-[0.9rem] tab:leading-[0.9rem] mob:leading-[1rem]  font-light'>Lorem ipsum, adipisicing elit. Aliquid, optio provident? Consectetur! Lorem ipsum dolor sit.</p>
                 <button className='bg-yellow-400 rounded-md w-28 font-medium py-1 px-3  ' ><a target='_blank' href='#'>Buy</a></button>
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
