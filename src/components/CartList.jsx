import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../Utils/Context';

export default function CartList({ item }) {
  let { cartProducts, setCartProducts } = useContext(ProductContext);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(item.count || 1);
  }, [item.count]);

  const handleDecrement = (id) => {
    setCount((prev) => prev - 1);
    if (count === 1) {
      setCartProducts(cartProducts.filter(cartItem => cartItem.id !== id));
    } else {
      setCartProducts(cartProducts.map(cartItem =>
        cartItem.id === id ? { ...cartItem, count: count - 1 } : cartItem
      ));
    }
  };

  const handleIncrement = (id) => {
    setCount((prev) => prev + 1);
    setCartProducts(cartProducts.map(cartItem =>
      cartItem.id === id ? { ...cartItem, count: count + 1 } : cartItem
    ));
  };

  const truncatedTitle = truncateText(item.title, 7);
  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + ' ...';
  }

   return (
    
    <div className='w-[80%] p-3 border mx-auto flex gap-4 items-center justify-between'>
      <div className="product-desc flex items-center gap-4">
        <div className='image border border-green-300 w-24 h-20'>
          <img src={item.image} alt="" className='h-full m-auto' />
        </div>
        <div>
          <p>{truncatedTitle}</p>
          <p>${item.price }</p> {/* Display the total price for this item */}
        </div>
      </div>
      <div className="add-btn flex gap-1">
        <button onClick={() => handleDecrement(item.id)} className='bg-red-500 px-2 text-white font-bold rounded-md text-center'>
          -
        </button>
        <p>{count}</p>
        <button onClick={() => handleIncrement(item.id)} className='bg-green-500 px-2 text-white font-bold rounded-md'>
          +
        </button>
      </div>
    </div>
  );
}
