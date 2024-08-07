import React, { useContext } from 'react';
import { ProductContext } from '../Utils/Context';
import CartList from './CartList';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  let { cartProducts ,setCartProducts} = useContext(ProductContext);
  const navigate=useNavigate()

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

  let clearCart=()=>{
    setCartProducts(()=>cartProducts.filter(item=>item.id===-1))
  }


  return (
    <>
   
    {
       cartProducts.length===0
       ?
       <>
          <div className=' text-5xl w-[7em] h-[7em] mx-auto'> 
            <img src="../empty-cart.jfif" className='w-full' alt="Empty cart" />
          </div>
          <p className='text-5xl text-center font-semibold'>You cart is empty !!</p>
          <div className='flex justify-center'><button onClick={()=>navigate('/')} className='bg-green-500 p-4 text-xl text-white font-semibold rounded-xl mt-8'>Add products</button></div>
        </>
       :

      <div className='flex justify-center mt-6 p-4 pr-20'>
          <div className='w-[50em]  mx-auto p-4 flex flex-col gap-4'>
            {cartProducts.map(item => <CartList key={item.id} item={item} />)}
          </div>

          <div className="billing w-[20em] h-[22em] rounded-xl shadow-xl mob:mt-10  border flex flex-col">

              <p className="text-4xl text-center font-semibold p-2">Billing section</p>
            
            <div className="check-out  w-[80%] text-[1.1em] mx-auto mt-4 bg-[#fff7f7] p-2">
              <p className='flex justify-between'><span className='font-semibold'>Total:</span>             <span className='text-green-600'>${totalPrice}</span></p>
              <p className='flex justify-between'><span className='font-semibold'>Taxes & charges:</span>   <span className='text-green-600'> $ {taxation}</span></p>
              <p className='flex justify-between'><span className='font-semibold'>Delivery charges:</span>  <span className='text-green-600'> $ {delivery}</span></p>
                <hr className='border border-slate-400' />
              <p className='flex justify-between'><span className='font-semibold'>To Pay:</span>            <span className='font-semibold text-red-500'>  ${toPay}   </span></p>
              <div className='flex justify-center'><button className='bg-green-500 text-white py-2 px-14 mt-4 text-xl font-semibold'>Checkout</button></div>
            </div>

            <div className='flex justify-center mt-2 gap-4'>
                <button onClick={()=>navigate('/')} className='bg-green-100 p-2 rounded-md '>Order more</button>
                <button onClick={clearCart} className='bg-red-200 p-2 rounded-md '>Clear cart</button>
            </div>

          </div>
    </div>
    
    }
    </>
  );
}
