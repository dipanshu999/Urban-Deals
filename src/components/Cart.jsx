import React, { useContext } from 'react';
import { ProductContext } from '../Utils/Context';
import CartList from './CartList';

export default function Cart() {
  let { cartProducts } = useContext(ProductContext);

  // Ensure all products have a count property
  let validProducts = cartProducts.map(item => ({
    ...item,
    price: parseFloat(item.price),
    count: item.count || 1
  }));

  // Calculate prices
  let totalPrice = validProducts.reduce((acc, item) => acc + (item.price * item.count), 0).toFixed(2);
  let taxation = (totalPrice * 0.12).toFixed(2);
  let delivery = (totalPrice * 0.06).toFixed(2);
  let toPay = (parseFloat(totalPrice) + parseFloat(taxation) + parseFloat(delivery)).toFixed(2);




  return (
    <>
   
    {
       !cartProducts
       ?
        <div className='text-5xl'>Cart is empty</div>
       :

      <div className='flex justify-center border-2 border-blue-500 mt-6 p-4 pr-8'>
      <div className='w-[50em] border border-red-300 mx-auto p-4 flex flex-col gap-4'>
        {cartProducts.map(item => <CartList key={item.id} item={item} />)}
      </div>
      
      <div className="billing w-[20em] border border-green-400 flex flex-col">
        <p className="text-4xl text-center font-semibold">Billing section</p>
        <p>Total: {totalPrice}</p>
        <p>Taxes & charges: {taxation}</p>
        <p>Delivery charges: {delivery}</p>
        <p>To Pay: {toPay}</p>
      </div>
    </div>
    
    }
    </>
  );
}
