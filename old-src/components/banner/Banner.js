import React, { useEffect } from 'react'
import'../banner/Banner.css'
import Typer from './Typer'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from 'react-router-dom'
function Banner() {

  useEffect(()=>{
    Aos.init();
  },[])

  return (
    <div className='container'>
      <div className='row banner'>
      <hr></hr>
        <div className='col-md-6'>
          <div className='namediv' data-aos="fade-right" data-aos-duration="1500">
               <h1>JOVIN JOHN</h1>
                <div className='title'><h3>I'M A <Typer/></h3></div>
               <Link className='btn connectme' to='/contact'>Connect me</Link>
          </div>
        </div>
        <div className='col-md-6'  >
          <div className='picdiv' data-aos="zoom-in-left" data-aos-duration="1500">

          </div>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Banner