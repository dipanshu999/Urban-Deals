import React, { useContext, useEffect, useState } from 'react';
import Dropdown from './DropDown';
import Card from './Card';
import { ProductContext } from '../Utils/Context';
import { Link, useLocation } from 'react-router-dom';
import Loader from './Loader/Loader';
import ScrapingPopup from './ScrapingPopup';
import { ScrapingContext } from '../Utils/ScrapinggContext';

export default function Home() {
  const { products, loading, setLoading,navToggle,setNavToggle,filteredProducts, setFilteredProducts } = useContext(ProductContext);
  const { search } = useLocation();
  const{IsLiked}=useContext(ScrapingContext)
  const category = decodeURIComponent(search.split('=')[1]);


  useEffect(() => {
    if (category && category !== 'undefined') {
      filterProducts(category);
    } else {
      setFilteredProducts(products);
    }
  }, [products, category]);

  async function filterProducts(category) {
    setLoading(true);
    try {
      if (category && category !== 'All section') {
        setFilteredProducts(products.filter(item => item.category === category));
      } else {
        setFilteredProducts(products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Ensure loading is set to false in finally block
    }
  }



  return (
    <div onClick={()=>setNavToggle(false)} className={`${navToggle &&'blur-[8px]'} pb-2`}>
      {loading ? (
        <Loader /> 
      ) : (

        
        <div className='mb-8'>

         { IsLiked && 
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>  {/* Overlay div*/}
              <div className="fixed inset-0 z-50 flex justify-center items-center">
                <ScrapingPopup/>
              </div>
            </>
               }

          <div className={` ${IsLiked && 'blur-sm  cursor-not-allowed'} flex justify-center mt-10 gap-10 items-center `}>
            <Link to={'/create'} className='text-white text-xl rounded-md font-medium bg-black px-5 py-2 border-white border'>Add +</Link>
            <Dropdown filterProducts={filterProducts} />
          </div>
            
          <div className={` ${IsLiked && 'blur-md cursor-not-allowed'} card-container gap-6 xsm:w-[92vw] xsm:gap-12 lap:w-[90%] mob:gap-12 lap:gap-16 mx-auto flex flex-wrap pt-6 justify-center`}>
            {filteredProducts.map(item => (
                <Card key={item.id} item={item}  />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
