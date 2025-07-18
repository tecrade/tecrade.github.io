import React from 'react'
import '../circleProgress/CircleProgress.css'

function CircleProgress({iconclass,title,percent}) {
   const percentStyle={
    '--rotate-end': `${percent*1.4}deg`,
   };
  
  return (
        
         <div className='progressdiv'>
  
               <div class="progress blue" style={percentStyle}>
                 <span class="progress-left">
                                   <span class="progress-bar"></span>
                 </span>
                 <span class="progress-right"> 
                                   <span class="progress-bar"></span>
                 </span>
                 <div class="progress-value"><i className={iconclass}></i>{title}</div>
                 <div className='percentdiv'></div>
               </div>
            
       </div>   
  )
}

export default CircleProgress