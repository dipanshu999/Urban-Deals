import React, { useContext, useEffect, useState } from 'react';
import { account } from '../Utils/appwrite';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Utils/Context';
import { toast } from 'react-toastify';
import Loader from './Loader/Loader';

export default function Login() {
    const { loggedInUser, setLoggedInUser, loading, setLoading, darkMode } = useContext(ProductContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeSession, setActiveSession] = useState(false);

    useEffect(() => {
        // Check for an active session when the component mounts
        const checkSession = async () => {
            try {
                setLoading(true);
                const session = await account.get(); // Fetch current session
                setLoggedInUser(session);
                setActiveSession(true); // Set active session to true if a session exists
            } catch (err) {
                console.log('No active session');
                setActiveSession(false); // Ensure activeSession is reset if no session is found
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, [setLoggedInUser, setLoading]);

    async function login(email, password) {
        try {
            setLoading(true);
            await account.createEmailPasswordSession(email, password);
            const session = await account.get(); // Fetch session after login
            setLoggedInUser(session);
            setActiveSession(true);
            navigate('/');
            toast.success('Logged in successfully');
        } catch (err) {
            toast.error('Some error occurred');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            setLoading(true);
            await account.deleteSession('current'); // Logout the user
            setLoggedInUser(null);
            setActiveSession(false);
            toast.success('Logged out successfully');
            navigate('/login'); // Redirect to login after logging out
        } catch (err) {
            toast.error('Some error occurred during logout');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    let googleLogin = async()=>{
        account.createOAuth2Session('google', 'http://localhost:5173/')
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : activeSession ? (
                // If an active session exists, show the logout UI
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <p className="text-3xl text-red-500">You are already logged in.</p>
                    <button
                        className="bg-black text-white font-semibold mt-4 p-2 px-4 rounded-lg"
                        onClick={logout}
                        disabled={loading} // Disable button when logging out
                    >
                        Logout
                    </button>
                </div>
            ) : (
                // If no active session exists, show the login form
                <div className='min-h-screen'>
                    <div className={`form-container w-[20rem] border rounded-lg shadow-xl bg-white mx-auto mt-8 ${darkMode ? 'shadow-slate-500' : null}`}>
                        <div className="logo h-14 w-14 mx-auto mt-2">
                            <img src="../Logo.png" alt="Logo" className='object-cover h-full' />
                        </div>
                        <form className='w-full'>
                            <div className='mt-4'>
                                <input
                                    className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1'
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    className='border rounded-md border-slate-500 block mx-auto w-[70%] py-2 pl-1 mt-2'
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <p className='mt-3 text-center text-sm'>
                                Don't have an account?{' '}
                                <span
                                    className='text-blue-600 font-semibold hover:cursor-pointer'
                                    onClick={() => navigate('/register')}
                                >
                                    Sign up
                                </span>
                            </p>
                            <button
                                className='bg-black text-white font-semibold mx-auto block mt-4 p-2 px-4 rounded-lg'
                                type="button"
                                onClick={() => login(email, password)}
                                disabled={loading} // Disable button during login request
                            >
                                Login
                            </button>
                        </form>
                        <div className='flex mt-2'>
                            <hr className='border border-slate-500 mt-3 w-[37%] mx-auto' />
                            <p className='text-slate-500'>OR</p>
                            <hr className='border border-slate-500 mt-3 w-[37%] mx-auto' />
                        </div>
                        <div className="O2auth mt-4 font-semibold text-slate-600 pb-4">
                            <div onClick={googleLogin} className="google hover:cursor-pointer w-[70%] flex items-center justify-between px-5 p-2 mx-auto border border-slate-300 rounded-md">
                                <p>Login with Google</p>
                                <img src="../google.webp" className='h-5 w-5' alt="Google" />
                            </div>
                            <div className="github w-[70%] hover:cursor-pointer flex items-center justify-between px-5 p-2 mx-auto border border-slate-300 rounded-md mt-2">
                                <p>Login with GitHub</p>
                                <img src="../github.webp" className='h-5 w-5' alt="GitHub" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
