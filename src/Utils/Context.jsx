import React, { createContext, useEffect, useState } from "react";
import Axios from "../Utils/axiosInstance";
import { getLocalStorage, setLocalStorage } from "./localStorage";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ProductContext = createContext();

export default function Context(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  function setMode() {
    setDarkMode((prev) => !prev);
  }

  function cartHandle(id) {
    setCartProducts((prevCartProducts) => {
      const newProduct = products.filter((item) => item.id === id)[0];
      const productIndex = prevCartProducts.findIndex((item) => item.id === id);
      if (newProduct && productIndex === -1) {
        toast.success('Product added to cart');
        return [...prevCartProducts, newProduct];
      }
      
      else {
        toast.warn('Product is already in cart')
      }
      
      return prevCartProducts;
    });
  }

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Check if there are products in local storage
      const storedProducts = getLocalStorage("products");

      if (storedProducts) {
        setProducts(storedProducts);
        setLoading(false);
        return;
      }

      // Fetch products from Fake Store API if not found in local storage
      try {
        const response = await Axios.get("/products");
        const fetchedProducts = response.data;

        // Store fetched products in local storage
        setLocalStorage("products", fetchedProducts);

        // Update local state with the fetched products
        setProducts(fetchedProducts);
      } catch (fetchError) {
        console.error("Error fetching from Fake Store API:", fetchError);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
          value={{
                products,
                setProducts,
                loading,
                setLoading,
                setNavToggle,
                navToggle,
                darkMode,
                setMode,
                cartHandle,
                cartProducts,
                setCartProducts
          }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
