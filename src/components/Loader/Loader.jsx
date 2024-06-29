import React from 'react'
import './Loader.css'

export default function Loader() {
  return (
    <div id="box">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor="#fc6767"/>
          </filter>
        </defs>
        <circle
          id="spinner"
          style={{
            fill: 'transparent',
            stroke: '#dd2476',
            strokeWidth: '7px',
            strokeLinecap: 'round',
            filter: 'url(#shadow)'
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
)}
