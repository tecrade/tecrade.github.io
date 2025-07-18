import React, { useEffect } from 'react'
import '../timeline/Timeline.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function Timeline() {
  useEffect(()=>{
    Aos.init();
  })
  return (
    <div class="container py-5">
  <div class="main-timeline-4 text-white">
    <div class="timeline-4 left-4" >
      <div class="card gradient-custom" data-aos="fade-right" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-brain fa-2x mb-3"></i>
          <h4>MAY 21</h4>
          <p class="small text-white-50 mb-4">7:45PM</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
    <div class="timeline-4 right-4" >
      <div class="card gradient-custom-4"  data-aos="fade-left" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-camera fa-2x mb-3"></i>
          <h4>8:00 AM</h4>
          <p class="small text-white-50 mb-4">May 18</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
    <div class="timeline-4 left-4">
      <div class="card gradient-custom" data-aos="fade-right" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-campground fa-2x mb-3"></i>
          <h4>7:25 PM</h4>
          <p class="small text-white-50 mb-4">May 6</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
    <div class="timeline-4 right-4">
      <div class="card gradient-custom-4" data-aos="fade-left" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-sun fa-2x mb-3"></i>
          <h4>3:55 PM</h4>
          <p class="small text-white-50 mb-4">Apr 26</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
    <div class="timeline-4 left-4">
      <div class="card gradient-custom" data-aos="fade-right" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-palette fa-2x mb-3"></i>
          <h4>5:24 PM</h4>
          <p class="small text-white-50 mb-4">Apr 12</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
    <div class="timeline-4 right-4">
      <div class="card gradient-custom-4" data-aos="fade-left" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-laugh-beam fa-2x mb-3"></i>
          <h4>11:25 AM</h4>
          <p class="small text-white-50 mb-4">Apr 11</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
    <div class="timeline-4 left-4">
      <div class="card gradient-custom" data-aos="fade-right" data-aos-duration="900">
        <div class="card-body p-4 timelinecontent">
          <i class="fas fa-pizza-slice fa-2x mb-3"></i>
          <h4>12:30 PM</h4>
          <p class="small text-white-50 mb-4">Apr 5</p>
          <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
            mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
            dignissim
            per, habeo iusto primis ea eam.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Timeline