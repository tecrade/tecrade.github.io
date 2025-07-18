import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function Abouttyper() {
  return (
    <div>
         <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'Hi,I\'m jovin.My expertise is to develop and maintain websites,apps & APIs to people around me and make their jobs more easy & efficient. ',
      5000,
    ]}
    wrapper="div"
    speed={50}
    style={{ display: 'inline-block'}}
    repeat={0}
  />
    </div>
  )
}

export default Abouttyper