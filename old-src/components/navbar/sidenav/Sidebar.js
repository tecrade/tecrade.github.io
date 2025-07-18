import React, { useEffect } from 'react'
import '../sidenav/Sidebar.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function Sidebar({customclass}) {
  useEffect(()=>{
    Aos.init();
  },[])
  const link={"insta":"https://www.instagram.com/thetecrade?utm_source=qr&igsh=NXU0NnBqemd3cjJx","wa":"https://wa.me/9562066585","in":"https://www.linkedin.com/in/jovin-john-9699122ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app","git":"https://github.com/tecrade"}
  return (
    <nav className={customclass} data-aos="fade-up" data-aos-duration="900">
       <a href={link.git} ><i class="fa-brands fa-github"></i></a>
       <a href={link.in}><i class="fa-brands fa-linkedin"></i></a> 
       <a href={link.insta}><i class="fa-brands fa-instagram"></i></a> 
       <a href={link.wa}><i class="fa-brands fa-whatsapp"></i></a> 
    </nav>
  )
}

export default Sidebar