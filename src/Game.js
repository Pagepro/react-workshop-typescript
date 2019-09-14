import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  fetchQuestions
} from './helpers'
import Questions from './Questions'
import Background from './Background'
import SidePanel from './SidePanel'
import { shuffle } from 'lodash'
import EndScreen from './EndScreen'

class Game extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: [],
      currentQuestion: {},
      answers: [],
      currentQuestionNumber: 0,
      answer: {}
    }

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.generateQuestion = this.generateQuestion.bind(this)
    this.setCurrentAnswer = this.setCurrentAnswer.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.setCurrentQuestionAnswers = this.setCurrentQuestionAnswers.bind(this)
  }

  componentDidMount () {
    const {
      appSettings: {
        nick,
        difficulty,
        gameStarted
      },
      history
    } = this.props

    if (!nick || !difficulty || !gameStarted) {
      history.replace('/')
      return
    }

    this.fetchQuestions()
  }

  resetGame () {
    this.props.resetGame(() => {
      this.props.history.push('/')
    })
  }

  fetchQuestions () {
    fetchQuestions(this.props.appSettings.difficulty)
      .then(questions => {
        this.setState({
          questions
        }, this.generateQuestion)
      })
  }

  generateQuestion () {
    const currentQuestion = this.state.questions[this.state.currentQuestionNumber]
    const {
      correctAnswer,
      incorrectAnswers
    } = currentQuestion

    const answers = shuffle([correctAnswer, ...incorrectAnswers])
      .map(answer => ({
        text: answer,
        disabled: false
      }))

    this.setState({
      currentQuestion,
      answers
    })
  }

  setCurrentAnswer (answer) {
    return () => {
      this.setState({ answer }, this.confirmCheckedAnswer)
    }
  }

  confirmCheckedAnswer () {
    const {
      answer,
      currentQuestion: {
        correctAnswer
      },
      currentQuestionNumber
    } = this.state

    if (this.state.answer === '') {
      return
    }

    if (answer.text === correctAnswer) {
      if (currentQuestionNumber !== 11) {
        this.setState(prevState => ({
          currentQuestionNumber: prevState.currentQuestionNumber + 1,
          answer: {}
        }), this.generateQuestion)
      } else {
        this.setState({
          isGameFinished: true,
          hasWon: true
        })
      }
    } else {
      this.setState({
        isGameFinished: true,
        hasWon: false
      })
    }
  }

  setCurrentQuestionAnswers (answers) {
    this.setState({
      answers: [
        ...answers
      ]
    })
  }

  render () {
    const {
      currentQuestion: {
        question,
        correctAnswer
      },
      answers,
      isGameFinished,
      hasWon,
      currentQuestionNumber
    } = this.state

    return isGameFinished
      ? (
        <EndScreen
          hasWon={hasWon}
          currentQuestionNumber={currentQuestionNumber}
          resetGame={this.resetGame}
        />
      )
      : (
        <div className='l-game'>
          <Background>
            <div className='c-questions'>
              <Questions
                question={question}
                answers={answers}
                correctAnswer={correctAnswer}
                onSelect={this.setCurrentAnswer}
              />
            </div>
          </Background>
          <SidePanel
            currentQuestionNumber={currentQuestionNumber}
            correctAnswer={correctAnswer}
            answers={answers}
            setCurrentQuestionAnswers={this.setCurrentQuestionAnswers}
          />
        </div>
      )
  }
}

Game.propTypes = {
  appSettings: PropTypes.object,
  history: PropTypes.object,
  resetGame: PropTypes.func
}

export default Game
