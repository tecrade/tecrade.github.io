import React, { useState } from 'react'
import '../navbar/Navbar.css'
import Sidebar from './sidenav/Sidebar'
import { Link, Outlet } from 'react-router-dom'


function Navbar() {
  const[scroll,setScroll]=useState(false)
  // to detect screen is scrolling or not
  const scrollHandler= ()=>{
      if(window.scrollY >= 50){
        setScroll(true)
      }
      else{
        setScroll(false)
      }
  }
  window.addEventListener('scroll',scrollHandler)

  return (
    <nav className={scroll?'navbar sticky-top navbar-expand-lg mynavbar-scroll':'navbar sticky-top navbar-expand-lg mynavbar-noscroll'} >
  <div className="container-fluid">
    <div className="navbar-brand">tecrade</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span><i class="fa-solid fa-bars-staggered"></i></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/" >HOME</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/portfolio">PORTFOLIO</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/about">ABOUT</Link>
        </li>
        <Outlet/>
      </ul>
      <form className="d-flex">
        <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn search" type="submit"><i className="fas fa-search" id='#navsearch'></i>
</button>
      </form>
      <div className='d-lg-none'><Sidebar customclass='menuicons'/></div>
    </div>
  </div>
  <hr></hr>
</nav>
  )
}

export default Navbar