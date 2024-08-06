import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../Utils/Context'
import CartList from './CartList'

export default function Cart() {
    let {cartProducts,setCartProducts}=useContext(ProductContext);

    let validProducts=cartProducts.map(item=>({
      ...item,price:parseFloat(item.price)
    }))

    let totalPrice=validProducts.reduce((acc,item)=>acc+item.price,0).toFixed(2)
    let taxation=(totalPrice*(12/100)).toFixed(2);
    let delivery=(totalPrice*(6/100)).toFixed(2);
    let toPay = (parseFloat(totalPrice) + parseFloat(taxation) + parseFloat(delivery)).toFixed(2);
    
    
    let decrease=(id,count)=>{
      console.log(id,count)

    }

    let increase=(id,count)=>{
      console.log(id,count)

      setCartProducts(item=>{
        item.id==id?(...item, total:(item.price*count):item)
      })
    }
    
  return (
    
    <div className='flex  justify-center border-2 border-blue-500 mt-6 p-4 pr-8'>

        <div className='w-[50em] border border-red-300 mx-auto p-4 flex flex-col gap-4'>
          {
            cartProducts.map(item=><CartList increase={increase} decrease={decrease} key={item.id} item={item}/>)
          }
        </div>
        
        <div className="billing w-[20em] border border-green-400 flex flex-col">
          <p className='text-4xl text-center font-semibold'>Billing section</p>

          <p>Total: {totalPrice}</p>
          <p>Taxes & charges:{taxation}</p>
          <p>Delivery charges: {delivery}</p>
          <p>To Pay:{toPay}</p>
        </div>

    </div>
    
  )
}
