import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbox'>
      <div className='leftside'>
        <img src="https://cdn-icons-png.flaticon.com/512/1162/1162456.png" alt="" />
      </div>
      <div className='rightside'>
        <Link to='sign-up' className='navlinks'>SING UP</Link>
        <Link to='login' className='navlinks'>LOGIN</Link>
      </div>
    </div>
  )
}
