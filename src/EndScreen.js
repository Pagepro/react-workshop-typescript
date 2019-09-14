import React from 'react'
import PropTypes from 'prop-types'
import {
  getGuaranteedReward
} from './helpers'

const EndScreen = props => {
  const {
    hasWon,
    currentQuestionNumber,
    resetGame
  } = props
  const reward = hasWon
    ? 1000000
    : getGuaranteedReward(currentQuestionNumber)

  return (
    <div className='l-end'>
      <p>
        You won {reward} $
      </p>
      <button
        type='button'
        onClick={resetGame}
        className='c-start-link'
      >
        Reset Game
      </button>
    </div>
  )
}

EndScreen.propTypes = {
  hasWon: PropTypes.bool,
  currentQuestionNumber: PropTypes.number,
  resetGame: PropTypes.func
}

export default EndScreen
