import Carousel from 'react-bootstrap/Carousel';
import img1 from '../carousel/web-development.jpg'
import img2 from '../carousel/web-development.jpg'
import img3 from '../carousel/web-development.jpg'
import React from 'react'
import '../carousel/CarouselSection.css'

function CarouselSection() {
  return (
      <div className='row carouselrow' style={{background:"green"}}>
        <div className=' col-md-12'>
      <Carousel data-bs-theme="light" className='carousel' style={{background:"grey"}}>
      <Carousel.Item className='carouselitem'>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption className='caption'>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  className='carouselitem'>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption className='caption'>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  className='carouselitem'>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
        <Carousel.Caption className='caption'>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    <hr></hr>
    </div>
    
  )
}

export default CarouselSection