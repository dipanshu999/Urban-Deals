import React, { useContext } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import { ProductContext } from './Context';

export default function ProtectedRoutes() {
    const {loggedInUser}=useContext(ProductContext)
    const navigate= useNavigate()

    const user=true;
     if(loggedInUser) {return <Outlet/>} 
     
     else{
        return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Access Denied</h2>
            <p className="mt-4 text-lg">You need to be logged in to access this page.</p>
            <button 
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => navigate('/login') } 
            >
              Go to Login
            </button>
          </div>
        </div>
      );}

    }