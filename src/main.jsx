import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Utils/Context.jsx'
import 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>,
)
