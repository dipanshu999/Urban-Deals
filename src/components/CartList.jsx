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

  const truncatedTitle = truncateText(item.title, 6);
  function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + ' ...';
  }

   return (
    
    <div className= ' mob:w-[87%] mx-auto tab:w-[95%] p-4 border flex gap-4 items-center justify-between rounded-xl shadow-md'>
      
      <div className="product-desc flex justify-between items-center gap-4">

        <div className='image  rounded-md w-28 h-24 border'>
          <img src={item.image} alt="" className='h-full w-full object-contain m-auto' />
        </div>

        <div className='flex flex-col gap-6  w-[80%] '>
          <p className='text-orange-500 text-[1.4rem] lap:text-2xl leading-6 lap:leading-[1.45rem] font-[450]'>{truncatedTitle}</p>
          <p className='text-slate-500 text-xl'>${item.price }</p> {/* Display the total price for this item */}
        </div>
      </div>


      <div className="add-btn flex items-center gap-2">
        <button  onClick={() => handleDecrement(item.id)} className='bg-red-500 px-3 py-1 text-white font-bold rounded-md text-center'>
          -
        </button>
        <p className='font-semibold text-xl'>{count}</p>
        <button onClick={() => handleIncrement(item.id)} className='bg-green-500 px-3 py-1 text-white font-bold rounded-md'>
          +
        </button>
      </div>
    </div>
  );
}
