import React from 'react'
import PropTypes from 'prop-types'

const Background = ({ children }) => {
  return (
    <div className='c-background'>
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.node.isRequired
}

export default Background
