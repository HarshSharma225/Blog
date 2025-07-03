import React from 'react'
function Logo({width}) {
  return (
    <img className={`${width} h-auto`} src='/Logo_Icon.svg' />
  )
}

export default Logo