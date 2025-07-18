import React, { useEffect } from 'react'
import '../about/About.css'
import Timeline from './timeline/Timeline'
import CircleProgress from './circleProgress/CircleProgress'
import Abouttyper from './Abouttyper'
import Aos from 'aos'
import 'aos/dist/aos.css'


function About() {
  useEffect(()=>{
    Aos.init();
  },[])
  return (
    <div className='container-fluid'>
        <section className="section about">
        <div className='row' >
             <div className='col-12 title'>
               <h1>ABOUT</h1>
             </div>
        </div>
        <div className='row about'>
         <div className='col-auto aboutimgcol'> <div className='aboutimgdiv'><img src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg" alt="" className='aboutimg'/></div></div>
         <div className='col-lg-5'><div className='aboutme'><Abouttyper/> </div></div>
        </div>
        <hr></hr>
        </section>
       
        <section className='timeline'>
            <div className='row'>
                <div className='col-12 title'>
                <h1>TIMELINE</h1>
                </div>
            </div>
            <div className='timelinediv'>
                     <Timeline/>
            </div>
            <hr></hr>
        </section>
       <section className='container skills'>
       <div className='row'>
                <div className='col-12 title'>
                <h1>MY SKILLS</h1>
                </div>
        </div> 
        <div className='row'>
              <div className='col-md-6' ><div className="skilldiv" data-aos="fade-right" data-aos-duration="900">
                      <h4>Development</h4>
                      <div className='progressdiv' >
                      <CircleProgress iconclass='fa-solid fa-globe' title='WEB' percent={75}/>
                      <CircleProgress iconclass ='fa-solid fa-mobile-screen-button' title='APPS' percent={0}/>
                      <CircleProgress iconclass ='fa-solid fa-gears' title='AI&ML' percent={0}/>
                    </div>
                </div></div>



              <div className='col-md-6'><div className="skilldiv" data-aos="fade-left" data-aos-duration="900">
                      <h4>Programming Languages</h4>
                      <div className='progressdiv' >
                          <CircleProgress iconclass ='fa-solid fa-c' title='CPP' percent={0}/>
                          <CircleProgress iconclass ='fa-brands fa-js' title='JS' percent={0}/>
                          <CircleProgress iconclass ='fa-brands fa-python' title='PYTHON' percent={0}/>
                          <CircleProgress  iconclass ='fa-brands fa-flutter' title='FLUTTER' percent={0}/>
                      </div>
               </div></div>        
        </div>
        <div className='row '>
              <div className='col-md-6'><div className="skilldiv"  data-aos="fade-right" data-aos-duration="900">
                      <h4>Frameworks</h4>
                      <div className='progressdiv'>
                      <CircleProgress iconclass ='fa-brands fa-react' title='REACT' percent={0}/>
                      <CircleProgress iconclass ='fa-brands fa-bootstrap' title='Bootstrap' percent={0}/>
                      <CircleProgress iconclass ='fa-solid fa-database' title='DSA' percent={0}/>
                      <CircleProgress  iconclass ='fa-brands fa-node-js' title='NODE' percent={0}/>
                    </div>
                </div></div>



              <div className='col-md-6' ><div className="skilldiv" data-aos="fade-left" data-aos-duration="900">
                      <h4>Languages I Can Speak</h4>
                      <div className='progressdiv' >
                          <CircleProgress iconclass ='fa-solid fa-e' title='ENGLISH' percent={0}/>
                          <CircleProgress iconclass ='fa-solid fa-h' title='HINDI' percent={0}/>
                          <CircleProgress iconclass ='fa-solid fa-m' title='Malayalam' percent={0}/>

                      </div>
               </div></div>        
        </div>
       </section>
       <hr></hr>
    </div>
  )
}

export default About