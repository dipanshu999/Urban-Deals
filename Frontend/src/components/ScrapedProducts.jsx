  import React, { useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import Loader from '../components/Loader/Loader'
  import flipkart from '../components/Loader/flipkart.webp'
  import axios from 'axios'
  const backendUrl = import.meta.env.VITE_API_URL
  let LocalHost='http://localhost:3001/'

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
            ScrapedProducts.map((item,index)=>
              <div key={index} className='mt-4'>
                <p>{item.title}</p>
                <p>{item.price}</p>
                <p>{item.brand}</p>
              </div>
            ))

        }
        
      </div>
    )
  }
