import React from 'react'
import PropTypes from 'prop-types'
import { questionsList } from './helpers.js'

class QuestionsList extends React.Component {
  constructor (props) {
    super(props)

    this.renderQuestion = this.renderQuestion.bind(this)
  }

  renderQuestion (item, index) {
    const { currentQuestionNumber } = this.props
    const {
      price,
      isGuaranteed
    } = item

    const isCurrent = currentQuestionNumber === (questionsList.length - 1 - index)
    const isAnswered = currentQuestionNumber > (questionsList.length - 1 - index)
    const itemClass = `c-status__item${isCurrent ? ' is-active' : ''}${isGuaranteed ? ' is-special' : ''}${isAnswered ? ' is-done' : ''}`
    const questionNumber = questionsList.length - index

    return (
      <li
        key={`${price}-price`}
        className={itemClass}
      >
        <span className='c-status__indicator'>
          {questionNumber}
        </span>
        <span className='c-status__value'>
          {price}
        </span>
      </li>
    )
  }

  render () {
    return (
      <ul className='c-status'>
        {questionsList.map(this.renderQuestion)}
      </ul>
    )
  }
}

QuestionsList.propTypes = {
  currentQuestionNumber: PropTypes.number
}

export default QuestionsList
