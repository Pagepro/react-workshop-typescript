import React from 'react'
import {
  sample
} from 'lodash'
import { IAnswer } from './Game'

interface IProps {
  correctAnswer: string
  setCurrentQuestionAnswers: (answers: IAnswer[]) => void
  answers: IAnswer[]
}

interface IState {
  callFriendUsed: boolean
  spectatorsUsed: boolean
  halfOnHalfUsed: boolean
}

class LifeLines extends React.Component<IProps, IState> {
  constructor (props: IProps) {
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

    if (!leftoverIncorrectAnswer) return

    const filteredAnswers = answers.reduce((result: IAnswer[], answer: IAnswer) => {
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

export default LifeLines
