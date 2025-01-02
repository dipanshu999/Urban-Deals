import React,{ createContext, useState } from 'react'

export const ScrapingContext=createContext();


export default function ScrapinggContext({children}) {
    const [IsLiked,setIsLiked] = useState(false);
    const [category,setCategory] = useState('');

     const handleLikeClick =(category)=>{
          console.log(category)
          setCategory(category)
          setTimeout(() => {
            setIsLiked(prev=>!prev);      // Liking code 
          }, 1500);
        }
    
  return (
    <ScrapingContext.Provider value={{
      setIsLiked,IsLiked,
      handleLikeClick,
      category
    }}>
      {children}
    </ScrapingContext.Provider>
  )
}
