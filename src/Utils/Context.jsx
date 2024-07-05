import axiosInstance from './axiosInstance';
import React, { createContext, useEffect, useState } from 'react'
export const ProductContext= createContext()

export default function Context(props) {
    const [products,setProducts]= useState([]);
    const [copyProducts,setCopyProducts]= useState([]);
    const [loading,setLoading]=useState(false)
    const[navToggle,setNavToggle]= useState(false);

  

    const getData= async()=>{
        try{
            setLoading(true)
            const {data}=  await axiosInstance.get('/products')
            setProducts(data);
            setCopyProducts(data);
            setLoading(false)
            
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
    <ProductContext.Provider value={{products,loading,copyProducts,setProducts,setNavToggle,navToggle}}>
        {props.children}
    </ProductContext.Provider>
  )
}
