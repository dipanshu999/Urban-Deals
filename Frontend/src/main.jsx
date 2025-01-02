import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Utils/Context.jsx'
import ScrapingContext from './Utils/ScrapinggContext.jsx'
import 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Context>
    <ScrapingContext>
      <BrowserRouter>
        <App />
        <ToastContainer className='tab:mt-8 w-[80vw] tab:w-[30vw] mx-auto font-semibold text-lg rounded-md '/>
      </BrowserRouter>
    </ScrapingContext>
  </Context>,
)
