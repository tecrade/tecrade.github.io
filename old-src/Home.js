import React from 'react'
import Portfolio from './components/portfolio/Portfolio'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Banner from './components/banner/Banner'

function Home() {
  return (
    <>
       <Banner/>
       <Portfolio/>
       <About/>
       <Contact/>
    </>
  )
}

export default Home