import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { ProductContext } from '../Utils/Context';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';
import { toast } from 'react-toastify';

export default function Create() {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState({rate:''});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 4 || description.trim().length < 4 || price.trim().length < 1 || image.trim().length < 4 || category.trim().length < 4 ||  rating.rate.trim().length < 1) {
      toast.warn('Input must be 4 characters at least.');
      return;
    }

    const newProduct = {
      id: nanoid(),
      title,
      price,
      category,
      image,
      description,
      rating,
    };

    setLoading(true);

    try {
      // Update context state (setProducts)
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      // Update local storage
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Navigate back to home page after successful submission
      navigate('/');
      toast.success('Product added successfully')
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen'>
    <div className="form  mob:w-[70%] mx-auto border-2 p-10 mt-8 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border-2 p-2 border-slate-500 rounded-md"
        />

        <input
          type="url"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          className="border-2 p-2 border-slate-500 rounded-md"
        />

        <div className="price-desc flex flex-col tab:flex-row justify-between gap-4">
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="border-2 p-2 border-slate-500 rounded-md"
          />
          <input
            type="text"
            placeholder="Rating"
            onChange={(e) => setRating({...rating, rate:e.target.value})}
            value={rating.rate}
            className="border-2 p-2 flex-1 border-slate-500 rounded-md"
          />

          <input
            type="text"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border-2 p-2 flex-1 border-slate-500 rounded-md"
          />
        </div>

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border-2 p-2 h-28 border-slate-500 rounded-md"
        ></textarea>

        <button
          type="submit"
          className="bg-black hover:cursor-pointer border border-white text-white w-24 py-3 rounded-xl font-medium mx-auto text-xl"
          disabled={loading}
        >
          {loading ? <Loader className='h-full'/> : 'Submit'}
        </button>
      </form>
    </div>
    </div>
  );
}
