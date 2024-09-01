import React, { useContext, useState } from 'react';
import { account, ID } from '../Utils/appwrite';
import {useNavigate} from 'react-router-dom'
import { ProductContext } from '../Utils/Context';
import { toast } from 'react-toastify';

export default function Login() {
    const{loggedInUser, setLoggedInUser}=useContext(ProductContext)

    const navigate=useNavigate()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
    async function login(email, password) {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
      navigate('/')
      toast.success('Logged in successfully')
    }
    console.log(loggedInUser)
  
  return (
    <div>
       <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
       </p>

      <form>
        <input className='border border-black' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className='border border-black' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {/*   <input className='border border-black' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} /> */}

        <button className='bg-green-400' type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button className='bg-red-400' onClick={async () => {
    await account.deleteSession('current');
    setLoggedInUser(null);
    toast.success('Logged out successfully')
  }}>LogOut</button>

      </form>

      <p className='mt-8'>Don't have account,<span className='text-blue-600 font-semibold' onClick={()=>navigate('/register')}>Sign up</span>   </p>
    </div> 
    
  )
}
