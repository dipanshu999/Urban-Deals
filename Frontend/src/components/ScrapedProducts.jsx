import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ScrapedProducts() {

    const query=useParams();
    const category=query.category
    useEffect(()=>{
        // FetchScrapedProducts()
        console.log(category)
       },[])
    
      async function FetchScrapedProducts(){
        const data = await axios.get('http://localhost:3001/api/hello')
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    
        const pro= await axios.get(`http://localhost:3001/api/scrape?category=${category}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
      }

  return (
    <div>
      
    </div>
  )
}
