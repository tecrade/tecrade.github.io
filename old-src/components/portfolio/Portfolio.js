import React, { useEffect } from 'react'
import PortfolioCards from './cards/PortfolioCards'
import '../portfolio/Portfolio.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function Portfolio() {
  useEffect(()=>{
     Aos.init();
  },[])
  return (
   <div className='container'>
     <div className='row'>
         <div className="col-12 title">
            <h1>PORTFOLIO</h1>
         </div>
      </div>
      <div className='row cards'>
        <div className='col-auto me-md-auto' ><div  data-aos="fade-right" data-aos-duration="800"><PortfolioCards iconname="fa-solid fa-globe" title="WEB DEVELOPMENT"/></div></div>
        <div className='col-auto' ><div data-aos="fade-left" data-aos-duration="800"><PortfolioCards iconname="fa-solid fa-robot" title="ROBOTICS" /></div></div>
      </div>

      <div className='row cards'>
        <div className='col-auto me-md-auto' ><div data-aos="fade-right" data-aos-duration="800"><PortfolioCards iconname="fa-solid fa-gears" title="MACHINE LEARNING" data-aos="fade-right" data-aos-duration="1500"/></div></div>
        <div className='col-auto ' ><div data-aos="fade-left" data-aos-duration="800"><PortfolioCards iconname="fa-solid fa-code" title="PROJECTS" /></div></div>
      </div>
      <hr></hr>
     </div>
  )

}

export default Portfolio