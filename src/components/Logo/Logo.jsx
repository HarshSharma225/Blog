import React from 'react'
function Logo({width}) {
  return (
    <img className={`${width} h-auto`} src='/vite.svg' />
  )
}

export default Logo