import { useState } from 'react';
import '../cards/PortfolioCards.css'

function PortfolioCards({iconname,title}) {
const[cardflag,setCardflag]=useState(false)
  return (
    <div className="card portfoliocard">
  <div className='cardimage'>
  <i onMouseEnter={()=>setCardflag(true)} onMouseLeave={()=>setCardflag(false)} className={iconname}></i>
  <h5 className="card-title">{title}</h5>
  </div>
  <div className={cardflag?"card-data d-block":"card-data d-none"}>
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>
  );
}

export default PortfolioCards