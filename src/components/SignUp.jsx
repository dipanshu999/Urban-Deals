import React, { useContext,useState } from 'react'
import { ProductContext } from '../Utils/Context'
import { useNavigate } from 'react-router-dom';
import { account, ID } from '../Utils/appwrite';
import { toast } from 'react-toastify';
import Loader from './Loader/Loader';

export default function SignUp() {
    const navigate = useNavigate()
    const{loggedInUser, setLoggedInUser,setLoading,loading}=useContext(ProductContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    let signUp=async () => {
      try{
        setLoading(true)
        await account.create(ID.unique(), email, password, name);
        login(email, password);
      }
      catch(err){
        console.log(err);
        toast.error('Some error occured')
      }
      finally{
        setLoading(false)
      }
    }

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

  return (
    <div>
      
  
     {loading?<Loader/>
          :
       <div className="form-container w-[20rem] border rounded-lg shadow-xl h-[18rem] mx-auto mt-8">

        <form className=' w-full '>

          <div className=' mt-6 '>
            <input className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1 mt-2' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1 mt-2' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

          </div>

            <button
              className='bg-black  text-white font-semibold mx-auto block mt-5 p-2 px-4 rounded-lg'
              type="button"
              onClick={signUp}
            >
              Register
            </button>
        </form>
            
        <p className='mt-6 text-center '>Already have account,<span className='text-blue-600 font-bold hover:cursor-pointer' onClick={()=>navigate('/login')}> Login</span>   </p>
      </div>
    }
  </div>
  )
}
