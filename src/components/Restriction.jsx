import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Restriction() {
    const location = useLocation().pathname
    const navigate = useNavigate()
        window.addEventListener('popstate', function () {
        navigate(window.localStorage.getItem('path'))
      });
      useEffect(()=>{
        setTimeout(()=>{
            window.localStorage.setItem('path', location)
        },1000)
      },[location])
  return (
    <div className='Restriction' style={{height:'0', width:'0', margin:'-1', position:'absolute'}}>
    </div>
  )
}

export default Restriction