import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Utils/Context.jsx'
import 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Context>
    <BrowserRouter>
      <App />
      <ToastContainer className='mt-8 w-[80vw] mx-auto font-semibold text-lg bg-green-400 rounded-md '/>
    </BrowserRouter>
  </Context>,
)
