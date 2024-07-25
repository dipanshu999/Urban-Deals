import React, { createContext, useEffect, useState } from 'react';
import Axios from '../Utils/axiosInstance';
import { getLocalStorage, setLocalStorage } from './localStorage';

export const ProductContext = createContext();

export default function Context(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function setMode() {
    setDarkMode(prev => !prev);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Check if there are products in local storage
      const storedProducts = getLocalStorage('products');

      if (storedProducts) {
        setProducts(storedProducts);
        setLoading(false);
        return;
      }

      // Fetch products from Fake Store API if not found in local storage
      try {
        const response = await Axios.get('/products');
        const fetchedProducts = response.data;

        // Store fetched products in local storage
        setLocalStorage('products', fetchedProducts);

        // Update local state with the fetched products
        setProducts(fetchedProducts);
      } catch (fetchError) {
        console.error('Error fetching from Fake Store API:', fetchError);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, loading, setLoading, setNavToggle, navToggle, darkMode, setMode }}>
      {props.children}
    </ProductContext.Provider>
  );
}
