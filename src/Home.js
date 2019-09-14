import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

const Home = props => {
  return (
    <div className='l-centered'>
      <Link
        className='c-start-link'
        to='/setup'
        onClick={props.setGameStarted}
      >
        Start
      </Link>
    </div>
  )
}

Home.propTypes = {
  setGameStarted: PropTypes.func
}

export default Home
