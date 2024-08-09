import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import Back from './Back';
import { ProductContext } from '../Utils/Context';
import { getLocalStorage, setLocalStorage } from '../Utils/localStorage';  // Import local storage utility functions
import { toast } from 'react-toastify';


export default function Product() {
  const navigate = useNavigate();
  let { products, setProducts, cartHandle } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    // Check for the product in the context first
    let foundProduct = products.filter(item => item.id == id)[0];
    setProduct(foundProduct)
   
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

    toast.success('Product deleted successfully')
    navigate('/');
  };

  const { title, description, category, image, price } = product;
  const truncatedDescription = truncateText(description, 35);
  const truncatedTitle = truncateText(title, 7);

  return (
    <div className='flex flex-col tab:flex-row items-center tab:px-4 lap:px-20'>
      <div className='mt-6'>
        <Back/>
      </div>

      
      <div className='bg-white w-[100vw] flex flex-col gap-5 mob:w-[80vw] mob:mt-16 py-12 my-4 tab:w-[80vw] tab:min-h-[70vh] tab:flex-row tab:gap-20 lap:w-[70vw] shadow-2xl rounded-2xl mx-auto mt-10 justify-center items-center'>
        <div className="pic h-[12em] mob:h-[16em] tab:ml-2">
          <img src={image} className='h-full object-contain' alt={category} />
        </div>

        <div className="detail w-[23em] mt-4 xsm:w-[25em] px-4 mob:px-0 mob:w-[30em] tab:w-[35em] tab:items-start flex flex-col gap-5 justify-center">
          <div className="title w-full">
            <p className='text-4xl lap:text-5xl font-semibold mob:font-medium'>{truncatedTitle}</p>
          </div>
          <div className="category">
            <p className='text-slate-500 text-sm tab:text-md'>{category}</p>
          </div>

          <div className="price flex gap-10 items-center ">
            <p className='text-orange-600 text-[2.6rem] font-semibold'>${price}</p>
            <button onClick={()=>cartHandle(product.id)} className='bg-yellow-400 text-xl h-11 font-semibold rounded-md px-3'>Add to cart</button>
          </div>

          <div className="w-[98%] description leading-4 min-h-18 text-blue-950">
            <p className='text-sm opacity-70'>{truncatedDescription}</p>
          </div>

          <div className="btn flex gap-4">
            <Link to={`/edit/${product.id}`} className='border-2 border-green-400 px-4  py-2 rounded-xl'>Edit</Link>
            <button onClick={() => deleteItem(product.id)} className='border-2 border-red-400 px-4  py-2 rounded-xl'>Delete</button>
          </div>

        </div>  
      </div>
            {/* <div className="goto-cart absolute w-16 right-0 mr-60">
              <button onClick={()=>navigate('/cart')} className='bg-black text-white absolute '>Go to cart</button>
            </div> */}
    </div>
  );
}
