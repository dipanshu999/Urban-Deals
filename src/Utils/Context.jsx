import axiosInstance from './axiosInstance';
import React, { createContext, useEffect, useState } from 'react'
export const ProductContext= createContext()

export default function Context(props) {
    const [products,setProducts]= useState([]);
    const [loading,setLoading]=useState(true)

    const getData= async()=>{
        try{
            setLoading(true)
            const {data}=  await axiosInstance.get('/products')
            setProducts(data);
            setLoading(false)
            // console.log(data)
        }
        catch(err){
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <ProductContext.Provider value={[products,loading,setLoading]}>
        {props.children}
    </ProductContext.Provider>
  )
}
