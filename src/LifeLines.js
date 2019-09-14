import React from 'react'
import PropTypes from 'prop-types'
import {
  sample
} from 'lodash'

class LifeLines extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      callFriendUsed: false,
      spectatorsUsed: false,
      halfOnHalfUsed: false
    }

    this.useSpectatorsLine = this.useSpectatorsLine.bind(this)
    this.useCallFriendLine = this.useCallFriendLine.bind(this)
    this.useHalfOnHalfLine = this.useHalfOnHalfLine.bind(this)
  }

  useSpectatorsLine () {
    window.alert(`Spectators: ${this.props.correctAnswer}`)

    this.setState({
      spectatorsUsed: true
    })
  }

  useCallFriendLine () {
    window.alert(`Friend: ${this.props.correctAnswer}`)

    this.setState({
      callFriendUsed: true
    })
  }

  useHalfOnHalfLine () {
    const {
      correctAnswer,
      setCurrentQuestionAnswers,
      answers
    } = this.props
    const leftoverIncorrectAnswer = sample(
      answers
        .filter(answer => answer.text !== correctAnswer)
      )

    const filteredAnswers = answers.reduce((result, answer) => {
      if (answer.text !== leftoverIncorrectAnswer.text && answer.text !== correctAnswer) {
        answer.disabled = true
      }

      return [
        ...result,
        answer
      ]
    }, [])

    setCurrentQuestionAnswers(filteredAnswers)

    this.setState({
      halfOnHalfUsed: true
    })
  }

  render () {
    const {
      callFriendUsed,
      spectatorsUsed,
      halfOnHalfUsed
    } = this.state

    return (
      <div className='c-lifelines'>
        <button
          onClick={this.useHalfOnHalfLine}
          disabled={halfOnHalfUsed}
        >
          50/50
        </button>
        <button
          onClick={this.useCallFriendLine}
          disabled={callFriendUsed}
        >
          call friend
        </button>
        <button
          onClick={this.useSpectatorsLine}
          disabled={spectatorsUsed}
        >
          spectators help
        </button>
      </div>
    )
  }
}

LifeLines.propTypes = {
  correctAnswer: PropTypes.string,
  setCurrentQuestionAnswers: PropTypes.func,
  answers: PropTypes.array,
  currentQuestionNumber: PropTypes.number,
  onChange: PropTypes.func
}

export default LifeLines
