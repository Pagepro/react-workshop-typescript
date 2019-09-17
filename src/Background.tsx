import React, { FunctionComponent } from 'react'

const Background: FunctionComponent = ({ children }) => {
  return (
    <div className='c-background'>
      {children}
    </div>
  )
}

export default Background
