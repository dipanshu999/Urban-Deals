import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import Back from './Back';
import { ProductContext } from '../Utils/Context';
import { getLocalStorage, setLocalStorage } from '../Utils/localStorage';  // Import local storage utility functions

export default function Product() {
  const navigate = useNavigate();
  let { products, setProducts } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    // Check for the product in the context first
    let foundProduct = products.find(item => item.id == id);

    if (!foundProduct) {
      // If not found in the context, check local storage
      const storedProducts = getLocalStorage('products');
      if (storedProducts) {
        foundProduct = storedProducts.find(item => item.id == id);
      }
    }

    setProduct(foundProduct);
  }, [id, products]);

  if (!product) {
    return <Loader />;
  }

  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + ' ...';
  }

  const deleteItem = (id) => {
    // Remove product from local state
    const updatedProducts = products.filter(item => item.id !== id);
    setProducts(updatedProducts);

    // Update local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    navigate('/');
  };

  const { title, description, category, image, price } = product;
  const truncatedDescription = truncateText(description, 35);
  const truncatedTitle = truncateText(title, 7);

  return (
    <div className='flex flex-col tab:flex-row items-center tab:px-4 lap:px-20'>
      <div className='mt-6'>
        <Back />
      </div>
      <div className='bg-white w-[100vw] flex flex-col gap-5 mob:w-[80vw] mob:mt-16 py-12 my-4 tab:w-[80vw] tab:min-h-[70vh] tab:flex-row tab:gap-20 lap:w-[70vw] shadow-2xl rounded-2xl mx-auto mt-10 justify-center items-center'>
        <div className="pic h-[12em] mob:h-[16em] tab:ml-2">
          <img src={image} className='h-full object-contain' alt={category} />
        </div>
        <div className="detail w-[20em] mt-4 xsm:w-[24em] px-4 mob:px-0 mob:w-[30em] tab:w-[35em] tab:items-start flex flex-col gap-5 justify-center">
          <div className="title w-full">
            <p className='text-3xl mob:text-4xl tab:text-4xl lap:text-5xl font-semibold'>{truncatedTitle}</p>
          </div>
          <div className="category">
            <p className='text-slate-500 text-sm tab:text-md'>{category}</p>
          </div>
          <div className="price">
            <p className='text-orange-600 text-xl xsm:text-3xl'>${price}</p>
          </div>
          <div className="w-[98%] description leading-4 min-h-18 text-blue-950">
            <p className='text-sm opacity-70'>{truncatedDescription}</p>
          </div>
          <div className="btn flex gap-4">
            <Link to={`/edit/${product.id}`} className='border-2 border-green-400 px-4 xsm:py-1 lap:py-2 rounded-xl'>Edit</Link>
            <button onClick={() => deleteItem(product.id)} className='border-2 border-red-400 px-4 xsm:py-1 lap:py-2 rounded-xl'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
