import axiosInstance from './axiosInstance';
import React, { createContext, useEffect, useState } from 'react'
export const ProductContext= createContext()

export default function Context(props) {
    const [products,setProducts]= useState(JSON.parse(localStorage.getItem('products')) || null);
    const [loading,setLoading]=useState(false)
    const[navToggle,setNavToggle]= useState(false);  
    const[darkMode,setDarkMode]= useState(false); 
    
    function setMode(){
      setDarkMode((prev)=>!prev)
    }

    

    // const getData= async()=>{
    //     try{
    //         setLoading(true)
    //         const {data}=  await axiosInstance.get('/products')
    //         setProducts(data);
    //         setLoading(false)
            
    //     }
    //     catch(err){
    //         setLoading(false)
    //         console.log(err)
    //     }
    // }

    // useEffect(()=>{
    //     getData();
    // },[])

    

  return (
    <ProductContext.Provider value={{products,setProducts,loading,setLoading, setNavToggle,navToggle,darkMode,setMode}}>
        {props.children}
    </ProductContext.Provider>
  )
}
