import React from 'react'

import { init } from "../utils/Three.js";
import { useEffect } from "react";


function ThreeComp() {
  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default ThreeComp