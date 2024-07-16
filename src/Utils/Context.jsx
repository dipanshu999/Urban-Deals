import axiosInstance from './axiosInstance';
import React, { createContext, useEffect, useState } from 'react';
export const ProductContext = createContext();

import { db } from '../firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';

export default function Context(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navToggle, setNavToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function setMode() {
    setDarkMode((prev) => !prev);
  }

  const fetchAndSaveData = async () => {
    try {
      setLoading(true);
      console.log("Fetching documents from Firestore...");
      const querySnapshot = await getDocs(collection(db, 'products'));
      if (querySnapshot.empty) {
        console.log("Firestore is empty. Fetching data from FakeStoreAPI...");
        const response = await axiosInstance.get('/products');
        const data = response.data;

        const batch = writeBatch(db);
        data.forEach((product) => {
          const productRef = doc(collection(db, 'products'));
          batch.set(productRef, product);
        });

        console.log("Committing batch...");
        await batch.commit();
        console.log("Batch committed.");

        const newQuerySnapshot = await getDocs(collection(db, 'products'));
        const productsData = newQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } else {
        console.log("Firestore is not empty. Loading existing data...");
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error fetching or saving data:', err);
    }
  };

  useEffect(() => {
    fetchAndSaveData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, loading, setLoading, setNavToggle, navToggle, darkMode, setMode }}>
      {props.children}
    </ProductContext.Provider>
  );
}
