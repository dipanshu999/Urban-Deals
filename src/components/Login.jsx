import React, { useState } from 'react';
import { account, ID } from '../Utils/appwrite';
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const navigate=useNavigate()
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
    async function login(email, password) {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
      navigate('/')
    }
  
  return (
    <div>
       <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
       </p>

      <form>
        <input className='border border-black' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className='border border-black' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className='border border-black' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

        <button className='bg-green-400' type="button" onClick={() => login(email, password)}>
          Login
        </button>

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

        <button
          className='bg-red-400'
          type="button"
          onClick={async () => {
            await account.deleteSession('current');
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form>
    </div>
    
  )
}
