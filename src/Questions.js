import React from 'react'
import PropTypes from 'prop-types'

class Questions extends React.Component {
  constructor (props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem (item, index) {
    const {
      onSelect
    } = this.props
    return (
      <li
        key={`${index}-answer`}
        className={`c-question ${item.disabled ? 'is-disabled' : ''}`}
        onClick={item.disabled ? null : onSelect(item)}
      >
        <span className='c-question__label'>
          {String.fromCharCode(65 + index)}: {item.text}
        </span>
      </li>
    )
  }

  render () {
    const {
      answers,
      question
    } = this.props

    return (
      <div className='c-questions'>
        <p className='c-questions__title c-question'>
          {question}
        </p>
        <ul className='c-questions__list'>
          {answers.map(this.renderItem)}
        </ul>
      </div>
    )
  }
}

Questions.propTypes = {
  answers: PropTypes.array,
  question: PropTypes.string,
  answer: PropTypes.object,
  onSelect: PropTypes.func,
  correctAnswer: PropTypes.string
}

export default Questions
