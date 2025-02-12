  import React, { useContext, useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import Loader from '../components/Loader/Loader'
  import flipkart from '../components/Loader/flipkart.webp'
  import axios from 'axios'
  import { ProductContext } from '../Utils/Context'
  const backendUrl = import.meta.env.VITE_API_URL

  export default function ScrapedProducts() {

    const {darkMode}=useContext(ProductContext);

      const [loading,setLoading]=useState(false); 
      const [ScrapedProducts,setScrapedProducts]=useState([5,4,8,9]);

      const query=useParams();
      const category=query.category;
      useEffect(()=>{
          FetchScrapedProducts();
          setLoading(true);
          console.log(category)
        },[])

        async function FetchScrapedProducts(){
          const data = await axios.get(`${backendUrl}/api/hello`)
          .then(res=>console.log(res.data))
          .catch(err=>console.log(err))

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
              <div className={`${darkMode && 'bg-white '}  text-center mob:flex mob:items-center mob:justify-center mt-[25.5rem] mob:mt-[22rem] `}>
                <div className=' font-semibold text-2xl mob:mt-0'>Scraping products from ... </div> 
                <div className='w-44 mx-auto mob:m-0'><img className='' src={flipkart} alt="" /></div>
              </div>
            </>
           )
            :
           ( 

            <>
            <div className="heading">
              <p className={` ${darkMode && 'text-white'} text-center text-2xl tab:text-3xl tab:mt-14 mt-6`} >Here's your products for <span className='font-bold text-green-500'> {category}</span> category  </p>
            </div>

            <div className={`card-outer-container lap:gap-x-10 tab:gap-x-6 gap-y-4 tab:mt-16 mt-4  flex flex-wrap justify-center pb-10 `}>
            {ScrapedProducts.map((item,index)=>
              <div key={index} className={` ${darkMode && 'bg-zinc-800'} card mt-4 flex border rounded-lg shadow-lg p-3 h-[13.3rem] xsm:h-[13rem] mob:h-[14rem] tab:h-[12rem] lap:h-[13rem] gap-2 w-[98%] mob:w-[75%] tab:w-[48%] lap:w-[45%] items-center justify-between`}>

                <div className=" image h-full w-32 border overflow-hidden rounded-xl">
                 <img className='w-full h-full object-cover ' src={item.image} alt="" />
                </div>

                <div className="text-part w-[75%] h-full flex flex-col justify-between ">
                    <p className={` ${darkMode && 'text-white'} text-[1.9rem] mob:text-4xl tab:text-[2rem] lap:text-4xl`}>{item.brand}</p>
                    <p className=' text-[1.75rem] mob:text-2xl tab:text-2xl lap:text-3xl font-bold text-orange-500'>{item.price}</p>
                    <p className={` ${darkMode && 'text-white'} text-sm xsm:text-base mob:text-lg leading-[0.9rem] xsm:leading-[0.9rem] tab:leading-[0.9rem] mob:leading-[1rem]  font-light`}>{item.title} </p>
                    <button className='bg-yellow-400 rounded-md w-28 font-medium py-1 px-3' ><a target='_blank' href={item.link}>Buy</a></button>
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
