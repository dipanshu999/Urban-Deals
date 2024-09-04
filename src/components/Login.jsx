import React, { useContext, useState } from 'react';
import { account, ID } from '../Utils/appwrite';
import {useNavigate} from 'react-router-dom'
import { ProductContext } from '../Utils/Context';
import { toast } from 'react-toastify';
import Loader from './Loader/Loader';

export default function Login() {
    const{loggedInUser, setLoggedInUser,loading,setLoading}=useContext(ProductContext)

    const navigate=useNavigate()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    async function login(email, password) {
      try{
        setLoading(true);
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
        navigate('/')
        toast.success('Logged in successfully')
    }
    catch(err){
        toast.error('Enter correct details')
        console.log(err)
      }
    finally{
      setLoading(false);
    }
    }
    // console.log(loggedInUser)
  
  return (
    <>
    { 
      loading
        ?
      <Loader/>
        :
    <div className='min-h-screen'>
  
    <div className="form-container w-[20rem] border rounded-lg shadow-xl bg-white mx-auto mt-8">

      <div className="logo h-14 w-14  mx-auto mt-2">
        <img src="../Logo.png" alt="Logo" className='object-cover h-full' />
      </div>

      <form className=' w-full '>

        <div className=' mt-4 '>
          <input className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1 mt-2' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

      <p className='mt-3 text-center text-sm'>Don't have account,<span className='text-blue-600 font-semibold hover:cursor-pointer' onClick={()=>navigate('/register')}>Sign up</span>   </p>
     
        <button className='bg-black text-white font-semibold mx-auto block mt-4 p-2 px-4 rounded-lg ' type="button" onClick={() => login(email, password)}>
          Login
        </button>
      </form>

      <div className='flex mt-2'>
        <hr className='border border-slate-500 mt-3 w-[37%] mx-auto'/>
        <p className='text-slate-500'>OR</p>
        <hr className='border border-slate-500 mt-3 w-[37%] mx-auto'/>
      </div>

      <div className="O2auth mt-4 font-semibold text-slate-600 pb-4">

        <div className="google w-[70%] flex items-center justify-between px-5 p-2 mx-auto border border-slate-300 rounded-md ">
          <p>Login with google</p>
          <img src="../google.webp" className='h-5 w-5' alt="" />
        </div>

        <div className="github w-[70%] flex items-center justify-between px-5 p-2 mx-auto border border-slate-300 rounded-md mt-2">
          <p>Login with github</p>
          <img src="../github.webp" className='h-5 w-5' alt="" />
        </div>
      </div>

    </div>
    </div> }
    
  </>
  )
}
