import React from 'react'
import { TypeAnimation } from 'react-type-animation';


function Typer() {
  return (
       
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'DEVELOPER',
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      'DESIGNER',
      1000,
    ]}
    wrapper="div"
    speed={50}
    style={{ display: 'inline-block'}}
    repeat={Infinity}
  />

      

  )
}

export default Typer