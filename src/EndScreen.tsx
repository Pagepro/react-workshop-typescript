import React, { FunctionComponent } from 'react'
import {
  getGuaranteedReward
} from './helpers'

interface IProps {
  hasWon: boolean
  currentQuestionNumber: number
  resetGame: () => void
}

const EndScreen: FunctionComponent<IProps> = props => {
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

export default EndScreen
