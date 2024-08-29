import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

export default function ProtectedRoutes() {
    const user=null;
     if(user) {<Outlet/>} 
     
     else{
        return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Access Denied</h2>
            <p className="mt-4 text-lg">You need to be logged in to access this page.</p>
            <button 
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => window.location.href = '/'} // Or use react-router's `Navigate` component
            >
              Go to Login
            </button>
          </div>
        </div>
      );}

    }