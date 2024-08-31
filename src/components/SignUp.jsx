import React, { useContext,useState } from 'react'
import { ProductContext } from '../Utils/Context'
import { useNavigate } from 'react-router-dom';
import { account, ID } from '../Utils/appwrite';
import { toast } from 'react-toastify';

export default function SignUp() {
    const navigate = useNavigate()
    const{loggedInUser, setLoggedInUser}=useContext(ProductContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function login(email, password) {
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
        navigate('/')
        toast.success('Account created successfully')
      }

  return (
    <div>
       <form>
        <input className='border border-black' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className='border border-black' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className='border border-black' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

        <button
          className='bg-blue-400'
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>

      </form>

      <p className='mt-8'>Already have account,<span className='text-blue-600 font-semibold' onClick={()=>navigate('/login')}>Login</span>   </p>
    </div>
  )
}
