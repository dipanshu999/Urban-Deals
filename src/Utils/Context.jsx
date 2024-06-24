import axiosInstance from './axiosInstance';
import React, { createContext, useEffect, useState } from 'react'
export const ProductContext= createContext()

export default function Context(props) {
    const [products,setProducts]= useState([]);

    const getData= async()=>{
        try{
            const {data}= await axiosInstance.get('/products');
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <ProductContext.Provider value={[products,setProducts]}>
        {props.children}
    </ProductContext.Provider>
  )
}
